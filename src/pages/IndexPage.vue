<template>
  <div class="totem-welcome column items-center justify-center">
    <q-card class="totem-card q-pa-xl">
      <!-- Título -->
      <br />
      <br />
      <div class="row items-center justify-center q-mb-lg">
        <q-icon name="point_of_sale" size="80px" class="q-mr-sm" />
        <span class="text-h4">TOTEM DE ATENDIMENTO</span>
      </div>
      <br />
      <!-- Nome -->
      <q-input
        v-model="nome"
        filled
        rounded
        autofocus
        label="Digite seu nome"
        class="q-mb-xl"
        style="font-size: 1.5rem; height: 70px"
      />
      <br />
      <br />
      <!-- Botão Começar -->
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
.totem-welcome {
  height: 100vh;
  background: linear-gradient(135deg, #1976d2, #42a5f5);
}

.totem-card {
  width: 100%;
  max-width: 700px; /* aumentei de 420px para 600px */
  min-height: 500px; /* opcional: define altura mínima */
  border-radius: 20px;
  padding: 2rem; /* aumenta o espaçamento interno */
}
</style>
