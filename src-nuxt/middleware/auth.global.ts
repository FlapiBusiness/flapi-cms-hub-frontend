import { defineNuxtRouteMiddleware } from 'nuxt/app'
import type { RouteLocationNormalized } from 'vue-router'
import type { AxiosResponse } from 'axios'
import { AuthApi, ProjectsApi } from '~~/src-core/api'
import type { CheckSessionValidityResponse, User, Project } from '~~/src-core/api'
import { useAuthStore } from '~/stores/authStore'
import { useProjectStore } from '~/stores/projectStore'

/**
 * Middleware global pour vérifier si l'utilisateur est connecté.
 * Si l'utilisateur n'est pas connecté, il est redirigé vers la page de connexion.
 * Exclut la route /signup.
 * @param {RouteLocationNormalized} _to - Route vers laquelle l'utilisateur souhaite accéder
 * @param {RouteLocationNormalized} _from - Route depuis laquelle l'utilisateur souhaite accéder
 */
export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, _from: RouteLocationNormalized) => {
  const BASE_URL_KEYCLOAK_LOGIN: string = import.meta.env.VITE_BASE_URL_KEYCLOAK_LOGIN

  /**
   * Routes à exclure de la vérification de connexion
   */
  const excludeRoutes: string[] = ['/signup', '/callback']
  if (excludeRoutes.includes(to.path)) {
    return
  }

  try {
    /**
     * Vérifier si le token est valide via l'API backend
     * Prendre en compte que le token se trouve dans le header de la requête 'Authorization',
     * qui est ajoutée automatiquement par Axios grâce à l'interceptor 'auth-interceptor.ts',
     * qui vient récupérer depuis un cookie nommé 'authToken'.
     */
    const response: AxiosResponse<CheckSessionValidityResponse, any> = await AuthApi.checkSessionIsValid()
    console.log(response.data)

    // Si le token n'est pas valide, rediriger l'utilisateur vers la page de connexion
    if (!response.data.valid) {
      return navigateTo(BASE_URL_KEYCLOAK_LOGIN, { external: true })
    }
  } catch (error: any) {
    console.error(error)
    return navigateTo(BASE_URL_KEYCLOAK_LOGIN, { external: true })
  }

  /**
   * Récupérer les informations de l'utilisateur connecté
   * Les informations de l'utilisateur sont stockées dans le store 'authStore'
   */
  try {
    const userResponse: AxiosResponse<User, any> = await AuthApi.getAuthenticatedUser()
    const user: User = userResponse.data
    useAuthStore().setAuthenticatedUser(user)
  } catch (e) {
    console.error(e)
  }

  /**
   * Récupérer les projets de l'utilisateur connecté
   * Les projets de l'utilisateur sont stockés dans le store 'projectStore'
   */
  try {
    const authenticatedUser: User | null = useAuthStore().authenticatedUser

    if (authenticatedUser?.id) {
      const userProjectsResponse: AxiosResponse<Project[], any> = await ProjectsApi.getProjectByUserId(
        authenticatedUser.id,
      )
      const userProjects: Project[] = userProjectsResponse.data
      useProjectStore().setProjects(userProjects)

      if (userProjects.length === 0 && to.path !== '/dashboard/setup/app') {
        return navigateTo('/dashboard/setup/app')
      } else if (userProjects.length > 0 && to.path !== '/dashboard/apps') {
        return navigateTo('/dashboard/apps')
      }
    }
  } catch (e) {
    console.error(e)
  }
})
