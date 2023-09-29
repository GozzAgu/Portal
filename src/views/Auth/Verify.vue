<template>
    <div class="background h-screen flex items-center justify-center bg-slate-50">
      <div class="flex text-center">
        <div class="p-24 bg-slate-100 shadow-sm rounded-md">
          <h1 class="font-semibold text-3xl text-center mb-2 text-gray-700">Verification</h1>
          <h1 class="font-semibold w-full text-md text-center mb-8 mt-4 text-gray-500">Password reset link has been sent to your email</h1>
          <i class="ri-checkbox-circle-fill text-green-400 text-8xl mt-8"></i>
          <el-button type="primary" class="text-blue-50 rounded-lg w-full mt-8 p-4 bg-blue-400">Back</el-button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.background {
  background-image: linear-gradient(rgba(0, 0, 0, 0.623), rgba(0, 0, 0, 0.527)), url("../../assets/AuthBackground.jpg");
  background-size: cover;
}
</style>
  