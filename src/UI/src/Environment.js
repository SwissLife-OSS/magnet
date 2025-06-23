import { useMemo } from "react";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

const fetchGraphQL = async (...params) => {
  const [operation, variables] = params;
  
  console.log('GraphQL Operation:', { 
    hasId: !!operation.id, 
    hasText: !!operation.text,
    operationName: operation.name 
  });
  
  if (!operation.text) {
    console.error('No query text available for operation:', operation.name);
    throw new Error(`No query text available for operation: ${operation.name}`);
  }

  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });
  return await response.json();
};

const fetchFn = (params, variables) => fetchGraphQL(params, variables);

export const createEnvironment = () =>
  new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
  });

export const useEnvironment = () => useMemo(createEnvironment, []);
