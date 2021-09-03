<template>
  <el-card class="box-card">
    <tree-table
      class="table"
      :columns="fields"
      :table-data="tableData"
    />
  </el-card>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
// import treeTable from "vue-tree-table-component"
import { AppCacheModule } from "@/store/modules/appCache"
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod"
import { ApplicationPreference } from "@/models/ApplicationPreference"
@Component({
  name: "Orchestrators-comp",
  // components: { "tree-table": treeTable }
})
export default class extends Vue {
   search={
     text: null,
     type: null
   }

   tableData =[]
     fields= [
       {
         id: "category",
         label: "category"

       },
       {
         id: "displayName",
         label: "Name"

       },
       {
         id: "value",
         label: "Value"

       },
       {
         id: "description",
         label: "description"

       }
     ]

     // @Watch('search', { deep: true })
     onSearchChanged(val: any, oldVal: any) {
       console.log("search val " + val)
     }

     get appPreferences() {
       // return this.$store.getters.ApplicationPreferences
       //AppCacheModule.FlexSettings.providerTypes
       const pref = AppPreferencesModule.Preferences
       return pref
     }

     get propertyDataTypes() {
       // return this.$store.getters.FlexApplicationPreferences.propertyDataTypes

       const rs = AppCacheModule.FlexSettings
       const types = rs.propertyDataTypes
       return types
     }

     mounted() {
       this.getGroupedData()
     }

     getGroupedData() {
       let index = 1
       this.appPreferences.forEach((row: any) => {
         row.indexId = index

         index = index + 1
       })
       const result = this.appPreferences.reduce(function(r: any, a: ApplicationPreference) {
         r[a.category as string] = r[a.category as string] || []
         r[a.category as string].push(a)
         return r
       }, Object.create(null))

      //  Object.entries(result).forEach((e) => {
      //    this.tableData.push({
      //      category: e[0],
      //      children: e[1]
      //    })
      //  })

       return this.tableData
     }
}
</script>

<style  scoped>
/* table.vgt-table{
  font-size: smaller;
  border-collapse: collapse;
  background-color: white;
  width: 100%;
  max-width: 100%;
  max-height: 70%;
  overflow: auto;
  table-layout: auto;
  border: 1px solid $border-color;
  & td {
    padding: .75em .75em .75em .75em;
    vertical-align: top;
    border-bottom:  1px solid $border-color;
    color: $text-color;
  }
  & tr.clickable {
    cursor: pointer;
    &:hover{
      background-color: $highlight-color;
    }
  }
} */
</style>
