<template>
  <GoogleSignInButton v-if="!isLoggedIn" />
  <slot v-else />
</template>

<script lang="ts">
export default {
  computed: {
    isLoggedIn() {
      return false;
    },
  },
};
</script>
