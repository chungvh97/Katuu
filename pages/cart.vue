<template>
  <v-container>
    <h1 class="mb-4">Cart</h1>
    <v-card
      v-for="(item, index) in todos"
      :key="index"
      class="mx-auto mb-2"
      elevation="3"
      hover
      @click="handleCard(item)"
    >
      <v-card-item>
        <div class="d-flex">
          <v-img
            style="max-width: 70px; width: 100%; height: auto; max-height: 70px;"
            aspect-ratio="4/3"
            cover
            :src="item.type ? '' :kemtrungchay"
          />
          <div class="d-flex flex-column ml-2 w-100">
            <div class="d-flex justify-content-space-between w-100">
              <b >{{ item.type ? ('Bánh kem ' + item.name) : item.name }}</b>
              <b class="text-primary" style="white-space: nowrap;">{{ (item.price && item.quantity) ? formatCurrency(item.price * item.quantity) : formatCurrency(item.price) }}</b>
            </div>
            <div class="mt-2" v-if="item.size && item.quantity">
              <span>Size: {{ item.size.isActive }}</span> - <span>Số lượng: {{ item.quantity }}</span>
            </div>
            <div class="mt-2" v-if="item.topping">
              Topping: {{ selectedProductNames(JSON.parse(item.topping)) }}
            </div>
            <div class="mt-2">
              <span>
                Note: {{ item.comment }}
              </span>
            </div>
          </div>
        </div>
      </v-card-item>
    </v-card>
    <v-card class="mt-4">
      <v-card-item>
        <div class="d-flex justify-content-space-between">
          <h2>Total Price:</h2>
          <h2 class="text-primary">{{ formatCurrency(totalPrice) }}</h2>
        </div>
      </v-card-item>
    </v-card>

    <v-card class="mt-4 c-changed">
      <v-card-item>
        <v-radio-group v-model="changed" inline label="Thanh Toán:">
          <v-radio label="Tiền Mặt" value="TM" />
          <v-radio label="Chuyển Khoản" value="CK"/>
        </v-radio-group>
      </v-card-item>
    </v-card>

    

    <v-btn
      class="mt-4"
      color="primary"
      block
      @click="todos.length === 0 ? null : addProducts()"
    >
      Mua
    </v-btn>
  </v-container>

  <ModalEdit ref="refModal" />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import katuu from '@/assets/images/katuu.jfif'
import kemtrungchay from '@/assets/images/kemtrungchay.jfif'

import { initializeApp } from 'firebase/app'
import { useCollection, VueFireFirestoreOptionsAPI, VueFire  } from 'vuefire'
import { collection, addDoc, query, orderBy, serverTimestamp, doc, deleteDoc, getDocs, getFirestore, writeBatch  } from 'firebase/firestore'
import { useIndex } from '~/store'

const db = useFirestore()
const todos = useCollection(query(collection(db, 'products'), orderBy('createdAt', 'desc')))

const store = useIndex()
const totalPrice = computed(() => {
  return todos.value.reduce((sum, product) => {
    let price = (product.quantity ? (product.price * product.quantity) : product.price)
    return (sum + (price || 0));
  }, 0);
});
const router = useRouter()

// onMounted(() => {
//   if (todos.value.length === 0) {
//     router.push('/')
//     store.updateIndex(1)
//   }
// })

const refModal = ref()
const changed = ref('TM')

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

const addProducts = async () => {
  let yourDate = new Date()
  yourDate.toISOString().split('T')[0]

  const items = {
    data: todos.value.map((sum, product) => {
      return sum;
    }),
    totalPrice: totalPrice.value,
    createdAt: yourDate,
    changed: changed.value
  }
  // ✨ add a new todo
  await addDoc(collection(db, "history"), items).then(() => {
    deleteAllDocuments("products")
    changed.value = 'TM'
    router.push('/')
  })
}
const firebaseApp = initializeApp({
  apiKey: "AIzaSyD2B0zCpxtQcPNoyTAyVePabbZrsvMfvs4",
  authDomain: "nuxt-blog-4bf26.firebaseapp.com",
  databaseURL: "https://nuxt-blog-4bf26.firebaseio.com",
  projectId: "nuxt-blog-4bf26",
  storageBucket: "nuxt-blog-4bf26.appspot.com",
  messagingSenderId: "93634015500",
  appId: "1:93634015500:web:9cabc4347b0835340bd929",
  measurementId: "G-7WLZ5RDWE2"
})

const db1 = getFirestore(firebaseApp);

const deleteAllDocuments = async (collectionName: any) => {
  try {
    const querySnapshot = await getDocs(collection(db1, collectionName));
    const batch = writeBatch(db1); // Sử dụng writeBatch thay vì db.batch()

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref); // Thêm lệnh xóa cho từng tài liệu
    });

    // Thực hiện lệnh xóa hàng loạt
    await batch.commit();
    console.log('Tất cả tài liệu trong collection đã được xóa!');
  } catch (error) {
    console.error('Lỗi khi xóa tài liệu:', error);
  }
}
</script>
