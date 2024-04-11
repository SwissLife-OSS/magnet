/**
 * @generated SignedSource<<5e7ea30cc1ba3b1aa6caa784c3de4cf6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ReceiverList_messageRecord$data = {
  readonly to: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly " $fragmentType": "ReceiverList_messageRecord";
};
export type ReceiverList_messageRecord$key = {
  readonly " $data"?: ReceiverList_messageRecord$data;
  readonly " $fragmentSpreads": FragmentRefs<"ReceiverList_messageRecord">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReceiverList_messageRecord",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "to",
      "storageKey": null
    }
  ],
  "type": "MessageRecord",
  "abstractKey": null
};

(node as any).hash = "ab1658abd8592c0da91ec4ac13a1466c";

export default node;
