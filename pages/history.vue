<template>
  <v-container>
    <h1 class="mb-4">History</h1>
    <div>
      Ngày: {{ newDate }} - <span class="text-primary">{{formatCurrency(totalPrice)}}</span>
    </div>
    <br>
    <v-card
      v-for="(item, index) in todos"
      :key="index"
      class="mx-auto mb-2"
      elevation="3"
    >
      <v-card-item>
        <div class="text-primary">
          Ngày: {{ convertTimestamp(item.createdAt.seconds, item.createdAt.nanoseconds) }}
        </div>
        <div>
          Số lượng: {{ item.data.length }}
        </div>
        <div>
          Tổng tiền: {{ formatCurrency(item.totalPrice) }} 
        </div>
        <!-- <div class="d-flex">
          <v-img
            style="max-width: 70px; width: 100%; height: auto; max-height: 70px;"
            aspect-ratio="4/3"
            cover
            :src="kemtrungchay"
          />
          <div class="d-flex flex-column ml-2 w-100">
            <div class="d-flex justify-content-space-between w-100">
              <b >{{ item.name }}</b>
              <b class="text-primary" style="white-space: nowrap;">{{ formatCurrency(item.price * item.quantity) }}</b>
            </div>
            <div class="mt-2">
              <span>Size: {{ item.size.isActive }}</span> - <span>Số lượng: {{ item.quantity }}</span>
            </div>
            <div class="mt-2">
              Topping: {{ selectedProductNames(JSON.parse(item.topping)) }}
            </div>
            <div class="mt-2">
              <span>
                Note: {{ item.comment }}
              </span>
            </div>
          </div>
        </div> -->
      </v-card-item>
    </v-card>
    
    
  </v-container>

  <ModalEdit ref="refModal" />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import katuu from '@/assets/images/katuu.jfif'
import kemtrungchay from '@/assets/images/kemtrungchay.jfif'

import { initializeApp } from 'firebase/app'
import { useCollection, VueFireFirestoreOptionsAPI, VueFire  } from 'vuefire'
import { collection, addDoc, serverTimestamp, doc, deleteDoc, getDocs, getFirestore, writeBatch  } from 'firebase/firestore'

const db = useFirestore()
const todos = useCollection(collection(db, 'history'))

console.log(todos);

const convertTimestamp = (seconds: any, nanoseconds: any) => {
    // Chuyển đổi giây thành milliseconds
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    
    // Tạo đối tượng Date từ milliseconds
    const date = new Date(milliseconds);

    // Lấy các thành phần của ngày
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0 nên cần +1
    const day = String(date.getDate()).padStart(2, '0');
    
    // Lấy các thành phần của thời gian
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const secondsPart = String(date.getSeconds()).padStart(2, '0');

    // Trả về kết quả định dạng yyyy-mm-dd hh:mm:ss
    return `${year}-${month}-${day} ${hours}:${minutes}:${secondsPart}`;
}


const newDate = computed(() => {
  const date = new Date();

// Lấy các thành phần của ngày
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0 nên cần +1
const day = String(date.getDate()).padStart(2, '0');

// Trả về kết quả định dạng yyyy-mm-dd hh:mm:ss
return `${year}-${month}-${day}`;

})

const totalPrice = computed(() => {
  return todos.value.reduce((sum, product) => {
    return (sum + (product.totalPrice || 0));
  }, 0);
});

const refModal = ref()

const handleCard = async (item: any) => {
  await refModal.value.showModal(item)
}

const formatCurrency = (value: any) => {
  return new Intl.NumberFormat('vi-VN').format(value) + ' đ';
};

const selectedProductNames = (products: any) => {
  return products
  .filter((product: any) => product.isChecked)
  .map((product: any) => product.name)
  .join(', ');
}

</script>

