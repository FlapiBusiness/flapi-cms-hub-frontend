import NatsClientService from '~~/src-core/services/NatsClientService'
import type { NatsMessage } from '~~/src-core/services/NatsClientService'
import { useProjectStore } from '~/stores/projectStore'
import { watch } from 'vue'
import type { Project } from '~~/src-core/api'

/**
 * Initialize the listener for Project Setup events
 * @returns {void} - A promise that resolves when the listener is initialized
 * @description This function subscribes to the 'project-setup-*' subject and logs the received messages to the console.
 */
export const useProjectSetupListener: () => void = (): void => {
  const projectStore: ReturnType<typeof useProjectStore> = useProjectStore()

  watch(
    () => projectStore.activeProject,
    async (activeProject: Project | null) => {
      if (!activeProject) return

      const subject: string = `project-setup-${activeProject.id}`
      console.log(`🔊 Subscription to listener NATS ${subject}`)

      await NatsClientService.subscribe(subject, (natsMessage: NatsMessage) => {
        console.log('📥 Project Setup Update reçu via NATS:', natsMessage)
      })
    },
    { immediate: true },
  )
}
