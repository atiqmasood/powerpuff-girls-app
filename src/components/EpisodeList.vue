<script setup lang="ts">
import type { PropType } from "vue";
import { Episode } from "@/types";

const props: any = defineProps({
  selectedSeason: { type: Number, default: 1 },
  filteredEpisodes: { type: Array as PropType<Episode[]>, default: [] },
});
</script>
<template>
  <div v-if="filteredEpisodes.length">
    <h3 class="text-xl font-bold text-gray-700 mb-4">
      Episodes in Season {{ props.selectedSeason }}
    </h3>
    <ul class="space-y-4">
      <router-link
        v-for="episode in filteredEpisodes"
        :key="episode.id"
        class="flex bg-gray-50 p-4 rounded-lg shadow hover:bg-gray-100 transition"
        :to="'/episode/' + episode.id"
      >
        <li class="flex space-x-4 items-center">
          <img
            :src="episode.image?.medium"
            alt="Episode Image"
            class="w-24 h-24 object-cover rounded-md"
          />
          <div class="flex-1">
            <div class="text-lg font-semibold text-blue-500">
              {{ episode.name }}
            </div>
            <p class="text-gray-600 mt-1 text-sm">{{ episode.airdate }}</p>
          </div>
        </li>
      </router-link>
    </ul>
  </div>
  <div v-else>
    <p class="text-gray-600">
      No episodes found for Season {{ props.selectedSeason }}.
    </p>
  </div>
</template>
