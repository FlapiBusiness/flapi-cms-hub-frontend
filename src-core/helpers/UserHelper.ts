import type { User } from '~~/src-core/api'
import { UserRoleNameEnum } from '~~/src-core/api'

/**
 * Helper class for handling user-related display logic.
 * @class UserHelper
 */
export class UserHelper {
  /**
   * Get the full name of the user (first + last name)
   * @param {User} user - The user object
   * @returns {string} The user's full name
   */
  public static getFullName(user: User): string {
    return `${user.firstname} ${user.lastname}`.trim()
  }

  /**
   * Get the initials of the user (e.g. "JD" for John Doe)
   * @param {User} user - The user object
   * @returns {string} The user's initials
   */
  public getInitials(user: User): string {
    const firstInitial: string = user.firstname.charAt(0)
    const lastInitial: string = user.lastname.charAt(0)
    return `${firstInitial}${lastInitial}`.toUpperCase()
  }

  /**
   * Get the label for the user role
   * @param {UserRoleNameEnum} roleName - The user role name
   * @returns {string} The label for the user role
   */
  public static getRoleLabel(roleName: UserRoleNameEnum): string {
    switch (roleName) {
      case UserRoleNameEnum.SuperAdminFlapi:
        return 'Super Admin'
      case UserRoleNameEnum.AdminClient:
        return 'Administrateur'
      case UserRoleNameEnum.AppManagerClient:
        return 'Manager'
      case UserRoleNameEnum.MarketingClient:
        return 'Marketing'
      case UserRoleNameEnum.SupportClient:
        return 'Support'
      case UserRoleNameEnum.CommercialClient:
        return 'Commercial'
      default:
        return 'Utilisateur'
    }
  }

  /**
   * Get the color associated with the user role
   * @param {UserRoleNameEnum} roleName - The user role name
   * @returns {string} The color associated with the user role
   */
  public static getRoleColor(roleName: UserRoleNameEnum): string {
    switch (roleName) {
      case UserRoleNameEnum.SuperAdminFlapi:
        return '#fcc5c5' // rose framboise clair
      case UserRoleNameEnum.AdminClient:
        return '#facfcf' // bleu lavande
      case UserRoleNameEnum.AppManagerClient:
        return '#fff1d4' // orange clair
      case UserRoleNameEnum.MarketingClient:
        return '#cfdefa' // bleu azur
      case UserRoleNameEnum.SupportClient:
        return '#FBD0D5' // rose clair
      case UserRoleNameEnum.CommercialClient:
        return '#edffc7' // vert anis
      default:
        return '#cfdefa'
    }
  }
}
