<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { useShowStore } from "@/store/show";
import EpisodeList from "@/components/EpisodeList.vue";
import { Episode } from "@/types";

const showStore = useShowStore();
// Reactive state for selected season
const selectedSeason = ref<any>(showStore.selectedSeason);
const episodes = computed<Episode[]>(() => showStore.episodes);
// Filter episodes based on the selected season
const filteredEpisodes = computed<Episode[]>(() => {
  if (selectedSeason.value === null) return [];
  return episodes.value.filter(
    (episode) => episode.season === selectedSeason.value
  );
});

// Compute available seasons from episodes
const availableSeasons = computed(() => {
  const seasons = new Set<number>();
  episodes.value.forEach((episode) => {
    seasons.add(episode.season);
  });
  return Array.from(seasons).sort();
});

// store selected season in store
watch(selectedSeason, (updated: number) => {
  showStore.setSelectedSeason(updated);
});
onMounted(() => {
  if (!showStore?.show) {
    showStore.fetchShow();
  }
  if (episodes.value?.length <= 0) {
    showStore.fetchEpisodes();
  }
});
</script>
<template>
  <div class="bg-gray-100 min-h-screen p-6">
    <div v-if="showStore?.isShowLoading" class="text-center py-3 text-[24px]">
      Loading...
    </div>
    <div
      v-else
      class="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <!-- Show Cover Image -->
      <div class="relative">
        <img
          :src="showStore?.show?.image.original"
          alt="Powerpuff Girls"
          class="w-full h-64 object-cover"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
        >
          <h1 class="text-3xl font-bold text-white">
            {{ showStore?.show?.name }}
          </h1>
        </div>
      </div>

      <!-- Show Details Section -->
      <div class="p-6">
        <p
          class="text-gray-700 text-sm mb-6"
          v-html="showStore?.show?.summary"
        ></p>
        <div v-if="showStore?.isEpisodesLoading" class="text-center">
          Loading episodes...
        </div>
        <div v-else>
          <!-- Season Dropdown -->
          <div class="mb-6">
            <label
              for="season-select"
              class="block text-gray-700 text-lg font-semibold mb-2"
              >Select Season</label
            >
            <select
              id="season-select"
              v-model="selectedSeason"
              class="block w-full bg-gray-50 border border-gray-300 rounded-lg p-2"
            >
              <option
                v-for="season in availableSeasons"
                :key="season"
                :value="season"
              >
                Season {{ season }}
              </option>
            </select>
          </div>

          <!-- Episode List -->
          <EpisodeList
            :filteredEpisodes="filteredEpisodes"
            :selectedSeason="selectedSeason"
          />
        </div>
      </div>
    </div>
  </div>
</template>
