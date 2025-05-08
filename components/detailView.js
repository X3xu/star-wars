import { fetchEntityDetail } from '../API/swapi.js';

export function renderDetailView(container, data) {
  container.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = data.name || data.title || 'Detalle';
  container.appendChild(title);

  const summary = document.createElement('section');
  summary.className = 'entity-summary';
  container.appendChild(summary);

  const ul = document.createElement('ul');
  summary.appendChild(ul);

  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) && value.length === 0) continue;

    const li = document.createElement('li');
    const label = prettifyKey(key) + ': ';

    // Si el valor es un array de URLs
    if (Array.isArray(value)) {
      li.innerHTML = '<strong>${label}</strong>';
      value.forEach(url => {
        const link = createLinkFromUrl(url);
        if (link) li.appendChild(link);
      });
    }

    // Si es una URL a otra entidad
    else if (typeof value === 'string' && value.startsWith('http')) {
      const link = createLinkFromUrl(value);
      li.innerHTML = '<strong>${label}</strong>';
      if (link) li.appendChild(link);
    }

    // Si es un valor normal
    else {
      li.innerHTML = '<strong>${label}</strong>${value}';
    }

    ul.appendChild(li);
  }
}

// 🧹 Convierte 'birth_year' → 'Año de nacimiento'
function prettifyKey(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

// 🔗 Convierte una URL SWAPI en un enlace navegable
function createLinkFromUrl(url) {
  const match = url.match(/https:\/\/swapi\.py4e\.com\/api\/(\w+)\/(\d+)\//);
  if (!match) return null;

  const [_, entity, id] = match;

  const link = document.createElement('button');
  link.textContent = '${entity} ${id}';
  link.className = 'related-link';
  link.addEventListener('click', async () => {
    const container = document.getElementById('view');
    container.innerHTML = '<p>Cargando detalle...</p>';
    try {
      const data = await fetchEntityDetail(url);
      renderDetailView(container, data);
    } catch (err) {
      container.innerHTML = '<p>Error: ${err.message}</p>';
    }
  });

  return link;
}
