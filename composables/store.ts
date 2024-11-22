import { useStorage } from '@vueuse/core'
import { computed, ref } from 'vue'

const AUTH_STORAGE_KEY = 'tuantt-tools-auth'

const defaultState = {
  isLoggedIn: false,
  user: null,
}
export const useAuthStorage = () => {
  const authState = useStorage(
    AUTH_STORAGE_KEY,
    defaultState,
  )

  const authStoreObj: Record<string, any> = {}

  // Getters
  authStoreObj.isLoggedIn = computed(() => authState.value.isLoggedIn)
  authStoreObj.user = computed(() => authState.value.user)

  // Setters
  authStoreObj.setLoggedIn = (isLoggedIn: boolean) => {
    authState.value.isLoggedIn = isLoggedIn
  }

  authStoreObj.setUser = (user: any) => {
    authState.value.user = user
  }

  authStoreObj.reset = function () {
    authState.value = defaultState
  }

  return authStoreObj
}