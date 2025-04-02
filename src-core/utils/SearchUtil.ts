/**
 * Utility class for applying search filtering to an array of objects.
 * @class SearchUtil
 */
export class SearchUtil {
  /**
   * Retrieves the value from an object using a dot-notated path.
   * Returns `undefined` if any intermediate property is `undefined`.
   * @template T - The object type
   * @param {T} obj - The object to extract the value from
   * @param {string} path - Dot-notated string path (e.g., 'user.firstname')
   * @returns {any} The value at the specified path, or undefined if not found
   */
  public static getValueWithPath<T>(obj: T, path: string): unknown {
    return path.split('.').reduce<unknown>((acc: unknown, key: string) => {
      if (acc && typeof acc === 'object' && key in acc) {
        return (acc as Record<string, unknown>)[key]
      }
      return undefined
    }, obj)
  }

  /**
   * Normalizes a string: trims it and converts to lowercase.
   * @param {string} str - The string to normalize
   * @returns {string} The normalized string
   */
  public static normalizeString(str: string): string {
    return str.trim().toLowerCase()
  }

  /**
   * Filters an array of items by checking if any of the given fields contains the search text.
   * @template T - The type of each item in the array
   * @param {Array<T>} items - The items to filter
   * @param {string} searchText - The text to search for
   * @param {Array<string>} fields - The fields to include in the search (can be nested, e.g., 'user.firstname')
   * @returns {Array<T>} The filtered array of items
   */
  public static filterBySearchText<T>(items: Array<T>, searchText: string, fields: Array<string>): Array<T> {
    if (!searchText) return items
    const normalizedSearch: string = this.normalizeString(searchText)

    return items.filter((item: T): boolean => {
      return fields.some((fieldPath: string): boolean => {
        const value: unknown = this.getValueWithPath<T>(item, fieldPath)
        return typeof value === 'string' && this.normalizeString(value).includes(normalizedSearch)
      })
    })
  }
}

export default SearchUtil
