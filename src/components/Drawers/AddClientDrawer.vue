<template>
    <div class="pl-8 pr-8">
        <div class="pb-8">
            <h1 class="text-3xl flex">
                <Icon 
                    icon="solar:user-plus-rounded-bold-duotone"
                    width="30"
                    class="text-blue-300 mt-1 mr-3"
                />
                <p class="text-blue-500">{{ title }}</p>
            </h1>
        </div>

        <div>
            <div class="bg-orange-50 p-3 rounded-md flex">
                <Icon 
                    icon="solar:shield-warning-line-duotone"
                    width="25"
                    class="text-orange-600 mt-1 mr-3"
                />
                <p class="text-slate-600 text-xs">
                    When a Client is created, you can proceed to add more products and services to the client
                </p>
            </div>

            <div class="mt-8 mb-8">
                <el-divider content-position="left"> 
                    <span class="text-lg font-semibold text-slate-500"> Client Info </span>
                </el-divider>
            
                <div>
                    <div class="mt-4">
                        <label class="text-gray-500 text-sm font-medium">Client Name</label>
                        <el-input  
                            :class="{'error-border': !error.isValidateName}" 
                            size="large" v-model="newClient.username" 
                            placeholder="Please input name" 
                        />
                        <span v-if="error.isValidateName == false" class="text-xs text-red-500">* Enter valid name</span>
                    </div>
                    <div class="mt-4">
                        <label class="text-gray-500 text-sm font-medium">Email</label>
                        <el-input 
                            :class="{'error-border': !error.isValidateEmail}" 
                            size="large" v-model="newClient.email" 
                            placeholder="Please input email" 
                        />
                        <span v-if="error.isValidateEmail == false" class="text-xs text-red-500">* Enter valid email</span>
                    </div>
                    <div class="mt-4">
                        <label class="text-gray-500 text-sm font-medium">Date created</label>
                        <el-input size="large" disabled v-model="newClient.created_at" placeholder="Date of creation" />
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed bottom-16 right-16">
            <div class="flex gap-x-3">
                <el-button @click="emit('close-drawer')">cancel</el-button>
                <Button @button-clicked="addNewClient" buttonText="Confirm"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useStore } from '../../store/store.ts';
import Button from '../Button.vue';
import dayjs from 'dayjs';

const date = dayjs().format('YYYY-MM-DD, HH:mm:ss A');
const store = useStore();
const emit = defineEmits(['add-client', 'close-drawer']);
const { title } = defineProps({
    title: String
})

onMounted(() => {
    store.getProducts();
    store.getServices();
    console.log(date);
});

const newClient = ref({
    id: '',
    username: '',
    email: '',
    created_at: date,
    products: '',
    services: '',
});

const error = ref({
    isValidateName: true,
    isValidateEmail: true,
})

const addNewClient = () => {
    if(newClient.value.username){
        error.value.isValidateName = true;
    }else {
        error.value.isValidateName = false;
        console.log('no name');
    }

    if(newClient.value.email){
        error.value.isValidateEmail = true;
    }else {
        error.value.isValidateEmail = false;
        console.log('no email');
    }

    if(newClient.value.username && newClient.value.email){
        emit('add-client', newClient.value);
        emit('close-drawer');
    }
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