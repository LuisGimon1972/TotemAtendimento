<template>
  <div class="q-pa-md">
    <h1>Carrinho</h1>

    <div v-if="cart.items.length === 0">Seu carrinho está vazio</div>

    <q-list v-else>
      <q-item v-for="item in cart.items" :key="item.product.id">
        <q-item-section>
          {{ item.product.name }} x {{ item.quantity }} - R$
          {{ (item.product.value * item.quantity).toFixed(2) }}
        </q-item-section>
        <q-item-section side>
          <q-btn flat icon="delete" @click="removeItem(item)" />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="q-mt-md text-h6">Total: R$ {{ cart.total.toFixed(2) }}</div>

    <q-btn
      color="primary"
      label="Finalizar Pedido"
      class="q-mt-md"
      @click="checkout"
      :disable="cart.items.length === 0"
    />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from 'src/types/Cart';
import { api } from 'src/services/Api';
import { useQuasar } from 'quasar';
//import { ref } from 'vue';
import type { Product } from 'src/types/Products';

const cart = useCartStore();
const $q = useQuasar();
//const loading = ref(false);

// Remove item do carrinho e repõe estoque visual
const removeItem = (item: { product: Product; quantity: number }) => {
  // Adiciona de volta o estoque visual na página de produtos
  item.product.quantity += item.quantity;
  cart.remove(item.product.id);
};

const checkout = async () => {
  if (cart.items.length === 0) return;

  const items = cart.items.map((i) => ({
    productId: i.product.id,
    quantity: i.quantity,
  }));

  try {
    const response = await api.post('/orders', { items });
    window.location.reload();
    // Notificação de sucesso
    $q.notify({
      message: response.data.message || 'Pedido realizado com sucesso! 🎉',
      color: 'green',
      position: 'top-right',
      timeout: 2000,
    });

    // Limpa o carrinho
    cart.clear();

    // Recarrega a página para resetar a visualização e o estoque
    window.location.reload();
  } catch (err: unknown) {
    console.error(err);
    let message = 'Erro ao finalizar o pedido';
    if (err && typeof err === 'object' && 'response' in err) {
      const response = (err as { response?: { data?: { message?: string } } }).response;
      message = response?.data?.message ?? message;
    }
    $q.notify({
      message,
      color: 'red',
      position: 'top-right',
      timeout: 2000,
    });
  }
};
</script>
