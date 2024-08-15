// store/show.ts
import { defineStore } from "pinia";
import { getEpisodesApi, getShowApi, getEpisodeByIdApi } from "@/utils/api";
import { Episode, EpisodeDetail, TVShow } from "@/types";

export const useShowStore = defineStore("show", {
  state: () => ({
    show: null as TVShow | null,
    episodes: [] as Episode[],
    episodeDetail: null as EpisodeDetail | null,
    isShowLoading: false as Boolean,
    isEpisodesLoading: false as Boolean,
    isDetailLoading: false as Boolean,
    selectedSeason: 1 as Number,
  }),
  actions: {
    async fetchShow() {
      this.isShowLoading = true;
      const { data } = await getShowApi();
      this.show = data;
      this.isShowLoading = false;
    },
    async fetchEpisodes() {
      this.isEpisodesLoading = true;
      const { data } = await getEpisodesApi();
      this.episodes = data;
      this.isEpisodesLoading = false;
    },
    async getEpisodeById(id: string | number) {
      this.isDetailLoading = true;
      const { data } = await getEpisodeByIdApi(id);
      this.episodeDetail = data;
      this.isDetailLoading = false;
    },
    async setSelectedSeason(season: number) {
      this.selectedSeason = season;
    },
  },
});
