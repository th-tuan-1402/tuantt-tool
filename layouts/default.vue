<template>
  <div v-if="isLoggedIn" class="d-flex flex-row justify-end">
    <UserAvatar />
  </div>
  <slot />
</template>

<script lang="ts" setup>
import { useAuthStorage } from "~/composables/store.ts";

const { isLoggedIn } = useAuthStorage();
</script>
