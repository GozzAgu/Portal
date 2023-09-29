<template>
    <div class="flex">
        <div>
            <Sidenav>
                <template #sidenav>
                    <router-link to="/clientdashboard">
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="Offers"
                            placement="right-start"
                        >
                            <el-menu-item class="bg-transparent hover:bg-slate-400">
                                <Icon 
                                    icon="ph:house-line-duotone"
                                    width="35"
                                />
                            </el-menu-item>
                        </el-tooltip>
                    </router-link>
                </template>
            </Sidenav>
        </div>
        
        <div class="w-full pr-40 pl-40">
            <Topnav 
                :navName="'Client Portal'"
                :productList="store.licensedProducts.length" 
                :serviceList="store.licensedServices.length" 
                :activeTab="activeName"
                :total-products-text="'Total Products'" 
                :total-services-text="'Total Services'" 
            />

            <div class="mt-4">
                <div class="flex justify-between ml-4 mr-4 pr-20 pl-20">
                    <div class="w-[35%] h-40">
                        <el-card class="welcome-card flex justify-center items-center w-full rounded-lg h-full" shadow="none"> 
                            <div>
                                <p class="text-center text-lg font-semibold text-blue-400 mb-1">Welcome,</p>
                                <p class="mt-6 text-center text-3xl font-black text-blue-400 h-10 mb-1">Olakunle Olatunji</p>
                            </div>
                        </el-card>
                    </div>

                    <div class="w-[60%] h-40 flex gap-x-4">
                        <el-card class="w-full rounded-lg h-full" shadow="none"> 
                            <div class="flex justify-between">
                                <h1 class="text-slate-500 font-semibold mb-3"> Active Plans </h1>
                                <i class="ri-checkbox-circle-fill text-green-300 text-xl"></i>
                            </div>

                            <div class="flex">
                                <div class="flex m-auto">
                                    <p class="font-semibold text-slate-500 text-7xl">{{ licensed }}</p> 
                                </div>                               
                            </div>
                        </el-card>

                        <el-card class="w-full rounded-lg h-full" shadow="none"> 
                            <div class="flex justify-between">
                                <h1 class="text-slate-500 font-semibold mb-2"> Recent Plans </h1>
                                <i class="ri-notification-2-fill text-orange-300 text-xl"></i>
                            </div>


                            <el-carousel
                                height="90px"
                                direction="vertical"
                                type="card"
                                :autoplay="true"
                                indicator-position="none"
                            >
                                <el-carousel-item v-for="licensedProduct in store.licensedProducts.slice(0, 2)" :key="licensedProduct.id">
                                    <p class="font-semibold text-sm flex justify-center mt-3">{{ licensedProduct.name }}</p>  
                                </el-carousel-item>
                            </el-carousel>
                        </el-card>

                        <el-card class="w-full rounded-lg h-full" shadow="none"> 
                            <div class="flex justify-between">
                                <h1 class="text-slate-500 font-semibold mb-3"> Overdue Plans </h1>
                                <i class="ri-error-warning-fill text-slate-400 text-xl"></i>
                            </div>

                            <div class="flex">
                                <div class="flex m-auto">                          
                                    <p class="font-semibold text-red-400 text-7xl">{{ licensed }}</p> 
                                </div>                               
                            </div>
                        </el-card>
                    </div>
                </div>
            </div>

            <div class="mt-4">
                <div class="flex justify-between ml-6 mr-6 mb-3 pr-20 pl-20">
                    <h1 class="text-2xl text-slate-500 font-semibold"><i class="ri-rss-fill"></i> Plans </h1>
                </div>

                <div class="pl-24 pr-24">
                    <el-tabs v-model="activeName" type="border-card" class="demo-tabs rounded-lg">
                        <el-tab-pane class="h-[25em] pb-5" label="Products" name="Products"> 
                            <el-scrollbar class="h-[25em]">
                                <el-table class="flex justify-center scrollbar-demo-item" :data="store.licensedProducts" style="width: 100%">
                                    <el-table-column prop="id" label="ID" width="50" />
                                    <el-table-column prop="img" width="70">
                                        <template #default>
                                            <img src="../../assets/CCL logo.jpg"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" label="NAME" width="200" />
                                    <el-table-column prop="description" label="DESCRIPTION" width="500" />
                                    <el-table-column prop="created_at" label="CREATED AT" width="200" />
                                    <el-table-column align="right" fixed="right" label="" width="200">
                                        <template #default>
                                            <el-tooltip
                                                class="box-item"
                                                effect="dark"
                                                content="Renew"
                                                placement="right-start"
                                            >
                                                <el-button class="renew">
                                                    Renew Plan
                                                </el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-scrollbar>
                        </el-tab-pane>

                        <el-tab-pane class="h-[25em] pb-5" label="Services">
                            <el-scrollbar class="h-[25em]">
                                <el-table class="flex justify-center scrollbar-demo-item" :data="store.licensedServices" style="width: 100%">
                                    <el-table-column prop="id" label="ID" width="50" />
                                    <el-table-column prop="img" width="70">
                                        <template #default>
                                            <img class="image" src="../../assets/CCL logo.jpg"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" label="NAME" width="200" />
                                    <el-table-column prop="description" label="DESCRIPTION" width="500" />
                                    <el-table-column prop="created_at" label="CREATED AT" width="200" />
                                    <el-table-column align="right" fixed="right" label="" width="200">
                                        <template #default>
                                            <el-tooltip
                                                class="box-item"
                                                effect="dark"
                                                content="Renew"
                                                placement="right-start"
                                            >
                                                <el-button class="renew">
                                                    Renew Plan
                                                </el-button>
                                            </el-tooltip>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-scrollbar>
                        </el-tab-pane> 
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Sidenav from '../../components/Sidenav.vue';
import Topnav from '../../components/Topnav.vue';
import { useStore } from '../../store/store';
import { ref, onMounted, computed } from 'vue';
import { Icon } from '@iconify/vue';

const store = useStore();
const activeName = ref('Products');

const licensed = computed(() => {
    return store.licensedProducts.length + store.licensedServices.length
});

onMounted(() => {
    store.getLicensedProducts();
    store.getLicensedServices();
});

</script>

<style scoped>
button.renew{
    background-color: rgb(252, 244, 227);
    border: none;
    color: rgb(255, 189, 67);
}

button.renew:hover{
    background-color: rgb(250, 209, 134);
    border: none;
    color: rgb(255, 250, 239)
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
  color: #eef3fa;
  border-radius: 5px;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
  color: #475669;
  border-radius: 5px;
}

.welcome-card {
    background-color: #e5e5f7;
    opacity: 0.8;
    background-image: radial-gradient(#444cf7 0.5px, #e5e5f7 0.5px);
    background-size: 10px 10px;
    background-color: #e5e5f7;
    background-image:  
        repeating-radial-gradient( circle at 0 0, transparent 0, rgb(244, 248, 255) 10px ), 
        repeating-linear-gradient( rgb(237, 244, 255), rgb(244, 248, 255) );
} 
</style>