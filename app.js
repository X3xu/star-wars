import { fetchEntityList, fetchEntityDetail } from './API/api.js';
import { renderListView } from './components/listView.js';
import { renderDetailView } from './components/detailView.js';

const view = document.getElementById('view');

function setupNavigation() {
  document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => {
      const entity = button.dataset.entity;
      loadEntityList(entity);
    });
  });
}

async function loadEntityList(entity) {
  view.innerHTML = '<p>Cargando...</p>';
  try {
    const data = await fetchEntityList(entity);
    renderListView(view, entity, data.results, handleDetailNavigation);
  } catch (err) {
    view.innerHTML = '<p>Error cargando ${entity}: ${err.message}</p>';
  }
}

async function loadEntityDetail(entity, url) {
  view.innerHTML = '<p>Cargando detalle...</p>';
  try {
    const data = await fetchEntityDetail(url);
    renderDetailView(view, entity, data, handleDetailNavigation);
  } catch (err) {
    view.innerHTML = '<p>Error cargando detalle: ${err.message}</p>';
  }
}

function handleDetailNavigation(entity, url) {
  loadEntityDetail(entity, url);
}

setupNavigation();

