<template>
  <slot/>
  <v-layout class="overflow-visible" style="height: 56px;">
    <v-bottom-navigation
      v-model="value"
      color="primary"
      grow
    >
      <v-btn :value="1" @click="handlePage('/')">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn :value="2" @click="handlePage('/cart')">
        <!-- <div class="position-relative">
          <v-icon>mdi-cart</v-icon>
          <div class="quanlity">1</div>
        </div> -->

        <!-- <v-badge color="error" content="10">
          <v-icon>mdi-store-outline</v-icon>
        </v-badge> -->
        <v-icon>mdi-cart</v-icon>

      </v-btn>
      

      <v-btn :value="3" @click="handlePage('/history')">
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn :value="4" @click="handleLogout">
        <v-icon>mdi-logout</v-icon>

      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script setup lang="ts">
import {signOut} from 'firebase/auth'
const value = ref(1)
const router = useRouter()

const handlePage = (page: string) => {
  console.log('1232', page);
  router.push(page)
}

const auth:any = useFirebaseAuth()
const handleLogout = () => {
  signOut(auth)
}
</script>