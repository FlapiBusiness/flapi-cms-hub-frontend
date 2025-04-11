import { ApplicationEventLogActionTypeEnum } from '~~/src-core/api'

/**
 * Helper class for application event log
 * @class ApplicationEventLogHelper
 */
export class ApplicationEventLogHelper {
  /**
   * Get the label for the application event log action type
   * @param {ApplicationEventLogActionTypeEnum} applicationEventLog - The application event log action type
   * @returns {string} The label for the application event log action type
   */
  public static getApplicationEventLogLabel(applicationEventLog: ApplicationEventLogActionTypeEnum): string {
    switch (applicationEventLog) {
      case ApplicationEventLogActionTypeEnum.Create:
        return 'Création'
      case ApplicationEventLogActionTypeEnum.Update:
        return 'Modification'
      case ApplicationEventLogActionTypeEnum.Delete:
        return 'Suppression'
      case ApplicationEventLogActionTypeEnum.Signin:
        return 'Connexion'
      case ApplicationEventLogActionTypeEnum.Signout:
        return 'Déconnexion'
      case ApplicationEventLogActionTypeEnum.Signup:
        return 'Inscription'
      case ApplicationEventLogActionTypeEnum.Invite:
        return 'Invitation'
      default:
        return 'Inconnu'
    }
  }

  /**
   * Get the color for the application event log action type
   * @param {ApplicationEventLogActionTypeEnum} applicationEventLog - The application event log action type
   * @returns {string} The color for the application event log action type
   */
  public static getApplicationEventLogColor(applicationEventLog: ApplicationEventLogActionTypeEnum): string {
    switch (applicationEventLog) {
      case ApplicationEventLogActionTypeEnum.Create:
        return '#CCFFEB' // menthe pastel (conservée)
      case ApplicationEventLogActionTypeEnum.Update:
        return '#fff1d4' // orange clair (conservée)
      case ApplicationEventLogActionTypeEnum.Delete:
        return '#FBD0D5' // rose doux (conservée)
      case ApplicationEventLogActionTypeEnum.Signin:
        return '#cfdefa' // bleu lavande
      case ApplicationEventLogActionTypeEnum.Signout:
        return '#FFD6E0' // rose framboise
      case ApplicationEventLogActionTypeEnum.Signup:
        return '#edffc7' // vert anis
      case ApplicationEventLogActionTypeEnum.Invite:
        return '#D4F2FF' // bleu azur doux
      default:
        return '#F0F0F0' // gris très clair
    }
  }
}
