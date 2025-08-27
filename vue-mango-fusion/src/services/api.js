import { API_URL } from "@/constants/config";
import { TOKEN_COOKIE_NAME } from "@/constants/constants";
import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((configuration) => {
    const securityToken = Cookies.get(TOKEN_COOKIE_NAME);
    if(securityToken){
        configuration.headers.Authorization = `Bearer ${securityToken}`;
    }

     console.log("📤 Axios Request:", {
      url: configuration.url,
      method: configuration.method,
      headers: configuration.headers,
      params: configuration.params,
      data: configuration.data,
    });

    return configuration;
    }, (error) => {
        console.error("❌ Request Error:", error);
        return Promise.reject(error);
    });

export default api;