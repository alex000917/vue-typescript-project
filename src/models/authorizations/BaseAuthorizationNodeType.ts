import { KeyValue } from "../KeyValue"

export class BaseAuthorizationNodeType {
  path : KeyValue[] = []
  userSingleLookup: boolean | null = true
}
