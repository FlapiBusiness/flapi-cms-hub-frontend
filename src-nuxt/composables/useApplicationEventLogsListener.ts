import NatsClientService from '~~/src-core/services/NatsClientService'
import { useApplicationEventLogStore } from '~/stores/applicationEventLogStore'
import type { ApplicationEventLog } from '~~/src-core/api'

/**
 * Initializes the Nats List for the application event logs
 * @returns {Promise<void>} - A promise that resolves when the listener is initialized
 * @description This function subscribes to the 'new-logs' subject and logs the received messages to the console.
 */
export const useApplicationEventLogsListener: () => Promise<void> = async (): Promise<void> => {
  console.log('🔊 Initialization of the NATS List for Application Logs...')
  await NatsClientService.subscribe('new-logs', (natsMessage: Record<string, unknown>): void => {
    console.log('📥 Nouveau log reçu via NATS:', natsMessage)
    useApplicationEventLogStore().addApplicationEventLog(natsMessage.payload as ApplicationEventLog)
  })
}
