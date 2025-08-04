/**
 * @generated SignedSource<<7af81362e782dc26d3e23ca99ad386e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageDetailHeader_messageRecord$data = {
  readonly id: string;
  readonly title: string;
  readonly type: string;
  readonly " $fragmentType": "MessageDetailHeader_messageRecord";
};
export type MessageDetailHeader_messageRecord$key = {
  readonly " $data"?: MessageDetailHeader_messageRecord$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessageDetailHeader_messageRecord">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MessageDetailHeader_messageRecord",
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
    }
  ],
  "type": "MessageRecord",
  "abstractKey": null
};

(node as any).hash = "f2382817fd7d1a6d23cc84c00e315e19";

export default node;
