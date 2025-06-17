/**
 * @generated SignedSource<<59cf2ad2935117cb6913854bd6542fcc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MessageDetailQuery$variables = {
  id: any;
};
export type MessageDetailQuery$data = {
  readonly message: {
    readonly id: string;
    readonly provider: string;
    readonly receivedAt: any;
    readonly title: string;
    readonly to: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly type: string;
  } | null | undefined;
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
v1 = [
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
        "name": "receivedAt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "to",
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
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessageDetailQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ade256d2d3c6b0c251b4d64ed4e555ed",
    "id": null,
    "metadata": {},
    "name": "MessageDetailQuery",
    "operationKind": "query",
    "text": "query MessageDetailQuery(\n  $id: Uuid!\n) {\n  message(id: $id) {\n    id\n    title\n    type\n    provider\n    receivedAt\n    to\n  }\n}\n"
  }
};
})();

(node as any).hash = "f5d4ddae70a71f995e378d7829814cdd";

export default node;
