export const storageService = {
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
  put,
  get,
};

function get(entityType, entityId) {
  return query(entityType).then((entities) => entities.find((entity) => entity.id === entityId));
}

function removeFromStorage(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === entityId);
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

function query(entityType, filterBy, delay = 1) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('OOOOPs')
      resolve(entities);
    }, delay);
  });
  // return Promise.resolve(entities)
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity.id === updatedEntity.id);
    entities.splice(idx, 1, updatedEntity);
    _save(entityType, entities);
    return updatedEntity;
  });
}

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}
