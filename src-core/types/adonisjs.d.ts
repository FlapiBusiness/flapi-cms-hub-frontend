declare module '#adonisjs/api' {
  export const api: {
    routes: readonly []
    definition: ApiDefinition
  }
}

declare module '#adonisjs/index' {
  export * from '../tuyau-adonisjs/index'
}
