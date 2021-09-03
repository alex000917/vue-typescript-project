import { ApplicationPreference } from "../ApplicationPreference"
import { BaseAuthorizationNodeType } from "./BaseAuthorizationNodeType"

export class ApplicationPreferenceAuthorizationNodeType extends BaseAuthorizationNodeType {
  applicationPreferenceSystemName = "";
  // --------------------- TRANSIENTS ---------------------
  myspType = "ApplicationPreferenceAuthorizationNodeType";
  applicationPreference: ApplicationPreference | null = null;
}
