<template>
  <div class="q-pa-md">
    <div class="text-h5 q-mb-md">Selecione seus produtos</div>

    <!-- LOADING -->
    <div v-if="loading" class="row justify-center q-my-xl">
      <q-spinner size="50px" />
    </div>

    <!-- ERRO -->
    <q-banner v-if="error" class="bg-red-2 text-red-9 q-mb-md" rounded>
      {{ error }}
    </q-banner>

    <!-- LISTA DE PRODUTOS -->
    <div class="row q-col-gutter-lg">
      <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4">
        <q-card class="q-pa-md full-height" :class="{ 'opacity-50': product.quantity === 0 }">
          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-subtitle1 text-bold">R$ {{ product.value.toFixed(2) }}</div>
            <div class="text-caption">Estoque: {{ product.quantity }}</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              label="Adicionar"
              color="primary"
              size="lg"
              :disable="product.quantity === 0"
              @click="addToCart(product)"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from 'src/servicios/Api';
import { useCartStore } from 'src/tipos/Cart';
import type { Product } from 'src/tipos/Produtos';
import type { AxiosError } from 'axios';

const products = ref<Product[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

const cart = useCartStore();

const addToCart = (product: Product) => {
  cart.add(product);
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
