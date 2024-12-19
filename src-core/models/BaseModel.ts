/**
 * Base model class
 * @class BaseModel
 */
export default class BaseModel {
  public readonly created_at: string
  public readonly updated_at: string

  /**
   * BaseModel
   * @param {string} createdAt - Created At
   * @param {string} updatedAt - Updated At
   */
  constructor(createdAt: string, updatedAt: string) {
    this.created_at = createdAt
    this.updated_at = updatedAt
  }
}
