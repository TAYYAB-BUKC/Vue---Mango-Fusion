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
    }
}