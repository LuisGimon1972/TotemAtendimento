<template>
  <div class="q-pa-md">
    <h1>Carrinho</h1>
    <p>Página do carrinho funcionando 🎉</p>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from 'src/tipos/Cart';

const cart = useCartStore();
if (!cart) alert('Hola');
</script>
