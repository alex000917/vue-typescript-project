import { BaseAuthorizationNodeType } from "./BaseAuthorizationNodeType"

export class FolderAuthorizationNodeType extends BaseAuthorizationNodeType {
    myspType = "FolderAuthorizationNodeType";
    folderName: string | null = null;
}
