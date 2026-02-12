<template>
  <div class="totem-page column items-center justify-center">
    <q-card class="totem-card q-pa-xl">
      <br />
      <br />
      <div
        style="margin-top: -30px; color: blue"
        class="color blue9 row items-center justify-center q-mb-lg"
      >
        <q-icon name="desktop_windows" size="85px" class="q-mr-sm" />
        <span class="text-h3">TOTEM DE ATENDIMENTO</span>
      </div>
      <br />

      <q-input
        v-model="nome"
        filled
        rounded
        autofocus
        label="Digite seu nome"
        maxlength="40"
        class="q-mb-xl"
        style="font-size: 1.5rem; height: 70px"
      />
      <br />
      <br />

      <q-btn
        label="Começar Atendimento"
        color="primary"
        rounded
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
