import { defineStore } from 'pinia'

export const useIndex = defineStore('index', {
    state: () => ({
      product: [],
      index: 1,
    }),
    actions: {
      // since we rely on `this`, we cannot use an arrow function
      addProduct(params) {
        this.product.push(params)
      },
      updateIndex(params) {
        this.index = params
      }
    },
  })