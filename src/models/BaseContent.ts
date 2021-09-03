import { LanguageTranslation } from "./LanguageTranslation";
import { newGuid } from "./Utils";

export interface IBaseContent {
  myspType: string;
  description: string | null;
  displayName: string;
  displayNameLanguageKey: string | null;
  descriptionLanguageKey: string | null;
  languageTranslations: LanguageTranslation[];
  notes: string | null;
  systemName: string;
}

export class BaseContent implements IBaseContent {
  myspType = "BaseContent";
  displayName = "";
  description: string | null = null;
  displayNameLanguageKey: string | null = null;
  descriptionLanguageKey: string | null = null;
  languageTranslations: LanguageTranslation[] = [];
  notes: string | null = null;
  systemName = "";

  constructor() {
    this.displayName = "";
    this.description = null;

    const hetrans = new LanguageTranslation("he", "", "");
    this.languageTranslations = [];
    this.languageTranslations.push(hetrans);
  }
}
