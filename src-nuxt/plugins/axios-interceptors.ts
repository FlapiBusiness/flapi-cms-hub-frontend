import type { CookieRef } from '#app'
import type { InternalAxiosRequestConfig } from 'axios'
import globalAxios from 'axios'

/**
 * Plugin Nuxt qui ajoute un intercepteur Axios global pour inclure un token d'authentification
 * dans les requêtes si un token est trouvé dans les cookies.
 */
export default defineNuxtPlugin(() => {
  globalAxios.interceptors.request.use(
    /**
     * Intercepte chaque requête Axios et ajoute le header Authorization si un token est présent.
     *
     * @param {InternalAxiosRequestConfig<any>} config - Configuration de la requête Axios en cours.
     * @returns {AxiosRequestConfig} - Configuration modifiée avec le token si disponible.
     */
    (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> => {
      const token: CookieRef<string | null> = useCookie<string | null>('authToken') // Nom exact du cookie contenant le token

      if (token.value) {
        config.headers.Authorization = `Bearer ${token.value}`
      }

      return config
    },
    /**
     * Gère les erreurs survenues lors de l'interception de la requête.
     *
     * @param {unknown} error - Erreur interceptée.
     * @returns {Promise<never>} - Une promesse rejetée avec l'erreur.
     */
    (error: unknown): Promise<never> => {
      return Promise.reject(error)
    },
  )
})
