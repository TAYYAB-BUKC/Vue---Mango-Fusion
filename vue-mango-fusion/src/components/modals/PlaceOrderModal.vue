<template>
      <div v-if="isModalOpen"
    class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-black bg-opacity-50"
    style="z-index: 1050"
  >
    <div
      class="bg-body p-4 rounded-4 shadow-lg mx-3 overflow-auto"
      style="max-width: 500px; width: 100%; max-height: 90vh"
    >
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h4 class="fw-bold m-0">Complete Your Order</h4>
        <button class="btn" @click="emit('CloseModal')"><i class="bi bi-x-circle"></i></button>
      </div>

      <div class="alert alert-danger" role="alert" v-if="errorList.length > 0">
        <span class="d-block" v-for="error in errorList" :key="error">{{ error }}</span>
      </div>

      <form @submit.prevent="PlaceOrder">
        <div class="mb-3">
          <label for="pickupName" class="form-label">Name</label>
          <input v-model="order.name" type="text" class="form-control" id="pickupName" />
        </div>

        <div class="mb-3">
          <label for="pickupPhoneNumber" class="form-label">Phone Number</label>
          <input v-model="order.phoneNumber" type="tel" class="form-control" id="pickupPhoneNumber" />
        </div>

        <div class="mb-4">
          <label for="pickupEmail" class="form-label">Email</label>
          <input v-model="order.email" type="email" class="form-control" id="pickupEmail" />
        </div>

        <div class="bg-body-tertiary rounded-3 p-3 mb-4">
          <h5 class="fw-bold mb-3">Order Summary</h5>
          <div v-if="cartStore.cartItems && cartStore.cartItems.length > 0">
            <div class="d-flex justify-content-between align-items-center mb-2" v-for="menuItem in cartStore.cartItems" :key="menuItem.id">
              <span class="fw-medium">{{ menuItem?.name }}</span>
              <div class="d-flex align-items-center gap-3">
                <span class="text-body-secondary">{{ menuItem?.quantity }} x</span>
                <span class="fw-medium">$ {{ menuItem?.price.toFixed(2) }}</span>
              </div>
            </div>
            <div class="border-top pt-3 mt-3">
              <div class="d-flex justify-content-between align-items-center">
                <span class="fw-bold">Total</span>
                <span class="fw-bold fs-5">$ {{ cartStore.cartTotal.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end gap-2">
          <button type="button" class="btn btn-outline-secondary px-4" @click="emit('CloseModal')">Cancel</button>
          <button type="submit" class="btn btn-success px-4" :disabled="!cartStore.cartItems || cartStore.cartItems.length === 0">
            <span class="d-flex align-items-center gap-2" v-if="isProcessing">
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              Processing...
            </span>
            <span v-else>Place Order</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
    import { useCartStore } from '@/stores/cartStore';
    import { ref, reactive, onMounted } from 'vue';
    import { useAuthStore } from '@/stores/authStore';

    const props = defineProps({
        isModalOpen: Boolean,
        CloseModal: Function
    });

    const emit = defineEmits(['CloseModal']);

    const cartStore = useCartStore();
    const isProcessing = ref(false);
    const order = reactive({
        name: "",
        email: "",
        phoneNumber: "",
        applicationUserId: "",
        orderTotal: 0,
        orderItems: 0,
        details: [
            // {
            // "menuItemId": 1,
            // "itemName": "",
            // "quantity": 1,
            // "price": 1
            // }
        ]
    });
    const errorList = reactive([]);
    const authStore = useAuthStore();

    async function PlaceOrder(){
        try {
            isProcessing.value = true;
            errorList.length = 0;

            if(order.name.length === 0 || order.name == undefined){
                errorList.push('Name is required.');
            }

            if(order.email.length === 0 || order.email == undefined){
                errorList.push('Email is required.');
            }

            if(order.phoneNumber.length === 0 || order.phoneNumber == undefined){
                errorList.push('PhoneNumber is required.');
            }

            if(errorList.length > 0){
                isProcessing.value = false;
                return;    
            }
            // Place Order
            
            order.orderItems = cartStore.cartCount;
            order.orderTotal = cartStore.cartTotal;
            order.details = cartStore.cartItems.map((cartItem) => ({
                menuItemId: cartItem.id,
                itemName: cartItem.name,
                quantity: cartItem.quantity,
                price: cartItem.price
            }));

            console.log(order);

        } catch (error) {
            console.error(error.message);
            errorList.push(error.message);
        }
        finally{
            isProcessing.value = false;
        }
    }

    onMounted(() => {
        if(authStore.isAuthenticated){
            const user = authStore.getUserInfo;
            order.applicationUserId = user.id;
            order.email = user.username;
            order.name = user.name;
        }
    });
</script>