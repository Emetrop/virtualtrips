const apiUrl = "http://localhost:3000";

export const getLocationsByName = (name) => {
  return fetch(`${apiUrl}/locations?q=${name}`)
    .then(response => response.json())
}

const api = {
  getLocationsByName,
};

export default api;
