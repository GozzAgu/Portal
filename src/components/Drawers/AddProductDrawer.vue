<template>
    <div class="p-5">
        <div class="pb-8 flex justify-between">
            <h1 class="text-3xl flex">
                <Icon 
                    icon="solar:user-minus-bold-duotone"
                    width="30"
                    class="text-blue-300 mt-1 mr-3"
                />
                <p class="text-blue-500">Product Details</p>
            </h1>
        </div>
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
                <span class="text-lg font-semibold text-slate-500"> Product Info </span>
            </el-divider>
        </div>

        <div class="container">
            <div class="button-wrap">
                <label class="button border border-slate-400" for="upload">
                    <Icon 
                        icon="ph:plus-light"
                        width="40"
                        class="text-blue-100 mt-1"
                    />
                </label>
                <input class="hidden" id="upload" type="file" @change="pickFile" accept="image/*">
            </div>
        </div>

        <div v-if="newProduct.img">
            <img class="w-20" :src="getObjectImageUrl"/>
        </div>

        <div>
            <div class="mt-4">
                <label class="text-gray-500 text-sm font-medium">Product Name</label>
                <el-input :class="{'error-border': !error.isValidateName}" size="large" v-model="newProduct.name" placeholder="Please input name" />
                <span v-if="error.isValidateName == false" class="text-xs text-red-500">* Enter valid name</span>
            </div>
            <div class="mt-4">
                <label class="text-gray-500 text-sm font-medium">Description</label>
                <el-input type="textarea" :class="{'error-border': !error.isValidateName}" size="large" v-model="newProduct.description" placeholder="What is the product description ?" />
                <span v-if="error.isValidateName == false" class="text-xs text-red-500">* Enter valid description</span>
            </div>
            <div class="mt-4">
                <label class="text-gray-500 text-sm font-medium">Create at</label>
                <el-input disabled size="large" v-model="newProduct.created_at" placeholder="Date of creation" />
            </div>
        </div>
        <div class="fixed bottom-16 right-16">
            <div class="flex gap-x-3">
                <el-button @click="emit('close-drawer')">cancel</el-button>
                <Button @click="addNewProduct" buttonText="Confirm"/>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Button from '../Button.vue';
import { Icon } from '@iconify/vue';
import dayjs from 'dayjs';

const date = dayjs().format('DD/MM/YYYY, HH:mm:ss A');
const emit = defineEmits(['add-product', 'close-drawer']);
let imgFile = ref<Blob|MediaSource>();

const newProduct = ref({
    id: '',
    name: '',
    description: '',
    created_at: date,
    img: ''
});

const error = ref({
    isValidateName: true,
    isValidateEmail: true,
});

const addNewProduct = () => {
    if(newProduct.value.name){
        error.value.isValidateName = true;
    }else {
        error.value.isValidateName = false;
        console.log('no name');
    }

    if(newProduct.value.description){
        error.value.isValidateEmail = true;
    }else {
        error.value.isValidateEmail = false;
        console.log('no email');
    }

    if(newProduct.value.name && newProduct.value.description){
        emit('add-product', newProduct.value);
        emit('close-drawer');
    }
}

const getObjectImageUrl = computed(() => {
    if(newProduct.value.img) {
        return newProduct.value.img;
    }
    return null;
});

const pickFile = (event:any) => {
    imgFile.value = event.target.files[0];
    newProduct.value.img = URL.createObjectURL(imgFile.value!);
}
</script>

<style scoped>
.error-border {
    border: 1px solid red;
    border-radius: 3px;
}

:deep(.error-border > .el-input__wrapper.is-focus) {
    box-shadow: none;
}
</style>