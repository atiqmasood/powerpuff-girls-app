import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.tvmaze.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getShowApi = () => apiClient.get("/shows/6771");
export const getEpisodesApi = () => apiClient.get("/shows/6771/episodes");
export const getEpisodeByIdApi = (id: string | number) =>
  apiClient.get(`/episodes/${id}`);
