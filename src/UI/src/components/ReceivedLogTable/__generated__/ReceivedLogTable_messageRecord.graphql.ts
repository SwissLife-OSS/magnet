/**
 * @generated SignedSource<<3e4e6bae00fa947814a9e939b6958492>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ReceivedLogTable_messageRecord$data = {
  readonly receivedLog: ReadonlyArray<{
    readonly clientName: string | null | undefined;
    readonly receivedAt: any;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "ReceivedLogTable_messageRecord";
};
export type ReceivedLogTable_messageRecord$key = {
  readonly " $data"?: ReceivedLogTable_messageRecord$data;
  readonly " $fragmentSpreads": FragmentRefs<"ReceivedLogTable_messageRecord">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReceivedLogTable_messageRecord",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MessageReceivedLog",
      "kind": "LinkedField",
      "name": "receivedLog",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "clientName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "receivedAt",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MessageRecord",
  "abstractKey": null
};

(node as any).hash = "5ba9c3efa2b289a1e53b3aa64077b1fa";

export default node;
