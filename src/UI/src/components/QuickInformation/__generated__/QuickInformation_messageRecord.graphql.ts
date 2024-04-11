/**
 * @generated SignedSource<<2f71a27f71b832101c84c5ae3d5ef21a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuickInformation_messageRecord$data = {
  readonly body: string | null | undefined;
  readonly from: string;
  readonly id: string;
  readonly provider: string;
  readonly receivedAt: any;
  readonly title: string;
  readonly type: string;
  readonly " $fragmentType": "QuickInformation_messageRecord";
};
export type QuickInformation_messageRecord$key = {
  readonly " $data"?: QuickInformation_messageRecord$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuickInformation_messageRecord">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuickInformation_messageRecord",
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
      "name": "receivedAt",
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
      "name": "from",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "body",
      "storageKey": null
    }
  ],
  "type": "MessageRecord",
  "abstractKey": null
};

(node as any).hash = "142dc57cc48ee03c16531bc8dba8e9f9";

export default node;
