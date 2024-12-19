import type AuthModel from '~~/src-core/models/AuthModel'
import BaseApiService from '~~/src-core/services/BaseApiService'

/**
 * SuccessResponse
 * @type {SuccessResponse}
 * @property {string} message - Message
 */
export type SuccessResponse = {
  message: string
}

/**
 * LoginRequest
 * @type {LoginRequest}
 * @property {number} id - ID
 * @property {string} username - Username
 * @property {string} email - Email
 * @property {string} currency_code - Currency Code
 * @property {string} created_at - Created At
 * @property {string} updated_at - Updated At
 */
export type LoginRequest = {
  email: string
  password: string
}

/**
 * SignUpRequest
 * @type {SignUpRequest}
 * @property {string} username - Username
 * @property {string} email - Email
 * @property {string} password - Password
 * @property {string} password_confirmation - Password Confirmation
 * @property {string} ip_address - IP Address
 * @property {string} currency_code - Currency Code
 */
export type SignUpRequest = {
  username: string
  email: string
  password: string
  password_confirmation: string
  ip_address: string // IP address lors de l'inscription
  currency_code: string // device monétaire (USD, EUR, etc.)
}

/**
 * ValidateAccountRequest
 * @type {ValidateAccountRequest}
 * @property {number} code - Code
 * @property {string} email - Email
 */
export type ValidateAccountRequest = {
  code: number
  email: string
}

/**
 * @type {object} ResetPasswordRequest
 * @property {string} token - Token
 * @property {string} newPassword - New Password
 * @property {string} newPassword_confirmation - New Password Confirmation
 */
export type ResetPasswordRequest = {
  token: string
  newPassword: string
  newPassword_confirmation: string
}

/**
 * @type {object} ResetEmailRequest
 * @property {string} token - Token
 * @property {string} newEmail - New Email
 */
export type ResetEmailRequest = {
  token: string
  newEmail: string
}

/**
 * AuthService
 * @class AuthService
 */
export default class AuthService extends BaseApiService {
  /**
   * Sign In
   * @param {LoginRequest} auth - login request
   * @returns {Promise<AuthModel>} - AuthModel
   */
  public static async signIn(auth: LoginRequest): Promise<AuthModel> {
    return await this.post('/signin', auth)
  }

  /**
   * Sign Up
   * @param {SignUpRequest} auth - SignUpRequest
   * @returns {Promise<SuccessResponse>} - SuccessResponse
   */
  public static async signUp(auth: SignUpRequest): Promise<SuccessResponse> {
    return await this.post('/signup', auth)
  }

  /**
   * Sign Out
   * @returns {Promise<SuccessResponse>} - SuccessResponse
   */
  public static async signOut(): Promise<SuccessResponse> {
    return await this.post('/signout')
  }

  /**
   * Validate Account
   * @param {ValidateAccountRequest} params - ValidateAccountRequest
   * @returns {Promise<SuccessResponse>} - SuccessResponse
   */
  public static async validateAccount(params: ValidateAccountRequest): Promise<SuccessResponse> {
    return await this.post('/verifycode', params)
  }

  /**
   * Sign Out
   * @param {string} email - Email
   * @returns {Promise<SuccessResponse>} - SuccessResponse
   */
  public static async forgotPassword(email: string): Promise<SuccessResponse> {
    return await this.post('/forgot-password', { email })
  }

  /**
   * Reset Password
   * @param {ResetPasswordRequest} params - ResetPasswordRequest
   * @returns {Promise<void>}
   */
  public static async resetPassword(params: ResetPasswordRequest): Promise<void> {
    return await this.post('/reset-password', params)
  }

  /**
   * Modify Email
   * @param {string} email - Email
   * @returns {Promise<void>}
   */
  public static async modifyEmail(email: string): Promise<void> {
    return await this.post('/modify-email', { email })
  }

  /**
   * Reset Email
   * @param {ResetEmailRequest} params - ResetEmailRequest
   * @returns {Promise<void>}
   */
  public static async resetEmail(params: ResetEmailRequest): Promise<void> {
    return await this.post('/reset-email', params)
  }

  /**
   * Resend New Code Verification Account
   * @param {string} email - Email
   * @returns {Promise<void>}
   */
  public static async resendNewCodeVerificationAccount(email: string): Promise<void> {
    return await this.post('/resend-code', { email: email })
  }
}
