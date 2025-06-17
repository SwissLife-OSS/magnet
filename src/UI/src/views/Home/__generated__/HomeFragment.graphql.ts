/**
 * @generated SignedSource<<7c6769f59f7d4bb94512ff966fcff8d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MessageList_data">;
  readonly " $fragmentType": "HomeFragment";
};
export type HomeFragment$key = {
  readonly " $data"?: HomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "search"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "refetch": {
      "connection": null,
      "fragmentPathInResult": [],
      "operation": require('./HomeRefetchQuery.graphql')
    }
  },
  "name": "HomeFragment",
  "selections": [
    {
      "args": [
        {
          "fields": [
            {
              "fields": [
                {
                  "kind": "Variable",
                  "name": "contains",
                  "variableName": "search"
                }
              ],
              "kind": "ObjectValue",
              "name": "title"
            }
          ],
          "kind": "ObjectValue",
          "name": "where"
        }
      ],
      "kind": "FragmentSpread",
      "name": "MessageList_data"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "976c756fdca4e807676f5d08e976c3ea";

export default node;
