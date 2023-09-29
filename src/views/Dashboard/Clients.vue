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
            <Topnav :navName="'Admin Portal'" :clientList="store.clients.length" :totalCLientsText="'Clients'"/>

            <el-drawer 
                class="product-add-drawer"
                v-model="addClientDrawer"
                :before-close="closeAddDrawer"
            >
                <AddClientDrawer :title="title" @add-client="addClient" @close-drawer="closeAddDrawer" v-if="showAddClient"/>
            </el-drawer>
            <el-drawer v-model="editClientDrawer">
                <EditClientDrawer @edit-client="serviceConfirmClick" @close-drawer="closeEditDrawer" v-if="showEditClient" :clientData="editClientData"/>
            </el-drawer>

            <el-dialog
                class="service-delete-dialog"
                v-model="deleteDialogVisible"
                title="Delete"
                width="30%"
            >
                <span>Are you sure? {{ currentIndex }} </span>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="deleteDialogVisible = false">Cancel</el-button>
                    <el-button @click="deleteClient">
                        Confirm
                    </el-button>
                </span>
                </template>
            </el-dialog>

            <div class="mt-12">
                <div class="flex justify-between mt-12 ml-6 mr-6 mb-3 pr-20 pl-20">
                    <h1 class="flex gap-x-2 text-2xl text-slate-500 font-semibold">
                        <Icon 
                            icon="ph:users-duotone"
                            width="30"
                        />
                        <h1>Clients</h1>
                    </h1>

                    <div class="flex gap-x-8">
                        <div>
                            <Button @button-clicked="showAddClientDrawer"  buttonText="Create Client"/>
                        </div>
                    </div>  
                </div>
                
                <div class="pl-24 pr-24 mt-12">
                    <el-table class="flex justify-center scrollbar-demo-item h-[40em] pt-4" :data="store.clients" style="width: 100%;">
                        <el-table-column prop="id" label="ID" width="50" />
                        <el-table-column prop="img" width="70">
                            <template #default>
                                <img class="image" src="../../assets/Shell_logo.svg.png"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="username" label="NAME" width="300" />
                        <el-table-column prop="email" label="EMAIL" width="300" />
                        <el-table-column prop="created_at" label="CREATED AT" width="300" />
                        <el-table-column align="right" fixed="right" width="200">
                            <template #default="scope">
                                <el-tooltip
                                    class="box-item"
                                    effect="dark"
                                    content="Edit"
                                    placement="right-start"
                                >
                                    <el-button class="details" @click="editClient(scope.$index)">
                                        <Icon 
                                            icon="solar:pen-2-bold-duotone"
                                            width="20"
                                        />
                                    </el-button>
                                </el-tooltip>

                                <el-button class="delete" @click="openDeleteDialog(scope.$index)">
                                    <Icon 
                                        icon="solar:trash-bin-trash-bold-duotone"
                                        width="20"
                                    />
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Sidenav from '../../components/Sidenav.vue';
import Topnav from '../../components/Topnav.vue';
import Button from '../../components/Button.vue';
import AddClientDrawer from '../../components/Drawers/AddClientDrawer.vue';
import EditClientDrawer from '../../components/Drawers/EditClientDrawer.vue';
import { Icon } from '@iconify/vue';
import { ref, onMounted } from 'vue';
import { useStore } from '../../store/store.ts';
import { ElMessage, ElMessageBox } from 'element-plus';

const store = useStore();
// const search = ref('');
const showAddClient = ref(false);
const addClientDrawer = ref(false);
const editClientDrawer = ref(false);
const editedClient = ref<number>();
const showEditClient = ref(false);
const deleteDialogVisible = ref(false);
const currentIndex = ref<number | undefined>();
const title = ref('Create Client')

onMounted(() => {
    store.getClients();
});

const editClientData = ref({
    username: '',
    email: '',
    created_at: '',
});

const showAddClientDrawer = () => {
    addClientDrawer.value = true;
    showAddClient.value = true;
};

const closeAddDrawer = () => {
    showAddClient.value = false;
    addClientDrawer.value = false;
};

const showEditClientDrawer = () => {
    editClientDrawer.value = true;
    showEditClient.value = true;
};

const closeEditDrawer = () => {
    showEditClient.value = false;
    editClientDrawer.value = false;
};

const openDeleteDialog = (index:number) => {
    currentIndex.value = index;
    deleteDialogVisible.value = true;
};

const deleteClient = () => {
    console.log(currentIndex.value);
    store.deleteClient(store.clients[currentIndex.value!].id);
    deleteDialogVisible.value = false;
    ElMessage({
        showClose: true,
        message: 'Client deleted successfully!',
        type: 'success',
    })
};

const editClient = (index:number) => {
    showEditClientDrawer();
    editClientData.value = {
        username: store.clients[index].username,
        email: store.clients[index].email,
        created_at: store.clients[index].created_at
    }
    editedClient.value = index;
};

const addClient = (newClient:any) => {
    store.addClient(newClient);
    addClientDrawer.value = false;
    ElMessage({
        showClose: true,
        message: 'Client generated successfully!',
        type: 'success',
    })
};

function serviceConfirmClick() {
  ElMessageBox.confirm(`Are you sure ?`)
    .then(() => {
        if(editedClient.value !=null) {
            store.editClient(editedClient.value, editClientData.value);
        };
        showEditClient.value = false;
        editClientDrawer.value = false;

        console.log(store.services);
        ElMessage({
            showClose: true,
            message: 'Client updated successfully!',
            type: 'success',
        })
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style scoped>
::v-deep(.search-input .el-input__wrapper){
    border-radius: 0.7em;
}
button.details{
    background-color: rgb(208, 228, 255);
    border: none;
    color: rgb(50, 160, 255);
}
button.details:hover{
    background-color: rgb(132, 181, 255);
    border: none;
    color: aliceblue
} 
button.delete{
    background-color: rgb(255, 224, 224);
    border: none;
    color: rgb(255, 96, 96);
}
button.delete:hover{
    background-color: rgb(255, 96, 96);
    border: none;
    color: rgb(255, 224, 224)
}
.image {
    height: 3em;
}
</style>