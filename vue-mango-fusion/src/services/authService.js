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
                    message: 'Registration failed!'
                }
            }
        } catch (error) {
            return {
                isSuccess: false,
                message: error.message
            }
        }
    }
}