<template>
  <div class="mid-sec forms-doc-sec mt-3">
    <b-form
      inline
      class="mb-4"
    >
      <b-container fluid>
        <b-row inline>
          <b-col class="md-1">
            <b-form-group>
              <p>rows:</p>
            </b-form-group>
          </b-col>
          <b-col class="md-2">
            <b-form-group>
              <b-input-group size="sm">
                <b-form-select
                  v-model="selected"
                  :options="rowsoptions"
                  class="mb-3"
                  value-field="item"
                  text-field="name"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col class="md-1">
            <b-form-group>
              <p>Type:</p>
            </b-form-group>
          </b-col>
          <b-col class="md-4">
            <b-form-group>
              <b-input-group size="sm">
                <b-form-select
                  v-model="Typeselected"
                  :options="Typeoptions"
                  class="mb-3"
                  value-field="item"
                  text-field="name"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col class="md-1">
            <b-form-group>
              <p>Sort by:</p>
            </b-form-group>
          </b-col>
          <b-col class="md-4">
            <b-form-group>
              <b-input-group size="sm">
                <b-form-select
                  v-model="selectedSort"
                  :options="Sortoptions"
                  class="mb-3"
                  value-field="item"
                  text-field="name"
                />
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row
          inline
          class="mb-4"
        >
          <b-col
            id="Timelbl"
            class="md-1"
          >
            <p>Time:</p>
          </b-col>
          <b-col
            id="fromdate"
            class="md-3"
          >
            <b-form-group>
              <b-form-datepicker
                id="example-datepicker"
                v-model="Fromdatevalue"
                value-as-date
                @input="dateChange"
              />
              <!-- <p>Value: '{{ Fromdatevalue }}'</p> -->
            </b-form-group>
          </b-col>
          <b-col class="md-3">
            <b-form-group>
              <b-form-input v-model="text" />
            </b-form-group>
          </b-col>
          <p>  -  </p>
          <b-col class="md-3">
            <b-form-group>
              <b-form-datepicker
                v-model="Todatevalue"
                :min="minDate"
                :disabled-dates="disabledDates"
              />
            </b-form-group>
          </b-col>
          <b-col class="md-3">
            <b-form-group>
              <b-form-input v-model="text" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-icon
          icon="arrow-repeat"
          font-scale="2"
          color="green"
        />
        <b-link
          id="refreshIcon"
          href="#foo"
        >
          Refresh
        </b-link>
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
      @row-selected="onRowSelected"
    >
      <!-- A custom formatted column -->
      <!-- <template v-slot:cell(dateModified)="data">
                    <b class="text-info">{{ data.value |toDate }}</b>
      </template>-->
    </b-table>
    <b-icon
      icon="info-circle-fill"
      font-scale="1"
      font-weight="700"
    />
    <span>To set operation thresholds, click Application Preferences, and open the Troubleshooting category.</span>
  </div>
</template>

<script>

import { mapActions } from "vuex"
export default {
  name: "AppPreferences",
  components: { },
  data() {
    const minDate = new Date()
    return {
      data: [],
      Fromdatevalue: "",
      Todatevalue: "",
      disabledDates: {
        to: new Date(Date.now() - 8640000)
      },
      // minDate: minDate,
      selected: "(All)",
      rowsoptions: [
        { item: "(All)", name: "(All)" },
        { item: "25", name: "25" },
        { item: "50", name: "50" },
        { item: "100", name: "100" },
        { item: "1000", name: "1000" }
      ],
      Typeselected: "(All Types)",
      Typeoptions: [
        { item: "(All Types)", name: "(All Types)" },
        { item: "HQL Query", name: "HQL Query" },
        { item: "SQL Query", name: "SQL Query" },
        { item: "Server Step", name: "Server Step" },
        { item: "Commit Item", name: "Commit Item" },
        { item: "Form Server rendering", name: "Form Server rendering" }
      ],
      selectedSort: "Time",
      Sortoptions: [
        { item: "Time", name: "Time" },
        { item: "Type", name: "Type" },
        { item: "Operation", name: "Operation" },
        { item: "Duration(ms)", name: "Duration(ms)" },
        { item: "Context", name: "Context" },
        { item: "Client IP", name: "Client IP" }
      ],
      selectMode: "single",
      hasSelectedRows: false,
      filter: null,
      filterOn: [],
      fields: [
        {
          key: "time"
        },
        {
          key: "type"
        },
        {
          key: "operation"
        },
        {
          key: "Duration (ms)"
        },
        {
          key: "Context"
        },
        {
          key: "Client IP"
        },
        {
          key: "MSP User Name"
        }
      ]
    }
  },
  methods: {
    onRowClick(row) {
      console.log(row)
    },
    onRowSelected(items) {
      this.selected = items
      if (this.selected.length > 0) this.hasSelectedRows = true
      else this.hasSelectedRows = false
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    dateChange() {
      console.log(this.Fromdatevalue)
      this.Todatevalue = ""
      // console.log(this.minDate);
      // add a day
      this.minDate.setDate(this.Fromdatevalue.getDate() + 1)
      console.log(this.minDate)
    }
  }

  //   computed: {
  //     datatypes() {
  //       data = [];
  //       try {
  //         var data = [];
  //         this.$store.state.AppSettings.dataTypes.forEach(element => {
  //           data.push({ text: element["key"], value: element["value"] });
  //         });
  //       } catch {
  //         console.log("error while loading data types from store. ");
  //       }
  //       return data;
  //     }
  //   },
  //   mounted() {
  //     axios
  //       .get("http://52.152.148.181:3000/api/getApplicationPreferences")
  //       .then(response => {
  //         this.data = response.data;
  //       })
  //       .catch(error => {
  //         this.errored = true;
  //         console.log(error);
  //       })
  //       .finally(() => (this.loading = false));
  //   }
}
</script>

<style scoped>
.container-fluid {
  padding-left: 0 !important;
}
#Timelbl{
  padding-right: 0;
  padding-left:13px;
}
#fromdate{
  padding-left: 0;
}
#refreshIcon{
  text-decoration: underline;
}
</style>
