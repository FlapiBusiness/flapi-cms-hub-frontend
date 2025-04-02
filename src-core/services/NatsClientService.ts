import { connect, JSONCodec } from 'nats.ws'
import type { NatsConnection, Subscription, Codec } from 'nats.ws'
import type { ApplicationEventLog } from '~~/src-core/api'

/**
 * Types of messages that can be received
 * @enum {string}
 */
export type NatsEventType = 'CREATE' | 'UPDATE' | 'DELETE' | 'SIGNIN' | 'LOGOUT' | 'SIGNUP' | 'INVITE'

/**
 * Complete structure of the message received via Nats
 * @interface NatsMessage
 * @property {NatsEventType} type - Type of the event
 * @property {ApplicationEventLog} payload - Payload of the event
 */
export interface NatsMessage {
  type: NatsEventType
  payload: ApplicationEventLog
}

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
   * @param {(message: NatsMessage) => void} callback - Function called to each message received
   */
  public static async subscribe(subject: string, callback: (message: NatsMessage) => void): Promise<void> {
    const conn: NatsConnection = await this.connect()
    const sub: Subscription = conn.subscribe(subject)
    const codec: Codec<NatsMessage> = JSONCodec<NatsMessage>()

    for await (const msg of sub) {
      try {
        const decoded: NatsMessage = codec.decode(msg.data)
        callback(decoded)
      } catch (error) {
        console.error('Error when decoding the Nats message:', error)
      }
    }
  }
}
