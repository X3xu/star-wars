export async function renderDetailView(container, entity, data, onNavigateToDetail, onBackToList) {
    container.innerHTML = '';
    const backBtn = document.createElement('button');
    backBtn.textContent = '← Volver a ' + entity;
    backBtn.addEventListener('click', onBackToList);
    container.appendChild(backBtn);
  
    const title = document.createElement('h2');
    title.textContent = data.name || data.title || 'Detalle';
    container.appendChild(title);
  
    const ul = document.createElement('ul');
    for (const [key, value] of Object.entries(data)) {
      if (!value || (Array.isArray(value) && value.length === 0)) continue;
  
      const li = document.createElement('li');
      const label = prettifyKey(key);
  
      if (Array.isArray(value)) {
        li.innerHTML = '<strong>' + label + '</strong>: ';
        const linkContainer = document.createElement('span');
  
        for (const url of value) {
          const link = await createLinkFromUrl(url, onNavigateToDetail);
          if (link) linkContainer.appendChild(link);
        }
  
        li.appendChild(linkContainer);
      } else if (typeof value === 'string' && value.startsWith('http')) {
        li.innerHTML = '<strong>' + label + '</strong>: ';
        const link = await createLinkFromUrl(value, onNavigateToDetail);
        if (link) li.appendChild(link);
      } else {
        li.innerHTML = '<strong>'+ label + '</strong>: '+ value;
      }
  
      ul.appendChild(li);
    }
  
    container.appendChild(ul);
  }
  
  function prettifyKey(key) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  
  async function createLinkFromUrl(url, onNavigateToDetail) {
    const match = url.match(/https:\/\/swapi\.py4e\.com\/api\/(\w+)\/(\d+)\//);
    if (!match) return null;
  
    const [_, entity, id] = match;
    const btn = document.createElement('button');
    btn.textContent = entity + id; 
    btn.className = 'related-link';
    btn.addEventListener('click', () => {
      onNavigateToDetail(entity, url);
    });
  
    try {
      const res = await fetch(url);
      const data = await res.json();
      btn.textContent = data.name || data.title || '${entity} ${id}';
    } catch (e) {
        console.error('Error inesperado al crear el enlace desde ${url}:', error);
        const errorBtn = document.createElement('button');
        errorBtn.className = 'related-link error';
        errorBtn.textContent = 'Enlace roto';
        errorBtn.disabled = true;
    }
  
    return btn;
  }