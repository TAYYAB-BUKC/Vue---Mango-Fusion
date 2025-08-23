import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore('CartStore', ()=>{

    const cartItems = ref([]);
    const cartCount = computed(()=> {
        return cartItems.value.reduce((total, menuItem) => total + menuItem.quantity, 0);
    });
    const cartTotal = computed(()=> {
        return cartItems.value.reduce((total, menuItem) => total + menuItem.quantity * menuItem.price, 0);
    });

    function AddToCart(menuItem, quantity = 1){
        let existingItem = cartItems.value.find((cartMenuItem) => cartMenuItem.id === menuItem.id);
        if(existingItem){
            existingItem.quantity += quantity;
        }
        else{
            cartItems.value.push({
                id: menuItem.id,
                name: menuItem.name,
                quantity: quantity,
                price: menuItem.price,
                imageURL: menuItem.imageURL,
            })
        }
    }

    function ClearCart(){
        console.log('ClearCart');
        //cartItems = [];
        cartItems.value.length = 0;
    }

    function RemoveFromCart(menuItem){
        const menuItemIndex = cartItems.value.findIndex((cartMenuItem) => cartMenuItem.id === menuItem.id);
        if(menuItemIndex !== -1){
            cartItems.value.splice(menuItemIndex, 1);
        }
    }

    function UpdateQuantity(menuItem, quantity){
        const cartMenuItem = cartItems.value.find((cartMenuItem) => cartMenuItem.id === menuItem.id);
        if(cartMenuItem){
            if(quantity <= 0){
                RemoveFromCart(cartMenuItem);
            }
            else{
                cartMenuItem.quantity = quantity;
            }
        }
    }

    return {
        cartItems,
        cartCount,
        cartTotal,
        AddToCart,
        ClearCart,
        RemoveFromCart,
        UpdateQuantity
    }
}, 
{
    persist: true
});