<template>
  <div class="background h-screen flex items-center justify-center bg-slate-50">
    <div class="flex">
      <div class="p-24 bg-slate-100 shadow-sm rounded-md">
        <h1 class="font-semibold text-3xl text-center mb-2 text-gray-700">Sign In</h1>
        <h1 class="font-semibold text-md text-center mb-2 mt-4 text-gray-500">Input with your credentials to sign-in your account.</h1>

        <div>
          <div class="mt-5">
              <label class="text-gray-500 text-sm">Email</label>
              <el-input class="w-full bg-transparent focus:outline-none focus:border-sky-200" v-model="email" placeholder="user@email.com" clearable />
          </div>

          <div class="mt-5">
              <label class="text-gray-500 text-sm">password</label>
              <el-input
                class="w-full bg-transparent focus:outline-none focus:border-sky-200"
                v-model="password"
                type="password"
                placeholder="********"
                show-password
              />
          </div>
          
          <div class="flex justify-between mt-5">
            <div class="flex gap-x-1">
              <input class="mt-2" type="checkbox"/>
              <p class="text-slate-400 text-sm mt-2">Remember me</p>
            </div>
            <p class="text-slate-400 text-sm">Forgot password</p>
          </div>

        </div>
        <el-button type="primary" class="text-blue-50 rounded-lg w-full mt-8 p-4 bg-blue-400">Sign In</el-button>
        <p class="mt-5 text-center text-gray-500">Don't have an account? <span class="text-blue-700">Sign up</span></p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

</script>

<style scoped>
.background {
  background-image: linear-gradient(rgba(0, 0, 0, 0.623), rgba(0, 0, 0, 0.527)), url("../../assets/AuthBackground.jpg");
  background-size: cover;
}
</style>
