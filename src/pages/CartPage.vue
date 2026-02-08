<template>
  <div class="q-pa-md">
    <div class="titulo row items-center q-mb-md">
      <q-icon name="shopping_cart" size="48px" class="q-mr-sm" />
      <span class="text-h5">Carrinho de compras</span>
    </div>
    <br />
    <br />
    <div class="titulo row items-center q-mb-md" v-if="cart.items.length === 0">
      <q-icon name="shopping_cart" size="48px" color="grey-5" />
      <h5>Seu carrinho está vazio!</h5>
    </div>

    <q-list v-else>
      <div class="titulo row items-center q-mb-md text-h5 q-mb-md">Produtos selecionados</div>
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

    <div v-if="cart.items.length != 0" class="titulo row items-center q-mt-md text-h6">
      Total: R$ {{ cart.total.toFixed(2) }}
    </div>
    <div v-if="cart.items.length != 0">
      <q-btn
        color="primary"
        label="Finalizar Pedido"
        rounded
        class="q-mt-md"
        @click="checkout"
        :disable="cart.items.length === 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from 'src/types/Cart';
import { api } from 'src/services/Api';
import { useQuasar } from 'quasar';
import type { Product } from 'src/types/Products';

const cart = useCartStore();
const $q = useQuasar();

const removeItem = (item: { product: Product; quantity: number }) => {
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

    $q.notify({
      message: response.data.message || 'Pedido realizado com sucesso! 🎉',
      color: 'green',
      position: 'top-right',
      timeout: 2000,
    });

    cart.clear();
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
