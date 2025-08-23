import { defineStore } from "pinia";
import { reactive, computed } from "vue";

export const useCartStore = defineStore('CartStore', ()=>{

    const cartItems = reactive([]);
    const cartCount = computed(()=> {
        return cartItems.reduce((total, menuItem) => total + menuItem.quantity, 0);
    });
    const cartTotal = computed(()=> {
        return cartItems.reduce((total, menuItem) => total + menuItem.quantity * menuItem.price, 0);
    });

    function AddToCart(menuItem, quantity = 1){
        let existingItem = cartItems.find((cartMenuItem) => cartMenuItem.id === menuItem.id);
        if(existingItem){
            existingItem.quantity += quantity;
        }
        else{
            cartItems.push({
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
        cartItems.length = 0;
    }

    function RemoveFromCart(menuItem){
        const menuItemIndex = cartItems.findIndex((cartMenuItem) => cartMenuItem.id === menuItem.id);
        if(menuItemIndex !== -1){
            cartItems.splice(menuItemIndex, 1);
        }
    }

    function UpdateQuantity(menuItem, quantity){
        const cartMenuItem = cartItems.find((cartMenuItem) => cartMenuItem.id === menuItem.id);
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
});