export class KeyValue {
  myspType="KeyValue"
  key: string | null;
  value: any | null = null;
  constructor(key?: string, value?: any) {
    this.key = key as string
    this.value = value
  }
}
