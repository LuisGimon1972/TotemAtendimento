<template>
  <div class="totem-page">
    <div class="q-pa-md">
      <div
        class="titulo row items-center justify-between q-mb-lg"
        :class="$q.screen.lt.sm ? 'column q-gutter-md' : ''"
      >
        <div class="row items-center text-white justify-center">
          <q-icon name="shopping_cart" :size="$q.screen.lt.sm ? '26px' : '34px'" class="q-mr-sm" />
          <span :class="$q.screen.lt.sm ? 'text-h6' : 'text-h4'"> Carrinho de compras </span>
        </div>

        <q-btn
          label="Voltar"
          icon="arrow_back"
          color="primary"
          rounded
          :size="$q.screen.lt.sm ? 'md' : 'lg'"
          class="full-width-sm"
          @click="voltarAtendimento"
        />
      </div>

      <div
        v-if="cart.items.length === 0"
        class="column items-center justify-center q-pa-xl text-grey-6 text-center"
      >
        <q-icon
          name="remove_shopping_cart"
          :size="$q.screen.lt.sm ? '50px' : '64px'"
          class="q-mb-md"
        />
        <div :class="$q.screen.lt.sm ? 'text-subtitle1' : 'text-h6'">Seu carrinho está vazio</div>
        <div class="text-caption">Adicione produtos para continuar</div>
      </div>

      <div v-else>
        <div
          :class="$q.screen.lt.sm ? 'text-h6' : 'text-h4'"
          class="q-mb-md text-weight-medium text-white"
        >
          Produtos selecionados
        </div>

        <q-card v-for="item in cart.items" :key="item.product.id" class="q-mb-md" flat bordered>
          <q-card-section
            class="row items-center justify-between"
            :class="$q.screen.lt.sm ? 'column items-start q-gutter-sm' : ''"
          >
            <div>
              <div :class="$q.screen.lt.sm ? 'text-subtitle1' : 'text-h5'">
                {{ item.product.name }}
              </div>

              <div class="text-grey-6">
                {{ item.quantity }} × R$ {{ item.product.value.toFixed(2) }}
              </div>
            </div>

            <div
              class="row items-center"
              :class="$q.screen.lt.sm ? 'justify-between full-width' : ''"
            >
              <div :class="$q.screen.lt.sm ? 'text-subtitle1' : 'text-h5'" class="q-mr-md">
                R$ {{ (item.product.value * item.quantity).toFixed(2) }}
              </div>

              <q-btn flat round color="negative" icon="delete" @click="removeItem(item)" />
            </div>
          </q-card-section>
        </q-card>

        <q-separator spaced />

        <div
          class="row items-center justify-between q-mt-md text-white"
          :class="$q.screen.lt.sm ? 'text-subtitle1' : 'text-h4'"
        >
          <div>Total</div>
          <div class="text-weight-bold">R$ {{ cart.total.toFixed(2) }}</div>
        </div>

        <q-btn
          color="blue-10"
          :size="$q.screen.lt.sm ? 'lg' : 'xl'"
          rounded
          label="FINALIZAR PEDIDO"
          icon-right="check_circle"
          class="full-width q-mt-xl"
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
