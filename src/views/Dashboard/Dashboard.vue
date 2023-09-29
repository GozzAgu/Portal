<template>
    <div class="flex">
        <div>{{  }}</div>
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

        <div class="border w-full pr-40 pl-40">
            <Topnav 
                :navName="'Admin Portal'"
                :productList="store.products.length" 
                :serviceList="store.services.length" 
                :activeTab="activeName" 
                :total-products-text="'Total Products'" 
                :total-services-text="'Total Services'"
            />

            <el-drawer 
                class="product-add-drawer"
                v-model="productDrawer"
            >
                <AddProductDrawer v-if="showAddProduct" @add-product="addNewProduct" @close-drawer="addProductCancelClick"/>
            </el-drawer>

            <el-drawer 
                class="product-add-drawer"
                v-model="serviceDrawer"
            >
                <AddServiceDrawer v-if="showAddService" @add-service="addNewService" @close-drawer="addServiceCancelClick"/>
            </el-drawer>
                    
            <el-dialog
                class="product-delete-dialog"
                v-model="productDialogVisible"
                title="Delete"
                width="30%"
            >
                <span>Are you sure?</span>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="productDialogVisible = false">Cancel</el-button>
                    <el-button @click="deleteProduct()">
                        Confirm
                    </el-button>
                </span>
                </template>
            </el-dialog>

            <el-dialog
                class="service-delete-dialog"
                v-model="serviceDialogVisible"
                title="Delete"
                width="30%"
            >
                <span>Are you sure?</span>
                <template #footer>
                <span class="dialog-footer">
                    <el-button @click="serviceDialogVisible = false">Cancel</el-button>
                    <el-button @click="deleteService()">
                        Confirm
                    </el-button>
                </span>
                </template>
            </el-dialog>

            <div class="mt-8">
                <div class="flex justify-between mt-12 ml-6 mr-6 mb-3 pr-20 pl-20">
                    <h1 class="text-2xl text-slate-500 font-semibold flex gap-x-2">
                        <Icon 
                            icon="ph:tag-duotone"
                            width="30"
                        />
                        Offers 
                    </h1>
                    <div>
                        <Button @button-clicked="showAddProductDrawer" v-if="activeName === 'Products'" buttonText="Add Product"/>
                        <Button @button-clicked="showAddServiceDrawer" v-else buttonText="Add Service"/>
                    </div>
                </div>

                <div class="pl-24 pr-24 mt-12">
                    <el-tabs v-model="activeName" type="border-card" class="demo-tabs rounded-lg">
                        <el-tab-pane class="h-[30em] pb-5" label="Products" name="Products"> 
                            <el-scrollbar class="h-full">
                                <el-table class="flex justify-center scrollbar-demo-item" :data="store.products" style="width: 100%" :cell-class-name="limitText">
                                    <el-table-column prop="id" label="ID" width="50" />
                                    <el-table-column prop="img" width="70">
                                        <template #default>
                                            <img class="image" src="../../assets//CCL logo.jpg"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" label="NAME" width="200" />
                                    <el-table-column prop="description" label="DESCRIPTION" width="500" />
                                    <el-table-column prop="created_at" label="CREATED AT" width="200" />
                                    <el-table-column align="right" fixed="right" width="200">
                                        <template #default="scope">
                                            <el-tooltip
                                                class="box-item"
                                                effect="dark"
                                                content="View & Edit"
                                                placement="right-start"
                                            >
                                                <el-button class="details" @click="routeToProduct(scope.$index)">
                                                    <Icon 
                                                        icon="solar:pen-2-bold-duotone"
                                                        width="20"
                                                    />
                                                </el-button>
                                            </el-tooltip>

                                            <el-button class="delete" @click="openProductDialog(scope.$index)">
                                                <Icon 
                                                    icon="solar:trash-bin-trash-bold-duotone"
                                                    width="20"
                                                />
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-scrollbar>
                            <el-pagination
                                class="fixed bottom-6 right-64"
                                background
                                :page-size="20"
                                :pager-count="4"
                                layout="prev, pager, next"
                                :total="1000"
                            />
                        </el-tab-pane>

                        <el-tab-pane class="h-[30em] pb-5" label="Services">
                            <el-scrollbar class="h-full">
                                <el-table class="flex justify-center scrollbar-demo-item" :data="store.services" style="width: 100%">
                                    <el-table-column prop="id" label="ID" width="50" />
                                    <el-table-column prop="img" width="70">
                                        <template #default>
                                            <img class="image" src="../../assets//CCL logo.jpg"/>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="name" label="NAME" width="200" />
                                    <el-table-column prop="description" label="DESCRIPTION" width="500" />
                                    <el-table-column prop="created_at" label="CREATED AT" width="200" />
                                    <el-table-column align="right" fixed="right" label="" width="200">
                                        <template #default="scope">
                                            <el-tooltip
                                                class="box-item"
                                                effect="dark"
                                                content="Edit"
                                                placement="right-start"
                                            >
                                                <el-button class="details" @click="routeToService(scope.$index)">
                                                    <Icon 
                                                        icon="solar:pen-2-bold-duotone"
                                                        width="20"
                                                    />
                                                </el-button>
                                            </el-tooltip>

                                            <el-button class="delete" @click="openServiceDialog(scope.$index)">
                                                <Icon 
                                                    icon="solar:trash-bin-trash-bold-duotone"
                                                    width="20"
                                                />
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-scrollbar>
                            <el-pagination
                                class="fixed bottom-6 right-64"
                                background
                                :page-size="20"
                                :pager-count="4"
                                layout="prev, pager, next"
                                :total="1000"
                            />
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
import Button from '../../components/Button.vue';
import AddProductDrawer from '../../components/Drawers/AddProductDrawer.vue';
import AddServiceDrawer from '../../components/Drawers/AddServiceDrawer.vue';
import { useStore } from '../../store/store.ts';
import { Icon } from '@iconify/vue';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { Product } from '../../components/Types/Client';

const router = useRouter();
const store = useStore();
const activeName = ref('Products');
// const search = ref(' ');
const productDialogVisible = ref(false);
const serviceDialogVisible = ref(false);
const currentIndex = ref<number | undefined>();

const limitText = ({ row, column, rowIndex, columnIndex }: { row: Product, column:any, rowIndex:number, columnIndex: number}) => {
    if (columnIndex === 3){
        return ''
    }
    else{
        return ''
    }
}

onMounted(() => {
    store.getProducts();
    store.getServices();
});

const routeToProduct = (index:number) => {
    store.saveProductData(index)
    console.log(index)
    let productID = store.products[index].id;
    router.push({ 
        path: `/product/${productID}`,
    });
    console.log(productID)
};

const routeToService = (index:number) => {
    store.saveServiceData(index)
    console.log(index)
    let serviceID = store.services[index].id;
    router.push({ 
        path: `/service/${serviceID}`,
    });
    console.log(serviceID)
};

// DRAWER LOGIC..........................
const productDrawer = ref(false);
const showAddProduct = ref(false);
const serviceDrawer = ref(false);
const showAddService = ref(false);

const showAddProductDrawer = () => {
    productDrawer.value = true;
    showAddProduct.value = true;
};

const showAddServiceDrawer = () => {
    serviceDrawer.value = true;
    showAddService.value = true;
};

//ADD PRODUCT AND SERVICE..................
const addNewProduct = (newProduct:any) => {
    store.addProduct(newProduct);
    productDrawer.value = false;
    ElMessage({
        showClose: true,
        message: 'Product Added successfully!',
        type: 'success',
    })
};

const addNewService = (newService:any) => {
    store.addService(newService);
    serviceDrawer.value = false;
    ElMessage({
        showClose: true,
        message: 'Service Added successfully!',
        type: 'success',
    })
};

//MODAL CANCEL BUTTON CLICKS..................
function addProductCancelClick() {
    productDrawer.value = false;
    showAddProduct.value = false;
}

function addServiceCancelClick() {
    serviceDrawer.value = false;
    showAddService.value = false;
}

//DELETE PRODUCT AND SERVICE...................
const deleteProduct = () => {
    const productName = store.products[currentIndex.value!].name;
    store.deleteProduct(store.products[currentIndex.value!].id);
    currentIndex.value = undefined;
    productDialogVisible.value = false;
    ElMessage({
        showClose: true,
        message: `${productName} Deleted successfully!`,
        type: 'success',
    });
};

const deleteService = () => {
    const serviceName = store.services[currentIndex.value!].name;
    store.deleteService(store.services[currentIndex.value!].id);
    currentIndex.value = undefined;
    serviceDialogVisible.value = false;
    ElMessage({
        showClose: true,
        message: `${serviceName} Deleted successfully!`,
        type: 'success',
    });
};

//INDEX STORE FOR PRODUCT AND SERVICE....................
const openProductDialog = (index:number) => {
    currentIndex.value = index
    productDialogVisible.value = true
};

const openServiceDialog = (index:number) => {
    currentIndex.value = index
    serviceDialogVisible.value = true
};

</script>

<style scoped>
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
