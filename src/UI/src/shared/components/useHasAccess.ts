import { getClaims } from "./getClaims";
import { useEffect, useState } from "react";

export const useHasAccess = () => {
  const [hasRole, setHasRole] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getClaims().then((response) => {
      const required = response.claims.find((c) => c.value === 'Magnet.Read')
     
      if(required){
        setHasRole(true);
      }
      setIsLoading(false);
    })
  }, []);

  return { hasRole, isLoading };
};
