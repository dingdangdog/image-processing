<template>
  <div class="">
    <!-- 主容器 -->
    <div class="container mx-auto p-6">
      <!-- 欢迎区域 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          欢迎来到 图片工具站
        </h1>
        <p class="text-lg sm:text-xl">选择你需要的工具，开始编辑图片吧！</p>
      </div>

      <!-- 工具列表 -->
      <div class="flex justify-center">
        <!-- 工具 1: 图片加水印 -->
        <router-link
          to="/watermark"
          class="min-w-[30%] border border-gray-800/10 flex justify-center items-center p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out hover:bg-indigo-500"
        >
          <div class="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-16 w-16 mx-auto mb-4 text-indigo-600"
              fill="currentColor"
            >
              <!-- <title>draw</title> -->
              <path
                d="M9.75 20.85C11.53 20.15 11.14 18.22 10.24 17C9.35 15.75 8.12 14.89 6.88 14.06C6 13.5 5.19 12.8 4.54 12C4.26 11.67 3.69 11.06 4.27 10.94C4.86 10.82 5.88 11.4 6.4 11.62C7.31 12 8.21 12.44 9.05 12.96L10.06 11.26C8.5 10.23 6.5 9.32 4.64 9.05C3.58 8.89 2.46 9.11 2.1 10.26C1.78 11.25 2.29 12.25 2.87 13.03C4.24 14.86 6.37 15.74 7.96 17.32C8.3 17.65 8.71 18.04 8.91 18.5C9.12 18.94 9.07 18.97 8.6 18.97C7.36 18.97 5.81 18 4.8 17.36L3.79 19.06C5.32 20 7.88 21.47 9.75 20.85M20.84 5.25C21.06 5.03 21.06 4.67 20.84 4.46L19.54 3.16C19.33 2.95 18.97 2.95 18.76 3.16L17.74 4.18L19.82 6.26M11 10.92V13H13.08L19.23 6.85L17.15 4.77L11 10.92Z"
              />
            </svg>
            <!-- <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              class="h-16 w-16 mx-auto mb-4 text-indigo-600"
              fill="currentColor"
            >
              <title>watermark</title>
              <path
                d="M21,3H3A2,2 0 0,0 1,5V19A2,2 0 0,0 3,21H21A2,2 0 0,0 23,19V5A2,2 0 0,0 21,3M21,19H12V13H21V19Z"
              />
            </svg> -->
            <h3 class="text-2xl font-semibold">水印工具</h3>
            <!-- <p class="text-gray-700">轻松给你的图片添加水印</p> -->
            <p
              to="/watermark"
              class="mt-4 text-lg inline-block font-semibold text-blue-300 duration-200 ease-in-out"
            >
              开始使用
            </p>
          </div>
        </router-link>

        <!-- 工具 2: 图片裁剪 -->
        <!-- <div
          class="flex justify-center items-center p-6 bg-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out hover:bg-green-500"
        >
          <div class="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mx-auto mb-4 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M9 3a1 1 0 011 1v4.585l1.707-1.707a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L8 8.585V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="text-xl font-semibold">图片裁剪</h3>
            <p class="text-gray-700">快速裁剪图片，调整尺寸和比例</p>
            <router-link
              to="/crop"
              class="mt-4 inline-block text-green-600 font-semibold hover:text-green-800"
              >开始使用</router-link
            >
          </div>
        </div> -->

        <!-- 工具 3: 图片格式转换 -->
        <!-- <div
          class="flex justify-center items-center p-6 bg-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out hover:bg-yellow-500"
        >
          <div class="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mx-auto mb-4 text-yellow-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.707 9.707a1 1 0 011.414 0L10 12.293l2.879-2.586a1 1 0 011.415 1.414l-4 3.5a1 1 0 01-1.415 0l-4-3.5a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="text-xl font-semibold">图片格式转换</h3>
            <p class="text-gray-700">轻松将图片转换为不同的格式</p>
            <router-link
              to="/convert"
              class="mt-4 inline-block text-yellow-600 font-semibold hover:text-yellow-800"
              >开始使用</router-link
            >
          </div>
        </div> -->
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
