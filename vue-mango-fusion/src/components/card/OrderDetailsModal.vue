<template>
    <div v-if="order"
    class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-black bg-opacity-50"
    style="z-index: 1050"
  >
    <div
      class="bg-body p-4 rounded-4 shadow-lg mx-3 overflow-auto"
      style="max-width: 800px; width: 100%; max-height: 90vh"
    >
      <div class="modal-content border-0 rounded-4 bg-body">
        <div class="sticky-top bg-body p-3 p-sm-4 border-bottom">
          <div
            class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-2"
          >
            <div class="d-flex align-items-center">
              <i class="bi bi-receipt-cutoff pe-1 text-success"></i>
              <h5 class="mb-0 fs-5 text-success">Order # {{ order?.id }}</h5>
            </div>
            <button class="btn-close ms-auto ms-sm-0" aria-label="Close modal" @click="emit('closeModal')"></button>
          </div>

          <div
            class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2"
          >
            <div class="d-flex align-items-center">
              <i class="bi bi-calendar pe-1"></i>
              <span class="text-body-secondary small">{{ formatDate(order?.orderDate) }}</span>
            </div>
            <span class="badge rounded-pill px-3 py-2" :class="{
                    'bg-warning-subtle text-warning-emphasis': order.status === ORDER_STATUS_RECEIVED,
                    'bg-primary-subtle text-primary-emphasis': order.status === ORDER_STATUS_ACCEPTED,
                    'bg-info-subtle text-info-emphasis': order.status === ORDER_STATUS_READYFORPICKUP,
                    'bg-success-subtle text-success-emphasis': order.status === ORDER_STATUS_DELIVERED,
                    'bg-danger-subtle text-danger-emphasis': order.status === ORDER_STATUS_CANCELLED
                }">{{ order.status }}</span>
          </div>
        </div>

        <div class="modal-body-scrollable p-3 p-sm-4" style="max-height: 70vh; overflow-y: auto">
          <div class="row g-3 g-md-4 mb-4">
            <div class="col-12 col-md-6">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-3">
                  <div class="d-flex align-items-center mb-3">
                    <i class="bi bi-person-circle pe-1"></i>
                    <h6 class="card-title mb-0">Customer Information</h6>
                  </div>
                  <div class="d-flex flex-column gap-2">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-person-fill pe-1"></i>
                      <span class="small">{{ order?.name }}</span>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-telephone-fill pe-1"></i>
                      <span class="small">{{ order?.phoneNumber }}</span>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-envelope pe-1"></i>
                      <span class="small text-break">{{ order?.email }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <div class="card border-0 shadow-sm h-100">
                <div class="card-body p-3">
                  <div class="d-flex align-items-center mb-3">
                    <i class="bi bi-currency-dollar text-success me-2" width="20"></i>
                    <h6 class="card-title mb-0">Order Summary</h6>
                  </div>
                  <div class="d-flex flex-column gap-2">
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="text-body-secondary small">Total Items</span>
                      <span class="fw-bold">{{ order?.orderItems }}</span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                      <span class="text-body-secondary small">Total Amount</span>
                      <span class="fw-bold text-success">${{ order?.orderTotal.toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body p-3">
              <div class="d-flex align-items-center mb-3">
                <i class="bi bi-list-check text-success me-2" width="20"></i>
                <h6 class="card-title mb-0">Order Items</h6>
              </div>
              <div class="table-responsive">
                <template v-if="order.details.length > 0">
                  <div
                    class="d-flex justify-content-between align-items-center py-2 border-bottom gap-3"
                    v-for="orderDetails in order?.details" :key="orderDetails?.id"
                  >
                    <div class="d-flex align-items-center flex-grow-1 min-width-0">
                      <i class="bi bi-dash"></i>
                      <span class="text-truncate small">{{ orderDetails?.itemName }}</span>
                    </div>
                    <div class="d-flex align-items-center gap-2 flex-shrink-0">
                      <span class="badge bg-success-subtle text-success">{{ orderDetails?.quantity }} x</span>
                      <span class="text-body-secondary small">${{ orderDetails?.price }} </span>
                    </div>
                  </div>
                </template>
                <div class="text-center text-body-secondary py-3 small" v-else>No items in this order</div>
              </div>
            </div>
          </div>

          <!-- Order Status -->
          <div class="card border-0 shadow-sm">
            <div class="card-body p-3">
              <div class="d-flex align-items-center mb-3">
                <i class="bi bi-gear text-success me-2" width="20"></i>
                <h6 class="card-title mb-0">Order Status</h6>
              </div>

              <!-- Status Flow Buttons -->
              <div
                class="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center gap-2 mb-3"
              >
                <button class="btn btn-success flex-fill" :disabled="isStatusDisabled(ORDER_STATUS_ACCEPTED)">
                  <i class="bi bi-clock me-1"></i>
                  <span class="small">Accepted</span>
                </button>

                <div class="d-none d-sm-block text-secondary">
                  <i class="bi bi-arrow-right"></i>
                </div>

                <button class="btn btn-success flex-fill" :disabled="isStatusDisabled(ORDER_STATUS_READYFORPICKUP)">
                  <i class="bi bi-gear me-1"></i>
                  <span class="small">Ready for Pickup</span>
                </button>

                <div class="d-none d-sm-block text-secondary">
                  <i class="bi bi-arrow-right"></i>
                </div>

                <button class="btn btn-success flex-fill" :disabled="isStatusDisabled(ORDER_STATUS_DELIVERED)">
                  <i class="bi bi-check-circle me-1"></i>
                  <span class="small">Completed</span>
                </button>
              </div>

              <!-- Cancel Button -->
              <button class="btn btn-outline-danger w-100" :disabled="isStatusDisabled(ORDER_STATUS_CANCELLED)">
                <i class="bi bi-x-circle me-1"></i>
                <span class="small">Cancel Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { ORDER_STATUS_ACCEPTED, ORDER_STATUS_CANCELLED, ORDER_STATUS_DELIVERED, ORDER_STATUS_READYFORPICKUP, ORDER_STATUS_RECEIVED, ORDER_STATUSES } from '@/constants/constants';
    import orderService from '@/services/orderService';

    const emit = defineEmits(['closeModal']);
    const props = defineProps({
        order: Object
    });

    const formatDate = (date) => {
        if(!date){
            return 'N/A';
        }

        const newDate = new Date(date);
        return newDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const updateStatus = async(newStatus) => {
        try {
            const orderToBeUpdate = {
                "id": props.order?.id,
                "name": props.order?.name,
                "email": props.order?.email,
                "phoneNumber": props.order?.phoneNumber,
                "status": newStatus
            }
            const response = await orderService.UpdateOrder(orderToBeUpdate);
            console.log(response);            
        } catch (error) {
            console.error('Error updating status: ', error);            
        }
    }

    const isStatusDisabled= (status) => {
        const currentIndex = ORDER_STATUSES.indexOf(props.order?.status);
        const targetIndex = ORDER_STATUSES.indexOf(status);

        if(targetIndex <= currentIndex){
            return true;
        }

        if(props.order?.status === ORDER_STATUS_CANCELLED){
            return true;
        }

        if(props.order?.status === ORDER_STATUS_DELIVERED){
            return true;
        }

        if(props.order?.status === ORDER_STATUS_RECEIVED && status === ORDER_STATUS_DELIVERED){
            return true;
        }

        if(props.order?.status === ORDER_STATUS_RECEIVED && status === ORDER_STATUS_READYFORPICKUP){
            return true;
        }

        if(props.order?.status === ORDER_STATUS_ACCEPTED && status === ORDER_STATUS_DELIVERED){
            return true;
        }

        return false;
    }
</script>