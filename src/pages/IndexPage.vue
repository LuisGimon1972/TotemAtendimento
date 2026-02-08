<template>
  <div class="layout-principal">
    <!-- TOPO -->
    <div class="painel-superior">
      <div class="row left q-my-md">
        <label class="textonome">Totem de Atendimento Senior</label>
      </div>

      <div class="perfil">
        <label class="texto">Dev. Luis Manuel Gimón</label>
      </div>
    </div>

    <div class="layout-conteudo">
      <!-- MENU LATERAL -->
      <div class="painel-esquerdo">
        <br />
        <q-list padding>
          <q-item clickable v-ripple to="/produtos">
            <q-item-section avatar>
              <q-icon name="inventory_2" />
            </q-item-section>
            <q-item-section>Produtos</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/carrinho">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>
            <q-item-section>Carrinho de Compras</q-item-section>
          </q-item>
        </q-list>

        <q-separator color="grey-3" class="q-my-lg" />

        <q-list padding>
          <q-item clickable v-ripple to="/configuracoes">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>Configurações</q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/sobre">
            <q-item-section avatar>
              <q-icon name="info_outline" />
            </q-item-section>
            <q-item-section>Sobre</q-item-section>
          </q-item>
        </q-list>
      </div>

      <!-- CONTEÚDO DINÂMICO -->
      <div class="conteudo">
        <router-view />
      </div>
    </div>
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
