import { defineStore } from 'pinia'
import http from '../components/Types/http';
import { Product, Service, Client, LicensedProduct, LicensedService } from '../components/Types/Client';

export const useStore = defineStore('offers', {
    state: () => {
        return {
            products: [] as Product[],
            productData: {} as Product,
            serviceData: {} as Service,
            services: [] as Service[],
            clients: [] as Client[],
            licensedProducts: [] as LicensedProduct[],
            licensedServices: [] as LicensedService[],
        }
    },

  actions: {
    async getProducts() {
        try {
            const response = await http.get('products');
            this.products = response.data
        } catch (error) {
            console.error(error);
        }
    },

    async getServices() {
        try {
            const response = await http.get('services');
            this.services = response.data
        } catch (error) {
            console.error(error);
        }
    },

    async getLicensedProducts() {
        try {
            const response = await http.get('licenses');
            this.licensedProducts = response.data.products
            console.log(this.licensedProducts)
        } catch (error) {
            console.error(error);
        }
    },

    async getLicensedServices() {
        try {
            const response = await http.get('licenses');
            this.licensedServices = response.data.services
            console.log(this.licensedServices)
        } catch (error) {
            console.error(error);
        }
    },

    async getClients() {
        try {
            const response = await http.get('clients');
            this.clients = response.data
        } catch (error) {
            console.error(error);
        }
    },

    async addProduct(newProduct:any) {
        try {
            const response = await http.post(`products`, newProduct);
            this.products.push(response.data);
        } catch (error) {
            console.error(error);
        } 
    },

    saveProductData(index:any) {
        this.productData = this.products[index];
    },

    saveServiceData(index:any) {
        this.serviceData = this.services[index];
    },

    async addService(newService:any) {
        try {
            const response = await http.post(`services`, newService);
            this.services.push(response.data);
        } catch (error) {
            console.error(error);
        } 
    },

    async addClient(newClient:Client) {
        try {
            const response = await http.post(`clients`, newClient);
            this.clients.push(response.data)
        } catch (error) {
            console.error(error);
        }
    },

    async editProduct(index:number, product:any) {
        try{
            const productID = this.products[index].id;
            const response = await http.put(`products/` + productID, product);
            if(response.status == 200) {
                this.products[index] = product;
            }
        } catch (error) {
            console.log(error);
        }
    },

    async editService(index:number, service:any) {
        try{
            const serviceID = this.services[index].id;
            const response = await http.put(`services/` + serviceID, service);
            if(response.status == 200) {
                this.services[index] = service;
            }
        } catch (error) {
            console.log(error);
        } 
    },

    async editClient(index:number, client:any) {
        try{
            const clientID = this.clients[index].id;
            const response = await http.put(`clients/` + clientID, client);
            if(response.status == 200) {
                this.clients[index] = client;
            }
        } catch (error) {
            console.log(error);
        }  
    },

    async deleteProduct(id:number) {
        try {
            const response = await http.delete(`products/` + id);
            if(response.status == 200) {
                this.products = this.products.filter(product => product.id !== id);
            }
            return
        } catch (error) {
            console.error(error);
        } 
    },

    async deleteService(id:number) {
        try {
            const response = await http.delete(`services/` + id);
            if(response.status == 200) {
                this.services = this.services.filter(service => service.id !== id);
            }
            console.log(response);
        } catch (error) {
            console.error(error);
        } 
    },

    async deleteClient(id:number) {
        try {
            const response = await http.delete(`clients/` + id);
            if(response.status == 200) {
                this.clients = this.clients.filter(client => client.id !== id);
            }
            console.log(response);
        } catch (error) {
            console.error(error);
        } 
    },

    renewProduct() {
        //Renew client product plan
    },
    renewService() {
        //Renew client service plan
    },
  },
});