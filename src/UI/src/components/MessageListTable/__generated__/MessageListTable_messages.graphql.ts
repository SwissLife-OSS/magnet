/**
 * @generated SignedSource<<fe45181bb7373b13e8ee7f5b8f7b454c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageListTable_messages$data = ReadonlyArray<{
  readonly id: string;
  readonly provider: string;
  readonly receivedAt: any;
  readonly title: string;
  readonly to: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly type: string;
  readonly " $fragmentType": "MessageListTable_messages";
}>;
export type MessageListTable_messages$key = ReadonlyArray<{
  readonly " $data"?: MessageListTable_messages$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessageListTable_messages">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "MessageListTable_messages",
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
    }
  ],
  "type": "MessageRecord",
  "abstractKey": null
};

(node as any).hash = "8de07700af5edbc645b2be0ecf58ed2c";

export default node;
