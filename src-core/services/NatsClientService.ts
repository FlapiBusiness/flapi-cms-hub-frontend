import { connect, JSONCodec, nkeyAuthenticator } from 'nats.ws'
import type { NatsConnection, Subscription, Codec } from 'nats.ws'

/**
 * Class Nats Côté Nuxt.js to listen to messages in real time
 */
export default class NatsClientService {
  private static nc: NatsConnection | null = null

  /**
   * Connection to the Nats server
   * @returns {Promise<NatsConnection>} - Nats connection
   */
  public static async connect(): Promise<NatsConnection> {
    if (this.nc) return this.nc

    const serversOptions: string[] = [import.meta.env.VITE_NATS_SERVER]
    const seed: Uint8Array = new TextEncoder().encode(import.meta.env.VITE_NATS_NKEY_PRIVATE_KEY)

    this.nc = await connect({
      servers: serversOptions,
      authenticator: nkeyAuthenticator(seed),
    })

    console.info('Connected to Nats server:', import.meta.env.VITE_NATS_SERVER)

    return this.nc
  }

  /**
   * Listen to a subject and trigger a callback with each message
   * @param {string} subject - Subject to listen
   * @param {(message: Record<string, unknown>) => void} callback - Function called to each message received
   */
  public static async subscribe(subject: string, callback: (message: Record<string, unknown>) => void): Promise<void> {
    const conn: NatsConnection = await this.connect()
    const sub: Subscription = conn.subscribe(subject)
    const codec: Codec<Record<string, unknown>> = JSONCodec<Record<string, unknown>>()

    for await (const msg of sub) {
      try {
        const decoded: Record<string, unknown> = codec.decode(msg.data)
        callback(decoded)
      } catch (error) {
        console.error('Error when decoding the Nats message:', error)
      }
    }
  }
}
