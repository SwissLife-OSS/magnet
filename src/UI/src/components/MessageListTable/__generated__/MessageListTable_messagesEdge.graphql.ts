/**
 * @generated SignedSource<<eb33823e17ffc6bc2a239a13aa9fee86>>
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

(node as any).hash = "6be3073d6467856c37c66797f45e4667";

export default node;
