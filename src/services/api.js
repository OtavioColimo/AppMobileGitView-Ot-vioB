import axios from "axios";

// ✅ PokéAPI - Totalmente gratuita e sem necessidade de chaves!
// Documentação: https://pokeapi.co/

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

// Interceptor para log de requisições
api.interceptors.request.use((config) => {
  console.log("Request URL:", config.baseURL + config.url);
  console.log("Params:", config.params);
  return config;
});

// Interceptor para log de resposta e erros
api.interceptors.response.use(
  (response) => {
    console.log("Response Status:", response.status);
    return response;
  },
  (error) => {
    console.log("API Error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;