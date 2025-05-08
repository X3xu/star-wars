export async function fetchEntityList(entity) {
  const API_BASE = 'https://swapi.py4e.com/api/';
  const res = await fetch(API_BASE + entity + '/');
  if (!res.ok) throw new Error('Error al obtener datos de SWAPI');
  return res.json();
}

export async function fetchEntityDetail(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener detalle de SWAPI');
  return res.json();
}
