export class KeyValue {
  myspType="KeyValue"
  key: string | null;
  value: any | null = null;
  displayName: string  | null = null;
  constructor(key?: string, value?: any, displayName: string = '') {
    this.key = key as string
    this.value = value
    this.displayName = displayName
  }
}
