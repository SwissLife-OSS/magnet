import { fetchSession } from './fetchSession';

export interface Claim {
  type: string;
  value: string;
}

export type Claims = Claim[];

export const getClaims = async () => {
  try {
    return await fetchSession<Claims>("/bff/user");
  } catch (error) {
    const message = 'Unable to get user session.';

    if (error instanceof Error) {
      error.message = message + '\n' + error.message;

      throw error;
    } else {
      throw new Error(message);
    }
  }
};
