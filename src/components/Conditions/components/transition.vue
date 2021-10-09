<template>
  <el-dialog
    :visible.sync="visibleTransition"
    :before-close="handleClose"
    title="New Transition Condition"
    width="40%"
    center
    append-to-body
  >
    <el-container direction="vertical">
      <span>Workflow is about to:</span><br />

      <el-tabs
        tab-position="left"
        style="height: 200px"
        v-model="conditionType"
      >
        <el-tab-pane label="Progress" key="0">
          <el-row>
            <el-col :span="16">
              <el-radio v-model="progressType" label="0">To any step</el-radio>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="24">
              <el-radio v-model="progressType" label="2"
                >To this step or beyound it:</el-radio
              >
              <el-select
                v-model="progressBeyondStep"
                filterable
                style="width: 100%; margin-top: 5px"
              >
                <el-option
                  v-for="item in flowSteps"
                  :key="item.systemName"
                  :label="item.displayName"
                  :value="item.systemName"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row style="margin-top: 5px">
            <el-col>
              <el-checkbox v-model="progressRestrictPreLaterStep"
                >From a previous step only
              </el-checkbox>
              <br />
              <span style="color: #d3d3d3">Recommended for action rules</span>
            </el-col>
          </el-row>

          <el-row style="margin-top: 15px">
            <el-col>
              <el-radio v-model="progressType" label="3"
                >To this step or before it:</el-radio
              >

              <el-select
                v-model="progressStepBefore"
                filterable
                style="width: 100%"
              >
                <el-option
                  v-for="item in flowSteps"
                  :key="item.systemName"
                  :label="item.displayName"
                  :value="item.systemName"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="Regress" key="1">
          <el-row>
            <el-col :span="16">
              <el-radio v-model="regressType" label="0">To any step</el-radio>
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="24">
              <el-radio v-model="regressType" label="2"
                >To this step or beyound it:</el-radio
              >
              <el-select
                v-model="regressStepBeyond"
                filterable
                style="width: 100%; margin-top: 5px"
              >
                <el-option
                  v-for="item in flowSteps"
                  :key="item.systemName"
                  :label="item.displayName"
                  :value="item.systemName"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row style="margin-top: 10px">
            <el-col>
              <el-radio v-model="regressType" label="3"
                >To this step or before it:</el-radio
              >

              <el-select
                v-model="regressStepBefore"
                filterable
                style="width: 100%; margin-top: 5px"
              >
                <el-option
                  v-for="item in flowSteps"
                  :key="item.systemName"
                  :label="item.displayName"
                  :value="item.systemName"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row style="margin-top: 5px">
            <el-col>
              <el-checkbox v-model="regressLaterStepOnly"
                >From a later step only
              </el-checkbox>
              <br />
              <span style="color: #d3d3d3">Recommended for action rules</span>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="Move to side step" key="2">
          <el-row>
            <el-col :span="16">
              <el-radio v-model="moveSideStepType" label="0"
                >To any step</el-radio
              >
            </el-col>
          </el-row>

          <el-row style="margin-top: 15px">
            <el-col>
              <el-radio v-model="moveSideStepType" label="1"
                >To this step:</el-radio
              >
              <el-select
                v-model="moveToSideStep"
                filterable
                style="width: 100%; margin-top: 5px"
              >
                <el-option
                  v-for="item in sideSteps"
                  :key="item.systemName"
                  :label="item.displayName"
                  :value="item.systemName"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="Return to main flow" key="3">
          <el-row>
            <el-col :span="16">
              <el-radio v-model="returnMainFlowType" label="0"
                >To any step</el-radio
              >
            </el-col>
          </el-row>
          <el-row style="margin-top: 15px">
            <el-col :span="24">
              <el-radio v-model="returnMainFlowType" label="2"
                >To this step or beyound it:</el-radio
              >
              <el-select
                v-model="returnStepBeyond"
                filterable
                style="width: 100%; margin-top: 5px"
              >
                <el-option
                  v-for="item in flowSteps"
                  :key="item.systemName"
                  :label="item.displayName"
                  :value="item.systemName"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>

          <el-row style="margin-top: 10px">
            <el-col>
              <el-radio v-model="returnMainFlowType" label="3"
                >To this step or before it:</el-radio
              >

              <el-select
                v-model="returnStepBefore"
                filterable
                style="width: 100%; margin-top: 5px"
              >
                <el-option
                  v-for="item in flowSteps"
                  :key="item.systemName"
                  :label="item.displayName"
                  :value="item.systemName"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-container>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onAdd()">Add</el-button>
      <el-button @click="handleClose">Cancel</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { FlowStep } from "@/models/Workflows/FlowStep";
import { TransitionCondition } from "@/models/Conditions";

@Component({
  name: "",
  components: {},
})
export default class extends Vue {
  @Prop({ required: true }) visibleTransition!: boolean;
  @Prop({ required: false }) condition!: TransitionCondition;

  progressType = "0";
  progressRestrictPreLaterStep = false;
  progressBeyondStep = null;
  progressStepBefore = null;

  regressType = "0";
  regressStepBeyond = null;
  regressStepBefore = null;
  regressLaterStepOnly = false;

  moveSideStepType = "0";
  moveToSideStep = null;

  returnMainFlowType = "0";
  returnStepBeyond = null;
  returnStepBefore = null;
  conditionType: string = "0";

  get currentWorkflow() {
    return WorkflowModule.ActiveWorkflow;
  }

  get flowSteps() {
    return this.currentWorkflow?.flowSteps;
  }

  get sideSteps() {
    return this.currentWorkflow?.sideSteps;
  }

  handleClose() {
    this.$emit("update:visibleTransition",false);
  }

  mounted() {
    this.onCondition();
  }

  @Watch("condition", { immediate: true })
  onCondition() {
    if (this.condition) {
      this.conditionType = this.condition.type ? this.condition.type +'': "0";
      switch (this.conditionType) {
        case "0":
          this.progressType = this.condition.stepsToIncludeType+'';
          this.progressRestrictPreLaterStep =
            this.condition.restrictToPreviousOrLaterStep;

          if (this.progressType == "2")
            this.progressBeyondStep = this.condition.stepSystemName as any;
          if (this.progressType == "3")
            this.progressStepBefore = this.condition.stepSystemName as any;
          break;
        case "1":
          this.regressType = this.condition.stepsToIncludeType +'';
          this.regressLaterStepOnly =
            this.condition.restrictToPreviousOrLaterStep;
          if (this.regressType == "2")
            this.regressStepBeyond = this.condition.stepSystemName as any;
          if (this.regressType == "3")
            this.regressStepBefore = this.condition.stepSystemName as any;
          break;
        case "2":
          this.moveSideStepType = this.condition.stepsToIncludeType +'';
          if (this.moveSideStepType == "1")
            this.moveToSideStep = this.condition.stepSystemName  as any;
          break;
        case "3":
          this.returnMainFlowType = this.condition.stepsToIncludeType +'';
          if (this.returnMainFlowType == "2")
            this.returnStepBeyond = this.condition.stepSystemName as any;
          if (this.returnMainFlowType == "3")
             this.returnStepBefore = this.condition.stepSystemName as any;
          break;
      }
    } 
  }

  onAdd() {
    var result: TransitionCondition = new TransitionCondition();
    result.type = +this.conditionType;
    console.log(this.conditionType);
    switch (+this.conditionType) {
      case 0:
        result.stepsToIncludeType = +this.progressType;
        result.restrictToPreviousOrLaterStep =
          this.progressRestrictPreLaterStep;
        if (this.progressType == "2")
          result.stepSystemName = this.progressBeyondStep;
        if (this.progressType == "3")
          result.stepSystemName = this.progressStepBefore;
        break;
      case 1:
        result.stepsToIncludeType = +this.regressType;
        result.restrictToPreviousOrLaterStep = this.regressLaterStepOnly;
        if (this.regressType == "2")
          result.stepSystemName = this.regressStepBeyond;
        if (this.regressType == "3")
          result.stepSystemName = this.regressStepBefore;
        break;
      case 2:
        result.stepsToIncludeType = +this.moveSideStepType;
        if (this.moveSideStepType == "1")
          result.stepSystemName = this.moveToSideStep;
        break;
      case 3:
        result.stepsToIncludeType = +this.returnMainFlowType;
        if (this.returnMainFlowType == "2")
          result.stepSystemName = this.returnStepBeyond;
        if (this.returnMainFlowType == "3")
          result.stepSystemName = this.returnStepBefore;
        break;
    }

// (result as any)['uniqueIdx'] = (this.condition as any)['uniqueIdx'];
    console.log('result',result);

    this.$emit("update:condition", result);
    this.$emit("onSave", result)
    
    this.handleClose();
  }
}
</script>

<style lang="scss" scoped>
</style>