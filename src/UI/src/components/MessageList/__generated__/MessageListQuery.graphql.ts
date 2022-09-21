/**
 * @generated SignedSource<<30a64d8ce6fc4b97792b5bc09cd0995c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MessageListQuery$variables = {};
export type MessageListQuery$data = {
  readonly messages: ReadonlyArray<{
    readonly id: string;
    readonly provider: string;
    readonly receivedAt: string;
    readonly title: string;
    readonly type: string;
  } | null> | null;
};
export type MessageListQuery = {
  response: MessageListQuery$data;
  variables: MessageListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "MessageRecord",
    "kind": "LinkedField",
    "name": "messages",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "title",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "receivedAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "type",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "provider",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MessageListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MessageListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0e999f852ca953770999a1830dc84f52",
    "id": null,
    "metadata": {},
    "name": "MessageListQuery",
    "operationKind": "query",
    "text": "query MessageListQuery {\n  messages {\n    id\n    title\n    receivedAt\n    type\n    provider\n  }\n}\n"
  }
};
})();

(node as any).hash = "617f10e3b00b79d6650529ead2a3166f";

export default node;
