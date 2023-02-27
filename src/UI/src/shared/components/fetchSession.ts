import { AuthenticationError } from './authenticationError';
import { sleep } from './sleep';

/**
 * Simple session management commander with fault tolerance.
 *
 * @param endpoint Url.
 * @param lapses Delay (ms) before try.
 *
 * @example
 * fetchSession('http://localhost:5001/bff/user');
 */
export const fetchSession = async <T>(
  endpoint: string,
  lapses: number[] = [0, 1e3, 5e3, 10e3],
): Promise<T> => {
  let error: unknown = undefined;
  let unhandled: unknown = undefined;

  const fn = () =>
    fetch(endpoint, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'X-CSRF': '1'},
    }).then((response) => {
      if (response.ok && response.status === 200) {
        return response.json() as Promise<T>;
      } else {
        unhandled = new AuthenticationError(
          `${response.statusText} (${response.status})`,
          {statusCode: response.status},
        );
        throw unhandled;
      }
    });

  for (const wait of lapses) {
    try {
      if (wait) {
        await sleep(wait);
      }

      return await fn();
    } catch (e) {
      if (e === unhandled) {
        throw unhandled;
      }
      error = e;
    }
  }

  throw error;
};