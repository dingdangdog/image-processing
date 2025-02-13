<template>
  <div
    class="min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 text-white"
  >
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 工具 1: 图片加水印 -->
        <div
          class="flex justify-center items-center p-6 bg-white rounded-lg shadow-lg hover:scale-105 transform transition duration-300 ease-in-out hover:bg-indigo-500"
        >
          <div class="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16 mx-auto mb-4 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M14.293 3.707a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-11 11a1 1 0 01-1.414-1.414L12.586 9H7a1 1 0 110-2h7.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
            <h3 class="text-xl font-semibold">图片加水印</h3>
            <p class="text-gray-700">轻松给你的图片添加水印</p>
            <router-link
              to="/watermark"
              class="mt-4 inline-block text-indigo-600 font-semibold hover:text-indigo-800"
              >开始使用</router-link
            >
          </div>
        </div>

        <!-- 工具 2: 图片裁剪 -->
        <div
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
        </div>

        <!-- 工具 3: 图片格式转换 -->
        <div
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
        </div>
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
