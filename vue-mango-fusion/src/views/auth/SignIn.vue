<template>
    
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="text-center mb-4">Sign In</h2>
            <form @submit.prevent="OnSignInSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model.trim="formData.username" />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model.trim="formData.password" />
              </div>

              <div class="alert alert-danger" v-if="errorList.length > 0">
                    <span class="d-block" v-for="error in errorList" :key="error">{{ error }}</span>
                </div>

                <button type="submit" class="btn btn-secondary w-100" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                    Login
                </button>
            </form>

            <div class="text-center mt-3">
              <router-link :to="{name: APP_ROUTE_NAMES.SIGN_UP}">Don't have an account? Sign up</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { APP_ROUTE_NAMES } from '@/constants/routeNames';
    import { ref, reactive } from 'vue';

    const isLoading = ref(false);
    let errorList = reactive([]);
    const formData = reactive({
        username: "",
        password: ""
    });

    async function OnSignInSubmit(){

        isLoading.value = true;
        errorList = [];
        
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
            
        } catch (error) {
            console.error(error);
            errorList.push(error.message);
        }
        finally{
            isLoading.value = false;
        }
    }
</script>