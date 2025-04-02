import { defineStore } from 'pinia'
import type { ApplicationEventLog } from '~~/src-core/api'

/**
 * State interface for application event logs.
 */
interface ApplicationEventLogState {
  applicationEventLogs: ApplicationEventLog[]
}

/**
 * Actions interface for application event log store.
 */
interface ApplicationEventLogActions {
  setApplicationEventLogs(logs: ApplicationEventLog[]): void
  addApplicationEventLog(log: ApplicationEventLog): void
}

/**
 * Pinia store to manage application event logs.
 * @type {import('pinia').DefineStore<'applicationEventLogStore', ApplicationEventLogState, {}, ApplicationEventLogActions>}
 */
export const useApplicationEventLogStore: ReturnType<
  typeof defineStore<'applicationEventLogStore', ApplicationEventLogState, {}, ApplicationEventLogActions>
> = defineStore<'applicationEventLogStore', ApplicationEventLogState, {}, ApplicationEventLogActions>(
  'applicationEventLogStore',
  {
    /**
     * State of the application event log store.
     * @returns {ApplicationEventLogState} The state of the application event log store.
     */
    state: (): ApplicationEventLogState => ({
      applicationEventLogs: [],
    }),

    actions: {
      /**
       * Set all application event logs.
       * @param {ApplicationEventLog[]} logs - The array of event logs to set.
       */
      setApplicationEventLogs(logs: ApplicationEventLog[]): void {
        this.applicationEventLogs = logs
      },

      /**
       * Add a new application event log.
       * @param {ApplicationEventLog} log - The new event log to add.
       */
      addApplicationEventLog(log: ApplicationEventLog): void {
        this.applicationEventLogs.push(log)
      },
    },
  },
)
