import { defineStore } from 'pinia'
import type { ApplicationEventLog } from '~~/src-core/api'

/**
 * State interface for user application event logs.
 */
interface UserApplicationEventLogState {
  userApplicationEventLogs: ApplicationEventLog[]
}

/**
 * Actions interface for user application event log store.
 */
interface UserApplicationEventLogActions {
  setUserApplicationEventLogs(logs: ApplicationEventLog[]): void
  addUserApplicationEventLog(log: ApplicationEventLog): void
}

/**
 * Pinia store to manage application event logs for a specific user.
 */
export const useUserApplicationEventLogStore: ReturnType<
  typeof defineStore<'userApplicationEventLogStore', UserApplicationEventLogState, {}, UserApplicationEventLogActions>
> = defineStore<'userApplicationEventLogStore', UserApplicationEventLogState, {}, UserApplicationEventLogActions>(
  'userApplicationEventLogStore',
  {
    /**
     * @returns {UserApplicationEventLogState} The state of the user application event log store.
     */
    state: (): UserApplicationEventLogState => ({
      userApplicationEventLogs: [],
    }),

    actions: {
      /**
       * Set all user application event logs.
       * @param {ApplicationEventLog[]} logs - The array of user logs to set.
       */
      setUserApplicationEventLogs(logs: ApplicationEventLog[]): void {
        this.userApplicationEventLogs = logs
      },

      /**
       * Add a new user application event log.
       * @param {ApplicationEventLog} log - The new user log to add.
       */
      addUserApplicationEventLog(log: ApplicationEventLog): void {
        this.userApplicationEventLogs.unshift(log)
      },
    },
  },
)
