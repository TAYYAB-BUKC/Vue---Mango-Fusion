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
    }
}