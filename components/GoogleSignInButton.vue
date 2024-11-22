<script setup lang="ts">
import {GoogleSignInButton, type CredentialResponse, decodeCredential} from "vue3-google-signin";
import {useAuthStorage} from "~/scripts/store.ts"

const { isLoggedIn, setLoggedId, setUser } = useAuthStorage();

// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  const decodedCredential = decodeCredential(credential);

  if (decodedCredential !== null) {
    setLoggedId(true);
    setUser(decodedCredential);
  }
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};
</script>

<template>
  <GoogleSignInButton
    @success="handleLoginSuccess"
    @error="handleLoginError"
  ></GoogleSignInButton>
</template>
