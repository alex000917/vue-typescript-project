import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators";
import store from "@/store";
import {
  getAuthorizableEntities,
  getAuthorizationTree,
  saveAuthorizationTrees
} from "@/api/authorizationApi";
import { getDialogRoles, getEntityById, getProducts, saveDialogRoles, saveProducts } from "@/api/mainApi";
import { Node } from "@/models/Node";
import { AuthorizationTree } from "@/models/authorizations/AuthorizationTree";
import { AuthorizationNode } from "@/models/authorizations/AuthorizationNode";
import { EventBus } from "@/utils/event-bus";
import { DialogRole } from "@/models/DialogRole";
import { Dialog, Loading } from "element-ui";
import { Product } from "@/models/authorizations/Products";
import { Entity } from "@/models/Entity";
import { AppCacheModule } from "./appCache";
import { EntitiesModule } from "./entitiesMod";
import { KeyValue } from "@/models/KeyValue";
import { EventKeys } from "@/models/Utils/EventKeys";
import _ from "lodash"
import { LanguageTranslation } from "@/models/LanguageTranslation";
@Module({ dynamic: true, store, name: "authorization" })
class AuthorizationMod extends VuexModule {
  public AuthTree: Node | null = null;
  public Authorizations: AuthorizationTree[] = [];
  public dirtyAuthorizations = new Map<string, AuthorizationTree>();
  public dialogRoles: DialogRole[] = [];
  public Products: Product[] = [];
  private _editingAuth: AuthorizationTree | null = null;
  private _editingEntity: Entity | null = null;
  private dirtyDialogRolesMap = new Map<String, DialogRole>();
  public dirtyProductsMap = new Map<string, Product>();

  isUpdateRole: boolean = false;
  isUpdateProduct: boolean = false;


  get hasDirtyAuthItems() {
    return this.dirtyAuthorizations;
  }

  get dirtyAuthorizationTreesValues() {
    const list: AuthorizationTree[] = [];
    for (const auth of this.dirtyAuthorizations.values()) {
      list.push(auth);
    }
    return list;
  }

  get getAuthorizationsByEntityId() {
    return (entityId: string | null = null): KeyValue[] => {
      const authorizations: KeyValue[] = []
      if (!entityId) return authorizations
      return _.reduce(
        this.AuthTree?.children,
        (result: KeyValue[], element) => {
          if (element.id === entityId) {
            result = [...result, ..._.map(element.children, (child) => {
              return new KeyValue(child.name, child.id)
            })]
          }
          return result
        },
        []
      )
    }
  }

  @Mutation
  private SET_DIALOGROLES(rs: any) {
    this.dialogRoles = rs;
  }

  @Action
  public async addDialogRole(role: DialogRole) {
    var oRole = Object.assign({} as DialogRole, role);
    let index = this.dialogRoles.findIndex(c => c.id == oRole.id);
    if (index > -1) {
      this.dialogRoles[index] = oRole;
    } else {
      this.dialogRoles.push(oRole);
    }

    this.dirtyDialogRolesMap.set(oRole.systemName, oRole);


    this.context.commit('SET_ISROLECHANHES', true);
    EventBus.$emit(EventKeys.ENABLE_GLOBAL_SAVE);
  }

  @Action
  public async deleteDialogRole(roleId: string) {
    // let dr = this.dialogRoles.filter(c => c.id != roleId);
    // this.context.commit("SET_DIALOGROLES", dr);
    let objIndex = this.dialogRoles.findIndex((obj => obj.id == roleId));
    if (objIndex > -1) {
      this.dialogRoles[objIndex].deleted = true;
      this.dirtyDialogRolesMap.set(this.dialogRoles[objIndex].systemName, this.dialogRoles[objIndex]);
      this.context.commit('SET_ISROLECHANHES', true);
      EventBus.$emit(EventKeys.ENABLE_GLOBAL_SAVE);
    }
  }

  @Action
  public async getDialogRolesList() {
    const rs = await getDialogRoles();
    this.context.commit("SET_DIALOGROLES", rs);
  }

  @Mutation
  private SET_AUTHTREE(rs: Node) {
    this.AuthTree = rs;
  }

  @Action
  public async getAuthorizableEntities() {
    // return a Node tree for left side navigation
    const rs = await getAuthorizableEntities();
    this.context.commit("SET_AUTHTREE", rs);
  }

  @Mutation
  private SET_AUTH(rs: AuthorizationTree) {
    this.Authorizations.push(rs);
  }

  @Mutation
  private ADD_NEWAUTHTREE(rs: Node) {
    const newTreeNode = Object.assign({}, this.AuthTree);
    const index = newTreeNode.children.findIndex((x: any) => x.id === rs.id);
    if (index > -1) {
      newTreeNode?.children[index].children.push(rs.children[0]);
    } else {
      newTreeNode?.children.push(rs);
    }

    this.AuthTree = newTreeNode;

    EventBus.$emit(EventKeys.ENABLE_GLOBAL_SAVE)
  }


  @Mutation
  private ADD_NEWAUTHNODE(rs: { auth: AuthorizationNode; senior: string }) {
    const index = this.Authorizations.findIndex(
      x => x.systemName === rs.auth.authorizationTreeId
    );
    const newAuthNode = [...this.Authorizations];
    if (index > -1) {
      if (rs.senior === "none") {
        newAuthNode[index].root.children.push(rs.auth);
      } else {
        addChild(newAuthNode[index].root, rs);
      }
      this.dirtyAuthorizations.set(newAuthNode[index].systemName, newAuthNode[index]);
    }
    this.Authorizations = newAuthNode;
    EventBus.$emit(EventKeys.ENABLE_GLOBAL_SAVE)
  }

  @Action
  public async getAuthorization(treeId: string) {
    // return a Node tree for left side navigation
    const rs = await getAuthorizationTree(treeId);
    this.context.commit("SET_AUTH", rs);
  }

  @Mutation
  private UP_SERT(auth: AuthorizationTree) {
    const index = this.Authorizations.findIndex(
      x => x.systemName === auth.systemName
    );

    if (index > -1) {
      this.Authorizations[index] = auth;
    } else {
      this.Authorizations.push(auth);
    }

    this.dirtyAuthorizations.set(auth.systemName, auth);
    EventBus.$emit(EventKeys.ENABLE_GLOBAL_SAVE);
  }

  @Action
  /* Add or Update item in list.
   */
  public async upSert(auth: AuthorizationTree) {
    this.context.commit("UP_SERT", auth);
  }

  get CurrentAuth() {
    return this._editingAuth;
  }

  get CurrentEntity() {
    return this._editingEntity;
  }

  @Mutation
  private SET_CURRENT_AUTH(auth: AuthorizationTree) {
    this.Authorizations.push(auth);
    this._editingAuth = auth;
    //this._editingEntity = auth.entity;
    //this.context.dispatch("getCurrentEntity", auth.entityId)
  }

  @Action
  public async setCurrentAuth(systemName: string) {
    let curAuth = null;

    curAuth = this.Authorizations?.find(x => x.systemName == systemName);
    if (curAuth == null)
      curAuth = await getAuthorizationTree(systemName);

    if (curAuth) {
      const rs = Object.assign(new AuthorizationTree(), curAuth);
      this.getCurrentEntity(rs.entityId as string);
      this.context.commit("SET_CURRENT_AUTH", rs);
    }
  }

  @Mutation
  private SET_CURRENT_ENTITY(entity: Entity | null) {
    this._editingEntity = entity;
  }
  @Action
  public async getCurrentEntity(entityId: string) {
    if (!entityId || !entityId.includes("com.")) {
      console.log("invalid entity id " + entityId);
      return null;
    }
    const rs = await getEntityById(entityId);

    this.context.commit("SET_CURRENT_ENTITY", rs);
  }

  @Action
  public async getAuth(systemName: string) {
    let curAuth: AuthorizationTree = AuthorizationModule.Authorizations.find(
      auth => {
        return auth.systemName === systemName;
      }
    ) as AuthorizationTree;
    if (curAuth) {
      this._editingAuth = curAuth;
      this._editingEntity = curAuth.entity;
    } else {
      const rs = await getAuthorizationTree(systemName);
      if (rs) {
        curAuth = Object.assign(new AuthorizationTree(), rs);
      }
    }
    return curAuth;
  }
  @Action
  // async getAuthCache() {
  //   const indicator = Loading.service({
  //     lock: true,
  //     text: "Loading Application Cache...",
  //     spinner: "el-icon-loading",
  //     background: "rgba(0, 0, 0, 0.7)"
  //   });
  //   try {
  //     await this.getAuthorizableEntities();
  //     await this.getProductsList();
  //     await this.getDialogRolesList();
  //   } catch (err) {
  //     throw new Error("unable to load Auth cache. ");
  //   } finally {
  //     indicator.close();
  //   }
  // }

  @Action
  public async deleteAuth(id: string) {
    let auth = null;
    auth = this.Authorizations?.find(x => x.systemName == id);
    if (auth == null)
      auth = await getAuthorizationTree(id);

    if (auth) {
      const rs = Object.assign(new AuthorizationTree(), auth);
      rs.deleted = true;
      this.dirtyAuthorizations.set(rs.systemName, rs);
      EventBus.$emit(EventKeys.ENABLE_GLOBAL_SAVE);
    }
  }

  @Mutation
  private SET_PRODUCTS(rs: Product[]) {
    rs.forEach(prod => prod.myspType = "Product");
    this.Products = rs;
  }

  @Action
  public async getProductsList() {
    const rs = await getProducts();
    this.context.commit("SET_CURRENT_ENTITY", rs);

  }

  @Action
  public async AddUpdateProduct(product: Product) {
    const newProduct = Object.assign({} as Product, product);
    const newProductList = this.Products;
    this.context.commit("SET_PRODUCTS", []);

    let index = newProductList.findIndex(c => c.id == newProduct.id);
    if (index > -1) {
      newProductList[index] = newProduct;
    } else {
      newProductList.push(newProduct);
    }

    this.dirtyProductsMap.set(newProduct.systemName, newProduct);

    this.context.commit("SET_PRODUCTS", newProductList);
    this.context.commit('SET_ISPRODUCTCHANGES', true);
    EventBus.$emit(EventKeys.ENABLE_GLOBAL_SAVE)
  }

  @Action
  public async deleteDialogProduct(productId: string) {
    let objIndex = this.Products.findIndex((obj => obj.id == productId));
    if (objIndex > -1) {
      this.Products[objIndex].deleted = true;
      this.dirtyProductsMap.set(this.Products[objIndex].systemName, this.Products[objIndex]);
      this.context.commit('SET_ISPRODUCTCHANGES', true);
      EventBus.$emit(EventKeys.ENABLE_GLOBAL_SAVE);
    }
  }


  get dirtyDialogRolesValues() {
    const roles: DialogRole[] = [];
    for (const item of this.dirtyDialogRolesMap.values()) {
      roles.push(item);
    }
    return roles;
  }

  get dirtyProductValues() {
    const products: Product[] = [];
    for (const item of this.dirtyProductsMap.values()) {
      products.push(item);
    }
    return products;
  }

  @Mutation
  private SET_ISROLECHANHES(value: boolean) {
    this.isUpdateRole = value;
  }

  @Mutation
  private SET_ISPRODUCTCHANGES(value: boolean) {
    this.isUpdateProduct = value;
  }

  @Action
  public async Save() {
    if (this.isUpdateRole) {
      await saveDialogRoles(this.dirtyDialogRolesValues).then(rs => {
        this.getDialogRolesList();
        this.context.commit('SET_ISROLECHANHES', false);
        EventBus.$message("dialogRoles Saved ")
      }).catch(error => {
        EventBus.$alert("Unable to update Role. " + error)
      });
    }

    if (this.isUpdateProduct) {
      await saveProducts(this.dirtyProductValues).then(rs => {
        this.getProductsList();
        this.context.commit('SET_ISPRODUCTCHANGES', false);
        EventBus.$message("Products Saved ")
      }).catch(error => {
        EventBus.$alert("Unable to update Products. " + error)
      });
    }


    if (this.dirtyAuthorizationTreesValues.length > 0) {
      await saveAuthorizationTrees(this.dirtyAuthorizationTreesValues).then(rs => {
        EventBus.$message("Authorization Tree Saved ")
        this.Reset();
      })
        .catch(error => {
          EventBus.$alert("Unable to save Authorization Entity. " + error)
        })
        .finally(() => {
          EventBus.$emit(EventKeys.SET_APP_BUSY, false, "Authorization Entity Saved")
        })
    }
  }

  @Action
  private async Reset() {
    this.dirtyAuthorizations.clear()
    this.getAuthorizableEntities()
  }
}

export const AuthorizationModule = getModule(AuthorizationMod);


function addChild(parent: AuthorizationNode, rs: any) {
  for (let idx = 0; idx < parent.children.length; idx++) {
    let child = parent.children[idx];
    if (child.systemName === rs.senior) {
      child.children.push(rs.auth);
    } else {
      addChild(child, rs);
    }
  }
}
