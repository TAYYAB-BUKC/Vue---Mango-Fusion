<template>
     <div class="container-fluid py-2">
    <!-- <h1 class="mb-4">Order Management</h1> -->
    <p class="text-success h2 pb-1">Order Management</p>
    <!-- Filters -->
    <div class="card border-0 shadow-sm p-4 mb-4">
      <div class="row">
        <div class="col-md-4 mb-3">
          <label class="form-label">Filter by Status</label>
          <select v-model="statusFilter" class="form-select">
            <option value="">All Status</option>
            <option v-for="status in ORDER_STATUSES" :key="status" :value="status">{{ status }}</option>
          </select>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Sort By</label>
          <select v-model="sortBy" class="form-select">
            <option value="id">Order ID</option>
            <option value="orderTotal">Total Amount</option>
            <option value="name">Customer Name</option>
          </select>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Sort Direction</label>
          <select v-model="sortDirection" class="form-select">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-8 mb-3">
          <label class="form-label">Search</label>
          <input type="text" class="form-control" placeholder="Search by name, email or phone" v-model="searchQuery"/>
        </div>
        <div class="col-md-4 mb-3 d-flex align-items-end">
          <button class="btn btn-outline-secondary w-100" @click="ResetFilters">Reset Filters</button>
        </div>
      </div>
    </div>

    <div class="text-center py-4 fs-5 text-body-secondary" v-if="isLoading">Loading orders...</div>
    <div class="text-center py-5 card border-0 shadow-sm" v-else-if="filteredOrders.length === 0">
      <p class="mb-0">No orders found matching your criteria.</p>
    </div>
    <div v-else>
      <div class="mb-3">
        <span class="badge bg-success">{{ filteredOrders.length }} orders found</span>
      </div>
      <div class="table-responsive card border-0 shadow-sm">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th style="cursor: pointer" @click="updateSortBy('id')">
                Order ID
                <span class="ms-1" v-if="sortBy == 'id'"> {{ sortDirection == 'asc' ? '↑' : '↓' }} </span>
              </th>
              <th style="cursor: pointer"  @click="updateSortBy('name')">
                Customer
                <span class="ms-1" v-if="sortBy == 'name'"> {{ sortDirection == 'asc' ? '↑' : '↓' }} </span>
              </th>
              <th>Contact</th>
              <th>Number of Items</th>
              <th style="cursor: pointer"  @click="updateSortBy('orderTotal')">
                Total
                <span class="ms-1" v-if="sortBy == 'orderTotal'"> {{ sortDirection == 'asc' ? '↑' : '↓' }} </span>
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in paginatedOrders" :key="order.id">
              <td>#{{ order?.id }}</td>
              <td>{{ order?.name }}</td>
              <td>
                <div>{{ order?.phoneNumber }}</div>
                <div class="text-body-secondary small">{{ order?.email }}</div>
              </td>
              <td>{{ order?.orderItems }} Items</td>
              <td>$ {{ order.orderTotal }}</td>
              <td>
                <div class="badge rounded-pill" :class="{
                    'bg-warning-subtle text-warning-emphasis': order.status === ORDER_STATUS_RECEIVED,
                    'bg-primary-subtle text-primary-emphasis': order.status === ORDER_STATUS_ACCEPTED,
                    'bg-info-subtle text-info-emphasis': order.status === ORDER_STATUS_READYFORPICKUP,
                    'bg-success-subtle text-success-emphasis': order.status === ORDER_STATUS_DELIVERED,
                    'bg-danger-subtle text-danger-emphasis': order.status === ORDER_STATUS_CANCELLED
                }">{{ order.status }}</div>
              </td>
              <td>
                <button class="btn btn-sm btn-success">
                  <i class="bi bi-card-checklist"></i> &nbsp;View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <nav aria-label="Order pagination" class="mt-4 d-flex justify-content-end">
        <ul class="pagination pagination-md">
          <!-- First page button -->
          <li class="page-item">
            <a class="page-link text-success border-success" href="#" aria-label="First" @click="updatePage(1)">
              <span aria-hidden="true">&laquo;</span>
              <span class="visually-hidden">First page</span>
            </a>
          </li>

          <!-- Previous button -->
          <li class="page-item">
            <a class="page-link text-success border-success" href="#" aria-label="Previous" @click="updatePage(currentPage - 1)">
              <span aria-hidden="true">&lsaquo;</span>
              <span class="visually-hidden">Previous page</span>
            </a>
          </li>

          <!-- Page numbers with limited display -->
          <template v-for="page in displayedPageNumbers" :key="page">
            <li class="page-item disabled" v-if="page == '...'">
                <span class="page-link border-success">...</span>
            </li>
            <li class="page-item" v-else>
                <a :class="
                    page == currentPage ? 'bg-success border-success text-white' : 'text-success border-success'
                " class="page-link text-muted border-success" href="#" @click="updatePage(page)"> {{ page }} </a>
            </li>
          </template>
          
          <!-- Next button -->
          <li class="page-item">
            <a class="page-link text-success border-success" href="#" aria-label="Next" @click="updatePage(currentPage + 1)">
              <span aria-hidden="true">&rsaquo;</span>
              <span class="visually-hidden">Next page</span>
            </a>
          </li>

          <!-- Last page button -->
          <li class="page-item">
            <a class="page-link text-success border-success" href="#" aria-label="Last" @click="updatePage(totalPages)">
              <span aria-hidden="true">&raquo;</span>
              <span class="visually-hidden">Last page</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Order Details Modal Component -->
     <OrderDetailsModal></OrderDetailsModal>
  </div>
</template>

<script setup>
    import { ref, onMounted, reactive, computed } from 'vue';
    import orderService from '@/services/orderService';
    import { useSweetAlert } from '@/composibles/useSweetAlert';
    import { ORDER_STATUS_ACCEPTED, ORDER_STATUS_CANCELLED, ORDER_STATUS_DELIVERED, ORDER_STATUS_READYFORPICKUP, ORDER_STATUS_RECEIVED, ORDER_STATUSES } from '@/constants/constants';
    import OrderDetailsModal from '@/components/card/OrderDetailsModal.vue';
    
    const isLoading = ref(false);
    const orders = reactive([]);
    const { showError } = useSweetAlert();

    // Filtering and Sorting
    const statusFilter = ref('');
    const searchQuery = ref('');
    const sortBy = ref('id');
    const sortDirection = ref('desc');

    const itemsPerPage = 5;
    const currentPage = ref(1);
    
    onMounted(async () => {
        await FetchOrders();
    });

    async function FetchOrders(){
        isLoading.value = true;
        try {
            const response = await orderService.GetOrders('');
            orders.push(...response); 
        } catch (error) {
            console.error(error);
            showError(error.message);
        }
        finally{
            isLoading.value = false;
        }
    }

    function ResetFilters(){
         statusFilter.value = '';
         searchQuery.value = '';
         sortBy.value = 'id';
         sortDirection.value = 'desc';
         currentPage.value = 1;
    }

    const filteredOrders  = computed(()=>{
        let filteredOrders = [...orders];
    
        if(statusFilter.value){
            filteredOrders = filteredOrders.filter((order) => order.status.toUpperCase() === statusFilter.value.toUpperCase());
        }

        if(searchQuery.value){
            filteredOrders = filteredOrders.filter((order) => 
                                order.name.toUpperCase().includes(searchQuery.value.toUpperCase())
                                || order.email.toUpperCase().includes(searchQuery.value.toUpperCase())
                                || order.phoneNumber.toUpperCase().includes(searchQuery.value.toUpperCase()));
        }
    
        filteredOrders.sort((a,b)=> {
            let aValue = a[sortBy.value];
            let bValue = b[sortBy.value];

            if(typeof(aValue)  == 'string'){
                aValue = aValue.toUpperCase();
                bValue = bValue.toUpperCase();
            }

            if(sortDirection.value == 'asc'){
                return aValue > bValue ? 1 : -1;
            }
            else{
                return aValue < bValue ? 1 : -1;
            }
        })

        return filteredOrders;
    });

    const updateSortBy = (columnName) => {
        if(sortBy.value == columnName){
            sortDirection.value = sortDirection.value == 'asc' ? 'desc' : 'asc';
        }
        else{
            sortBy.value = columnName;
            sortDirection.value = 'asc';
        }
    };

    const totalPages = computed(() => {
        return Math.ceil(filteredOrders.value.length / itemsPerPage);
    });
    
    const paginatedOrders = computed(() => {
        const startIndex = (currentPage.value  - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredOrders.value.slice(startIndex, endIndex);
    });

    const updatePage = (page) => {
        if(page < 1 || page > totalPages.value){
            return;
        }
        currentPage.value = page;
    };

    const displayedPageNumbers = computed(() => {
        const delta = 1; // Number of pages to show before and after the current page

        if(totalPages.value <= 5){
            return Array.from({length: totalPages.value}, (_, i) => i + 1);
        }

        let range = [];

        range.push(1);

        const rangeStart = Math.max(2, currentPage.value - delta);
        const rangeEnd = Math.min(totalPages.value - 1, currentPage.value + delta);

        if(rangeStart > 2){
            range.push('...');
        }

        for(let i = rangeStart; i <= rangeEnd; i++){
            range.push(i);
        } 

        if(rangeEnd < totalPages.value - 1){
             range.push('...');
        }

         range.push(totalPages.value);

         return range;
    });

</script>