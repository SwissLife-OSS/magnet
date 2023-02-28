/**
 * Promisified `delay`.
 *
 * **Important**: In `test` environment will return a promise that is resolved.
 *
 * @example
 * await sleep(100);
 */
export const sleep = (ms = 0, automock = true) => {
    if (automock && process.env.NODE_ENV === 'test') {
      return Promise.resolve();
    }
  
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  };
  