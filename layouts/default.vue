<template>
  <slot/>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      v-model="index"
      color="primary"
      grow
    >
      <v-btn :value="1" @click="handlePage('/', 1)">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn :value="2" @click="handlePage('/cart', 2)">
        <!-- <div class="position-relative">
          <v-icon>mdi-cart</v-icon>
          <div class="quanlity">1</div>
        </div> -->

        <!-- <v-badge color="error" content="10">
          <v-icon>mdi-store-outline</v-icon>
        </v-badge> -->
        <v-icon>mdi-cart</v-icon>

      </v-btn>
      

      <v-btn :value="3" @click="handlePage('/history', 3)">
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <!-- <v-btn :value="4" @click="handleLogout">
        <v-icon>mdi-logout</v-icon>

      </v-btn> -->
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup lang="ts">
import {signOut} from 'firebase/auth'
import { useIndex } from '~/store';
const router = useRouter()

const store = useIndex()
const {index} = storeToRefs(store)

const handlePage = (page: string, number: number) => {
  router.push(page)
  store.updateIndex(number)
}

const auth:any = useFirebaseAuth()
const handleLogout = () => {
  signOut(auth)
}
</script>