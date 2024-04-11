/**
 * @generated SignedSource<<3f27d00644145c2b7a43b46fad32290e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageRecordFilterInput = {
  and?: ReadonlyArray<MessageRecordFilterInput> | null | undefined;
  body?: StringOperationFilterInput | null | undefined;
  from?: StringOperationFilterInput | null | undefined;
  id?: ComparableGuidOperationFilterInput | null | undefined;
  or?: ReadonlyArray<MessageRecordFilterInput> | null | undefined;
  properties?: IReadOnlyDictionaryOfStringAndStringFilterInput | null | undefined;
  provider?: StringOperationFilterInput | null | undefined;
  receivedAt?: ComparableDateTimeOperationFilterInput | null | undefined;
  receivedLog?: ListFilterInputTypeOfMessageReceivedLogFilterInput | null | undefined;
  to?: ListStringOperationFilterInput | null | undefined;
  type?: StringOperationFilterInput | null | undefined;
};
export type ComparableGuidOperationFilterInput = {
  eq?: any | null | undefined;
  gt?: any | null | undefined;
  gte?: any | null | undefined;
  in?: ReadonlyArray<any> | null | undefined;
  lt?: any | null | undefined;
  lte?: any | null | undefined;
  neq?: any | null | undefined;
  ngt?: any | null | undefined;
  ngte?: any | null | undefined;
  nin?: ReadonlyArray<any> | null | undefined;
  nlt?: any | null | undefined;
  nlte?: any | null | undefined;
};
export type ComparableDateTimeOperationFilterInput = {
  eq?: any | null | undefined;
  gt?: any | null | undefined;
  gte?: any | null | undefined;
  in?: ReadonlyArray<any> | null | undefined;
  lt?: any | null | undefined;
  lte?: any | null | undefined;
  neq?: any | null | undefined;
  ngt?: any | null | undefined;
  ngte?: any | null | undefined;
  nin?: ReadonlyArray<any> | null | undefined;
  nlt?: any | null | undefined;
  nlte?: any | null | undefined;
};
export type StringOperationFilterInput = {
  and?: ReadonlyArray<StringOperationFilterInput> | null | undefined;
  contains?: string | null | undefined;
  endsWith?: string | null | undefined;
  eq?: string | null | undefined;
  in?: ReadonlyArray<string | null | undefined> | null | undefined;
  ncontains?: string | null | undefined;
  nendsWith?: string | null | undefined;
  neq?: string | null | undefined;
  nin?: ReadonlyArray<string | null | undefined> | null | undefined;
  nstartsWith?: string | null | undefined;
  or?: ReadonlyArray<StringOperationFilterInput> | null | undefined;
  startsWith?: string | null | undefined;
};
export type ListStringOperationFilterInput = {
  all?: StringOperationFilterInput | null | undefined;
  any?: boolean | null | undefined;
  none?: StringOperationFilterInput | null | undefined;
  some?: StringOperationFilterInput | null | undefined;
};
export type ListFilterInputTypeOfMessageReceivedLogFilterInput = {
  all?: MessageReceivedLogFilterInput | null | undefined;
  any?: boolean | null | undefined;
  none?: MessageReceivedLogFilterInput | null | undefined;
  some?: MessageReceivedLogFilterInput | null | undefined;
};
export type MessageReceivedLogFilterInput = {
  and?: ReadonlyArray<MessageReceivedLogFilterInput> | null | undefined;
  clientName?: StringOperationFilterInput | null | undefined;
  isMatch?: BooleanOperationFilterInput | null | undefined;
  or?: ReadonlyArray<MessageReceivedLogFilterInput> | null | undefined;
  receivedAt?: ComparableDateTimeOperationFilterInput | null | undefined;
};
export type BooleanOperationFilterInput = {
  eq?: boolean | null | undefined;
  neq?: boolean | null | undefined;
};
export type IReadOnlyDictionaryOfStringAndStringFilterInput = {
  and?: ReadonlyArray<IReadOnlyDictionaryOfStringAndStringFilterInput> | null | undefined;
  keys?: ListStringOperationFilterInput | null | undefined;
  or?: ReadonlyArray<IReadOnlyDictionaryOfStringAndStringFilterInput> | null | undefined;
  values?: ListStringOperationFilterInput | null | undefined;
};
export type MessageListRefetchableQuery$variables = {
  count?: number | null | undefined;
  cursor?: string | null | undefined;
  where?: MessageRecordFilterInput | null | undefined;
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
    "cacheID": "6d22a0051feb07a281b828d8592a7514",
    "id": null,
    "metadata": {},
    "name": "MessageListRefetchableQuery",
    "operationKind": "query",
    "text": "query MessageListRefetchableQuery(\n  $count: Int = 30\n  $cursor: String\n  $where: MessageRecordFilterInput\n) {\n  ...MessageList_data_mjR8k\n}\n\nfragment MessageListTable_messageRecord on MessageRecord {\n  id\n  title\n  receivedAt\n  type\n  provider\n  to\n}\n\nfragment MessageListTable_messagesEdge on MessagesEdge {\n  node {\n    id\n    ...MessageListTable_messageRecord\n  }\n}\n\nfragment MessageList_data_mjR8k on Query {\n  messages(after: $cursor, first: $count, where: $where) {\n    edges {\n      ...MessageListTable_messagesEdge\n      cursor\n      node {\n        __typename\n        id\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "853d6fe3c24dddeccc1cbbc1f6d70987";

export default node;
