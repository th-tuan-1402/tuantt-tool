<template>
  <GoogleSignInButton v-if="!isLoggedIn" />
  <slot v-else />
</template>

<script lang="ts" setup>
import { useAuthStorage } from "~/scripts/store.ts";

const { isLoggedIn } = useAuthStorage();
</script>
