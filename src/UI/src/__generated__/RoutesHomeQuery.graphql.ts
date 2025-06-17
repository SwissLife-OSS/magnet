/**
 * @generated SignedSource<<a358704076ade4fb38686a5c422e625b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RoutesHomeQuery$variables = {
  search?: string | null | undefined;
};
export type RoutesHomeQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HomeFragment">;
};
export type RoutesHomeQuery = {
  response: RoutesHomeQuery$data;
  variables: RoutesHomeQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "search"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 30
  },
  {
    "fields": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "contains",
            "variableName": "search"
          }
        ],
        "kind": "ObjectValue",
        "name": "title"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RoutesHomeQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "search",
            "variableName": "search"
          }
        ],
        "kind": "FragmentSpread",
        "name": "HomeFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RoutesHomeQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MessagesConnection",
        "kind": "LinkedField",
        "name": "messages",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MessagesEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MessageRecord",
                "kind": "LinkedField",
                "name": "node",
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
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v1/*: any*/),
        "filters": [
          "where"
        ],
        "handle": "connection",
        "key": "ScreenerList_messages",
        "kind": "LinkedHandle",
        "name": "messages"
      }
    ]
  },
  "params": {
    "cacheID": "bd0fd19ea57e1d34a5df71d71ca7d5b6",
    "id": null,
    "metadata": {},
    "name": "RoutesHomeQuery",
    "operationKind": "query",
    "text": "query RoutesHomeQuery(\n  $search: String\n) {\n  ...HomeFragment_40zwac\n}\n\nfragment HomeFragment_40zwac on Query {\n  ...MessageList_data_1DkO9M\n}\n\nfragment MessageListTable_messageRecord on MessageRecord {\n  id\n  title\n  receivedAt\n  type\n  provider\n  to\n}\n\nfragment MessageListTable_messagesEdge on MessagesEdge {\n  node {\n    id\n    ...MessageListTable_messageRecord\n  }\n}\n\nfragment MessageList_data_1DkO9M on Query {\n  messages(first: 30, where: {title: {contains: $search}}) {\n    edges {\n      ...MessageListTable_messagesEdge\n      cursor\n      node {\n        __typename\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "55ce1e61134d89be02dc0ca5b403e6b2";

export default node;
