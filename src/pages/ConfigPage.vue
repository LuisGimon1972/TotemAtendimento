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

        <q-toggle v-model="modoEscuro" @update:model-value="alterarTema" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const modoEscuro = ref(false);

onMounted(() => {
  const temaSalvo = localStorage.getItem('modoEscuro');

  if (temaSalvo !== null) {
    modoEscuro.value = JSON.parse(temaSalvo);
    $q.dark.set(modoEscuro.value);
  }
});

function alterarTema(valor: boolean) {
  $q.dark.set(valor);
  localStorage.setItem('modoEscuro', JSON.stringify(valor));
}
</script>
