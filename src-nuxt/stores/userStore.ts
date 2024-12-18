import { defineStore } from 'pinia'

/**
 * User interface.
 * @interface
 * @property {number} id - The user id.
 * @property {string} picture - The user image.
 * @property {string} lastName - The user last name.
 * @property {string} firstName - The user first name.
 * @property {string} email - The user email.
 */
export interface User {
  id: number
  picture: string
  lastName: string
  firstName: string
  email: string
}

/**
 * User store.
 */
interface UserState {
  users: User[]
}
/**
 * User actions.
 * @interface
 */
interface UserActions {
  fetchUsers(): Promise<void>
}

/**
 * User store.
 * @type {import('pinia').DefineStore<'UserStore', UserState, {}, UserActions>}
 * @returns {import('pinia').StoreWithoutState<import('pinia').DefineStoreOptions<'UserStore', UserState, {}, UserActions>>}
 */
export const useUserStore: ReturnType<typeof defineStore<'userStore', UserState, {}, UserActions>> = defineStore<
  'userStore',
  UserState,
  {},
  UserActions
>('userStore', {
  /**
   * User store state.
   * @returns {UserState} The state of the users store.
   */
  state: () => ({
    users: [],
  }),
  actions: {
    /**
     * Fetch users.
     * @returns {Promise<void>}
     */
    async fetchUsers(): Promise<void> {
      // const response: Response = await fetch('https://api.example.com/users')
      //this.users = await response.json()

      const fakeData: User[] = [
        {
          id: 1,
          picture: 'https://via.placeholder.com/120',
          lastName: 'Doe',
          firstName: 'John',
          email: 'john.doe@email.com',
        },
        {
          id: 2,
          picture: 'https://via.placeholder.com/120',
          lastName: 'Doe',
          firstName: 'John',
          email: 'john.doe@email.com',
        },
        {
          id: 3,
          picture: 'https://via.placeholder.com/120',
          lastName: 'Doe',
          firstName: 'John',
          email: 'john.doe@email.com',
        },
        {
          id: 4,
          picture: 'https://via.placeholder.com/120',
          lastName: 'Doe',
          firstName: 'John',
          email: 'john.doe@email.com',
        },
        {
          id: 5,
          picture: 'https://via.placeholder.com/120',
          lastName: 'Doe',
          firstName: 'John',
          email: 'john.doe@email.com',
        },
        {
          id: 6,
          picture: 'https://via.placeholder.com/120',
          lastName: 'Doe',
          firstName: 'John',
          email: 'john.doe@email.com',
        },
      ]

      this.users = fakeData

      return Promise.resolve()
    },
  },
})
