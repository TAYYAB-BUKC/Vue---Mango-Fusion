import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '@/views/auth/SignUp.vue';
import SignIn from '@/views/auth/SignIn.vue';
import Home from '@/views/home/Home.vue';
import ShoppingCart from '@/views/cart/ShoppingCart.vue';
import MenuItemList from '@/views/menu-item/MenuItemList.vue';
import MenuItemUpsert from '@/views/menu-item/MenuItemUpsert.vue';
import OrderList from '@/views/order/OrderList.vue';
import ManageOrder from '@/views/order/ManageOrder.vue';
import OrderConfirmation from '@/views/order/OrderConfirmation.vue';
import NotFound from '@/views/auth/NotFound.vue';
import NoAccess from '@/views/auth/NoAccess.vue';
import { APP_ROUTE_NAMES } from '@/constants/routeNames';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: APP_ROUTE_NAMES.HOME, component: Home },
    { path: '/sign-up', name: APP_ROUTE_NAMES.SIGN_UP, component: SignUp },
    { path: '/sign-in', name: APP_ROUTE_NAMES.SIGN_IN, component: SignIn },
    { path: '/home', redirect: { name: APP_ROUTE_NAMES.HOME } },
    { path: '/cart', name: APP_ROUTE_NAMES.CART, component: ShoppingCart },
    { path: '/admin/manage-menu-items', name: APP_ROUTE_NAMES.MENU_ITEM_LIST, component: MenuItemList },
    { path: '/admin/manage-menu-items/create', name: APP_ROUTE_NAMES.CREATE_MENU_ITEM, component: MenuItemUpsert },
    { path: '/admin/manage-menu-items/update/:id', name: APP_ROUTE_NAMES.EDIT_MENU_ITEM, component: MenuItemUpsert, props: true },
    { path: '/orders-list', name: APP_ROUTE_NAMES.ORDER_LIST, component: OrderList },
    { path: '/admin/manage-orders', name: APP_ROUTE_NAMES.MANAGE_ORDER_ADMIN, component: ManageOrder },
    { path: '/order-confirmation/:id', name: APP_ROUTE_NAMES.ORDER_CONFIRM, component: OrderConfirmation, props: true },
    { path: '/no-access', name: APP_ROUTE_NAMES.ACCESS_DENIED, component: NoAccess },
    { path: '/:catchAll(.*)', name: APP_ROUTE_NAMES.NOT_FOUND, component: NotFound },
  ],
})

export default router;