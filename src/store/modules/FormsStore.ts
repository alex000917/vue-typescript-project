import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from "vuex-module-decorators"
import store from "@/store"

import { getForms, getFormsApplicationPreferences } from "@/api/formApi"

import { ItemInstance } from "@/models/ItemInstance"
import { getForm } from "@/api/mainApi"
import { FormsApplicationPreferences } from "@/models/FormsApplicationPreferences"
import { KeyValue } from "@/models/KeyValue"
import { Form } from "@/models/Forms/Form"

export interface IFormsData {
  Forms: ItemInstance[]
  ActiveForm: any
  Operators: KeyValue[] | null
}

@Module({ dynamic: true, store, name: "formsMod" })
class FormsMod extends VuexModule implements IFormsData {
  ActiveForm: any;
  public Forms: any[] = [];
  Operators: KeyValue[] | null = [];
  private DirtyItems =new Map<String, Form>();

  get hasDirtyFormsItems() {
    return this.DirtyItems
  }

  get dirtyFormsValues() {
    const items: Form[] = []
    for (const i of this.DirtyItems.values()) {
      items.push(i)
    }
    return items
  }

  @Action
  public async getForms() {
    const rs = await await getForms()
    this.SET_FORMS(rs)
  }

  @Mutation
  SET_FORMS(rs: ItemInstance[]) {
    this.Forms = rs
  }

  @Action
  public async getCache() {
    await this.getForms()
  }

  @Mutation
  private SET_ACTIVE_FORM(rs: any) {
    this.ActiveForm = rs
  }

  @Action
  public async getActiveForm(formid: string) {
    const rs = await getForm(formid)
    // this.SET_ACTIVE_FORM(rs)
    return rs
  }

  @Mutation
  private SET_PREFERENCE(rs: FormsApplicationPreferences) {
    this.Operators = rs.operators
  }

  @Action
  public async getFormsApplicationPreferences() {
    const rs = await getFormsApplicationPreferences()
    this.SET_PREFERENCE(rs)
  }

  @Action
  public async getOperatorsByDataType(dataType: number): Promise<KeyValue[]> {
    const list = this.Operators?.find(x => {
      return parseInt(x.key) === dataType
    })

    return list?.value as KeyValue[]
  }
}

export const FormsModule = getModule(FormsMod)
