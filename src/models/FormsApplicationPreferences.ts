import { KeyValue } from "./KeyValue"

export class FormsApplicationPreferences {
  myspType="FormsApplicationPreferences"
  constructor() {
    this.operators = []
  }

	operators:KeyValue[] |null=null;
}
