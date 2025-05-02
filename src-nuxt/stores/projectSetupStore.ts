import { defineStore } from 'pinia'
import type { ProjectSetup } from '~~/src-core/api'
/**
 * ProjectSetup store.
 */
interface ProjectSetupState {
  activeProjectSetup: ProjectSetup | null
}
/**
 * ProjectSetup actions.
 * @interface
 */
interface ProjectSetupActions {
  setActiveProjectSetup(activeProjectSetupId: ProjectSetup | null): void
  removeActiveProjectSetup(): void
}

/**
 * ProjectSetup store.
 * @type {import('pinia').DefineStore<'ProjectSetupStore', ProjectSetupState, {}, ProjectSetupActions>}
 * @returns {import('pinia').StoreWithoutState<import('pinia').DefineStoreOptions<'ProjectSetupStore', ProjectSetupState, {}, ProjectSetupActions>>}
 */
export const useProjectSetupStore: ReturnType<
  typeof defineStore<'projectSetupStore', ProjectSetupState, {}, ProjectSetupActions>
> = defineStore<'projectSetupStore', ProjectSetupState, {}, ProjectSetupActions>('projectSetupStore', {
  /**
   * ProjectSetup store state.
   * @returns {ProjectSetupState} The state of the projectSetups store.
   */
  state: (): { activeProjectSetup: ProjectSetup | null } => ({
    activeProjectSetup: null,
  }),
  actions: {
    /**
     * Set the active projectSetup
     * @param {ProjectSetup | null} activeProjectSetup - The active projectSetup.
     * @returns {void}
     */
    setActiveProjectSetup(activeProjectSetup: ProjectSetup | null): void {
      if (activeProjectSetup === null) {
        this.removeActiveProjectSetup()
      } else {
        this.activeProjectSetup = activeProjectSetup
      }
    },
    /**
     * Remove the active projectSetup
     * @returns {void}
     */
    removeActiveProjectSetup(): void {
      this.activeProjectSetup = null
    },
  },
})
