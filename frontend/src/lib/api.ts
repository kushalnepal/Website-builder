import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  register: (data: { email: string; password: string; name: string }) =>
    api.post("/auth/register", data),
  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),
  me: () => api.get("/auth/me"),
};

// Websites API
export const websitesAPI = {
  generate: (data: { prompt: string; name?: string }) =>
    api.post("/websites/generate", data),
  list: () => api.get("/websites"),
  get: (id: string) => api.get(`/websites/${id}`),
  update: (id: string, data: any) => api.put(`/websites/${id}`, data),
  edit: (id: string, data: { instruction: string }) =>
    api.post(`/websites/${id}/edit`, data),
  publish: (id: string) => api.post(`/websites/${id}/publish`),
  delete: (id: string) => api.delete(`/websites/${id}`),
  getPublic: (slug: string) => api.get(`/websites/public/${slug}`),
};

// Templates API
export const templatesAPI = {
  list: (category?: string) => api.get("/templates", { params: { category } }),
  get: (id: string) => api.get(`/templates/${id}`),
  getByCategory: (category: string) =>
    api.get(`/templates/category/${category}`),
};

export default api;
