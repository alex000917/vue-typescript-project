
export class LanguageTranslation {
    myspType="LanguageTranslation"
    description: string|null =null;
    displayName: string|null=null;
    language: string|null="he";

    constructor(langKey:string, displayNmae:string, description:string|null) {
      this.language = langKey
      this.displayName = displayNmae
      this.description = description
    }
}
