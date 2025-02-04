# Tuyau AdonisJS - Client

## Documentation Official

WebSite : https://tuyau.julr.dev/docs/client

<br />

## Utilization

1. Go to your AdonisJS project : `flapi-cms-hub-backend`
2. Generate API with Tuyau

```bash
# Generate files in : ./.adonisjs
npm run tuyau:generate
```

3. Add files `index.ts` and `api.ts` in to `flapi-cms-hub-frontend/tuyau-adonisjs/`
4. `Use Tuyau` in you frontend project

```javascript
// Backend - AdonisJS
router.get('/posts/:id/generate-invitation', '...').as('posts.generateInvitation') // Noté que le nom de la route est important

// Frontend - NuxtJS
await tuyau.$route('posts.generateInvitation', { id: 1 })
```

<br />

## Request Parameters

1. Vous pouvez transmettre des options `Ky` spécifiques à la requête en les fournissant comme argument à la méthode : `$get, $post, $put, $delete, $patch` :

```javascript
// Backend - AdonisJS
router.get('/posts/:id/generate-invitation', '...').as('posts.generateInvitation')

// Frontend - NuxtJS
await tuyau.$route('posts.generateInvitation', { id: 1 }).$get({
  headers: { 'X-Custom-Header': 'foobar' },
})
```

2. Lorsque vous utilisez la méthode `$get`, vous pouvez transmettre un objet `query` à la requête :

```javascript
// Backend - AdonisJS
router.get('/posts/:id/generate-invitation', '...').as('posts.generateInvitation')

// Frontend - NuxtJS
await tuyau.$route('posts.generateInvitation', { id: 1 }).$get({
  headers: { 'X-Custom-Header': 'foobar' },
  query: { page: 1, limit: 10 },
})
```

Notez que l'objet de requête sera automatiquement sérialisé dans une chaîne de requête avec les règles suivantes : <br />

Si la valeur est un tableau, elle sera sérialisé en utilisant le format entre crochets. <br />
Par exemple : `{ ids: [1, 2, 3] }` <br />
Sera sérialisé comme : `ids[]=1&ids[]=2&ids[]=3` <br />
Si la valeur est nulle ou indéfinie, elle sera ignorée et ne sera pas ajoutée à la chaîne de requête.

<br />

## Response

1. `Pour chaque requête`, Tuyau `renvoie une promesse` avec les types suivants :
   - `data`: Les données de réponse si le statut est 2xx
   - `error`: Les données d'erreur si le statut est 3xx, 4xx, 5xx
   - `status`: Le code d'état de la réponse
   - `response`: L'objet de réponse complet
2. Simplifier la gestion des responses

```javascript
// Sans unwrap
const { data, error, status } = await tuyau.$route('signin').$post({
  email: 'foo@orange.fr',
  password: 'password',
})

if (status >= 200 && status < 300) {
  console.log('Token reçu :', data.token)
} else {
  console.error('Erreur :', error?.message)
}

// Avec unwrap
try {
  const result = await tuyau
    .$route('signin')
    .$post({
      email: 'foo@ok.com',
      password: 'password',
    })
    .unwrap() // Si le statut est 2xx, retourne directement `data`

  console.log('Token reçu :', result.token)
} catch (err) {
  console.error('Erreur :', err.message)
}
```
