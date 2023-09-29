<template>
    <div class="pl-24 pr-24 mt-10">
        <div class="flex justify-between p-5 pl-24 pr-24 bg-white rounded-md gap-x-6">
            <h1 class="text-3xl text-slate-500 font-bold">{{ props.navName }}</h1>

            <div class="flex gap-x-5">
                <div v-if="activeTab === 'Products'" class="statistic-card mt-1 pt-1 pb-1 pl-3 pr-3 shadow-sm">
                    <span class="text-lg text-slate-500 font-medium"> {{ props.productList }} </span>
                    <span class="text-sm ml-2 text-slate-500">{{ totalProductsText }}</span>
                </div>

                <div v-else class="statistic-card mt-1 pt-1 pb-1 pl-3 pr-3 shadow-sm">
                    <span class="text-lg text-slate-500 font-medium"> {{ props.serviceList }} </span>
                    <span class="text-sm ml-2 text-slate-500">{{ totalServicesText }}</span>
                </div>
                
                <div class="statistic-card mt-1 pt-1 pb-1 pl-3 pr-3 shadow-sm">
                    <span class="text-lg text-slate-500 font-medium"> {{ props.clientList }} </span>
                    <span class="text-sm ml-2 text-slate-500">{{ totalCLientsText }}</span>
                </div>
                    <!-- <el-dropdown>
                        <el-avatar :size="40" :src="circleUrl" />
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>Profile</el-dropdown-item>
                                <el-dropdown-item>Settings</el-dropdown-item>
                                <el-dropdown-item divided>Logout</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown> -->
                </div>
            </div> 
        </div>
</template>

<script setup lang="ts">
// import { reactive, toRefs } from 'vue'

const props = defineProps({
    navName: String,
    productList: Number,
    serviceList: Number,
    activeTab: String,
    clientList: Number,
    totalProductsText: String,
    totalServicesText: String,
    totalCLientsText: String
})


// const state = reactive({
//   circleUrl:
//     'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
// })

// const { circleUrl } = toRefs(state)
</script>

<style scoped>

</style>
  