<template>
    <div class="background h-screen flex items-center justify-center bg-slate-50">
      <div class="flex">
        <div class="p-24 bg-slate-100 shadow-sm rounded-md">
          <h1 class="font-semibold text-3xl text-center mb-2 text-gray-700">Forgot Password</h1>
          <h1 class="font-semibold text-md text-center mb-2 mt-4 text-gray-500">Input your email to send password reset link</h1>
  
          <div>
            <div class="mt-5">
              <el-input class="w-full bg-transparent focus:outline-none focus:border-sky-200" v-model="email" placeholder="user@email.com" clearable />
            </div>
          </div>
          <el-button type="primary" class="text-blue-50 rounded-lg w-full mt-8 p-4 bg-blue-400">Send</el-button>
        </div>
  
      </div>
    </div>
</template>

<script setup lang="ts">          
import { ref } from 'vue';

const email = ref('')

</script>

<style scoped>
.background {
  background-image: linear-gradient(rgba(0, 0, 0, 0.623), rgba(0, 0, 0, 0.527)), url("../../assets/AuthBackground.jpg");
  background-size: cover;
}
</style>
  