<template>
    Menu Item List
</template>

<script setup>
    import menuItemService from '@/services/menuItemService';
    import {ref, onMounted, reactive} from 'vue';

    const menuItems = reactive([]);
    const isLoading = ref(false);

    async function FetchMenuItems(){
        try {
            isLoading.value = true;
            var data = await menuItemService.GetMenuItems();
            menuItems.push(...data);
            console.log(menuItems);
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