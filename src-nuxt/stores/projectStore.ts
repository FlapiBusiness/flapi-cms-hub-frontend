import { defineStore } from 'pinia'
import type { Project } from '~~/src-core/api'
/**
 * Project store.
 */
interface ProjectState {
  projects: Project[]
  activeProject: Project | null
}
/**
 * Project actions.
 * @interface
 */
interface ProjectActions {
  setProjects(projects: Project[]): void
  setActiveProject(activeProjectId: number | null): void
  removeActiveProject(): void
  getActiveProjectIdInLocalStorage(): number | null
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
    state: (): { projects: Project[]; activeProject: Project | null } => ({
      projects: [],
      activeProject: null,
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
      /**
       * Set the active project
       * @param {number | null} activeProjectId - The active project id.
       * @returns {void}
       */
      setActiveProject(activeProjectId: number | null): void {
        if (activeProjectId === null) {
          this.removeActiveProject()
        } else {
          localStorage.setItem('activeProjectId', activeProjectId.toString())
          const activeProject: Project | null =
            this.projects.find((p: Project): boolean => p.id === activeProjectId) || null
          if (activeProject) {
            this.activeProject = activeProject
          } else {
            this.removeActiveProject()
          }
        }
      },
      /**
       * Get the active project id in local storage
       * @returns {number | null} The active project id in local storage.
       */
      getActiveProjectIdInLocalStorage(): number | null {
        const activeProjectIdLocalStorage: string | null = localStorage.getItem('activeProjectId')
        return activeProjectIdLocalStorage ? parseInt(activeProjectIdLocalStorage) : null
      },
      /**
       * Remove the active project
       * @returns {void}
       */
      removeActiveProject(): void {
        localStorage.removeItem('activeProjectId')
        this.activeProject = null
      },
    },
  })
