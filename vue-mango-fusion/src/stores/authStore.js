import authService from "@/services/authService";
import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

export const useAuthStore = defineStore('AuthStore', ()=>{

    const user = reactive({
        id: '',
        name: '',
        username: '',
        password: '',
        role: '',
        isLoggedIn: false
    });

    const isAuthenticated = ref(false);

    const getUserInfo = computed(()=>{
        return user
    });

    async function Register(formData){
        try {
            const response = await authService.Register(formData);
            return response;
        } catch (error) {
            console.error(error);
            return {
                isSuccess: false,
                message: error.response.data.errorMessage
            }
        }
    }

    async function Login(formData){
        try {
            const response = await authService.Login(formData);
            return response;
        } catch (error) {
            console.error(error);
            return {
                isSuccess: false,
                message: error.response.data.errorMessage
            }
        }
    }

    return {
        user,
        isAuthenticated,
        getUserInfo,
        Register,
        Login
    }
});