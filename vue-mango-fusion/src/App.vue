<style scoped></style>

<template>
  <div class="d-flex flex-column py-2 min-vh-100 container-md">
    <Header></Header>
    <main class="flex-grow-1 mx-lg-auto w-100">
      <router-view></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup>
  import Header from './components/layout/Header.vue';
  import Footer from './components/layout/Footer.vue';
</script>