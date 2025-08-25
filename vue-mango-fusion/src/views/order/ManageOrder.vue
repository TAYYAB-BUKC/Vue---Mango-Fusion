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
          <select class="form-select">
            <option value="orderHeaderId">Order ID</option>
            <option value="orderTotal">Total Amount</option>
            <option value="pickUpName">Customer Name</option>
          </select>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Sort Direction</label>
          <select class="form-select">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-md-8 mb-3">
          <label class="form-label">Search</label>
          <input type="text" class="form-control" placeholder="Search by name, email or phone" />
        </div>
        <div class="col-md-4 mb-3 d-flex align-items-end">
          <button class="btn btn-outline-secondary w-100">Reset Filters</button>
        </div>
      </div>
    </div>

    <div class="text-center py-4 fs-5 text-body-secondary">Loading orders...</div>
    <div class="text-center py-5 card border-0 shadow-sm">
      <p class="mb-0">No orders found matching your criteria.</p>
    </div>
    <div>
      <div class="mb-3">
        <span class="badge bg-success">XX orders found</span>
      </div>
      <div class="table-responsive card border-0 shadow-sm">
        <table class="table table-hover mb-0">
          <thead>
            <tr>
              <th class="cursor-pointer">
                Order ID
                <span class="ms-1"> ↑↓ </span>
              </th>
              <th class="cursor-pointer">
                Customer
                <span class="ms-1"> ↑↓ </span>
              </th>
              <th>Contact</th>
              <th>Number of Items</th>
              <th class="cursor-pointer">
                Total
                <span class="ms-1"> ↑↓ </span>
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td>#{{ order?.id }}</td>
              <td>{{ order?.name }}</td>
              <td>
                <div>{{ order?.phoneNumber }}</div>
                <div class="text-body-secondary small">{{ order?.email }}</div>
              </td>
              <td>{{ order?.orderItems }} Items</td>
              <td>$ {{ order.orderTotal }}</td>
              <td>
                <div class="badge rounded-pill">{{ order.status }}</div>
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
            <a class="page-link text-success border-success" href="#" aria-label="First">
              <span aria-hidden="true">&laquo;</span>
              <span class="visually-hidden">First page</span>
            </a>
          </li>

          <!-- Previous button -->
          <li class="page-item">
            <a class="page-link text-success border-success" href="#" aria-label="Previous">
              <span aria-hidden="true">&lsaquo;</span>
              <span class="visually-hidden">Previous page</span>
            </a>
          </li>

          <!-- Page numbers with limited display -->
          <li class="page-item disabled">
            <span class="page-link border-success">...</span>
          </li>
          <li class="page-item">
            <a class="page-link text-muted border-success" href="#"> XX </a>
          </li>
          <!-- Next button -->
          <li class="page-item">
            <a class="page-link text-success border-success" href="#" aria-label="Next">
              <span aria-hidden="true">&rsaquo;</span>
              <span class="visually-hidden">Next page</span>
            </a>
          </li>

          <!-- Last page button -->
          <li class="page-item">
            <a class="page-link text-success border-success" href="#" aria-label="Last">
              <span aria-hidden="true">&raquo;</span>
              <span class="visually-hidden">Last page</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Order Details Modal Component -->
  </div>
</template>

<script setup>
    import { ref, onMounted, reactive, computed } from 'vue';
    import orderService from '@/services/orderService';
    import { useSweetAlert } from '@/composibles/useSweetAlert';
    import { ORDER_STATUSES } from '@/constants/constants';
    
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
        console.log('filteredOrders');
        console.log(filteredOrders);
        console.log('statusFilter.value : ' + statusFilter.value);
        if(statusFilter.value){
            filteredOrders = filteredOrders.filter((order) => order.status.toUpperCase() === statusFilter.value.toUpperCase());
        }

        console.log('filteredOrders after status filter');
        console.log(filteredOrders);
        

        return filteredOrders;
    });
</script>