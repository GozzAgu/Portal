<template>
    <div class="pl-8 pr-8">
        <div class="pb-8 flex justify-between">
            <h1 class="text-3xl flex">
                <Icon 
                    icon="solar:user-minus-bold-duotone"
                    width="30"
                    class="text-blue-300 mt-1 mr-3"
                />
                <p class="text-blue-500">Client Details</p>
            </h1>
            <Icon 
                @click="editMode"
                icon="solar:pen-new-square-line-duotone"
                width="25"
                class="text-blue-500 mt-1 mr-3 cursor-pointer hover:text-blue-300"
            />
        </div>

        <div>
            <div class="bg-orange-50 p-3 rounded-md flex">
                <Icon 
                    icon="solar:shield-warning-line-duotone"
                    width="25"
                    class="text-orange-600 mt-1 mr-3"
                />
                <p class="text-slate-600 text-xs">When a Client is on edit mode, the products and services can also be updated</p>
            </div>

            <div class="mt-8 mb-8">
                <el-divider content-position="left"> 
                    <span class="text-lg font-semibold text-slate-500"> Client Info </span>
                </el-divider>
            </div>

            <div>
                <div class="mt-4">
                    <label class="text-gray-500 text-sm font-medium">Client Name</label>
                    <el-input :disabled="isDisabled" size="large" v-model="clientData!.username" placeholder="Please input name" />
                </div>
                <div class="mt-4">
                    <label class="text-gray-500 text-sm font-medium">Email</label>
                    <el-input :disabled="isDisabled" size="large" v-model="clientData!.email" placeholder="Input client email" />
                </div>
                <div class="mt-4">
                    <label class="text-gray-500 text-sm font-medium">Date created</label>
                    <el-input disabled size="large" v-model="clientData!.created_at"/>
                </div>
            </div>

            <div class="mt-12">
                    <el-divider content-position="left"> 
                        <span class="text-lg font-semibold text-slate-500"> Offers </span>
                    </el-divider>
                </div>
                
                <div class="mt-8 flex gap-x-4">
                    <el-select multiple v-model="products" clearable placeholder="Products" size="large">
                        <el-option
                            v-for="product in store.products"
                            :key="product"
                            :label="product.name"
                            :value="product.id"
                        />
                    </el-select>
                    <el-select multiple v-model="services" clearable placeholder="Services" size="large">
                        <el-option
                            v-for="service in store.services"
                            :key="service"
                            :label="service.name"
                            :value="service.id"
                        />
                    </el-select>
                </div>
        </div>
        <div class="fixed bottom-16 right-16">
            <div class="flex gap-x-3">
                <el-button @click="emit('close-drawer')">cancel</el-button>
                <Button @button-clicked="emit('edit-client')"  buttonText="Confirm"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue';
import Button from '../Button.vue';
import { useStore } from '../../store/store.ts';

const store = useStore();

onMounted(() => {
    store.getProducts();
    store.getServices();
});

const products = ref('');
const services = ref('');

const isDisabled = ref(true);
const { clientData } = defineProps({
    clientData: Object
});

const editMode = () => {
    isDisabled.value = false;
}

const emit = defineEmits(['edit-client', 'close-drawer']);

</script>