<template>
  <v-container>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="deep-purple-accent-4"
    >
      <v-tab :value="1">Trà Sữa</v-tab>
      <v-tab :value="2">Sữa Tươi</v-tab>
      <v-tab :value="3">Trà</v-tab>
      <v-tab :value="4">Cafe</v-tab>
      <v-tab :value="5">Bánh Kem</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <v-container fluid>
          <v-card
            v-for="(item, idx) in dataMilkTea"
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
                  :src="item.img"
                />
                <div class="d-flex flex-column ml-2 w-100">
                  <div class="d-flex justify-content-space-between w-100">
                    <b>{{ item.name }}</b>

                    
                  </div>
                  <div class="text-primary">Size: {{ item.size.isActive }} - {{ formatCurrency(item.size.M) }} </div>
                  <div v-if="item.size.L" class="text-primary">Size: L - {{ formatCurrency(item.size.L) }} </div>
                </div>
              </div>
              
            </v-card-item>
          </v-card>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item :value="2">
        <v-container fluid>
          <v-card
            v-for="(item, idx) in dataMilk"
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
                  :src="item.img"
                />
                <div class="d-flex flex-column ml-2 w-100">
                  <div class="d-flex justify-content-space-between w-100">
                    <b>{{ item.name }}</b>

                    
                  </div>
                  <div class="text-primary">Size: {{ item.size.isActive }} - {{ formatCurrency(item.size.M) }} </div>
                  <div v-if="item.size.L" class="text-primary">Size: L - {{ formatCurrency(item.size.L) }} </div>
                </div>
              </div>
              
            </v-card-item>
          </v-card>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item :value="3">
        <v-container fluid>
          <v-card
            v-for="(item, idx) in dataTea"
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
                  :src="item.img"
                />
                <div class="d-flex flex-column ml-2 w-100">
                  <div class="d-flex justify-content-space-between w-100">
                    <b>{{ item.name }}</b>

                    
                  </div>
                  <div class="text-primary">Size: {{ item.size.isActive }} - {{ formatCurrency(item.size.M) }} </div>
                  <div v-if="item.size.L" class="text-primary">Size: L - {{ formatCurrency(item.size.L) }} </div>
                </div>
              </div>
              
            </v-card-item>
          </v-card>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item :value="4">
        <v-container fluid>
          <v-card
            v-for="(item, idx) in dataCafe"
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
                  :src="item.img"
                />
                <div class="d-flex flex-column ml-2 w-100">
                  <div class="d-flex justify-content-space-between w-100">
                    <b>{{ item.name }}</b>

                    
                  </div>
                  <div class="text-primary">Size: {{ item.size.isActive }} - {{ formatCurrency(item.size.M) }} </div>
                  <div v-if="item.size.L" class="text-primary">Size: L - {{ formatCurrency(item.size.L) }} </div>
                </div>
              </div>
              
            </v-card-item>
          </v-card>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item :value="5">
        <v-container fluid>
          <v-card
            class="mx-auto mb-2"
            elevation="3"
            hover
          >
            <v-card-item>
              <v-form>
                <v-text-field
                  v-model="bakery.name"
                  label="Tên bánh:"
                ></v-text-field>

                <v-text-field
                  inputmode="numeric"
                  type="number"
                  v-model="bakery.price"
                  :label="'Giá: ' + formatCurrency(bakery.price)"
                ></v-text-field>

                <v-textarea label="Note" v-model="bakery.comment" name="input-7-1" variant="filled" auto-grow></v-textarea>

                <v-btn class="mt-2" color="primary" block @click='submit'>Mua</v-btn>
              </v-form>
              
            </v-card-item>
          </v-card>
        </v-container>
      </v-tabs-window-item>

      
    </v-tabs-window>


  </v-container>

  <Modal ref="refModal" />

  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card
      max-width="400"
      text="Thêm sản phẩm thành công"
    >
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="Đóng"
          @click="dialog = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
  
</template>

<script setup lang="ts">
import katuu from '@/assets/images/katuu.jfif'
import kemtrungchay from '@/assets/images/kemtrungchay.jfif'
import logo from '@/assets/images/logo.jpg'

import { useCollection, useFirestore  } from 'vuefire'
import { collection, addDoc, serverTimestamp  } from 'firebase/firestore'

const dialog = ref(false)

const tab = ref(null)
const bakery = ref({
  name: '',
  price: '',
  comment: ''
})

const dataMilkTea = ref([
  {
    name: 'Trà sữa Katuu ( 7 loại Topping )', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 30000,
      'L': 35000
    }
  },
  {
    name: 'Trà sữa truyền thống', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 20000,
      'L': 25000
    }
  },
  {
    name: 'Trà sữa hạt dẻ phô mai', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 27000,
      'L': 32000
    }
  },
  {
    name: 'Trà sữa kem macchiato', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 27000,
      'L': 32000
    }
  },
  {
    name: 'Trà sữa kem trứng cháy', 
    img: kemtrungchay, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 27000,
      'L': 32000
    }
  },
  {
    name: 'Trà sữa chocomint', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 25000,
      'L': 30000
    }
  },
  {
    name: 'Trà sữa socola', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 25000,
      'L': 30000
    }
  },
  {
    name: 'Trà sữa Okinawa', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 20000,
      'L': 25000
    }
  },
  {
    name: 'Trà sữa Ô long', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 23000,
      'L': 28000
    }
  },
  {
    name: 'Trà sữa lài', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 20000,
      'L': 25000
    }
  },
  {
    name: 'Trà sữa matcha', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 23000,
      'L': 28000
    }
  },
  {
    name: 'Trà sữa khoai môn', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 23000,
      'L': 28000
    }
  },
])

const dataTea = ref([
  {
    name: 'Trà vải', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 30000,
    }
  },
  {
    name: 'Trà ổi', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 30000,
    }
  },
  {
    name: 'Trà nhãn', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 30000,
    }
  },
  {
    name: 'Trà trái cây nhiệt đới', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 33000,
    }
  },
  {
    name: 'Trà cam bưởi xí muội', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 30000,
    }
  },
  {
    name: 'Trà đào', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 30000,
    }
  },
  {
    name: 'Lục trà chanh mật ong', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 25000,
    }
  },
  {
    name: 'Lục trà xoài macchiato', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 30000,
    }
  },
  {
    name: 'Lục trà chanh macchiato', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 30000,
    }
  }
])

const dataCafe = ref([
  {
    name: 'Cafe đen', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 15000,
    }
  },
  {
    name: 'Cafe sữa', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 18000,
    }
  },
  {
    name: 'Bạc xỉu', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 20000,
    }
  },
  {
    name: 'Cafe sữa tươi sương sáo', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 23000,
    }
  },
  {
    name: 'Cafe kem sữa', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 23000,
    }
  },
])

const dataMilk:any = ref([
  {
    name: 'Sữa tươi trân châu đường đen', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 28000,
      'L': 33000
    }
  },
  {
    name: 'Sữa tươi chuối', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 30000,
      'L': 35000
    }
  },
  {
    name: 'Sữa tươi trà xanh', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 30000,
      'L': 35000
    }
  },
  {
    name: 'Sữa tươi choco', 
    img: logo, 
    comments: '',
    topping:[],
    size: {
      'isActive': 'M',
      'M': 30000,
      'L': 35000
    }
  },
])

const formatCurrency = (value: any) => {
  return new Intl.NumberFormat('vi-VN').format(value) + ' đ';
};

const refModal = ref()

const handleCard = async (item: any) => {
  await refModal.value.showModal(item)
}


const submit = async (event: any) => {
  const item = JSON.parse(JSON.stringify(bakery.value))
  item['createdAt'] = serverTimestamp()
  item['type'] = 'Bánh Kem'
  item['price'] = parseInt(item['price'])

  const db = useFirestore()
  await addDoc(collection(db, "products"), item).then(() => {
    dialog.value = true
    bakery.value = {
      name: '',
      price: '',
      comment: ''
    }
  })
}
</script>