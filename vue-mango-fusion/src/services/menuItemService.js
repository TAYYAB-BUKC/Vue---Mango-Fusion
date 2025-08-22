import api from "./api";

export default {
    async GetMenuItems(){
        try{
            const response = await api.get('/api/menuitem');
            console.log(response);
            if(response.data.isSuccess){
                return response.data.data;
            }
            else{
                throw new Error('Unable to fetch menuitems');
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    },
    async GetMenuItemById(id){
        try{
            const response = await api.get(`/api/menuitem/${id}`);
            console.log(response);
            if(response.data.isSuccess){
                return response.data.data;
            }
            else{
                throw new Error('Unable to fetch menuitem');
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    },
    async CreateMenuItem(formData){
        try{
            const response = await api.post('/api/menuitem', formData);
            console.log(response);
            if(response.data.isSuccess){
                return response.data.data;
            }
            else{
                throw new Error('Unable to create menuitem');
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    },
    async UpdateMenuItem(id, formData){
        try{
            const response = await api.put(`/api/menuitem?id=${id}`, formData);
            console.log(response);
            if(response.data.isSuccess){
                return response.data.data;
            }
            else{
                throw new Error('Unable to update menuitem');
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    },
    async DeleteMenuItem(id){
        try{
            const response = await api.delete(`/api/menuitem?id=${id}`);
            console.log(response);
            if(response.data.isSuccess){
                return response.data.isSuccess;
            }
            else{
                throw new Error('Unable to delete menuitem');
            }
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}