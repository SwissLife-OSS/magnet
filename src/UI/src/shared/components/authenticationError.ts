interface AuthenticationErrorOptions {
  cause?: Error;
  statusCode?: number;
}

const AUTHENTICATION_ERROR_NAME = 'AuthenticationError';

/**
 * A error that is thrown when the user cannot be authenticated
 */
export class AuthenticationError extends Error {
  public statusCode?: number;

  constructor(message: string, options?: AuthenticationErrorOptions) {
    super(message, options);
    this.name = AUTHENTICATION_ERROR_NAME;

    if (options) {
      const {cause, ...meta} = options;

      Object.assign(this, meta);
    }
  }
}

/**
 * Ensures that parameter err is of type AuthenticationError
 */
export const isAuthenticationError = (
  err: unknown,
): err is AuthenticationError =>
  err instanceof Error && err?.name === AUTHENTICATION_ERROR_NAME;
