<template>
  <div class="q-pa-md">
    <div class="titulo row items-center q-gutter-sm q-mb-md">
      <q-icon name="info_outline" size="32px" />
      <span class="text-h5">Sobre o sistema</span>
    </div>

    <q-card>
      <q-card-section>
        <p class="q-mb-md">
          O <strong>Totem de Atendimento Senior</strong> é uma aplicação front-end que simula a
          experiência de uso de um <strong>totem físico de autoatendimento</strong>, consumindo uma
          API de pedidos e produtos. O sistema permite ao usuário visualizar produtos disponíveis,
          selecionar quantidades e finalizar pedidos de forma simples e intuitiva.
        </p>

        <p class="q-mb-md">
          A interface foi projetada especificamente para ambientes de autoatendimento, priorizando
          <strong>clareza visual</strong>, <strong>facilidade de interação</strong> e
          <strong>rapidez no uso</strong>, garantindo uma boa experiência mesmo para usuários com
          pouca familiaridade com tecnologia.
        </p>

        <p class="q-mb-md">
          Desenvolvido com <strong>Vue 3</strong>, <strong>Quasar Framework</strong> e
          <strong>TypeScript</strong>, o projeto aplica boas práticas de organização, tipagem
          consistente, arquitetura de componentes e consumo de API. O sistema realiza o controle de
          estoque, impede vendas com quantidade insuficiente, trata erros retornados pela API e
          limpa automaticamente o carrinho após a finalização bem-sucedida do pedido.
        </p>

        <div class="text-center q-mt-lg">
          <div class="text-weight-bold">Luis Manuel Gimón Silva</div>
          <div class="text-caption text-grey">Desenvolvedor Front-end – SGBR Sistemas</div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts"></script>
