<script setup lang="ts">
import {
  GoogleSignInButton,
  type CredentialResponse,
  decodeCredential
} from "vue3-google-signin";

// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  const decodedCredential = decodeCredential(credential);
  console.log("Access Token", credential);
  console.log("Credential", decodedCredential);
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
