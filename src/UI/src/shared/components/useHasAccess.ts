import { getClaims } from "./getClaims";
import { useEffect, useState } from "react";

export const useHasAccess = () => {
  const [hasRole, setHasRole] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    getClaims().then((response) => {
      const required = response.find((c) => c.value === 'Magnet.Read')
     
      if(required){
        setHasRole(true);
      }
      setIsLoading(false);
    })
    .catch((error) => {
      setError(error);
    })
  }, []);

  if(error){
    throw error;
  }

  return { hasRole, isLoading };
};
