import { connect, JSONCodec } from 'nats.ws'
import type { NatsConnection, Subscription, Codec } from 'nats.ws'

/**
 * Class Nats Côté Nuxt.js to listen to messages in real time
 */
export default class NatsClientService {
  private static connection: NatsConnection | null = null

  /**
   * Connection to the Nats server
   * @returns {Promise<NatsConnection>} - Nats connection
   */
  public static async connect(): Promise<NatsConnection> {
    if (this.connection) return this.connection

    this.connection = await connect({ servers: 'ws://localhost:9222' })
    return this.connection
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
