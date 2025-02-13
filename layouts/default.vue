<template>
  <div>
    <AppHeader />
    <main
      class="min-h-screen bg-gradient-to-r from-purple-600 via-blue-500 to-teal-400 pt-16"
    >
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts"></script>
