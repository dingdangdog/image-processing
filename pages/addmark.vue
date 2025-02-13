<template>
  <Head>
    <Title>添加水印 - 老狗图片工厂</Title>
  </Head>
  <div class="p-4 max-w-3xl mx-auto">
    <h1 class="text-2xl font-bold mb-4 text-center">水印工具</h1>

    <div class="mb-4">
      <label for="watermark-text" class="block font-medium">水印文字</label>
      <input
        id="watermark-text"
        v-model="watermarkText"
        type="text"
        class="mt-1 p-2 block w-full rounded-md bg-gray-100/80 text-black border-2 border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-indigo-500 duration-200 ease-in-out"
      />
    </div>

    <div class="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label for="watermark-size" class="block font-medium"
          >水印文字大小(px)</label
        >
        <input
          id="watermark-size"
          v-model.number="watermarkSize"
          type="number"
          min="10"
          max="100"
          step="1"
          class="mt-1 p-2 block w-full rounded-md bg-gray-700 text-gray-100 shadow-sm outline-none border-2 border-gray-500 focus:border-blue-500 focus:ring-indigo-500 duration-200 ease-in-out"
        />
      </div>
      <div>
        <label for="watermark-position" class="block font-medium"
          >水印位置</label
        >
        <select
          id="watermark-position"
          v-model="watermarkPosition"
          class="mt-1 p-2 block w-full rounded-md bg-gray-700 text-gray-100 shadow-sm outline-none border-2 border-gray-500 focus:border-blue-500 focus:ring-indigo-500 duration-200 ease-in-out"
        >
          <option value="center">居中</option>
          <option value="top-left">左上</option>
          <option value="top-right">右上</option>
          <option value="bottom-left">左下</option>
          <option value="bottom-right">右下</option>
        </select>
      </div>
      <div>
        <label for="watermark-font" class="block font-medium">水印字体</label>
        <select
          id="watermark-font"
          v-model="watermarkFont"
          class="mt-1 p-2 block w-full rounded-md bg-gray-700 text-gray-100 shadow-sm outline-none border-2 border-gray-500 focus:border-blue-500 focus:ring-indigo-500 duration-200 ease-in-out"
        >
          <option value="SmileySans-Oblique">SmileySans-Oblique</option>
          <option value="Arial">Arial</option>
          <option value="Courier">Courier</option>
        </select>
      </div>
    </div>

    <div class="mb-4">
      <button
        @click="reprocessImages"
        :disabled="processing || processedImages.length === 0"
        class="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none w-full duration-300 ease-in-out"
        :class="{
          'hover:bg-blue-500': processedImages.length > 0,
          'hover:bg-red-300': processedImages.length === 0,
        }"
      >
        重新处理图片
      </button>
    </div>

    <div
      @dragover.prevent="dragOver = true"
      @dragleave="dragOver = false"
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
      class="mt-4 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 duration-300 ease-in-out"
      :class="{
        'border-blue-500 bg-blue-50': dragOver,
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
            class="text-blue-500 hover:text-blue-400 font-medium focus:outline-none"
          >
            选择文件
          </button>
        </p>
        <p class="text-sm mt-2">支持 JPEG、PNG、WEBP 等图片格式</p>
      </div>
    </div>

    <div v-if="processedImages.length > 0" class="mt-4 flex space-x-4">
      <button
        @click="deleteAll"
        class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg focus:outline-none w-full"
      >
        删除全部
      </button>
      <button
        @click="downloadAll"
        class="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md focus:outline-none w-full"
      >
        下载全部
      </button>
    </div>

    <div v-if="processing" class="mt-4 text-center text-gray-600">
      处理中... ({{ processedCount }}/{{ totalFiles }})
    </div>

    <div v-if="processedImages.length > 0" class="mt-6">
      <h3 class="text-lg font-medium mb-4">已处理图片</h3>
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="(image, index) in processedImages"
          :key="index"
          class="relative group rounded-md bg-gray-500/50 shadow-md shadow-gray-500 overflow-hidden cursor-pointer"
        >
          <img
            :src="image.thumbnail"
            class="w-full h-32 object-contain"
            @click="previewImage(image)"
            alt="已处理图片缩略图"
          />
          <div
            class="preview-overlay absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            @click.stop="previewImage(image)"
          >
            <button
              @click.stop="previewImage(image)"
              class="text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded-md focus:outline-none"
            >
              <IconFullscreen class="w-6 h-6" color="rgb(243 244 246)" />
            </button>
            <div class="absolute bottom-1 right-1 flex space-x-2 justify-start">
              <button
                @click.stop="removeImage(index)"
                class="text-sm text-white bg-red-500 hover:bg-red-600 px-2 py-1 flex justify-center items-center rounded-full focus:outline-none"
              >
                <IconDelete class="w-4 h-4" color="rgb(243 244 246)" />
              </button>
              <button
                @click.stop="downloadImage(image)"
                class="text-sm text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 flex justify-center items-center rounded-full focus:outline-none"
              >
                <IconDownload class="w-4 h-4" color="rgb(243 244 246)" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

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
          alt="fullscreen-overview-image"
        />
        <button
          @click="previewImageData = null"
          class="text-white bg-red-600/40 hover:bg-red-700/40 px-2 py-1 rounded-lg focus:outline-none absolute top-2 right-2"
        >
          <IconClose class="w-6 h-6" color="rgb(243 244 246)" />
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
</style>
