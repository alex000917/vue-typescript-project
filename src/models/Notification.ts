import { TextAssembly } from "./TextAssembly";

export class Notification {
  myspType = "Notification";
  toRecipients: TextAssembly | null = null;
  ccRecipients: TextAssembly | null = null;
  bccRecipients: TextAssembly | null = null;

  /**
   *
   */
  constructor() {
    this.toRecipients = new TextAssembly();
    this.ccRecipients = new TextAssembly();
    this.bccRecipients = new TextAssembly();
  }
}
