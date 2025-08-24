import authService from "@/services/authService";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

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
                message: error.response.data.errorMessages?.join(', \n') || 'Registration failed'
            }
        }
    }

    return {
        user,
        isAuthenticated,
        getUserInfo,
        Register,
    }
});