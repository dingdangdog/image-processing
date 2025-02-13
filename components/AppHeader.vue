<template>
  <div
    class="w-full h-16 bg-gradient-to-r from-red-700 via-green-700 to-blue-700 fixed top-0 left-0 flex justify-between items-center px-4 md:px-8 transition-transform duration-500 ease-in-out transform"
    :class="isMenuVisible ? 'translate-y-0' : '-translate-y-full'"
  >
    <!-- 左侧区域：标题和捐赠按钮 -->
    <div class="w-1/2 flex items-center h-full">
      <a
        class="text-lg md:text-xl text-white font-semibold hover:text-gray-300 transition duration-300 ease-in-out"
        href="/"
      >
        {{ $t("title") }}
      </a>
      <!-- <a
        class="h-full flex justify-center items-center px-4 text-white font-medium hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out rounded-md ml-4"
        href="https://dingdangdog.github.io/donate/"
        target="_blank"
      >
        {{ $t("header.donate") }}
      </a> -->
    </div>

    <!-- 右侧区域：GitHub链接和语言选择 -->
    <div
      class="w-1/2 h-full flex justify-end items-center space-x-1 md:space-x-4"
    >
      <a
        href="https://github.com/dingdangdog/image-factory"
        target="_blank"
        class="text-white hover:text-gray-300 transition-all duration-300 ease-in-out"
      >
        <IconGithub class="w-8 h-8" :color="`rgb(243 244 246)`" />
      </a>
      <LocaleSelect />
    </div>
  </div>
</template>

<script setup lang="ts">
const isMenuVisible = ref(true); // 控制菜单是否可见
let lastScrollPosition = 0;
const threshold = 5; // 设置滚动的最小距离阈值

const handleScroll = () => {
  const currentScrollPosition = window.scrollY;
  // 检测滚动方向并且需要滚动超过指定的阈值
  if (Math.abs(currentScrollPosition - lastScrollPosition) > threshold) {
    if (currentScrollPosition > lastScrollPosition) {
      // 向下滚动，隐藏菜单
      isMenuVisible.value = false;
    } else {
      // 向上滚动，显示菜单
      isMenuVisible.value = true;
    }
  }
  lastScrollPosition = currentScrollPosition;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* 增加动画效果，使头部在显示时更流畅 */
header {
  transition: transform 0.3s ease-in-out;
}

header.hidden {
  transform: translateY(-100%);
}

header.visible {
  transform: translateY(0);
}
</style>
