<template>
    <nav class="navbar navbar-expand-md rounded-3 mx-auto my-2 w-100 text-success bg-success bg-opacity-10">
        <div class="container-fluid">
            <!-- <router-link class="navbar-brand" :to="{name: `${APP_ROUTE_NAMES.HOME}`}">
                <img src="@/assets/logo.png" alt="logo" height="28px" class="d-inline-block align-text-top me-2">
                </img>
            </router-link> -->
            <router-link class="navbar-brand" :to="{name: APP_ROUTE_NAMES.HOME}">
                <img src="@/assets/logo.png" alt="logo" height="28px" class="d-inline-block align-text-top me-2">
                </img>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link class="nav-link active" aria-current="page" :to="{name: APP_ROUTE_NAMES.HOME}">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: APP_ROUTE_NAMES.ORDER_LIST}">Orders</router-link>
                </li>
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" v-if="authStore.isAdmin">
                    Administrator Section
                </a>
                <ul class="dropdown-menu">
                    <li>
                        <router-link class="dropdown-item" :to="{name: APP_ROUTE_NAMES.MENU_ITEM_LIST}">Menu Items</router-link>
                    </li>
                    <li>
                        <router-link class="dropdown-item" :to="{name: APP_ROUTE_NAMES.MANAGE_ORDER_ADMIN}">Order Management</router-link>
                    </li>
                </ul>
                </li>
            </ul>
            <ul class="navbar-nav ms-auto align-items center small">
                <li class="nav-item px-2">
                    <router-link class="nav-link px-2 position-relative" :to="{name: APP_ROUTE_NAMES.CART}">
                        <i class="bi bi-cart3"></i><span class="position-absolute start-100 translate-middle badge rounded-pill bg-danger">{{ cartStore.cartCount }}</span>
                    </router-link>
                </li>
                <li class="nav-item" v-if="!authStore.isAuthenticated">
                    <router-link class="nav-link" :to="{name: APP_ROUTE_NAMES.SIGN_UP}">
                        Register
                    </router-link>
                </li>
                <li class="nav-item" v-if="!authStore.isAuthenticated">
                    <router-link class="nav-link" :to="{name: APP_ROUTE_NAMES.SIGN_IN}">
                        Login
                    </router-link>
                </li>
                <li class="nav-item" v-if="authStore.isAuthenticated">
                    <button class="nav-link px-2" @click="authStore.Logout">
                        Logout
                    </button>
                </li>

                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-laptop"></i>
                </a>
                <ul class="dropdown-menu">
                    <li>
                        <button class="dropdown-item" @click="themeStore.setTheme('light')"><i class="bi bi-sun"></i> &nbsp; Light</button>
                    </li>
                    <li>
                        <button class="dropdown-item" @click="themeStore.setTheme('dark')"><i class="bi bi-moon-fill"></i> &nbsp; Dark</button>
                    </li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>


<script setup>
    import { APP_ROUTE_NAMES } from '@/constants/routeNames';
    import { useThemeStore } from '@/stores/themeStore';
    import { useCartStore } from '@/stores/cartStore';
    import { useAuthStore } from '@/stores/authStore';

    const themeStore = useThemeStore();
    const cartStore = useCartStore();
    const authStore = useAuthStore();
</script>