/**
 * @generated SignedSource<<94e9e6af75ec8f4851bc44ef8462f1cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageListTable_messagesEdge$data = ReadonlyArray<{
  readonly node: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"MessageListTable_messageRecord">;
  } | null | undefined;
  readonly " $fragmentType": "MessageListTable_messagesEdge";
}>;
export type MessageListTable_messagesEdge$key = ReadonlyArray<{
  readonly " $data"?: MessageListTable_messagesEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessageListTable_messagesEdge">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "MessageListTable_messagesEdge",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "MessageListTable_messageRecord"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MessagesEdge",
  "abstractKey": null
};

(node as any).hash = "fecc2bc6adcb0d597dcb6f8dee8b8860";

export default node;
