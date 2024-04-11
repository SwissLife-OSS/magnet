import { useMemo } from "react";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

const fetchGraphQL = async (...params) => {
  const [operation, variables] = params;
  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: operation.id ?? undefined,
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
