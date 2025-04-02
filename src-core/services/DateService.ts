/**
 * Interface representing parts of a parsed date.
 * @interface ParsedDateParts
 */
interface ParsedDateParts {
  day: string
  month: string
  year: number
  hours: string
  minutes: string
}

/**
 * Service to handle string date formatting operations.
 * @class DateService
 */
export class DateService {
  /**
   * Convert an ISO date string into the format: "DD/MM/YYYY à HH:mm".
   * Example: "2025-03-29T22:46:53.000+00:00" → "29/03/2025 à 22:46"
   * @param {string} isoString - The ISO date string to format.
   * @returns {string} The formatted date with time.
   */
  public static stringToDayMonthYearHour(isoString: string): string {
    const { day, month, year, hours, minutes } = this.parseDateParts(isoString)
    return `${day}/${month}/${year} à ${hours}:${minutes}`
  }

  /**
   * Convert an ISO date string into the format: "DD/MM/YYYY".
   * Example: "2025-03-29T22:46:53.000+00:00" → "29/03/2025"
   * @param {string} isoString - The ISO date string to format.
   * @returns {string} The formatted date.
   */
  public static stringToDayMonthYear(isoString: string): string {
    const { day, month, year } = this.parseDateParts(isoString)
    return `${day}/${month}/${year}`
  }

  /**
   * Parse the date parts (day, month, year, hours, minutes) from an ISO date string.
   * @param {string} isoString - The ISO date string to parse.
   * @returns {ParsedDateParts} An object containing formatted date parts.
   * @private
   */
  private static parseDateParts(isoString: string): ParsedDateParts {
    const date: Date = new Date(isoString)

    const day: string = String(date.getDate()).padStart(2, '0')
    const month: string = String(date.getMonth() + 1).padStart(2, '0')
    const year: number = date.getFullYear()
    const hours: string = String(date.getHours()).padStart(2, '0')
    const minutes: string = String(date.getMinutes()).padStart(2, '0')

    return { day, month, year, hours, minutes }
  }
}
