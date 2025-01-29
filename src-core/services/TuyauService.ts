import { createTuyau } from '@tuyau/client'
import { api } from '#adonisjs/api'
import type { KyRequest } from 'ky'
import CookieService from '~~/src-core/services/CookieService'

export const tuyau: any = createTuyau({
  api,
  baseUrl: import.meta.env.VITE_BASE_URL_API,
  /**
   * Le client Tuyau est construit sur Ky .
   * Vous pouvez donc transmettre toutes les options prises en charge par Ky.
   * Documentation : https://github.com/sindresorhus/ky
   */
  hooks: {
    // Executé avant chaque requête
    beforeRequest: [
      (request: KyRequest): void => {
        const token: string | undefined = CookieService.getCookie('authToken')
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
