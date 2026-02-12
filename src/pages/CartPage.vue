<template>
  <div class="totem-page">
    <div class="q-pa-md">
      <div class="titulo row items-center justify-between q-mb-md">
        <div class="row items-center text-white">
          <q-icon name="shopping_cart" size="34px" class="q-mr-sm" />
          <span class="text-h4">Carrinho de compras</span>
        </div>

        <q-btn
          label="Voltar para Atendimento"
          icon="arrow_back"
          color="primary"
          rounded
          size="lg"
          @click="voltarAtendimento"
        />
      </div>

      <div
        v-if="cart.items.length === 0"
        class="column items-center justify-center q-pa-xl text-grey-6"
      >
        <q-icon name="remove_shopping_cart" size="64px" class="q-mb-md" />
        <div class="text-h6">Seu carrinho está vazio</div>
        <div class="text-caption">Adicione produtos para continuar</div>
      </div>

      <div v-else>
        <div class="text-h4 q-mb-md text-weight-medium text-white">Produtos selecionados</div>

        <q-card v-for="item in cart.items" :key="item.product.id" class="q-mb-sm" flat bordered>
          <q-card-section class="row items-center justify-between">
            <div>
              <div class="text-h4">
                {{ item.product.name }}
              </div>
              <div class="text-h5 text-grey-6">
                {{ item.quantity }} × R$ {{ item.product.value.toFixed(2) }}
              </div>
            </div>

            <div class="row items-center">
              <div class="text-h4 q-mr-md">
                R$ {{ (item.product.value * item.quantity).toFixed(2) }}
              </div>
              <q-btn flat round color="negative" icon="delete" @click="removeItem(item)" />
            </div>
          </q-card-section>
        </q-card>

        <q-separator spaced />

        <div class="row items-center justify-between q-mt-md text-white">
          <div class="text-h4">Total</div>
          <div class="text-h4 text-weight-bold">R$ {{ cart.total.toFixed(2) }}</div>
        </div>

        <div class="row justify-end q-mt-lg">
          <q-btn
            color="blue-10"
            size="xl"
            rounded
            label="FINALIZAR PEDIDO"
            icon-right="check_circle"
            class="full-width q-mt-lg"
            @click="checkout"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from 'src/types/Cart';
import { api } from 'src/services/Api';
import { useQuasar } from 'quasar';
import type { Product } from 'src/types/Products';
import { useRouter } from 'vue-router';

const router = useRouter();

const cart = useCartStore();
const $q = useQuasar();

const removeItem = (item: { product: Product; quantity: number }) => {
  item.product.quantity += item.quantity;
  cart.remove(item.product.id);
};

const checkout = async () => {
  if (cart.items.length === 0) return;

  try {
    await api.post('/orders', {
      items: cart.items.map((i) => ({
        productId: i.product.id,
        quantity: i.quantity,
      })),
    });

    await Promise.all(
      cart.items.map((i) =>
        api.patch(`/products/${i.product.id}`, {
          quantity: i.product.quantity - i.quantity,
        }),
      ),
    );

    $q.notify({
      message: 'Pedido realizado com sucesso! 🎉',
      color: 'green',
      position: 'top-right',
    });

    cart.clear();
  } catch (err) {
    console.error(err);
    $q.notify({
      message: 'Erro ao finalizar o pedido',
      color: 'red',
    });
  }
};

const voltarAtendimento = async () => {
  await router.push('/produtos');
};
</script>
