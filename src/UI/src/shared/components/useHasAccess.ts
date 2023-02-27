import { getClaims } from "./getClaims";
import { useEffect, useState } from "react";

export const useHasAccess = () => {
  const [hasRole, setHasRole] = useState<boolean>(false);

  useEffect(() => {
    getClaims().then((response) => {
      const required = response.claims.find((c) => c.value === 'Magnet.Read')
     
      if(required){
        setHasRole(true);
      }
    })
  }, []);

  return hasRole;
};
