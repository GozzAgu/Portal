<template>
  <div class="flex h-screen">
    <el-menu
      default-active=""
      class="bg-slate-300"
    >
      <div class="text-center h-20">
        <img class="w-20 h-20" src="../assets//CCL logo.jpg" />
      </div>

      <div class="mt-12">
        <slot name="sidenav">

        </slot>

        <router-link class="fixed bottom-20 left-5" to="">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="Logout"
            placement="right-start"
          >
            <Icon 
              icon="solar:power-broken"
              width="40"
            />
          </el-tooltip>
        </router-link>
      </div>
    </el-menu>
  </div>
</template>
  
<script setup lang="ts">  
import { Icon } from '@iconify/vue';

</script>

<style scoped>

</style>
  