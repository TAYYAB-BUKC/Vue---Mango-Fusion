<template>
    <div class="container py-5">
    <div class="d-flex align-items-center mb-4">
      <i class="bi bi-bag" style="font-size: 2.5rem"></i> &nbsp;
      <h1 class="mb-0">My Orders</h1>
    </div>

    <div class="text-center py-5" v-if="isLoading">
      <p class="text-body-secondary">Loading your orders...</p>
    </div>

    <div class="text-center py-5" v-if="orders.length === 0">
      <div class="bg-body-tertiary rounded-4 p-5">
        <i class="bi bi-bag" style="font-size: 2.5rem"></i>
        <h3 class="mb-3">No Orders Yet</h3>
        <p class="text-body-secondary mb-4">
          Start your culinary journey by exploring our delicious menu!
        </p>
        <router-link :to="{name: APP_ROUTE_NAMES.HOME}" class="btn btn-success btn-lg">
          <i class="bi bi-menu-button-wide"></i>
          Browse Menu
        </router-link>
      </div>
    </div>

    <div class="row g-4" v-if="orders.length > 0">
      <div class="col-md-6 col-lg-4" v-for="order in orders" :key="order.id">
        <!-- Order Card -->
        <OrderListCard :order="order" />
      </div>
    </div>
  </div>
</template>

<script setup>
    import OrderListCard from '@/components/card/OrderListCard.vue';
    import { ref, reactive, onMounted } from 'vue';
    import { APP_ROUTE_NAMES } from '@/constants/routeNames';
    import orderService from '@/services/orderService';
    import { useAuthStore } from '@/stores/authStore';
    import { useSweetAlert } from '@/composibles/useSweetAlert';

    const isLoading = ref(false);
    const orders = reactive([]);
    const authStore = useAuthStore();
    const { showError } = useSweetAlert();

    onMounted(async () => {
        await FetchOrders();
    });

    async function FetchOrders(){
        isLoading.value = true;
        try {
            const response = await orderService.GetOrders(authStore.user.id);
            orders.push(...response); 
        } catch (error) {
            console.error(error);
            showError(error.message);
        }
        finally{
            isLoading.value = false;
        }
    }
</script>