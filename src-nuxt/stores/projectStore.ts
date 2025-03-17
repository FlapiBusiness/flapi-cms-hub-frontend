import { defineStore } from 'pinia'
import type { Project } from '~~/src-core/api'
/**
 * Project store.
 */
interface ProjectState {
  projects: Project[]
}
/**
 * Project actions.
 * @interface
 */
interface ProjectActions {
  setProjects(projects: Project[]): void
}

/**
 * Project store.
 * @type {import('pinia').DefineStore<'ProjectStore', ProjectState, {}, ProjectActions>}
 * @returns {import('pinia').StoreWithoutState<import('pinia').DefineStoreOptions<'ProjectStore', ProjectState, {}, ProjectActions>>}
 */
export const useProjectStore: ReturnType<typeof defineStore<'projectStore', ProjectState, {}, ProjectActions>> =
  defineStore<'projectStore', ProjectState, {}, ProjectActions>('projectStore', {
    /**
     * Project store state.
     * @returns {ProjectState} The state of the projects store.
     */
    state: (): { projects: Project[] } => ({
      projects: [],
    }),
    actions: {
      /**
       * Set the projects
       * @param {Project[]} projects - The projects.
       * @returns {void}
       */
      setProjects(projects: Project[]): void {
        this.projects = projects
      },
    },
  })
