<template>
  <v-avatar size="36px">
    <v-img :alt="name" :src="picture"></v-img>
  </v-avatar>
  <div class="mx-1 my-auto">{{ name }}</div>
</template>

<script setup lang="ts">
import { useAuthStorage } from "~/composables/store.ts";
const { user } = useAuthStorage();
const { name, picture } = user.value;
</script>
