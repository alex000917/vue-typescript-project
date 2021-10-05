<template>
  <el-dialog
    width="25%"
    title="Javascript condition"
    :visible.sync="showModal"
    class="filter-container"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
  >
    <el-row type="flex" style="align-items: center">
      <div style="min-width: 100px">Display Name</div>
      <el-input v-model="items.displayName" type="text" />
    </el-row>
    <el-row style="margin-top: 20px">
      <div style="margin-bottom: 5px">
        Enter Javascript code that can be evaluated as true or flase
      </div>
      <el-input
        v-model="items.code"
        type="textarea"
        :autosize="{ minRows: 5 }"
      />
    </el-row>
    <div style="text-align: right">
      <el-button type="text" style="padding: 0; padding-top: 5px">
        <el-image src="/assets/img/help16x16.png" />
      </el-button>
    </div>
    <div slot="footer">
      <el-button style="margin-right: 20px" @click="okHandler"> Ok </el-button>
      <el-button
        type="text"
        style="text-decoration: underline"
        @click="showModal = false"
      >
        cancel
      </el-button>
    </div>
  </el-dialog>
</template>
<script lang='ts'>
import { FreeTextCondition } from "@/models/Conditions";
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { JavascriptCondition } from "@/models/Conditions";
import { ElForm } from "element-ui/types/form";

@Component({
  name: "javscript-condition",
  components: {},
})
export default class extends Vue {
  @Prop({ required: true }) dialogVisible!: boolean;
  @Prop({ required: true }) condition!: JavascriptCondition;

  private items = {
    displayName: "",
    code: "",
  } as any;

  private formRules = {
    displayName: [
      {
        required: true,
        message: "Please enter the display name",
        trigger: "change",
      },
    ],
    code: [
      {
        required: true,
        message: "Please enter the code",
        trigger: "change",
      },
    ],
  };

  get showModal() {
    return this.dialogVisible;
  }

  set showModal(val: boolean) {
    this.$emit("update:dialogVisible", val);
  }

  @Watch("dialogVisible", { immediate: true, deep: true })
  private setItems(val: any) {
    if (val) {
      this.items = { ...this.condition };
    }
  }

  okHandler() {
    // (this.$refs.form as ElForm).validate((valid: boolean) => {
    //   if (valid) {
        let condition = new JavascriptCondition();
        condition.displayName = this.items.displayName;
        condition.code = this.items.code;
        this.$emit("onSave", condition);
        this.showModal = false;
      // } else {
      //   console.log("error submit!!");
      //   return false;
      // }
    // });
  }
}
</script>

<style lang='scss' scoped>
.filter-container {
  .filter-footer {
    text-align: center;
    padding-top: 5px;
    border-top: 1px solid $borderGray;
  }
}
</style>
