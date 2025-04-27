import NatsClientService from '~~/src-core/services/NatsClientService'
import { useUserApplicationEventLogStore } from '~/stores/userApplicationEventLogStore'
import type { NatsMessage } from '~~/src-core/services/NatsClientService'

/**
 * Initializes the Nats Listener for the user's application event logs
 * @returns {Promise<void>} - A promise that resolves when the listener is initialized
 * @description Subscribes to the 'new-user-logs' subject and pushes the received logs to the user store
 */
export const useUserApplicationEventLogsListener: () => Promise<void> = async (): Promise<void> => {
  console.log('🔊 Initialization of the NATS List for User Application Logs...')
  await NatsClientService.subscribe('new-logs', (natsMessage: NatsMessage) => {
    console.log('📥 Nouveau log reçu via NATS:', natsMessage)
    useUserApplicationEventLogStore().addUserApplicationEventLog(natsMessage.payload)
  })
}
