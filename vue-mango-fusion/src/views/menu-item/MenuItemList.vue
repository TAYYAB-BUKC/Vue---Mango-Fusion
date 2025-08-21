<template>
    Menu Item List
</template>

<script setup>
    import menuItemService from '@/services/menuItemService';
    import {ref, onMounted} from 'vue';

    const menuItems = ref([]);
    const isLoading = ref(false);

    async function FetchMenuItems(){
        try {
            isLoading.value = true;
            menuItems.value = await menuItemService.GetMenuItems();
            console.log(menuItems.value);
        } catch (error) {
            console.error(error);
        }
        finally{
            isLoading.value = false;
        }
    }

    onMounted(()=>{
        FetchMenuItems();
    });

</script>