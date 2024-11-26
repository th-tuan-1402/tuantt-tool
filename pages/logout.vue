<script lang="ts" setup>
import { useAuthStorage } from "~/composables/store";

if (process.client) {
  const { reset } = useAuthStorage();
  reset();

  // Redirect to login page
  setInterval(async () => await navigateTo("/login"), 100);
}
</script>
