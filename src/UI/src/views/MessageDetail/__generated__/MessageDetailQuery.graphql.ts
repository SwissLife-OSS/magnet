/**
 * @generated SignedSource<<83e8d3cb52d9a89cdef956adfc037942>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MessageDetailQuery$variables = {
  id: string;
};
export type MessageDetailQuery$data = {
  readonly message: {
    readonly body: string | null;
    readonly from: string;
    readonly id: string;
    readonly provider: string;
    readonly receivedAt: string;
    readonly receivedLog: ReadonlyArray<{
      readonly clientName: string | null;
      readonly receivedAt: string;
    } | null> | null;
    readonly title: string;
    readonly to: ReadonlyArray<string | null> | null;
    readonly type: string;
  } | null;
};
export type MessageDetailQuery = {
  response: MessageDetailQuery$data;
  variables: MessageDetailQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "receivedAt",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "MessageRecord",
    "kind": "LinkedField",
    "name": "message",
    "plural": false,
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
        "name": "type",
        "storageKey": null
      },
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "provider",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "from",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "to",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "body",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "MessageReceivedLog",
        "kind": "LinkedField",
        "name": "receivedLog",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "clientName",
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MessageDetailQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessageDetailQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "6d12f9dcf3d729d712abc62a857d1b3f",
    "id": null,
    "metadata": {},
    "name": "MessageDetailQuery",
    "operationKind": "query",
    "text": "query MessageDetailQuery(\n  $id: Uuid!\n) {\n  message(id: $id) {\n    id\n    title\n    type\n    receivedAt\n    provider\n    from\n    to\n    body\n    receivedLog {\n      clientName\n      receivedAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "90d3e36bdf3352d0109f8672d62a59b5";

export default node;
