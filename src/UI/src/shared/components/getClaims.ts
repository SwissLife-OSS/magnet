import { fetchSession } from "./fetchSession";

export interface Claim {
  type: string;
  value: string;
}

export type Claims = Claim[];

export const getClaims = async () => {
  try {
    const claims = await fetchSession<Claims>("/bff/user");
    return claims.map((claim) => ({
      type: claim.type,
      value: tryParse(claim.value),
    }));
  } catch (error) {
    const message = "Unable to get user session.";

    if (error instanceof Error) {
      error.message = message + "\n" + error.message;

      throw error;
    } else {
      throw new Error(message);
    }
  }
};

function tryParse(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
