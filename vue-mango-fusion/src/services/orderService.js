import api from "./api";

export default {
    async GetOrders(userId){
        try{
            const response = await api.get(`/api/orders?userId=${userId}`);
            console.log(response);
            if(response.data.isSuccess){
                return response.data.data;
            }
            else{
                throw new Error('Unable to fetch orders');
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    },
    async GetOrderById(orderId){
        try{
            const response = await api.get(`/api/orders/${orderId}`);
            console.log(response);
            if(response.data.isSuccess){
                return response.data.data;
            }
            else{
                throw new Error('Unable to fetch order');
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    },
    async CreateOrder(formData){
        try{
            const response = await api.post('/api/orders', formData);
            console.log(response);
            if(response.data.isSuccess){
                return response.data.data;
            }
            else{
                throw new Error('Unable to create order');
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    },
    async UpdateOrder(formData){
        try{
            const response = await api.put('/api/orders', formData);
            console.log(response);
            if(response.data.isSuccess){
                return response.data.data;
            }
            else{
                throw new Error('Unable to update order');
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}