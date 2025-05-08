export function renderListView(container, entity, items, onDetailClick) {
    container.innerHTML = '';
  
    const searchInput = document.createElement('input');
    searchInput.placeholder = 'Buscar...';
    container.appendChild(searchInput);
  
    const list = document.createElement('ul');
    container.appendChild(list);
  
    const renderItems = (filter = '') => {
      list.innerHTML = '';
      const filtered = items.filter(item =>
        item.name?.toLowerCase().includes(filter.toLowerCase()) ||
        item.title?.toLowerCase().includes(filter.toLowerCase())
      );
      if (filtered.length === 0) {
        list.innerHTML = '<li>No se encontraron resultados.</li>';
      } else {
        filtered.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item.name || item.title;
          li.style.cursor = 'pointer';
          li.addEventListener('click', () => onDetailClick(entity, item.url));
          list.appendChild(li);
        });
      }
    };
  
    searchInput.addEventListener('input', e => {
      renderItems(e.target.value);
    });
  
    renderItems();
  }  