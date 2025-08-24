<template>
      <div class="container mt-5">
        <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
            <div class="card shadow">
            <div class="card-body p-4">
                <h2 class="text-center mb-4">Sign Up</h2>

                <form @submit.prevent="OnSignUpSubmit">
                    <div class="mb-3">
                        <label for="name" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="name" v-model.trim="formData.name"/>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" v-model.trim="formData.username"/>
                    </div>

                    <div class="mb-3">
                        <label for="role" class="form-label">Role</label>
                        <select class="form-select" id="role" v-model.trim="formData.role">
                            <option v-for="role in ROLES" :key="role">{{ role }}</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" v-model.trim="formData.password"/>
                    </div>

                    <div class="alert alert-danger" v-if="errorList.length > 0">
                        <span class="d-block" v-for="error in errorList" :key="error">{{ error }}</span>
                    </div>

                    <button type="submit" class="btn btn-secondary w-100" :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                        Sign Up
                    </button>
                </form>

                <div class="text-center mt-3">
                    <router-link :to="{name: APP_ROUTE_NAMES.SIGN_IN}">Already have an account? Login</router-link>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
    import { ROLE_CUSTOMER, ROLES } from '@/constants/constants';
    import { APP_ROUTE_NAMES } from '@/constants/routeNames';
    import { ref, reactive } from 'vue';
    import { useAuthStore } from '@/stores/authStore';

    const isLoading = ref(false);
    let errorList = reactive([]);
    const formData = reactive({
        name: "",
        username: "",
        password: "",
        role: ROLE_CUSTOMER
    }); 
    const authStore = useAuthStore();

    async function OnSignUpSubmit(){

        isLoading.value = true;
        errorList = [];

        if(formData.name.length === 0 || formData.name == undefined){
            errorList.push('Name is required');
        }

        if(formData.username.length === 0 || formData.username == undefined){
            errorList.push('Email is required');
        }

        if(formData.password.length === 0 || formData.password == undefined){
            errorList.push('Password is required');
        }

        if(errorList.length > 0){
            isLoading.value = false;
            return;
        }

        try {
            const response = await authStore.Register(formData);
            if(response.isSuccess){
                console.log('Success');
            }
            else{
                console.log('Failed');
                if(response.message.length > 1){
                    response.message.forEach(error => {
                        errorList.push(error);
                    });
                }
                else{
                    errorList.push(response.message);
                }
            }
            console.log(response);
        } catch (error) {
            console.error(error);
            errorList.push(error.message);
        }
        finally{
            isLoading.value = false;
        }
    }
</script>