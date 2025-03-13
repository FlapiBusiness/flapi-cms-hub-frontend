import { defineStore } from 'pinia'
import type { User } from '~~/src-core/api'
/**
 * Auth store.
 */
interface AuthState {
  authenticatedUser: User | null
}
/**
 * Auth actions.
 * @interface
 */
interface AuthActions {
  setAuthenticatedUser(user: User | null): void
}

/**
 * Auth store.
 * @type {import('pinia').DefineStore<'AuthStore', AuthState, {}, AuthActions>}
 * @returns {import('pinia').StoreWithoutState<import('pinia').DefineStoreOptions<'AuthStore', AuthState, {}, AuthActions>>}
 */
export const useAuthStore: ReturnType<typeof defineStore<'authStore', AuthState, {}, AuthActions>> = defineStore<
  'authStore',
  AuthState,
  {},
  AuthActions
>('authStore', {
  /**
   * Auth store state.
   * @returns {AuthState} The state of the auths store.
   */
  state: (): { authenticatedUser: User | null } => ({
    authenticatedUser: null as User | null,
  }),
  actions: {
    /**
     * Set the authenticated user.
     * @param {User | null} user - The authenticated user.
     * @returns {void}
     */
    setAuthenticatedUser(user: User | null): void {
      this.authenticatedUser = user
    },
  },
})
