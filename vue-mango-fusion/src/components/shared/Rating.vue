<style scoped>
.star-rating {
    transition: transform 0.1s ease;
}

.cursor-pointer {
    cursor: pointer;
}

.cursor-pointer:hover {
    transform: scale(1.2);
}
</style>

<template>
  <div class="d-flex align-items-center">
    <small class="text-secondary me-2">Rate this item:</small>
    <div class="d-flex">
      <div v-for="star in 5" :key="star" class="star-rating me-1" @click="onRatingUpdate(star)">
        <i class="bi-star text-warning" width="16"></i>
      </div>
    </div>

    <div class="spinner-border spinner-border-sm text-warning ms-2" role="status" v-if="isProcessing">
      <span class="visually-hidden">Rating...</span>
    </div>
    <div class="text-success ms-2" v-if="isSuccessful">
      <i class="bi bi-check-circle-fill"></i>
    </div>
  </div>
</template>

<script setup>
    import { ref } from 'vue';

    const isProcessing = ref(false);
    const isSuccessful = ref(false);

    const emit = defineEmits(['rateItem']);
    
    const props =defineProps({
        orderDetails: Object
    });

    const onRatingUpdate = async (newRating) =>{
        isProcessing.value = true;
        isSuccessful.value = true;
        emit('rateItem', {
            id: props.orderDetails.id,
            menuItemId: props.orderDetails.menuItemId,
            rating: newRating,
        });

        setTimeout(() => {
            isSuccessful.value = false;
        }, 2000);

        isProcessing.value = false;
    }

</script>