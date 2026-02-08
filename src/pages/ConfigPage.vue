<template>
  <div class="q-pa-md">
    <div class="titulo row items-center q-gutter-sm q-mb-md">
      <q-icon name="settings" size="32px" />
      <span class="text-h5">Configurações</span>
    </div>

    <q-card style="max-width: 500px">
      <q-card-section class="row items-center justify-between">
        <div>
          <div class="text-weight-bold">Modo Escuro</div>
          <div class="text-caption text-grey">Alternar entre tema claro e escuro</div>
        </div>

        <q-toggle v-model="modoEscuro" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

/* 🌙 Tema escuro */
const modoEscuro = ref($q.dark.isActive);

watch(modoEscuro, (valor) => {
  $q.dark.set(valor);
  localStorage.setItem('modoEscuro', JSON.stringify(valor));
});

onMounted(() => {
  const temaSalvo = localStorage.getItem('modoEscuro');
  if (temaSalvo !== null) {
    modoEscuro.value = JSON.parse(temaSalvo);
    $q.dark.set(modoEscuro.value);
  }
});
</script>
