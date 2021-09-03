<template>
  <el-form
    v-if="showInputs"
    v-model="lookupObject"
  >
    <el-form-item>
      <el-select
        v-model="lookupObject.lookupEntityId"
        filterable
        remote
        reserve-keyword
        placeholder="Search Entity"
        :remote-method="searchEntities"
        :loading="loading"
        @change="onselectedEntitychanged"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.key"
          :value="item.value"
        />
      </el-select>

      <el-autocomplete
        v-model="lookupObject.lookupValueName"
        :fetch-suggestions="querySearchAsync"
        placeholder="Please input"
        :value-key="'key'"
        @select="handleSelect"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { AppCacheModule } from "@/store/modules/appCache"
import { debug } from "console"
import { Component, Prop, Vue } from "vue-property-decorator"

import { ApplicationPreference } from "@/models/ApplicationPreference"
@Component({
  name: "TableDataType"
})
export default class extends Vue {
  @Prop({ required: true }) private showConfig =false
  @Prop({ required: true }) private showInputs =true

  // Lookup type.
 options=[
   {
     key: "Employee",
     value: "1"
   },
   {
     key: "Administrator",
     value: "6"
   },
   {
     key: "Team Leader (Obselete)",
     value: "7"
   }
 ]

  loading = false;
  searchEntities(query: string) {
    if (query !== "") {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.options = this.entitiesMap.filter((item: any) => {
          return item.key.toLowerCase().indexOf(query.toLowerCase()) > -1
        })
      }, 200)
    } else {
      this.options = []
    }
  }

  onselectedEntitychanged(value: any) {
    console.log("on select entity chagned " + value)
    this.emitLookupChanged()
  }

  emitLookupChanged() {
    console.log("emit lookupchanged " + JSON.stringify(this.lookupObject))
    this.$emit("lookupchanged", this.lookupObject)
  }

  entitiesMap:any = [];
  getNodesList(node: any, childrenKey: any) {
    if (!node) {
      return this.entitiesMap
    }

    if (node.branch === false) {
      this.entitiesMap.push({ key: node.name , value: node.id })
    }

    if (node[childrenKey].length > 0) {
      node[childrenKey].forEach((n: any) => {
        this.getNodesList(n, childrenKey)

        //  Object.entries(  rs).forEach((x) => {
        //      this.entitiesMap.push({ kye: x.name, value: x.id })
        //    })
      })
    }
  }

  // selectedEntity=[]
  selectedLookupValue = [];
  private async getEntititsMap() {
    return await this.getNodesList(AppCacheModule.getEntities, "children")
  }

  querySearchAsync(queryString: string, cb: any) {
    const selectedEntity = this.lookupObject.lookupEntityId
    if (!selectedEntity) {
      return
    }
    clearTimeout(this.timeout)
    this.timeout = setTimeout(async() => {
      const entityid = selectedEntity

      const results = await AppCacheModule.getEntityByQueryString(
        entityid,
        "",
        50
      )
      cb(results)
    }, 1000 * Math.random())
  }

  // Auto Complete.

  state = "";
  timeout:any = null;

  createFilter(queryString: string) {
    return (link:any) => {
      return link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
  }

  lookupObject: {
    lookupEntityId?: string
    lookupValueName?: string
  } = {} as any;

  handleSelect(item: any) {
    console.log("selected value " + item)
    this.emitLookupChanged()
  }

  mounted() {
    this.getEntititsMap()
  }
}
</script>
