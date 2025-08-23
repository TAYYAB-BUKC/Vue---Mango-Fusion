<style scoped>
    .hero-section {
        background: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('/src/assets/hero.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
    }
    .text-success-emphasis {
        color: #75e792 !important;
        font-weight: 400 !important;
    }
</style>

<template>
  <div>
    <div class="position-relative overflow-hidden mb-4">
      <div class="hero-section position-relative py-5 rounded-4" style="min-height: 400px">
        <div class="container position-relative z-3">
          <div class="row justify-content-center text-center">
            <div class="col-lg-8 col-xl-7">
              <h1 class="display-4 fw-bold text-white mb-4">
                Unlock the Art of Flavor<br class="d-none d-lg-block" />
                <span class="text-success-emphasis">Your Culinary Journey Begins Here!</span>
              </h1>
              <div
                class="input-group mx-auto shadow-lg rounded-pill overflow-hidden"
                style="max-width: 600px"
              >
                <input
                  type="text"    
                  v-model="searchTerm"
                  class="form-control border-0 py-3 px-4"
                  placeholder="Search your favorite foods..."
                />
                <button class="btn btn-success px-4 d-flex align-items-center border-0">
                  <i class="bi bi-search"></i>
                  <span class="ms-2 d-none d-sm-inline">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container px-0 mx-0">
      <!-- Filters Section -->
      <div class="row g-3 my-4 border align-items-center shadow-sm rounded-4 mx-1 pt-1 p-3">
        <!-- Categories -->
        <div class="col-lg-auto">
          <div class="d-flex flex-wrap gap-2">
            <button 
             class="btn rounded px-4 py-2 fs-7 position-relative overflow-hidden"
             v-for="(category, index) in categoryList"
             :key="index"
             :class="{
                'btn-success shadow-sm' : category == selectedCategory,
                'btn-outline-success' : category != selectedCategory
             }"
             @click="selectedCategory = category"
             >
              <span class="position-relative z-1">{{ category }}</span>
            </button>
          </div>
        </div>

        <div class="col-lg-auto order-1 order-lg-2 ms-lg-auto">
          <div class="dropdown">
            <button
              class="btn btn-outline-success rounded px-3 py-2 dropdown-toggle d-flex align-items-center gap-2"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-sort-down"></i>
              <span class="fs-7">{{ selectedSortOption }}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm rounded-3">
              <li v-for="(sortOption, index) in SORT_OPTIONS" :key="index">
                <button class="dropdown-item py-2 px-3 d-flex align-items-center gap-2" 
              @click="selectedSortOption = sortOption">
                  <span class="fs-7 px-3 mx-1">{{ sortOption }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <div class="text-center py-5" v-if="isLoading">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div>
        <div class="row" v-if="filteredItems.length && filteredItems.length > 0">
          <MenuItemCard 
            class="list-item col-12 col-md-6 col-lg-4 pb-4"
            v-for="(menuItem, index) in filteredItems"
            :key="menuItem.id"
            :menuItem="menuItem"
            >
          </MenuItemCard>
        </div>
        <div class="text-center py-5 display-4 mx-auto text-body-secondary mb-3 d-block" v-if="filteredItems.length == 0">
            <i class="bi bi-emoji-frown"></i>
            <p class="lead text-body-secondary">No menu items found matching your criteria</p>
          </div>
      </div>
    </div>

    <!-- Menu Detail Modal -->
  </div>
</template>

<script setup>
    import MenuItemCard from '@/components/MenuItemCard.vue';
    import {ref, onMounted, reactive, computed} from 'vue';
    import menuItemService from '@/services/menuItemService';
    import { CATEGORIES, SORT_NAME_A_Z, SORT_NAME_Z_A, SORT_OPTIONS, SORT_PRICE_HIGH_LOW, SORT_PRICE_LOW_HIGH } from '@/constants/constants';
    
    const menuItems = reactive([]);
    const isLoading = ref(false);
    const categoryList = ref(['ALL', ...CATEGORIES]);
    const selectedCategory = ref('ALL');
    const selectedSortOption = ref(SORT_NAME_A_Z);
    const searchTerm = ref('');

    async function FetchMenuItems(){
        try {
            isLoading.value = true;
            var data = await menuItemService.GetMenuItems();
            if(data){
                menuItems.length = 0;
                menuItems.push(...data);
            }
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

    const filteredItems = computed(()=>{
        let tempArray = selectedCategory.value === 'ALL' ? [...menuItems] : menuItems.filter((menuItem) => {
            return menuItem.category.toLowerCase() === selectedCategory.value.toLowerCase();
        });
        
        if(searchTerm.value){
            tempArray = tempArray.filter((menuItem) => menuItem.name.toUpperCase().includes(searchTerm.value.toUpperCase()));
        }

        // Sorting based on Sort options
        if(selectedSortOption.value == SORT_NAME_A_Z){
            tempArray.sort((a, b) => a.name.localeCompare(b.name));
        }

        if(selectedSortOption.value == SORT_NAME_Z_A){
            tempArray.sort((a, b) => b.name.localeCompare(a.name));
        }

        if(selectedSortOption.value == SORT_PRICE_LOW_HIGH){
            tempArray.sort((a, b) => a.price - b.price);
        }

        if(selectedSortOption.value == SORT_PRICE_HIGH_LOW){
            tempArray.sort((a, b) => b.price - a.price);
        }

        return tempArray;
    });

</script>