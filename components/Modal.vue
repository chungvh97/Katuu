<template>
  <v-dialog v-model="isShow" max-width="600" scrollable>
    <template v-slot:default="{ isActive }">
      <v-card prepend-icon="mdi-cart" :title="infoModal.name">
        <v-divider class="mt-3"></v-divider>

        <v-card-text class="px-4" style="height: 300px;">
          <v-card-text>
            <v-row>
              <v-radio-group
                v-model="infoModal.size.isActive"
                inline
                @change="updateSize($event)"
              >
                <v-radio
                  label="Size M"
                  value="M"
                ></v-radio>
                <v-radio
                  v-if="infoModal.size['L']"
                  label="Size L"
                  value="L"
                ></v-radio>
              </v-radio-group>
            </v-row>

            <v-row>
              <v-number-input :width="200" v-model="quantity" :min="1" :reverse="false" controlVariant="split"
                label="Số Lượng" :hideInput="false" inset variant="outlined"></v-number-input>
            </v-row>
            <v-row dense>
              <v-checkbox v-for="(item, idx) in topping" v-model="item.isChecked" :label="item.name" @change="updateTopping(idx)"
                hide-details></v-checkbox>
            </v-row>

            <v-row>
              <v-textarea label="Note" v-model="comment" name="input-7-1" variant="filled" auto-grow></v-textarea>
            </v-row>
          </v-card-text>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text="Close" @click="closeModal"></v-btn>
          <v-spacer></v-spacer>
          <div style="color: #1976D2;">{{ reloadPrice }}</div>

          <v-spacer></v-spacer>

          <v-btn color="surface-variant" text="Save" variant="flat" @click="handleSubmit"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { initializeApp } from 'firebase/app'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

import { useCollection, useFirestore  } from 'vuefire'
import { collection, addDoc, serverTimestamp  } from 'firebase/firestore'


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


const db = useFirestore()

const isShow = ref(false)

const topping:any = ref({
  1: {
    name: 'Trân Châu Đen',
    price: 5000,
    isChecked: false,
  },
  2: {
    name: 'Trân Châu Trắng',
    price: 5000,
    isChecked: false
  },
  3: {
    name: 'Trân Châu Dừa',
    price: 5000,
    isChecked: false
  },
  4: {
    name: 'Pudding Trứng',
    price: 5000,
    isChecked: false
  },
  5: {
    name: 'Pudding Socola',
    price: 5000,
    isChecked: false
  },
  6: {
    name: 'Sương Sáo',
    price: 5000,
    isChecked: false
  },
  7: {
    name: 'Rau Câu Phô Mai',
    price: 5000,
    isChecked: false
  },
  8: {
    name: 'Phô Mai Tươi',
    price: 5000,
    isChecked: false
  },
  9: {
    name: 'Thạch Táo',
    price: 5000,
    isChecked: false
  },
  10: {
    name: 'Khúc Bạch',
    price: 5000,
    isChecked: false
  },
  11: {
    name: 'Chân Mèo',
    price: 5000,
    isChecked: false
  },
  12: {
    name: 'Đào miếng',
    price: 7000,
    isChecked: false
  },
  13: {
    name: 'Trái nhãn',
    price: 7000,
    isChecked: false
  },
  14: {
    name: 'Trái vải',
    price: 7000,
    isChecked: false
  },
  15: {
    name: 'Kem machiato',
    price: 7000,
    isChecked: false
  },
  16: {
    name: 'Kem trứng cháy',
    price: 7000,
    isChecked: false
  },
  17: {
    name: 'Full topping',
    price: 10000,
    isChecked: false
  },
})

const infoModal = ref()
const quantity:any = ref(1)
const comment = ref('')
const price:any = ref('')

const reloadPrice = computed(() => {
  return (price.value * quantity.value)
})

const updateSize = (event: Event) => {
  let totalTopping = 0;
  Object.entries(topping.value).forEach((ele:any) => {
    if(ele[1].isChecked) {
      totalTopping += ele[1].price
    }
  })  

  
  price.value = (infoModal.value.size[infoModal.value.size.isActive] + totalTopping)
}

const updateTopping = (idx: number) => {
  if(topping.value[idx].isChecked) {
    price.value +=  topping.value[idx].price
  } else {
    price.value = (price.value - topping.value[idx].price)
  }
}

const showModal = (item: any) => {
  isShow.value = true
  infoModal.value = JSON.parse(JSON.stringify(item))
  price.value = infoModal.value.size[infoModal.value.size.isActive]

  
}

const handleSubmit = async () => {
  let newTopping:any = []
  Object.entries(topping.value).filter((ele:any) => {
    if(ele[1].isChecked) {
      newTopping.push(ele[1])
    }
  })  
  let yourDate = new Date()
  yourDate.toISOString().split('T')[0]
  const item = {
    name: infoModal.value.name,
    quantity: quantity.value,
    comment: comment.value,
    size: infoModal.value.size,
    topping: JSON.stringify(newTopping),
    createdAt: yourDate,
    price: price.value
  }

  const product:any = useCookie('product')
  product.value = item;


  // ✨ add a new todo
  await addDoc(collection(db, "products"),item);


  closeModal()
}

const closeModal = () => {
  quantity.value = 1;
  comment.value = '';
  price.value = 0; 
  Object.entries(topping.value).forEach((ele:any) => {
    ele[1].isChecked = false
  })  
  isShow.value = false
}

defineExpose({ showModal })
</script>
