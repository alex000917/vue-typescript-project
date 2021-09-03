/**
 *
 */

import { ApplicationPreferenceAuthorizationNodeType } from "@/models/authorizations/ApplicationPreferenceAuthorizationNodeType"
import { AuthorizationNode } from "@/models/authorizations/AuthorizationNode"
import { DialogRoleAuthorizationNodeType } from "@/models/authorizations/DialogRoleAuthorizationNodeType"
import { FolderAuthorizationNodeType } from "@/models/authorizations/FolderAuthorizationNodeType"
import { PropertyAuthorizationNodeType } from "@/models/authorizations/PropertyAuthorizationNodeType"
import { CustomAuthorizationNodeType } from "@/models/authorizations/CustomAuthorizationNodeType"
import { RowAuthorizationNodeType } from "@/models/authorizations/RowAuthorizationNodeType"
import { TableAuthorizationNodeType } from "@/models/authorizations/TableAuthorizationNodeType"
import { LanguagesPresentationModel } from "@/models/Utils/LanguagesPresentationModel"
import { ConditionUtils } from "@/models/Utils/ConditionUtils"
import { StringUtils } from "@/models/Utils/StringUtils"
import { ArrayUtils } from "@/models/Utils/ArrayUtils"
import { MSPEmbeddedAssets } from "@/models/Utils/MSPEmbeddedAssets"

export class AuthorizationTreeUtils {
  /**
   *
   * returns the display name for the authorization node according to its type
   */
  public static getAuthorizationNodeDisplayName(authorizationNode: AuthorizationNode, languagesPresentationModel: LanguagesPresentationModel, applicationPreferences: Map<string, any>, cachedEntities: Map<string, any>): string | null {
    if (authorizationNode && authorizationNode.type && languagesPresentationModel && applicationPreferences && cachedEntities) {
      if (authorizationNode.type instanceof FolderAuthorizationNodeType) {
        return (authorizationNode.type as FolderAuthorizationNodeType).folderName
      } else if (authorizationNode.type instanceof CustomAuthorizationNodeType) {
        return (authorizationNode.type as CustomAuthorizationNodeType).nodeName
      } else if (authorizationNode.type instanceof DialogRoleAuthorizationNodeType) {
        return (authorizationNode.type as DialogRoleAuthorizationNodeType).dialogRole?.displayName +
          " (" + languagesPresentationModel.getLocalizedString(LanguagesPresentationModel.ROLE) + ")"
      } else if (authorizationNode.type instanceof ApplicationPreferenceAuthorizationNodeType) {
        return (authorizationNode.type as ApplicationPreferenceAuthorizationNodeType).applicationPreference?.displayName as string
      } else if (authorizationNode.type instanceof TableAuthorizationNodeType) {
        const newNode: TableAuthorizationNodeType = authorizationNode.type as TableAuthorizationNodeType
        return newNode.tableProperty?.displayName + this.getPropertyPath(newNode.path, cachedEntities, languagesPresentationModel, true)
      } else if (authorizationNode.type instanceof PropertyAuthorizationNodeType) {
        return this.getPropertyPath((authorizationNode.type as PropertyAuthorizationNodeType).path, cachedEntities, languagesPresentationModel)
      }
    }

    return null
  }

  /**
   *
   * @param path
   * @param cachedEntities
   * @param languagesPresentationModel
   * @return
   */
  public static getPropertyPath(path: any[], cachedEntities: Map<string, any>, languagesPresentationModel: LanguagesPresentationModel, addBrackets = false): string {
    const tempBaseContentArray: any[] = ConditionUtils.convertPropertyPathToPropertyParts(path, cachedEntities) as any[]
    let result: string = ConditionUtils.getPropertyPathAsLabel(tempBaseContentArray)
    if (!ArrayUtils.isArrayCollectionNullOrEmpty(tempBaseContentArray)) {
      result = (addBrackets ? " (" : "") + tempBaseContentArray[0].displayName + (addBrackets ? ") " : "") + result.substring(result.indexOf(":") - 1, result.length - 1)
    }

    return result
  }

  /**
   *
   * @return the relevant icon according to the authorization node type
   */
  public static getAuthorizationNodeIcon(authorizationNode: AuthorizationNode): string | null {
    if (authorizationNode && authorizationNode.type) {
      if (authorizationNode.type instanceof FolderAuthorizationNodeType) {
        return MSPEmbeddedAssets.FOLDER_AUTHORIZATION_NODE_ICON
      } else if (authorizationNode.type instanceof CustomAuthorizationNodeType) {
        return MSPEmbeddedAssets.CUSTOM_AUTHORIZATION_NODE_ICON
      } else if (authorizationNode.type instanceof DialogRoleAuthorizationNodeType) {
        return MSPEmbeddedAssets.DIALOG_ROLE_AUTHORIZATION_NODE_ICON
      } else if (authorizationNode.type instanceof ApplicationPreferenceAuthorizationNodeType) {
        return MSPEmbeddedAssets.APPLICATION_PREF_NODE_ICON
      } else if (authorizationNode.type instanceof RowAuthorizationNodeType) {
        return MSPEmbeddedAssets.ROW_AUTHORIZATION_NODE_ICON
      } else if (authorizationNode.type instanceof TableAuthorizationNodeType) {
        return MSPEmbeddedAssets.TABLE_AUTHORIZATION_NODE_ICON
      } else if (authorizationNode.type instanceof PropertyAuthorizationNodeType) {
        return MSPEmbeddedAssets.PROPERTY_AUTHORIZATION_NODE_ICON
      }
    }

    return null
  }

  /**
   *
   * @param node
   * @param nodeTypes
   * @param shouldFilterByUserSing - 0 for don't filter, 1 for filter userSingleLookup = true, 2 for filter userSingleLookup = false
   * @return
   */
  public static getChildNodesAsHashMap(node: AuthorizationNode, nodeTypes: [] | null = null, shouldFilterByUserSing = 0): Map<string, any> {
    const arrayResult: any[] = this.getChildNodes(node, nodeTypes, shouldFilterByUserSing) as any[]
    const hashResult: Map<string, any> = new Map<string, any>()

    if (arrayResult) {
      arrayResult.forEach((authorizationNode: AuthorizationNode) => {
        hashResult.set(authorizationNode.systemName, authorizationNode)
      })
    }

    return hashResult
  }

  /**
   *
   * @param node
   * @param nodeTypes
   * @param shouldFilterByUserSing - 0 for don't filter, 1 for filter userSingleLookup = true, 2 for filter userSingleLookup = false
   * @return - given an authorization node and node types (not mandatory) - return an array of child nodes of that types
   */
  public static getChildNodes(node: AuthorizationNode, nodeTypes: [] | null = null, shouldFilterByUserSing = 0): any[] | null {
    if (!node) return null

    const result: any[] = []

    this.getChildNodesHelper(node, result, nodeTypes, shouldFilterByUserSing)

    if (result.includes(node)) {
      result.slice(result.findIndex(authnode => authnode == (node as any)))
    }

    return result
  }

  /**
   *
   * @param node
   * @param result
   * @param nodeTypes
   * @param shouldFilterByUserSing - 0 for don't filter, 1 for filter userSingleLookup = true, 2 for filter userSingleLookup = false
   */
  private static getChildNodesHelper(node: AuthorizationNode, result: any[], nodeTypes: [] | null = null, shouldFilterByUserSing = 0): void {
    if (node.children && node.children.length > 0) {
      // loop through each child and filter its children
      node.children.forEach((childNode: AuthorizationNode) => {
        this.getChildNodesHelper(childNode, result, nodeTypes, shouldFilterByUserSing)
      })
    }

    if (!nodeTypes || nodeTypes.length == 0 || this.nodeIsFromRelevantType(node, nodeTypes, shouldFilterByUserSing)) {
      result.push(node)
    }
  }

  /**
   *
   * @param node
   * @param nodeTypes
   * @param shouldFilterByUserSing - 0 for don't filter, 1 for filter userSingleLookup = true, 2 for filter userSingleLookup = false
   * @return
   */
  public static nodeIsFromRelevantType(node: AuthorizationNode, nodeTypes: [], shouldFilterByUserSing = 0): boolean {
    // nodeTypes.forEach((cls: string) => {
    //   if (!node.type || typeof node.type === "string") {
    //     if (ReflectionUtils.equals(cls, PropertyAuthorizationNodeType) && shouldFilterByUserSing != 0) {
    //   }
    // })
    // for each (var cls:Class in nodeTypes) {
    //     if (ReflectionUtils.equals(cls, PropertyAuthorizationNodeType) && shouldFilterByUserSing != 0) {
    //       var userSingleLookup:Boolean = node.type != null && (node.type as PropertyAuthorizationNodeType).userSingleLookup;
    //       return (((userSingleLookup && shouldFilterByUserSing == 1) || (!userSingleLookup && shouldFilterByUserSing == 2)));
    //     }
    //     return true;
    //   }

    // }
    return false
  }

  /**
   *
   */
  public static searchTreeByText(tree: any, rootNode: AuthorizationNode, text: string): void {
    const expandNodes: any[] = []

    // start the recursion at the root node
    this.refreshRecursiveChildren(rootNode, expandNodes, text)

    // update the Tree after the data has been filtered
    tree.invalidateList()

    this.expandTreeNodes(tree, expandNodes)
  }

  /**
   *
   * @param nodes
   */
  public static expandTreeNodes(tree: any, nodes: any[]): void {
    nodes.forEach((node: AuthorizationNode) => {
      tree.expandChildrenOf(node, true)
    })
  }

  /**
   *
   * @param node
   * @param expandNodes
   */
  public static refreshRecursiveChildren(node: AuthorizationNode, expandNodes: any[], text: string): void {
    if (node.children && node.children.length > 0) {
      // loop through each child and filter its children
      node.children.forEach((childNode: AuthorizationNode) => {
        this.refreshRecursiveChildren(childNode, expandNodes, text)
      })
    }

    node.highlight = this.shouldHighlightNode(node, text)

    if (node.highlight) {
      expandNodes.push(this.getHighestParent(node))
      node.customDisplayName = StringUtils.highlightMatch(node.displayName, text, false)
    } else {
      node.customDisplayName = node.displayName
    }
  }

  /**
   *
   * @param node
   * @return
   */
  public static shouldHighlightNode(node: AuthorizationNode, text: string): boolean {
    if (StringUtils.isNullOrEmpty(text)) return false

    return !!(node.displayName && node.displayName.toLowerCase().indexOf(text.toLowerCase()) >= 0)
  }

  /**
   *
   * @param node
   */
  public static getHighestParent(node: AuthorizationNode): AuthorizationNode | null {
    if (!node.parent) {
      return node
    }

    let parentNode: AuthorizationNode | null = node.parent.parent
    let nodeParent: AuthorizationNode | null = node

    while (parentNode != null) {
      parentNode = parentNode.parent
      nodeParent = nodeParent.parent as AuthorizationNode
    }

    return nodeParent
  }

  /**
   *
   * @param node
   */
  public static getNodeAncestors(node: AuthorizationNode): any[] {
    const nodes: any[] = []
    let nodeParent: AuthorizationNode | null = node.parent

    while (nodeParent?.parent) {
      nodes.push(nodeParent)
      nodeParent = nodeParent.parent
    }

    return nodes
  }
}
