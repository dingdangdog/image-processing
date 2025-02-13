<template>
  <Head>
    <Title>{{ $t("title") }}</Title>
    <Meta name="description" :content="$t('description')" />
    <Meta name="keywords" :content="$t('description')" />

    <!-- Twitter Card data -->
    <!-- 或者用 summary_large_image 显示更大的图片 -->
    <Meta name="twitter:card" content="summary" />
    <Meta name="twitter:site" content="@oldmoontop" />
    <Meta name="twitter:title" :content="$t('title')" />
    <Meta name="twitter:description" :content="$t('keywords')" />
    <Meta name="twitter:image" content="/faviconx2.jpg" />
    <!-- 其他 SEO 标签 -->
    <Meta property="og:title" :content="$t('title')" />
    <Meta property="og:description" :content="$t('description')" />
    <Meta property="og:image" content="/faviconx2.jpg" />
  </Head>
  <div class="">
    <div class="container mx-auto p-6">
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          {{ $t("home.welcome") }}
        </h1>
        <p class="text-lg sm:text-xl">{{ $t("home.tip") }}</p>
      </div>

      <div class="flex flex-col md:flex-row justify-center">
        <a
          :href="localePath('watermark')"
          class="min-w-[30%] border border-gray-100/10 flex justify-center items-center p-6 rounded-lg shadow-md shadow-gray-300 hover:scale-105 transform transition duration-300 ease-in-out bg-indigo-500/50 hover:bg-indigo-500"
        >
          <div class="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-16 w-16 mx-auto mb-4"
              fill="currentColor"
            >
              <path
                d="M9.75 20.85C11.53 20.15 11.14 18.22 10.24 17C9.35 15.75 8.12 14.89 6.88 14.06C6 13.5 5.19 12.8 4.54 12C4.26 11.67 3.69 11.06 4.27 10.94C4.86 10.82 5.88 11.4 6.4 11.62C7.31 12 8.21 12.44 9.05 12.96L10.06 11.26C8.5 10.23 6.5 9.32 4.64 9.05C3.58 8.89 2.46 9.11 2.1 10.26C1.78 11.25 2.29 12.25 2.87 13.03C4.24 14.86 6.37 15.74 7.96 17.32C8.3 17.65 8.71 18.04 8.91 18.5C9.12 18.94 9.07 18.97 8.6 18.97C7.36 18.97 5.81 18 4.8 17.36L3.79 19.06C5.32 20 7.88 21.47 9.75 20.85M20.84 5.25C21.06 5.03 21.06 4.67 20.84 4.46L19.54 3.16C19.33 2.95 18.97 2.95 18.76 3.16L17.74 4.18L19.82 6.26M11 10.92V13H13.08L19.23 6.85L17.15 4.77L11 10.92Z"
              />
            </svg>
            <h3 class="text-2xl font-semibold">
              {{ $t("home.watermark.name") }}
            </h3>
            <p class="text-gray-200 my-2 text-center">
              {{ $t("home.watermark.description") }}
            </p>
            <p
              class="mt-4 text-lg inline-block font-semibold text-blue-300 duration-200 ease-in-out"
            >
              {{ $t("home.start-button") }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Initialize router for navigation
const router = useRouter();
</script>

<style scoped>
/* Custom Styling for Hover Effects and Transitions */
button {
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

button:hover {
  transform: scale(1.05);
}

.router-link {
  text-decoration: none;
}
</style>
