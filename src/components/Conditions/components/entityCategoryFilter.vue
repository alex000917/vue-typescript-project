<template>
  <el-dialog
    width="40%"
    title="EntityCategory Filter"
    :visible.sync="showModal"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body

    class="filter-container"
  >
    <el-form
      ref="form"
      label-position="left"
      :model="entityScope"
      :rules="formRules"
    >
      <div
        class="select-container"
        style=""
      >
        <div class="select-label">
          Entity Category of the:
        </div>
        <el-form-item prop="name">
          <el-select
            v-model="entityScope.name"
            placeholder="Select"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="select-container margin-top-20">
        <div class="select-label" />
        <el-form-item>
          <el-select
            v-model="entityScope.condition"
            placeholder="Select"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
      <el-row class="margin-top-20">
        <div class="list-container">
          <el-button
            v-for="item in items"
            :key="item"
            class="list-item"
          >
            {{
              item
            }}
          </el-button>
        </div>
      </el-row>
      <div class="margin-top-20 browse-container">
        <div style="padding-right: 10px">
          <el-autocomplete
            v-model="autoCompleteText"
            style="width: 200px;"
            :fetch-suggestions="querySearch"
            placeholder="Enter Entity Category"
            value-key="displayName"
            clearable
            @select="handleSelect"
          />
        </div>
        <div>
          <el-button>Browse</el-button>
        </div>
      </div>
    </el-form>
    <div
      slot="footer"
    >
      <el-button
        class="margin-top-20"
        @click="okHandler"
      >
        Ok
      </el-button>
      <el-button
        type="text"
        style="text-decoration: underline"
        @click="cancelHandler"
      >
        cancel
      </el-button>
    </div>
  </el-dialog>
</template>
<script lang='ts'>
import { Component, Prop, Watch, Vue } from "vue-property-decorator"
import { _getDialogRoles, _selectDefaultOptions } from "./data.js"
import { ElForm } from "element-ui/types/form";

@Component({
  name: "",
  components: {}
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) data!: {
    active: boolean
    inactive: boolean
    deleted: boolean
  };

  private entityScope = {
    name: "",
    condition: ""
  }

  private autoCompleteText = ""
  private items:any = [];

  private options = _selectDefaultOptions
  private formRules = {
    name: [
      {
        required: true,
        message: "Please select entity category",
        trigger: "change"
      }
    ]
  };

  get showModal() {
    return this.dialogVisible
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val)
  }

  @Watch("data", { immediate: true, deep: true })
  private setItems(val: any) {
    this.items = [...val]
  }

  querySearch(queryString:string, cb:any) {
    const items = _getDialogRoles
    const results = queryString ? items.filter(this.createFilter(queryString)) : items
    cb(results)
  }

  createFilter(queryString:string) {
    return (item:any) => {
      return (item.displayName.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
    }
  }

  handleSelect(item:any) {
    const displayName = item.displayName
    if (this.items.indexOf(displayName) > -1) {
      this.items.splice(this.items.indexOf(displayName), 1)
    } else this.items.push(displayName)
    this.autoCompleteText = ""
  }

  okHandler() {
    (this.$refs.form as ElForm).validate((valid:boolean) => {
      if (valid) {
        this.$emit("update:data", this.items)
        this.showModal = false
      } else {
        console.log("error submit!!")
        return false
      }
    })
  }

  cancelHandler() {
    (this.$refs.form  as ElForm).resetFields()
    this.showModal = false
  }
}
</script>

<style lang='scss' scoped>
.margin-top-20 {
  margin-top: 20px;
}
.filter-container {
  .select-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .select-label {
      min-width: 150px;
    }
  }
  .filter-footer {
    text-align: center;
    padding-top: 5px;
    border-top: 1px solid $borderGray;
  }
  .list-container {
    width: 100%;
    min-height: 150px;
    border: 1px solid $borderGray;
    overflow: auto;
    .list-item {
      text-align: left;
      width: 100%;
      margin: 0;
      border: none;
    }
  }
  .browse-container {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
