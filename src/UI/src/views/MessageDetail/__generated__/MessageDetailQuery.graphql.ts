/**
 * @generated SignedSource<<30852632272ba82fd5faa33fe0d49193>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageDetailQuery$variables = {
  id: any;
};
export type MessageDetailQuery$data = {
  readonly message: {
    readonly " $fragmentSpreads": FragmentRefs<"MessageDetailHeader_messageRecord" | "QuickInformation_messageRecord" | "ReceivedLogTable_messageRecord" | "ReceiverList_messageRecord">;
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
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "receivedAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MessageDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MessageRecord",
        "kind": "LinkedField",
        "name": "message",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MessageDetailHeader_messageRecord"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "QuickInformation_messageRecord"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ReceiverList_messageRecord"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ReceivedLogTable_messageRecord"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessageDetailQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
          (v2/*: any*/),
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
            "name": "body",
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
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6a03e120213cab9c2facabec209fce33",
    "id": null,
    "metadata": {},
    "name": "MessageDetailQuery",
    "operationKind": "query",
    "text": "query MessageDetailQuery(\n  $id: Uuid!\n) {\n  message(id: $id) {\n    ...MessageDetailHeader_messageRecord\n    ...QuickInformation_messageRecord\n    ...ReceiverList_messageRecord\n    ...ReceivedLogTable_messageRecord\n    id\n  }\n}\n\nfragment MessageDetailHeader_messageRecord on MessageRecord {\n  id\n  title\n  type\n}\n\nfragment QuickInformation_messageRecord on MessageRecord {\n  id\n  title\n  type\n  receivedAt\n  provider\n  from\n  body\n}\n\nfragment ReceivedLogTable_messageRecord on MessageRecord {\n  receivedLog {\n    clientName\n    receivedAt\n  }\n}\n\nfragment ReceiverList_messageRecord on MessageRecord {\n  to\n}\n"
  }
};
})();

(node as any).hash = "f13965a837fc958a4d09e81a531bb05d";

export default node;
