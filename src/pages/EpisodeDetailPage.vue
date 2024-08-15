<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useShowStore } from "@/store/show";
import { EpisodeDetail } from "@/types";

const showStore = useShowStore();
const route = useRoute();
const episodeId: any = route.params.id;
const episode = ref<EpisodeDetail | null>(null);

watch(
  () => showStore.episodeDetail,
  (updated: any) => {
    episode.value = updated;
  }
);

onMounted(() => {
  showStore.getEpisodeById(episodeId);
});
</script>
<template>
  <div v-if="showStore?.isDetailLoading" class="text-center py-3 text-[24px]">
    Loading...
  </div>
  <div v-else class="bg-gray-100 min-h-screen p-6">
    <div
      class="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <!-- Back Button -->
      <router-link to="/">
        <div class="p-4">
          <div
            class="flex items-center text-blue-500 hover:text-blue-700 transition"
          >
            <svg
              class="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span class="text-lg font-semibold">Back</span>
          </div>
        </div>
      </router-link>

      <!-- Episode Cover Image -->
      <div class="relative">
        <img
          :src="episode?.image?.original"
          alt="Episode Image"
          class="w-full h-64 object-cover"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
        >
          <h1 class="text-3xl font-bold text-white">{{ episode?.name }}</h1>
        </div>
      </div>

      <!-- Episode Details Section -->
      <div class="p-6">
        <h2 class="text-xl font-bold text-gray-700 mb-4">Episode Summary</h2>
        <p class="text-gray-700 text-lg mb-6" v-html="episode?.summary"></p>

        <!-- Additional episode details -->
        <div class="flex flex-col space-y-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Air Date</h3>
            <p class="text-gray-600">{{ episode?.airdate }}</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Season</h3>
            <p class="text-gray-600">{{ episode?.season }}</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Episode Number</h3>
            <p class="text-gray-600">{{ episode?.number }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
