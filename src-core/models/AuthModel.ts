/**
 * AuthModel
 * @class AuthModel
 */
export default class AuthModel {
  public readonly token: string
  public readonly tokenType: string
  public readonly expiresAt: string

  /**
   * AuthModel
   * @param {AuthModel} auth - AuthModel
   */
  constructor(auth: AuthModel) {
    this.token = auth.token
    this.tokenType = auth.tokenType
    this.expiresAt = auth.expiresAt
  }
}
