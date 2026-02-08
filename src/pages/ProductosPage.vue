<template>
  <div class="q-pa-md">
    <div class="titulo row items-center q-mb-mdrow items-center q-mb-md">
      <q-icon name="inventory_2" size="32px" class="q-mr-sm" />
      <span class="text-h5">Produtos disponíveis</span>
    </div>
    <br />
    <br />
    <div class="titulo row items-center q-mb-md text-h5 q-mb-md">Selecione seus produtos</div>

    <div v-if="loading" class="row justify-center q-my-xl">
      <q-spinner size="50px" />
    </div>

    <q-banner v-if="error" class="bg-red-2 text-red-9 q-mb-md" rounded>
      {{ error }}
    </q-banner>

    <div class="row q-col-gutter-lg">
      <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4">
        <q-card class="q-pa-md full-height" :class="{ 'opacity-50': estoqueVisivel(product) <= 0 }">
          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-subtitle1 text-bold">R$ {{ product.value.toFixed(2) }}</div>
            <div class="text-caption">Estoque: {{ estoqueVisivel(product) }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              label="Adicionar"
              color="primary"
              rounded
              size="lg"
              @click="addToCart(product)"
              class="btn-adicionar"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useCartStore } from 'src/types/Cart';
import type { Product } from 'src/types/Products';
import type { AxiosError } from 'axios';
import { api } from 'src/services/Api';

const products = ref<Product[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const cart = useCartStore();
const $q = useQuasar();

const estoqueVisivel = (product: Product) => {
  const itemNoCarrinho = cart.items.find((i) => i.product.id === product.id);
  return product.quantity - (itemNoCarrinho?.quantity || 0);
};

const addToCart = (product: Product) => {
  if (estoqueVisivel(product) > 0) {
    cart.add(product);

    $q.notify({
      message: `${product.name} adicionado ao carrinho!`,
      color: 'green',
      position: 'top-right',
      timeout: 1500,
    });
  } else {
    $q.notify({
      message: `Quantidade indisponível no estoque do produto ${product.name}!`,
      color: 'red',
      position: 'top-right',
      timeout: 2000,
    });
  }
};

const loadProducts = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await api.get('/products');
    products.value = response.data;
  } catch (err) {
    const axiosError = err as AxiosError<{ message: string }>;
    error.value = axiosError.response?.data?.message || 'Erro ao carregar produtos';
  } finally {
    loading.value = false;
  }
};

onMounted(loadProducts);
</script>
