/**
 * @generated SignedSource<<a96942ea41c005b709be1728cd343b70>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MessageListTable_messageRecord$data = {
  readonly id: string;
  readonly provider: string;
  readonly receivedAt: any;
  readonly title: string;
  readonly to: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly type: string;
  readonly " $fragmentType": "MessageListTable_messageRecord";
};
export type MessageListTable_messageRecord$key = {
  readonly " $data"?: MessageListTable_messageRecord$data;
  readonly " $fragmentSpreads": FragmentRefs<"MessageListTable_messageRecord">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MessageListTable_messageRecord",
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

(node as any).hash = "ad123dda1a175c5323fc57baaa6f4f95";

export default node;
