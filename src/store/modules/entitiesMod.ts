import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators"
import store from "@/store"
import { Entity } from "@/models/Entity"
import {
  getEntities,
  getReportableEntitiesOrder,
  getVirtualEntityProperties
} from "@/api/entitiesApi"
import { getEntityById, saveEntities } from "@/api/mainApi"
import { Node } from "@/models/Node"
import _ from "lodash"
import { EventBus } from "@/utils/event-bus"
import { EventKeys } from "@/models/Utils/EventKeys"
import { EntityReportOrderApplicationInformation } from "@/models/DisplayLanguages"
import { KeyValue } from "@/models/KeyValue"
export interface IEntitiesState {
  EntitiesTree: Node
  currentEntity: Entity | null
  properties: any[]
  ReportableEntitiesOrder: KeyValue[]
}

@Module({ dynamic: true, store, name: "entities" })
class EntitiesMod extends VuexModule implements IEntitiesState {
  public EntitiesTree: Node = {} as any;
  ReportableEntitiesOrder: KeyValue[] = [];
  private dirtyEntities = new Map<string, Entity>();
  // public properties: any = [];
  public currentEntity: Entity | null = {} as any;
  private currentEntityOrignal: Entity | null = null;
  private TempEntityCache = new Map<string, Entity>();

  get dirtyEntitiesValues() {
    const items: Entity[] = []
    for (const e of this.dirtyEntities.values()) {
      items.push(e)
    }
    return items
  }

  get hasDirtyEntityItems() {
    return this.dirtyEntities
  }

  get properties() {
    // @ts-ignore
    return this.currentEntity.properties
  }

  get getCurrentEntity(): Entity {
    return this.currentEntity as Entity
  }

  get allEntities(): KeyValue[] {
    const entities: KeyValue[] = []
    const getNodesList = (node: Node): void => {
      if (!node) {
        return
      }

      if (node.branch === false) {
        entities.push(new KeyValue(node.name, node.id))
      }

      if (node.children.length > 0) {
        node.children.forEach(n => {
          getNodesList(n)
        })
      }
    }
    getNodesList(this.EntitiesTree)

    return entities
  }

  @Action
  public async setCurrentEntity(entity: Entity | null) {
    this.SET_CURRENT_ENTITY(entity)
  }

  @Mutation
  private SET_CURRENT_ENTITY(entity: Entity | null) {
    this.currentEntityOrignal = entity
    this.currentEntity = entity
  }

  @Action
  public getDirtyEntities() {
    return this.dirtyEntities
  }

  // @Mutation
  // private SET_PROPERTIES(payload: any[]) {
  //   this.properties = payload;
  // }

  // @Action
  // public async setCurrentEntity(data: any) {
  //   this.SET_CURRENT_ENTITIY(data)
  // }
  // @Action
  // public async setProperties(payload: string) {
  //   try {
  //
  //     const result = getEntity(payload);
  //     this.SET_PROPERTIES(result);
  //   } catch (e) {
  //     this.SET_PROPERTIES({});
  //   }
  // }

  @Mutation
  private SET_ENTITIES_TREE(data: Node) {
    this.EntitiesTree = data
    // let sorteddata = this.sortTree(data);
    // this.EntitiesTree = sorteddata;
  }

  @Mutation
  private sortTree(node: Node) {
    
    for (const child of node.children) {
      
      if (!child.branch && child.children) {
        const sorted = _.sortBy(child.children, "name")
        child.children = sorted
      } else {
        this.sortTree(child)
      }
    }

    return node
  }

  @Action
  public async getEntitiesTree() {
    const rs = await getEntities()
    // this.SET_ENTITIES_TREE(rs);
    this.context.commit("SET_ENTITIES_TREE", rs)
  }

  @Action
  public async getEntityToEdit(entityId: string) {
    if (!entityId || !entityId.includes("com.")) {
      console.log("invalid entity id " + entityId)
      return null
    }
    const rs = await this.getEntity(entityId)
    const entity = JSON.parse(JSON.stringify(rs))
    this.context.commit("SET_CURRENT_ENTITY", entity)
    // this.SET_CURRENT_ENTITY(rs);
  }

  @Action
  public async setCurrentEntityToNull() {
    // this.currentEntity = {} as any
    this.setCurrentEntity(null)
  }

  @Action
  public async getCache() {
    // EventBus.$on(EventKeys.UPLOAD_DATA, () => {
    //   this.SaveEntities();
    // });

    await this.getEntitiesTree()
    await this.getReportableEntitiesOrderData()
  }

  @Mutation
  private ADD_UPDATE_ENTITY(entity: Entity) {
    this.dirtyEntities.set(entity.id, entity)
    this.TempEntityCache.set(entity.id, entity)

    EventBus.$emit(
      EventKeys.DIRTY_ITEMS_UPDATED,
      EventKeys.Entities,
      this.dirtyEntities.size
    )
    EventBus.$emit(EventKeys.ENABLE_GLOBAL_SAVE)    
  }

  @Action
  public async Upload() {
    debugger;
    const entities: Entity[] = []
    if (!this.dirtyEntities) {
      return
    }

    EventBus.$emit(EventKeys.SET_APP_BUSY, true, "Saving Entities")

    this.dirtyEntities.forEach(element => {
      entities.push(element)
    })
    saveEntities(entities)
      .then(rs => {
        EventBus.$message("Entities Saved ")
        this.Reset()
        
      })
      .catch(error => {
        EventBus.$alert("Unable to save Entities. " + error)
      })
      .finally(() => {
        EventBus.$emit(EventKeys.SET_APP_BUSY, false, "Entities Saved")
      })
  }

  @Action
  public async addOrUpdateEntity(entity: Entity) {
    console.log(
      "Entity addOrUpdateEntity " +
        entity.id +
        " > " +
        entity.clientId +
        " at :" +
        new Date().toTimeString()
    )
    this.ADD_UPDATE_ENTITY(entity)
    // this.context.commit("ADD_UPDATE_ENTITY", entity);
    // this.SaveEntities()
  }

  @Action
  public getDirtyEntity(entityId: string): Entity {
    return this.dirtyEntities.get(entityId) as Entity
  }

  @Mutation
  private SET__ReportableEntitiesOrder(
    data: EntityReportOrderApplicationInformation
  ) {
    this.ReportableEntitiesOrder = data.entityOrder
  }

  @Action
  public async getReportableEntitiesOrderData() {
    const rs:any = await getReportableEntitiesOrder()
    this.SET__ReportableEntitiesOrder(rs)
  }

  @Action
  public async getEntity(entityId: string): Promise<Entity> {
    let entity: any = this.TempEntityCache.get(entityId) as Entity
    console.log("getting entity to cache " + entityId);
    if (!entity) {
      entity = await this.getAndCacheEntity(entityId);
      // for(const p of entity.properties){
      //   const lookup = p.dataType?.lookupClassName
      //   if(lookup){
      //     console.log("Getting lookup entities" +lookup)
      //     const ex = this.getAndCacheEntity(lookup)
      //   }
      // }
    }
    return entity
  }

  @Action
  public async getAndCacheEntity(entityId: string) {
    if (!entityId || !entityId.includes("com.")) {
      console.log("invalid entity id " + entityId)
      return null
    }
    const en = await getEntityById(entityId)

    if (en) {
      this.context.commit("SET_ENTITY_TO_CACHE", en)
    } else {
      throw new Error("Unable to get and cache Entity")
    }
    return en
  }

  @Mutation
  SET_ENTITY_TO_CACHE(entity: Entity) {
    this.TempEntityCache.set(entity.id, entity)
  }

  @Action
  public async Reset() {
    this.dirtyEntities.clear()
    this.TempEntityCache.clear()

    this.setCurrentEntityToNull()
    this.getEntitiesTree()
  }

  @Action
  async getSqlQueryFields(connection: string, query: string) {
    const rs = await getVirtualEntityProperties(connection, query)
    return rs as any
  }
}

export const EntitiesModule = getModule(EntitiesMod)
