<template>
  <div>
    <el-row
      type="flex"
      style="margin-bottom: 0px"
    >
      <div class="tags-container">
        <el-select
          ref="elSelect"
          v-model="localTags"
          style="width: 100%"
          value-key="displayName"
          multiple
          filterable
          allow-create
          default-first-option
          autocomplete
          remote
          :remote-method="searchPreference"
          placeholder="type of select users or e-mail"
          @change="onItemChanged"
        >
          <el-option
            v-for="item in options"
            :key="item.displayName"
            :label="item.displayName"
            :value="item"
          >
            <span style="float: left"> {{ item.displayName }}</span>
          </el-option>
        </el-select>
      </div>
    </el-row>
    <el-row>
      <div style="float: right; padding-right: 10px; display: inline-flex">
        <el-button
          size="mini"
          type="text"
          @click="showPropertySelector = true"
        >
          Insert property...
        </el-button>

        <el-button
          size="mini"
          type="text"
          @click="showPrefSelector = true"
        >
          Insert Application Preference...
        </el-button>
      </div>
    </el-row>

    <prefModel
      :is-open.sync="showPrefSelector"
      :result-handler="selectPrefHandler"
    />

    <select-property-model
      :dialog-visible.sync="showPropertySelector"
      :result-handler="selectProperyHandler"
      :entity-id="baseEntityId"
      :allowed-properties="validPropertyTypes"
      :allowed-entity-name="validlookupName"
    />
  </div>
</template>
<script lang="ts">
import { ApplicationPreference } from "@/models/ApplicationPreference"
import { PropertySelectorPath } from "@/models/PropertySelectorPath"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { ElInput } from "element-ui/types/input"
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
import { KeyValue } from "../../models/KeyValue"
import { AppPreferencesModule } from "../../store/modules/AppPreferencesMod"
import SelectPropertyModel from "@/components/PropertySelector/index.vue"
import prefModel from "@/components/Preferences/prefModel.vue"
import { TextAssembly } from "@/models/TextAssembly"
import { Entity } from "@/models/Entity"
import { json } from "express"
import { ApplicationPreferenceFactory } from "@/models/Utils/ApplicationPreferenceFactory"
@Component({
  name: "tags-view",
  components: { SelectPropertyModel, prefModel }
})
export default class extends Vue {
  @Prop({ required: false }) private items!: TextAssembly;
  @Prop({ required: false }) private allowedProperties!: string[];
  @Prop({ required: false }) private allowedEntityName!: string;

  showPropertySelector = false;
  showPrefSelector = false;
  options: any[] = [];

  localTags: any[] = [];

  get baseEntityId() {
    return this.currentEntity.id
  }

  get currentEntity() {
    return EntitiesModule.getCurrentEntity
  }

  get validPropertyTypes() {
    return this.allowedProperties
  }

  get validlookupName() {
    return this.allowedEntityName
  }

  get Preferences() {
    return AppPreferencesModule.Preferences
  }

  searchPreference(query: string) {
    if (query !== "") {
      this.options = []
      setTimeout(() => {
        this.options = this.Preferences.filter((item) => {
          return (
            item.displayName.toLowerCase().indexOf(query.toLowerCase()) > -1
          )
        })
      }, 200)
    } else {
      this.options = []
    }
  }

  selectProperyHandler(result: KeyValue[]) {
    this.showPropertySelector = false
    const copy = JSON.parse(JSON.stringify(result))
    this.resolveDisplayName(copy).then((name) => {
      const rs = {
        displayName: name,
        data: copy
      }
      this.options.push(rs)
      this.localTags.push(rs)
    })
  }

  onItemChanged(value: any) {
    console.log("changed to " + value)
    this.$emit("onItemsUpdated", this.localTags)
  }

  selectPrefHandler(result: ApplicationPreference) {
    this.showPrefSelector = false
    const pair = ApplicationPreferenceFactory.createKeyValueArrayFromApplicationPreference(
      result
    )
    const rs = {
      displayName: result.displayName,
      data: pair
    }
    this.addToTags(rs)
  }

  private addToTags(result: any) {
    this.options.push(result)
    this.localTags.push(result)
    this.$emit("onItemsUpdated", this.localTags)
  }

  mounted() {
    if (!this.items?.parts) {
      this.localTags = []
      return
    }

    for (const item of this.items?.parts) {
      const copy = JSON.parse(JSON.stringify(item))
      this.resolveDisplayName(copy).then((name) => {
        const rs = {
          displayName: name,
          data: copy
        }
        this.addToTags(rs)
      })
    }
  }

  private ignoreList = [";", ",", ":", " "];
  private async resolveDisplayName(data: any) {
    let str = ""
    if (typeof data === "object") {
      if (Array.isArray(data)) {
        if (
          ApplicationPreferenceFactory.isKeyValueArrayApplicationPreference(
            data
          )
        ) {
          const list = AppPreferencesModule.Preferences
          const pref = list.find((x) => {
            return x.systemName === data[1].key
          })

          return pref?.displayName
        }

        let entity: Entity | null = null
        for (const item of data) {
          if (item.value) {
            entity = await EntitiesModule.getEntity(item.value)

            str += entity?.displayName + " : "
          } else {
            const prop = entity?.properties.find(
              (x) => x.systemName === item.key
            )
            str += prop?.displayName
          }
        }
        return str
      }
    } else if (this.ignoreList.includes(data)) {
      // just skip this will create duplidate issue.
    } else {
      str = data
    }

    return str
  }
}
</script>

<style lang="scss" scoped>
.tags-container {
  background-color: white;
  border: 1px solid $borderGray;
  line-height: 30px;
  max-height: 50px;
  overflow-y: auto;
  display: inline-flex;
  width: 100%;

  .tag-item {
    border-color: $borderGray;
    color: $borderGray;
    margin: 0 5px;
  }
}
</style>
