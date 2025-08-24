import authService from "@/services/authService";
import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { APP_ROUTE_NAMES } from "@/constants/routeNames";
import Cookies from "js-cookie";

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
                
                Cookies.set('token_mango', data.token, { expires: 7 }); // 7 Days of Expiration
                
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

    function Initialize(){
        try {
            const token = Cookies.get('token_mango');
            if(token){
                let payload = JSON.parse(atob(token.split('.')[1]));
                console.log(payload);
                Object.assign(user, {
                    id: payload.nameid,
                    name: payload.unique_name,
                    username: payload.email,
                    role: payload.role,
                    token: token
                });
                isAuthenticated.value = true;
            }
            else{
                ResetAuth();
            }
        } catch (error) {
            console.error(error);
            ResetAuth();
        }
    }

    function ResetAuth(){
        Cookies.remove('token_mango');
        Object.assign(user, {
            id: '',
            name: '',
            username: '',
            password: '',
            role: '',
            isLoggedIn: false
        });
        user.isAuthenticated = false;
    }

    return {
        user,
        isAuthenticated,
        getUserInfo,
        Register,
        Login,
        Initialize,
        ResetAuth
    }
});