import { defineStore } from 'pinia';
import type { Product } from 'src/tipos/Produtos';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    total: (state) =>
      state.items.reduce((sum, item) => sum + item.product.value * item.quantity, 0),
  },

  actions: {
    add(product: Product) {
      const item = this.items.find((i) => i.product.id === product.id);

      if (item) {
        if (item.quantity < product.quantity) {
          item.quantity++;
        }
      } else {
        this.items.push({ product, quantity: 1 });
      }
    },

    remove(productId: number) {
      this.items = this.items.filter((i) => i.product.id !== productId);
    },

    clear() {
      this.items = [];
    },
  },
});
