<template>
    <div class="flex">
        <div>
            <Sidenav>
                <template #sidenav>
                    <router-link to="/dashboard">
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
                    <router-link to="/clients">
                        <el-tooltip
                            class="box-item"
                            effect="dark"
                            content="Clients"
                            placement="right-start"
                        >
                            <el-menu-item class="bg-transparent hover:bg-slate-400" index="2">
                                <Icon 
                                icon="ph:users-duotone"
                                width="35"
                            />
                            </el-menu-item>
                        </el-tooltip>
                    </router-link>
                </template>
            </Sidenav>
        </div>

        <div class="body border w-full pr-40 pl-40">
            <el-drawer 
                class="client-add-drawer"
                v-model="addClientDrawer"
            >
                <AddClientDrawer :title="title" v-if="showAddClient" @add-client="addClient"/>
            </el-drawer>
            <Topnav :navName="'Admin Portal'" :clientList="store.clients.length" :totalCLientsText="'Clients'"/>
            <div class="mt-12">
                <div class="flex justify-between mt-12 ml-4 mr-4 mb-3 pr-20 pl-20">
                    <div class="w-[28%] h-[40em]">
                        <el-card class="justify-center items-center w-full rounded-lg h-full" shadow="none"> 
                            <template #header>
                                <div class="card-header flex justify-between">
                                    <router-link to="/dashboard">
                                        <Icon
                                            icon="ph:arrow-circle-left-duotone"
                                            width="30"
                                            class="text-slate-500 mt-1 cursor-pointer hover:text-blue-300"
                                        />
                                    </router-link>
                                    <span class="text-lg text-slate-700">Service Info</span>
                                    <Icon 
                                        @click="editMode"
                                        icon="solar:pen-new-square-line-duotone"
                                        width="25"
                                        class="text-blue-500 mt-1 mr-3 cursor-pointer hover:text-blue-300"
                                    />
                                </div>
                            </template>
                            <div>
                                <el-form
                                    :labelPosition="labelPosition"
                                    :model="editServiceData"
                                    style="max-width: 460px"
                                >
                                <div class="bg-slate-50 flex gap-x-2 shadow-sm p-4 rounded-md h-[13em]">
                                        <img class="w-30 h-[6em]" src="../../../assets/CCL logo.jpg"/>
                                        <div>
                                            <div class="w-[100%]">
                                                <span class="font-bold text-xl">{{ service?.name }}</span>
                                            </div>
                                            <span class="text-sm text-slate-500">{{ service?.description }}</span>
                                        </div>
                                    </div>
                                    <el-form-item label="Name" class="mt-4">
                                        <el-input :disabled="isDisabled" v-model="editServiceData.name" />
                                    </el-form-item>
                                    <el-form-item label="Description" class="mt-2">
                                        <el-input type="textarea" :disabled="isDisabled" v-model="editServiceData.description" />
                                    </el-form-item>
                                    <el-form-item label="Created at" class="mt-2">
                                        <el-input disabled v-model="editServiceData.created_at" />
                                    </el-form-item>
                                    <div class="flex gap-x-4 mt-8">
                                        <Button class="" @click="saveEdit" buttonText="Update"/>
                                        <Icon v-if="loading"
                                            class="mt-2 text-blue-400"
                                            icon="svg-spinners:gooey-balls-1"
                                            width="20"
                                        />
                                    </div>
                                </el-form>  
                            </div>
                        </el-card>
                    </div>

                    <div class="w-[70%] h-[40em]">
                        <el-scrollbar>
                            <el-card class="w-full rounded-lg h-[40em]" shadow="none"> 
                                <template #header>
                                    <div class="card-header flex justify-between">
                                        <span class="text-lg text-slate-700">Clients</span>
                                        <div class="flex gap-x-4">
                                            <Button @click="showAddClientDrawer" buttonText="Add Client"/>
                                            <Icon v-if="loading"
                                                class="mt-2 text-blue-400"
                                                icon="svg-spinners:gooey-balls-1"
                                                width="20"
                                            />
                                        </div>
                                    </div>
                                </template>
                                <div>
                                    <el-table class="flex justify-center" :data="store.clients" style="width: 100%">
                                        <el-table-column prop="img" width="70">
                                            <template #default>
                                                <img class="image" src="../../../assets/Shell_logo.svg.png"/>
                                            </template>
                                        </el-table-column>
                                        <el-table-column prop="username" label="NAME" width="200" />
                                        <el-table-column prop="email" label="EMAIL" width="300" />
                                        <el-table-column prop="created_at" label="Date of creation" width="200" />
                                        <el-table-column align="right" fixed="right" label="" width="100">
                                            <template #default>
                                                <el-tooltip
                                                    class="box-item"
                                                    effect="dark"
                                                    content="Renew Subscription"
                                                    placement="left-start"
                                                >
                                                    <el-button class="renew">
                                                        <p>Renew</p>
                                                    </el-button>
                                                </el-tooltip>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-card>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import Sidenav from '../../../components/Sidenav.vue';
import Topnav from '../../../components/Topnav.vue';
import { Icon } from '@iconify/vue';
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from '../../../store/store.ts';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import Button from '../../../components/Button.vue';
import { ElMessage } from 'element-plus';
import AddClientDrawer from '../../../components/Drawers/AddClientDrawer.vue';

const loading = ref(false);
const route = useRoute();
const store = useStore();
const { services } = storeToRefs(store)
const labelPosition = ref('top');
const isDisabled = ref(true);
const showAddClient = ref(false);
const addClientDrawer = ref(false);
const title = ref('Add Client');

const showAddClientDrawer = () => {
    addClientDrawer.value = true;
    showAddClient.value = true;
};

onMounted(() => {
    store.getServices();
    store.getClients();
});

const editMode = () => {
    ElMessage({
        showClose: true,
        message: 'Edit mode is active!',
        type: 'success',
    });
    isDisabled.value = false;
}

const servID = computed(() => {
    return route.params.id as any
});

const service = computed(() => {
    return services.value.find(s => s.id == servID.value);
});

const addClient = (newClient:any) => {
    store.addClient(newClient);
    addClientDrawer.value = false;
    showAddClient.value = false;
}

const editServiceData = ref(
    {
        id: service?.value?.id,
        name: service?.value?.name,
        description: service?.value?.description,
        created_at: service?.value?.created_at,
    }
);

watch(services, ()=>{
    editServiceData.value = {
        id: service?.value?.id,
        name: service?.value?.name,
        description: service?.value?.description,
        created_at: service?.value?.created_at,
    }
});

const saveEdit = async () => {
    loading.value = true;
    const idx = services.value.findIndex((s) => s.id == service.value?.id);
    await store.editService(idx, editServiceData.value);
    ElMessage({
        showClose: true,
        message: 'Service Edited successfully!',
        type: 'success',
    })
    loading.value = false;
    console.log(editServiceData.value);
};

</script>

<style scoped>
::v-deep(.search-input .el-input__wrapper){
    border-radius: 0.7em;
}
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
</style>
  