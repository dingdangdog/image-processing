<template>
  <Head>
    <Title>添加水印 - 老狗图片工厂</Title>
  </Head>
  <div class="p-4 max-w-3xl mx-auto">
    <!-- 标题 -->
    <h1 class="text-3xl sm:text-4xl font-extrabold mb-6 text-center">
      水印工具
    </h1>

    <!-- 水印文字输入 -->
    <div class="mb-6">
      <label for="watermark-text" class="block text-lg font-medium"
        >水印文字</label
      >
      <input
        id="watermark-text"
        v-model="watermarkText"
        type="text"
        class="mt-2 p-3 block w-full rounded-md bg-white text-black border-2 border-gray-300 shadow-sm focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700 transition duration-300 ease-in-out"
      />
    </div>

    <!-- 水印配置 -->
    <div class="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <label for="watermark-size" class="block text-lg font-medium"
          >水印文字大小(px)</label
        >
        <input
          id="watermark-size"
          v-model.number="watermarkSize"
          type="number"
          min="10"
          max="100"
          step="1"
          class="mt-2 p-3 block w-full rounded-md bg-white text-gray-600 border-2 border-gray-300 shadow-sm focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700 transition duration-300 ease-in-out"
        />
      </div>
      <div>
        <label for="watermark-position" class="block text-lg font-medium"
          >水印位置</label
        >
        <select
          id="watermark-position"
          v-model="watermarkPosition"
          class="mt-2 p-3 block w-full rounded-md bg-white text-gray-600 border-2 border-gray-300 shadow-sm focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700 transition duration-300 ease-in-out"
        >
          <option value="center">居中</option>
          <option value="top-left">左上</option>
          <option value="top-right">右上</option>
          <option value="bottom-left">左下</option>
          <option value="bottom-right">右下</option>
        </select>
      </div>
      <div>
        <label for="watermark-font" class="block text-lg font-medium"
          >水印字体</label
        >
        <select
          id="watermark-font"
          v-model="watermarkFont"
          class="mt-2 p-3 block w-full rounded-md bg-white text-gray-600 border-2 border-gray-300 shadow-sm focus:outline-none focus:border-purple-700 focus:ring-2 focus:ring-purple-700 transition duration-300 ease-in-out"
        >
          <option value="SmileySans-Oblique">SmileySans-Oblique</option>
          <option value="Arial">Arial</option>
          <option value="Courier">Courier</option>
        </select>
      </div>
    </div>

    <!-- 重新处理按钮 -->
    <div class="mb-6">
      <button
        @click="reprocessImages"
        :disabled="processing || processedImages.length === 0"
        class="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
        :class="{
          'cursor-not-allowed': processing || processedImages.length === 0,
          'hover:bg-purple-700': processedImages.length > 0,
          'hover:bg-red-300': processedImages.length === 0,
        }"
      >
        重新处理图片
      </button>
    </div>

    <!-- 文件上传区域 -->
    <div
      @dragover.prevent="dragOver = true"
      @dragleave="dragOver = false"
      @drop.prevent="handleDrop"
      @click.stop="$refs.fileInput.click()"
      class="mt-6 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-purple-700 transition duration-300 ease-in-out"
      :class="{
        'border-purple-700 bg-blue-50': dragOver,
        'border-gray-300': !dragOver,
      }"
    >
      <input
        type="file"
        multiple
        accept="image/*"
        @change="handleFileSelect"
        class="hidden"
        ref="fileInput"
      />
      <div
        class="text-gray-300 duration-100 ease-in-out"
        :class="{
          'my-0': processedImages.length > 0,
          'my-16': processedImages.length === 0,
        }"
      >
        <p>
          拖放图片到此区域或
          <button
            type="button"
            @click.stop="$refs.fileInput.click()"
            class="text-purple-800 font-bold hover:text-purple-700 focus:outline-none"
          >
            选择文件
          </button>
        </p>
        <p class="text-sm mt-2">支持 JPEG、PNG、WEBP 等图片格式</p>
      </div>
    </div>

    <!-- 处理图片按钮 -->
    <div v-if="processedImages.length > 0" class="mt-6 flex space-x-4">
      <button
        @click="deleteAll"
        class="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg focus:outline-none transition duration-300 ease-in-out"
      >
        删除全部
      </button>
      <button
        @click="downloadAll"
        class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg focus:outline-none transition duration-300 ease-in-out"
      >
        下载全部
      </button>
    </div>

    <!-- 处理中状态 -->
    <div v-if="processing" class="mt-6 text-center text-gray-600">
      处理中... ({{ processedCount }}/{{ totalFiles }})
    </div>

    <!-- 已处理图片预览 -->
    <div v-if="processedImages.length > 0" class="mt-6">
      <h3 class="text-xl font-semibold mb-4">已处理图片</h3>
      <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(image, index) in processedImages"
          :key="index"
          class="relative group rounded-lg overflow-hidden bg-gray-400 shadow-md shadow-gray-300 hover:scale-105 transition duration-300 ease-in-out"
        >
          <img
            :src="image.thumbnail"
            class="w-full h-32 object-contain"
            @click="previewImage(image)"
            alt="已处理图片缩略图"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <button
              @click.stop="previewImage(image)"
              class="text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded-md"
            >
              <IconFullscreen class="w-6 h-6" color="rgb(243 244 246)" />
            </button>
            <div class="absolute bottom-1 right-1 flex space-x-2">
              <button
                @click.stop="removeImage(index)"
                class="text-white bg-red-500 hover:bg-red-600 p-1 rounded-full"
              >
                <IconDelete class="w-4 h-4" color="rgb(243 244 246)" />
              </button>
              <button
                @click.stop="downloadImage(image)"
                class="text-white text-sm bg-blue-600 hover:bg-purple-700 p-1 rounded-full"
              >
                <IconDownload class="w-4 h-4" color="rgb(243 244 246)" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 全屏预览 -->
    <div
      v-if="previewImageData"
      class="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      @keydown.esc="previewImageData = null"
      tabindex="0"
    >
      <div class="relative">
        <img
          :src="previewImageData.original"
          class="max-w-full max-h-full cursor-pointer"
          @click="previewImageData = null"
          alt="全屏预览"
        />
        <button
          @click="previewImageData = null"
          class="text-white bg-red-600 px-2 py-1 rounded-lg absolute top-2 right-2"
        >
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const watermarkText = ref("WaterMark Text");
const watermarkSize = ref(40);
const watermarkPosition = ref("center");
const watermarkFont = ref("SmileySans-Oblique");
const dragOver = ref(false);
const processedImages = ref([]);
const processing = ref(false);
const processedCount = ref(0);
const totalFiles = ref(0);
const previewImageData = ref(null);
const originalImages = ref([]); // 用于存储原图

// 处理图片
const processImage = async (file) => {
  const img = new Image();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onerror = (error) => {
      // 添加图片加载失败处理
      reject(error);
    };

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (watermarkText.value) {
        ctx.font = `${watermarkSize.value}px ${watermarkFont.value}`;
        ctx.fillStyle = "rgba(128, 128, 128, 0.8)";
        ctx.textAlign = "center";
        if (watermarkPosition.value.includes("left")) {
          ctx.textAlign = "left";
        } else if (watermarkPosition.value.includes("right")) {
          // 修正: 判断 right
          ctx.textAlign = "right";
        }
        ctx.textBaseline = "middle";

        // 默认居中
        let x = canvas.width / 2;
        let y = canvas.height / 2;

        // const textWidth = ctx.measureText(watermarkText.value).width;
        // console.log(textWidth);
        if (watermarkPosition.value === "top-left") {
          x = 10;
          y = watermarkSize.value;
        } else if (watermarkPosition.value === "top-right") {
          x = canvas.width - 10; // 右对齐，需要减去文字宽度和一些边距
          y = watermarkSize.value;
        } else if (watermarkPosition.value === "bottom-left") {
          x = 10;
          y = canvas.height - watermarkSize.value; // 下对齐，需要减去文字大小和一些边距
        } else if (watermarkPosition.value === "bottom-right") {
          x = canvas.width - 10; // 右下对齐
          y = canvas.height - watermarkSize.value; // 右下对齐
        }
        // console.log(x, y);
        // console.log(canvas.width, canvas.height);

        ctx.fillText(watermarkText.value, x, y);
      }

      const thumbCanvas = document.createElement("canvas");
      const thumbCtx = thumbCanvas.getContext("2d");
      const maxWidth = 250,
        maxHeight = 200;
      let width = img.width,
        height = img.height;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = width * ratio;
        height = height * ratio;
      }

      thumbCanvas.width = width;
      thumbCanvas.height = height;
      thumbCtx.drawImage(canvas, 0, 0, width, height);

      resolve({
        original: canvas.toDataURL(file.type),
        thumbnail: thumbCanvas.toDataURL(),
        name: file.name,
      });
    };

    reader.readAsDataURL(file);
  });
};

// 处理文件选择
const handleFileSelect = async (e) => {
  const files = Array.from(e.target.files);
  await processFiles(files);
  if (files && files.length > 0) {
    originalImages.value = files; // 存储 File 对象，而不是 URL
  }
};

// 处理拖放文件
const handleDrop = async (e) => {
  dragOver.value = false;
  const files = Array.from(e.dataTransfer.files);
  await processFiles(files);
  originalImages.value = files; // 存储 File 对象，而不是 URL
};

// 统一处理文件
const processFiles = async (files) => {
  processing.value = true;
  totalFiles.value = files.length;
  processedCount.value = 0;

  const processingPromises = files.map(async (file) => {
    // 使用 map 创建 Promise 数组
    if (!file.type.startsWith("image/")) return;
    try {
      const result = await processImage(file);
      processedImages.value.push(result); // 直接 push 到响应式数组
    } catch (error) {
      console.error("图片处理失败:", error, file.name); // 打印文件名以便调试
      // 可以选择是否继续处理其他图片，这里选择继续
    } finally {
      processedCount.value++; // 无论成功失败都增加计数
    }
  });

  await Promise.all(processingPromises); // 并行处理所有图片
  processing.value = false;
};

// Reprocess Images: Reapply watermark to previously processed images
const reprocessImages = async () => {
  processedImages.value = []; // 清空之前处理的图片
  await processFiles(originalImages.value); // 重新处理原图 File 对象
};

// 下载图片
const downloadImage = (image) => {
  const link = document.createElement("a");
  link.href = image.original;
  link.download = `watermark_${image.name}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 删除图片
const removeImage = (index) => {
  processedImages.value.splice(index, 1);
};

// 全部删除
const deleteAll = () => {
  processedImages.value = [];
  originalImages.value = [];
};

// 全部下载
const downloadAll = () => {
  processedImages.value.forEach((image) => downloadImage(image));
};

// 预览图片
const previewImage = (image) => {
  previewImageData.value = image;
};
</script>

<style scoped>
/* 图片hover 预览层 */
.preview-overlay {
  opacity: 0; /* 初始状态隐藏 */
  transition: opacity 0.3s ease; /* 添加过渡效果 */
}

.group:hover .preview-overlay {
  opacity: 1; /* hover 时显示 */
}

img {
  cursor: pointer;
}

option {
  color: black;
}
</style>
