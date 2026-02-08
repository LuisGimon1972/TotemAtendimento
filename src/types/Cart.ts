import { defineStore } from 'pinia';
import type { Product } from 'src/types/Products';
import { Notify } from 'quasar';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as { product: Product; quantity: number }[],
  }),
  actions: {
    // CartStore
    add(product: Product) {
      const existing = this.items.find((i) => i.product.id === product.id);

      // quantidade no carrinho
      const quantidadeNoCarrinho = existing ? existing.quantity : 0;

      if (quantidadeNoCarrinho < product.quantity) {
        if (existing) existing.quantity++;
        else this.items.push({ product, quantity: 1 });
      } else {
        Notify.create({
          message: `Estoque de ${product.name} esgotado!`,
          color: 'red',
        });
        return;
      }
    },

    remove(productId: number) {
      const item = this.items.find((i) => i.product.id === productId);
      if (item) {
        // ao remover do carrinho, devolve a quantidade ao estoque
        item.product.quantity += item.quantity;
      }
      this.items = this.items.filter((i) => i.product.id !== productId);
    },

    clear() {
      // devolve todos os itens ao estoque antes de limpar
      this.items.forEach((i) => {
        i.product.quantity += i.quantity;
      });
      this.items = [];
    },
  },
  getters: {
    total: (state) => state.items.reduce((acc, i) => acc + i.product.value * i.quantity, 0),
    count: (state) => state.items.reduce((acc, i) => acc + i.quantity, 0),
  },
});
