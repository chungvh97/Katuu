import { defineStore } from 'pinia'

export const useIndex = defineStore('index', {
    state: () => ({
      product: [],
    }),
    actions: {
      // since we rely on `this`, we cannot use an arrow function
      addProduct(params) {
        this.product.push(params)
      },
    },
  })