/**
 * @generated SignedSource<<d4d645b6e83f61a3a57ab0f1bbee53e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageList_data$data = {
  readonly messages: {
    readonly edges: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"MessageListTable_messagesEdge">;
    }> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "MessageList_data";
};
export type MessageList_data$key = {
  readonly " $data"?: MessageList_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessageList_data">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "messages"
];
return {
  "argumentDefinitions": [
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
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "count",
          "cursor": "cursor"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./MessageListRefetchableQuery.graphql')
    }
  },
  "name": "MessageList_data",
  "selections": [
    {
      "alias": "messages",
      "args": [
        {
          "kind": "Variable",
          "name": "where",
          "variableName": "where"
        }
      ],
      "concreteType": "MessagesConnection",
      "kind": "LinkedField",
      "name": "__ScreenerList_messages_connection",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "MessageListTable_messagesEdge"
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
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
                  "name": "__typename",
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "853d6fe3c24dddeccc1cbbc1f6d70987";

export default node;
