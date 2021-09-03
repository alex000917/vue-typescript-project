<template>
  <div class="mid-sec forms-doc-sec mt-3">
    <b-form inline>
      <b-container fluid>
        <b-row inline>
          <b-col class="md-8">
            <b-form-group>
              <b-input-group size="sm">
                <b-form-input
                  id="filterInput"
                  v-model="filter"
                  type="search"
                  class="w-50"
                  placeholder="Find Orchestrator"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col class="md-3">
            <b-button
              variant="default"
              class="mr-xs"
              size="sm"
            >
              New
            </b-button>
            <b-button
              :disabled="!hasSelectedRows"
              variant="default"
              class="mr-xs"
              size="sm"
            >
              Copy
            </b-button>
            <b-button
              :disabled="!hasSelectedRows"
              variant="default"
              class="mr-xs"
              size="sm"
            >
              Open
            </b-button>
            <b-button
              :disabled="!hasSelectedRows"
              variant="default"
              class="mr-xs"
              size="sm"
            >
              Delete
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-form>

    <b-table
      ref="langTable"
      sticky-header="300px"
      striped
      hover
      small
      fixed
      selectable
      :select-mode="selectMode"
      responsive="sm"
      :items="data"
      :fields="fields"
      :filter="filter"
      :filter-included-fields="filterOn"
      @row-selected="onRowSelected"
    >
      <!-- A custom formatted column -->
      <!-- <template v-slot:cell(dateModified)="data">
                    <b class="text-info">{{ data.value |toDate }}</b>
      </template>-->
    </b-table>
  </div>
</template>

<script>
import axios from "axios"
import { mapActions } from "vuex"

import { Component, Vue, Watch } from "vue-property-decorator"
@Component({
  name: "AppOrchestrators",
  components: { axios }
})
export default class extends Vue {
  data = [];
  selected = [];
  selectMode = "single";
  hasSelectedRows = false;
  filter = null;
  filterOn = [];
  fields = [
    {
      key: "displayName",
      sortable: true
    }
  ];

  onRowClick(row) {
    console.log(row)
  }

  onRowSelected(items) {
    this.selected = items
    if (this.selected.length > 0) this.hasSelectedRows = true
    else this.hasSelectedRows = false
  }

  onFiltered(filteredItems) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.totalRows = filteredItems.length
    this.currentPage = 1
  }

  get datatypes() {
    this.data = []
    try {
      this.$store.state.AppSettings.dataTypes.forEach((element) => {
        this.data.push({ text: element.key, value: element.value })
      })
    } catch {
      console.log("error while loading data types from store. ")
    }
    return this.data
  }

  mounted() {
    axios
      .get("http://52.152.148.181:3000/api/getApplicationPreferences")
      .then((response) => {
        this.data = response.data
      })
      .catch((error) => {
        this.errored = true
        console.log(error)
      })
      .finally(() => (this.loading = false))
  }
}
</script>
<style scoped>
.container-fluid {
  padding-left: 0 !important;
}
</style>
