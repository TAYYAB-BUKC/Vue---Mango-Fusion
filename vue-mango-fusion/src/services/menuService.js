import api from "./api";

export default {
    async GetMenuItems(){
        try{
            const response = api.get('/api/menuitem');
            console.log(response);
        }catch(error){
            console.error(error);
            throw error;
        }
    }
}