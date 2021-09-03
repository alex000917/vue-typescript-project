<template>
  <el-card class="box-card">
    <el-row>
      <el-col>
        <p>Select languages to display the site</p>

        <el-table
          :data="displayLanguages"
          border
          max-height="200"
          size="mini"
          stripe
          highlight-current-row
          @row-click="handleSelectionChange"
        >
          <!-- <el-table-column
            type="selection"
            width="55"
            prop="active"
          /> -->
          <!-- <el-table-column prop="name" label="Name" sortable width="180"></el-table-column> -->
          <el-table-column
            prop="name"
            label="Languages"
            fixed
          >
            <template slot-scope="scope">
              <el-checkbox
                :checked="scope.row.active"
                style="width: 100%"
              >
                {{ scope.row.name
                }}<span v-if="scope.row.defaultLanguage">( default)</span>
              </el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button @click="setDefaultLanguage">
          Set As Default
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :spam="12">
        <span>Translate solution objects (such as forms and workflows) to selected
          languages:
          <el-button @click="showTranslateSolution = true">
            Translate Solution
          </el-button>
        </span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button @click="showMSPForm = true">
          MSP translation (advanced)
        </el-button>
      </el-col>
    </el-row>

    <el-dialog
      :visible.sync="showTranslateSolution"
      title="Translate Solution"
      :before-close="beforeShowTranslateSolutionClose"
      center
    >
      <el-form>
        <el-form-item>
          <span>Transalte the solution to aditional languages.</span>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="18">
              <span>1. Export solution object names.</span>
            </el-col>

            <el-col :span="6">
              <el-button>Export</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox checked>
            Export only names missing translation
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <span>2. Fill object name translations.</span>
        </el-form-item>
        <el-form-item>
          <span>3. Import solution object names.</span>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="16">
              <el-input disabled />
            </el-col>
            <el-col :span="8">
              <el-button>...</el-button>
              <el-button>Import </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="100"
            status="success"
          />
        </el-form-item>
        <el-divider />
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="showTranslateSolution = false">Cancel</el-button>

        </span>
      </el-form>
    </el-dialog>
    <el-dialog
      :before-close="beforeShowMSPFormClose"
      :visible.sync="showMSPForm"
      title="MSP Translation"
    >
      <el-form>
        <el-form-item>
          <span>Transalte MSP to aditional languages</span>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="18">
              <span>1. Export MSP language entries</span>
            </el-col>

            <el-col :span="6">
              <el-button>Export</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
 &nbsp;
            </el-col>
            <el-col :span="18">
              <el-checkbox checked>
                Export only entries missing translation
              </el-checkbox>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <span>2. Fill language entries translations.</span>
        </el-form-item>
        <el-form-item>
          <span>3. Import MSP language entries.</span>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="16">
              <el-input disabled />
            </el-col>
            <el-col :span="8">
              <el-button>...</el-button>
              <el-button>Import </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-progress
            :text-inside="true"
            :stroke-width="24"
            :percentage="100"
            status="success"
          />
        </el-form-item>
        <el-divider />
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="showTranslateSolution = false">Cancel</el-button>

        </span>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import { AppCacheModule } from "@/store/modules/appCache"
// import MspForm from "../../Forms/components/MspForm";
import { Component, Vue, Watch } from "vue-property-decorator"
@Component({
  name: "AppLanguages",
  components: {}
})
export default class extends Vue {
  selectedrow;
  selectMode = "single";
  hasSelectedRows = false;
  filter = null;
  filterOn = [];
  fields = [
    {
      key: "name",
      label: "Display Languages"
    }
  ];

  showMSPForm = false;
  showTranslateSolution = false;
  displayLanguages = [];

  onFiltered(filteredItems) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.totalRows = filteredItems.length
    this.currentPage = 1
  }

  handleSelectionChange(value) {
    console.log("selected " + value)

    this.selectedrow = value
  }

  beforeShowMSPFormClose() {
    this.$confirm("Are you sure to close this dialog?")
      .then((_) => {
        this.showMSPForm = false
      })
      .catch((_) => {
        console.log("")
      })
  }

  beforeShowTranslateSolutionClose() {
    this.$confirm("beforeShowTranslateSolutionClose?")
      .then((_) => {
        this.showTranslateSolution = false
      })
      .catch((_) => {
        console.log("..")
      })
  }

  async getDisplayLanguages() {
    const rs = await AppCacheModule.getDisplayLanguages()

    this.displayLanguages = rs
  }

  mounted() {
    this.getDisplayLanguages()
  }

  setDefaultLanguage() {
    if (this.selectedrow) {
      this.displayLanguages.forEach((l) => {
        if (this.selectedrow.name === l.name) {
          l.defaultLanguage = true
          this.$message({
            type: "success",
            message: "Default language selection changed to " + l.name
          })
        } else {
          l.defaultLanguage = false
        }
      })
    }
  }
}
</script>
<style scoped>
.container-fluid {
  padding-left: 0 !important;
}
</style>
