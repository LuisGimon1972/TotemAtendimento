<template>
  <div class="totem-page column items-center justify-center q-pa-md">
    <q-card class="totem-card">
      <div
        class="row items-center justify-center text-primary text-center q-mb-xl"
        :class="$q.screen.lt.sm ? 'column' : 'row'"
      >
        <q-icon
          name="desktop_windows"
          :size="$q.screen.lt.sm ? '50px' : $q.screen.lt.md ? '65px' : '85px'"
          :class="$q.screen.lt.sm ? 'q-mb-sm' : 'q-mr-md'"
        />

        <span
          :class="[$q.screen.lt.sm ? 'text-h6' : $q.screen.lt.md ? 'text-h5' : 'text-h3']"
          class="text-weight-bold"
        >
          TOTEM DE ATENDIMENTO
        </span>
      </div>

      <q-input
        v-model="nome"
        filled
        rounded
        autofocus
        label="Digite seu nome"
        maxlength="40"
        class="q-mb-xl input-totem"
      />

      <q-btn
        label="Começar Atendimento"
        color="primary"
        rounded
        unelevated
        size="lg"
        class="full-width"
        :disable="!nome.trim()"
        @click="iniciarAtendimento"
      />
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const nome = ref('');
const router = useRouter();

const iniciarAtendimento = async () => {
  const nomeTrimado = nome.value.trim();
  if (!nomeTrimado) return;

  localStorage.setItem('nomeUsuario', nomeTrimado);
  await router.push('/produtos');
};
</script>

<style scoped>
.totem-card {
  width: 100%;
  max-width: 700px;
  min-height: 500px;
  border-radius: 20px;
  padding: 2rem;
}
</style>
