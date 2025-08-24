import authService from "@/services/authService";
import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { APP_ROUTE_NAMES } from "@/constants/routeNames";

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
    const router = useRouter();

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
            if(response.isSuccess){
                let data = response.data;
                Object.assign(user, data);
                user.isLoggedIn = true;
                isAuthenticated.value = true;
                console.log(user);
                router.push({name: APP_ROUTE_NAMES.HOME});
            }
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