/**
 * @generated SignedSource<<bec2b670aed3ba7242c02ac2740b4ad4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuickInformation_message$data = {
  readonly body: string | null | undefined;
  readonly from: string;
  readonly id: string;
  readonly provider: string;
  readonly receivedAt: any;
  readonly title: string;
  readonly type: string;
  readonly " $fragmentType": "QuickInformation_message";
};
export type QuickInformation_message$key = {
  readonly " $data"?: QuickInformation_message$data;
  readonly " $fragmentSpreads": FragmentRefs<"QuickInformation_message">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuickInformation_message",
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

(node as any).hash = "1a0d690904e17174c154459b33ec5a21";

export default node;
