import { defineNuxtRouteMiddleware } from 'nuxt/app'
import type { RouteLocationNormalized } from 'vue-router'
import type { AxiosResponse } from 'axios'
import { ProjectsApi } from '~~/src-core/api'
import type { User, Project } from '~~/src-core/api'
import { useAuthStore } from '~/stores/authStore'
import { useProjectStore } from '~/stores/projectStore'

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, _from: RouteLocationNormalized) => {
  const BASE_URL_KEYCLOAK_LOGIN: string = import.meta.env.VITE_BASE_URL_KEYCLOAK_LOGIN
  const setupProjectRoute: string = '/dashboard/setup/project'
  const projectsRoute: string = '/dashboard/projects'
  const dashboardRoute: string = '/dashboard'
  const excludeRoutes: string[] = ['/signup', '/callback', setupProjectRoute, projectsRoute]

  if (excludeRoutes.includes(to.path)) {
    return
  }

  try {
    const authenticatedUser: User | null = useAuthStore().authenticatedUser
    if (authenticatedUser?.id) {
      const userProjectsResponse: AxiosResponse<Project[], any> = await ProjectsApi.getProjectByUserId(
        authenticatedUser.id,
      )
      const userProjects: Project[] = userProjectsResponse.data
      useProjectStore().setProjects(userProjects)

      if (userProjects.length === 0 && to.path !== setupProjectRoute) {
        return navigateTo(setupProjectRoute)
      }

      const activeProjectId: number | null = useProjectStore().getActiveProjectIdInLocalStorage()
      useProjectStore().setActiveProject(activeProjectId)
      const activeProject: Project | null = useProjectStore().activeProject

      if (!activeProject && to.path !== projectsRoute) {
        return navigateTo(projectsRoute)
      } else if (to.path !== dashboardRoute) {
        return navigateTo(dashboardRoute)
      }
    } else {
      return navigateTo(BASE_URL_KEYCLOAK_LOGIN, { external: true })
    }
  } catch (e) {
    console.error(e)
  }
})
