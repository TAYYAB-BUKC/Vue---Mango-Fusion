import api from "./api";

export default {
    async Register(formData){
        try {
            const response = await api.post('/api/auth/register', formData);
            if(response.data.isSuccess){
                return {
                    isSuccess: true,
                    message: 'Registration is successful!'
                }
            }
            else{
                return {
                    isSuccess: false,
                    message: response.data.errorMessages
                }
            }
        } catch (error) {
            return {
                isSuccess: false,
                message: error.response.data.errors || error.response.data.errorMessages
            }
        }
    },
    async Login(formData){
        try {
            const response = await api.post('/api/auth/login', formData);
            if(response.data.isSuccess){
                let { token } = response.data.data;
                
                let payload = JSON.parse(atob(token.split('.')[1]));
                console.log(payload);
                return {
                    isSuccess: true,
                    message: 'Login is successful!',
                    data: {
                        id: payload.nameid,
                        name: payload.unique_name,
                        username: payload.email,
                        role: payload.role,
                        token: token
                    }
                }
            }
            else{
                return {
                    isSuccess: false,
                    message: response.data.errorMessages
                }
            }
        } catch (error) {
            return {
                isSuccess: false,
                message: error.response.data.errors || error.response.data.errorMessages
            }
        }
    }
}