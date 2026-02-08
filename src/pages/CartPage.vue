<template>
  <div class="q-pa-md">
    <!-- Título -->
    <div class="titulo row q-gutter-sm q-mb-md">
      <q-icon name="shopping_cart" size="32px" class="q-mr-sm" />
      <span class="text-h5">Carrinho de compras</span>
    </div>

    <!-- Carrinho vazio -->
    <div
      v-if="cart.items.length === 0"
      class="column items-center justify-center q-pa-xl text-grey-6"
    >
      <q-icon name="remove_shopping_cart" size="64px" class="q-mb-md" />
      <div class="text-h6">Seu carrinho está vazio</div>
      <div class="text-caption">Adicione produtos para continuar</div>
    </div>

    <!-- Lista de produtos -->
    <div v-else>
      <div class="text-subtitle1 q-mb-md text-weight-medium">Produtos selecionados</div>

      <q-card v-for="item in cart.items" :key="item.product.id" class="q-mb-sm" flat bordered>
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="text-body1">
              {{ item.product.name }}
            </div>
            <div class="text-caption text-grey-6">
              {{ item.quantity }} × R$ {{ item.product.value.toFixed(2) }}
            </div>
          </div>

          <div class="row items-center">
            <div class="text-weight-medium q-mr-md">
              R$ {{ (item.product.value * item.quantity).toFixed(2) }}
            </div>
            <q-btn flat round color="negative" icon="delete" @click="removeItem(item)" />
          </div>
        </q-card-section>
      </q-card>

      <!-- Total -->
      <q-separator spaced />

      <div class="row items-center justify-between q-mt-md">
        <div class="text-h6">Total</div>
        <div class="text-h6 text-weight-bold">R$ {{ cart.total.toFixed(2) }}</div>
      </div>

      <!-- Botão finalizar -->
      <div class="row justify-end q-mt-lg">
        <q-btn
          color="primary"
          size="lg"
          rounded
          label="Finalizar pedido"
          icon-right="check_circle"
          @click="checkout"
        />
      </div>
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
