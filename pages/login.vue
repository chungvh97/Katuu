<template>
  <v-app id="inspire">
     <v-content>
        <v-container fluid fill-height>
           <v-layout align-center justify-center>
              <v-flex style="width: 100%;">
                 <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                       <v-toolbar-title>Login form</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                       <v-form>
                          <v-text-field
                             name="login"
                             label="Login"
                             type="text"
                          ></v-text-field>
                          <v-text-field
                             id="password"
                             name="password"
                             label="Password"
                             type="password"
                          ></v-text-field>
                       </v-form>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="primary" @click="signInWithGoogle">Login G</v-btn>
                       <v-spacer></v-spacer>
                       <v-btn color="primary">Login</v-btn>
                    </v-card-actions>
                 </v-card>
              </v-flex>
           </v-layout>
        </v-container>
     </v-content>
  </v-app>
</template>

<script setup lang="ts">
import {signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const auth:any = useFirebaseAuth()
const router = useRouter()

const signInWithGoogle = () => {
//   signInWithPopup(auth, new GoogleAuthProvider()).then(() => {
//     router.replace('/')
//   })
}
</script>

<style></style>
