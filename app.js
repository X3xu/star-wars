// Importamos funciones que manejan la API y la renderización de vistas
import { fetchEntityList, fetchEntityDetail } from './API/api.js';
import { renderListView } from './components/listView.js';
import { renderDetailView } from './components/detailView.js';

// Referencia al contenedor principal donde se renderizan las vistas
const view = document.getElementById('view');
// Referencia al input de búsqueda
const searchInput = document.getElementById('search');

// Variables globales para guardar la entidad actual y sus datos
let currentEntity = null;
let currentData = [];
let forceError = false; // Alterna manualmente si quieres forzar errores


/**
 * setupNavigation
 * Configura los eventos de navegación:
 * - Botones del menú que cargan listas de entidades
 * - Input de búsqueda que filtra los resultados en tiempo real
 */
function setupNavigation() {
  // Añade event listeners a cada botón de navegación
  document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => {
      const entity = button.dataset.entity; // Lee qué tipo de entidad representa el botón
      loadEntityList(entity); // Carga la lista de esa entidad
    });
  });

  // Añade funcionalidad al input de búsqueda si existe
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      // Filtra los datos actuales por nombre o título
      const filtered = currentData.filter(item => {
        const name = item.name || item.title || '';
        return name.toLowerCase().includes(searchInput.value.toLowerCase());
      });
      // Renderiza la lista filtrada
      renderListView(view, currentEntity, filtered, handleDetailNavigation);
      // Muestra cuántos resultados se encontraron
      showResultCount(filtered.length, currentData.length);
    });
  }
}

/**
 * showResultCount
 * Muestra un contador sobre los resultados encontrados tras una búsqueda
 */
function showResultCount(filtered, total) {
  let countElem = document.getElementById('result-count');
  // Si aún no existe el contador, lo crea y lo inserta
  if (!countElem) {
    countElem = document.createElement('p');
    countElem.id = 'result-count';
    view.insertBefore(countElem, view.firstChild);
  }
  // Actualiza el texto con el número de resultados
  countElem.textContent = `Mostrando ${filtered} de ${total} resultados.`;
}

/**
 * loadEntityList
 * Carga y muestra la lista de una entidad (planets, people, starships...)
 */
async function loadEntityList(entity) {
  showLoading(true);
  try {
    const actualEntity = forceError ? 'nonexistent-entity' : entity;
    const data = await fetchEntityList(actualEntity);
    currentEntity = entity;
    currentData = data.results;
    renderListView(view, entity, data.results, handleDetailNavigation);
    showResultCount(data.results.length, data.results.length);
  } catch (err) {
    view.innerHTML = `<p style="color:red;">Error cargando ${entity}: ${err.message}</p>`;
    showToast(`Error cargando ${entity}: ${err.message}`);
  } finally {
    showLoading(false);
  }
}


/**
 * loadEntityDetail
 * Carga y muestra el detalle de una entidad individual
 */
async function loadEntityDetail(entity, url) {
  showLoading(true);
  try {
    const actualUrl = forceError ? url + '404' : url;
    const data = await fetchEntityDetail(actualUrl);
    await renderDetailView(view, entity, data, handleDetailNavigation, () => loadEntityList(entity));
  } catch (err) {
    view.innerHTML = `<p style="color:red;">Error cargando detalle: ${err.message}</p>`;
    showToast(`Error cargando detalle: ${err.message}`);
  } finally {
    showLoading(false);
  }
}


/**
 * handleDetailNavigation
 * Navega a una entidad relacionada haciendo clic sobre ella
 */
function handleDetailNavigation(entity, url) {
  loadEntityDetail(entity, url);
}


function showToast(message, duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    toast.addEventListener('transitionend', () => toast.remove());
  }, duration);
}

function showLoading(show = true) {
  let loader = document.getElementById('global-loader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.innerHTML = '<div class="spinner"></div>';
    document.body.appendChild(loader);
  }

  loader.style.display = show ? 'flex' : 'none';
}

const toggleErrorButton = document.getElementById('toggle-error');

if (toggleErrorButton) {
  toggleErrorButton.addEventListener('click', () => {
    forceError = !forceError;
    toggleErrorButton.textContent = `Modo Error: ${forceError ? 'ON' : 'OFF'}`;
  });
}



// Inicializa la navegación al cargar la app
setupNavigation();
