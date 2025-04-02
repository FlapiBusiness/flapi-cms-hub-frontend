import type { User } from '~~/src-core/api'

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
}
