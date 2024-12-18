import { defineStore } from 'pinia'

/**
 * Application interface.
 * @interface
 * @property {number} id - The application id.
 * @property {string} title - The application title.
 * @property {string} picture - The application image.
 * @property {string} link - The application link.
 */
export interface Application {
  id: number
  title: string
  picture: string
  link: string
}

/**
 * Application store.
 */
interface ApplicationState {
  applications: Application[]
}
/**
 * Application actions.
 * @interface
 */
interface ApplicationActions {
  fetchApplications(): Promise<void>
}

/**
 * Application store.
 * @type {import('pinia').DefineStore<'applicationStore', ApplicationState, {}, ApplicationActions>}
 * @returns {import('pinia').StoreWithoutState<import('pinia').DefineStoreOptions<'applicationStore', ApplicationState, {}, ApplicationActions>>}
 */
export const useApplicationStore: ReturnType<
  typeof defineStore<'applicationStore', ApplicationState, {}, ApplicationActions>
> = defineStore<'applicationStore', ApplicationState, {}, ApplicationActions>('applicationStore', {
  /**
   * Application store state.
   * @returns {ApplicationState} The state of the application store.
   */
  state: () => ({
    applications: [],
  }),
  actions: {
    /**
     * Fetch applications.
     * @returns {Promise<void>}
     */
    async fetchApplications(): Promise<void> {
      // const response: Response = await fetch('https://api.example.com/applications')
      //this.applications = await response.json()

      const dakeData: Application[] = [
        {
          id: 1,
          title: 'Application 1',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 2,
          title: 'Application 2',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 3,
          title: 'Application 3',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 4,
          title: 'Application 4',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 5,
          title: 'Application 5',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 6,
          title: 'Application 6',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 7,
          title: 'Application 7',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 8,
          title: 'Application 8',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 9,
          title: 'Application 9',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 10,
          title: 'Application 10',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 11,
          title: 'Application 11',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 12,
          title: 'Application 12',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 13,
          title: 'Application 13',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 14,
          title: 'Application 14',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
        {
          id: 15,
          title: 'Application 15',
          picture: 'https://via.placeholder.com/120',
          link: 'https://example.com',
        },
      ]

      this.applications = dakeData

      return Promise.resolve()
    },
  },
})
