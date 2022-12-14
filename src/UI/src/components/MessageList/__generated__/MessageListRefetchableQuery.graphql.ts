/**
 * @generated SignedSource<<1a4afa999c30b888af442e99839ad61b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageRecordFilterInput = {
  and?: ReadonlyArray<MessageRecordFilterInput> | null;
  body?: StringOperationFilterInput | null;
  from?: StringOperationFilterInput | null;
  id?: ComparableGuidOperationFilterInput | null;
  or?: ReadonlyArray<MessageRecordFilterInput> | null;
  properties?: IReadOnlyDictionaryOfStringAndStringFilterInput | null;
  provider?: StringOperationFilterInput | null;
  receivedAt?: ComparableDateTimeOperationFilterInput | null;
  receivedLog?: ListFilterInputTypeOfMessageReceivedLogFilterInput | null;
  to?: ListStringOperationFilterInput | null;
  type?: StringOperationFilterInput | null;
};
export type ComparableGuidOperationFilterInput = {
  eq?: string | null;
  gt?: string | null;
  gte?: string | null;
  in?: ReadonlyArray<string> | null;
  lt?: string | null;
  lte?: string | null;
  neq?: string | null;
  ngt?: string | null;
  ngte?: string | null;
  nin?: ReadonlyArray<string> | null;
  nlt?: string | null;
  nlte?: string | null;
};
export type ComparableDateTimeOperationFilterInput = {
  eq?: string | null;
  gt?: string | null;
  gte?: string | null;
  in?: ReadonlyArray<string> | null;
  lt?: string | null;
  lte?: string | null;
  neq?: string | null;
  ngt?: string | null;
  ngte?: string | null;
  nin?: ReadonlyArray<string> | null;
  nlt?: string | null;
  nlte?: string | null;
};
export type StringOperationFilterInput = {
  and?: ReadonlyArray<StringOperationFilterInput> | null;
  contains?: string | null;
  endsWith?: string | null;
  eq?: string | null;
  in?: ReadonlyArray<string | null> | null;
  ncontains?: string | null;
  nendsWith?: string | null;
  neq?: string | null;
  nin?: ReadonlyArray<string | null> | null;
  nstartsWith?: string | null;
  or?: ReadonlyArray<StringOperationFilterInput> | null;
  startsWith?: string | null;
};
export type ListStringOperationFilterInput = {
  all?: StringOperationFilterInput | null;
  any?: boolean | null;
  none?: StringOperationFilterInput | null;
  some?: StringOperationFilterInput | null;
};
export type ListFilterInputTypeOfMessageReceivedLogFilterInput = {
  all?: MessageReceivedLogFilterInput | null;
  any?: boolean | null;
  none?: MessageReceivedLogFilterInput | null;
  some?: MessageReceivedLogFilterInput | null;
};
export type MessageReceivedLogFilterInput = {
  and?: ReadonlyArray<MessageReceivedLogFilterInput> | null;
  clientName?: StringOperationFilterInput | null;
  isMatch?: BooleanOperationFilterInput | null;
  or?: ReadonlyArray<MessageReceivedLogFilterInput> | null;
  receivedAt?: ComparableDateTimeOperationFilterInput | null;
};
export type BooleanOperationFilterInput = {
  eq?: boolean | null;
  neq?: boolean | null;
};
export type IReadOnlyDictionaryOfStringAndStringFilterInput = {
  and?: ReadonlyArray<IReadOnlyDictionaryOfStringAndStringFilterInput> | null;
  keys?: ListStringOperationFilterInput | null;
  or?: ReadonlyArray<IReadOnlyDictionaryOfStringAndStringFilterInput> | null;
  values?: ListStringOperationFilterInput | null;
};
export type MessageListRefetchableQuery$variables = {
  count?: number | null;
  cursor?: string | null;
  where?: MessageRecordFilterInput | null;
};
export type MessageListRefetchableQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MessageList_data">;
};
export type MessageListRefetchableQuery = {
  response: MessageListRefetchableQuery$data;
  variables: MessageListRefetchableQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": 30,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "where"
  }
],
v1 = {
  "kind": "Variable",
  "name": "where",
  "variableName": "where"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MessageListRefetchableQuery",
    "selections": [
      {
        "args": [
          {
            "kind": "Variable",
            "name": "count",
            "variableName": "count"
          },
          {
            "kind": "Variable",
            "name": "cursor",
            "variableName": "cursor"
          },
          (v1/*: any*/)
        ],
        "kind": "FragmentSpread",
        "name": "MessageList_data"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessageListRefetchableQuery",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
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
        "args": (v2/*: any*/),
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
    "cacheID": "5922746489419b422061aeb6bad6f6ae",
    "id": null,
    "metadata": {},
    "name": "MessageListRefetchableQuery",
    "operationKind": "query",
    "text": "query MessageListRefetchableQuery(\n  $count: Int = 30\n  $cursor: String\n  $where: MessageRecordFilterInput\n) {\n  ...MessageList_data_mjR8k\n}\n\nfragment MessageList_data_mjR8k on Query {\n  messages(after: $cursor, first: $count, where: $where) {\n    edges {\n      node {\n        id\n        title\n        receivedAt\n        type\n        provider\n        to\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "701ee56ddadbb96f47fcebfa78b09e31";

export default node;
