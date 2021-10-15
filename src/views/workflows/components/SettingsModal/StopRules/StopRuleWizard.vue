<template>
  <el-dialog
    :visible.sync="visibleWizard"
    :before-close="handleClose"
    title="New Stop Rule Wizard"
    width="45%"
    center
    class="action-rule"
    append-to-body
  >
    <el-container direction="vertical">
      <el-form
        label-position="left"
        label-width="100px"
        :model="items"
        :rules="formRules"
        ref="form"
      >
        <el-row class="action-rule__row">
          <el-col>
            <h3 v-if="currentStep === 0">Step 1/3 - Triggering conditions</h3>
            <h3 v-else-if="currentStep === 1">Step 2/3 - Message</h3>
            <h3 v-else-if="currentStep === 2">Step 3/3 - Name</h3>
          </el-col>
        </el-row>
        <div
          v-if="currentStep === 0"
          class="action-rule__body"
        >
          <el-row class="action-rule__row">
            <el-col v-if="currentStep === 0">
              <span>
                The rule will be applied only if these condition are met.</span><br />
              <span>
                For Example, the rule will be applied when the item is
                cancelled.</span>
            </el-col>
          </el-row>
          <el-row class="action-rule__row">
            <conditionTree
              :isAction="'true'"
              :data.sync="roleGroups"
            />
          </el-row>
        </div>

        <div
          v-if="currentStep === 1"
          class="action-rule__body"
        >
          <el-row class="action-rule__row">
            <el-col>
              <span>
                Specify the message to display if the rule has failed.</span>
            </el-col>
          </el-row>
          <div class="message">
            <div class="message__detail">
              <div class="message__detail--language">English</div>
              <div class="message__detail--tags">
                <el-tag
                  type="info"
                  v-for="(part,key) in items.propertyFirst.value.parts"
                  :key="key"
                  closable
                  @close="closeFirstTag(key)"
                >{{ display(part) }}</el-tag>
              </div>
              <div class="message__detail--button">
                <el-button @click.prevent="insertPropertyFirst">Insert Property...</el-button>
                <el-button @click.prevent="insertPreferenceFirst">Insert Application Preference...</el-button>
              </div>
              <!-- <el-form-item>
                <Tags
                  :data="CurrentEntity.lookupDefaultNameFormat"
                  :base-entity-id="entityId"
                />
              </el-form-item> -->
            </div>
            <div class="message__detail">
              <div class="message__detail--language">Hebrew</div>
              <div class="message__detail--tags">
                <el-tag
                  type="info"
                  v-for="(part,key) in items.propertySecond.value.parts"
                  :key="key"
                  closable
                  @close="closeSecondTag(key)"
                >{{ display(part) }}</el-tag>
              </div>
              <div class="message__detail--button">
                <el-button @click.prevent="insertPropertySecond">Insert Property...</el-button>
                <el-button @click.prevent="insertPreferenceSecond">Insert Application Preference...</el-button>
              </div>
            </div>
          </div>
          <div class="explain">
            It is recommended to add the item's id in the message. Also consider
            explaining the case of the stop, and the steps the user should take
            to continue.
          </div>
        </div>

        <div
          v-if="currentStep === 2"
          class="action-rule__body"
        >
          <el-row class="action-rule__row">
            <el-col>
              <el-form-item
                label="Rule name"
                prop="ruleName"
              >
                <el-input
                  v-model="ruleName"
                  class="action-rule__row--input"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="action-rule__row action-rule__row--last">
            <el-collapse
              accordion
              value="workWeekDays"
            >
              <el-collapse-item
                title="Advanced settings"
                name="workWeekDays"
              >
                <el-input v-model="advancedRuleName"></el-input>
              </el-collapse-item>
            </el-collapse>
          </el-row>
        </div>

        <prefModel
          :is-open.sync="showPreference.show"
          :result-handler="onPrefSelected"
        />
        <select-property-model
          :dialog-visible.sync="showProperty.show"
          @selectPropertyComplete="resultHandler"
          :entity-id="CurrentWorkflow.entityId"
        />
      </el-form>
    </el-container>
    <div
      slot="footer"
      class="footer"
    >
      <el-button
        v-if="currentStep > 0"
        type="primary"
        @click="onPrev()"
      >Back</el-button>
      <el-button
        v-if="currentStep < 2"
        type="primary"
        @click="onNext()"
      >Next</el-button>
      <el-button
        v-if="currentStep === 2"
        type="primary"
        @click="onOk()"
      >Ok</el-button>
      <el-button
        @click="handleClose"
        type="text"
      >Cancel</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import { TransitionCondition } from "@/models/Conditions";
import { StopWorkflowRule } from "@/models/Workflows/StopWorkflowRule";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import { forEach } from "lodash";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { KeyValue } from "@/models/KeyValue";
import Tags from "@/components/Tags/index.vue";
import { Entity } from "@/models/Entity";
import { EntitiesModule } from "@/store/modules/entitiesMod";
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod";

import prefModel from "@/components/Preferences/prefModel.vue";
import SelectPropertyModel from "@/components/PropertySelector/index.vue";
import { RoleGroup } from "@/models/RoleGroup";
import { ApplicationPreference } from "@/models/ApplicationPreference";
import { Restriction } from "@/models/Restriction";
import { ActionGroup } from "@/models/Workflows/ActionGroup";
import { TextAssembly } from "@/models/TextAssembly";

@Component({
  name: "stoprule-wizard",
  components: {
    prefModel,
    SelectPropertyModel,
    Tags,
    conditionTree: () => import("@/components/Conditions/index.vue"),
  },
})
export default class extends Vue {
  @Prop({ required: true }) visibleWizard!: string;
  @Prop({ required: true }) action!: StopWorkflowRule;

  allowedProperties = ["1", "2"];
  allowedLookupName = "user";

  conditionsTree: any[] = [];
  selectedCondition: any = null;

  private items: any = {
    propertyFirst: {
      displayName: "",
      value: null,
    },
    propertySecond: {
      displayName: "",
      value: null,
    },
    ruleName: "",
  };

  private formRules = {
    ruleName: [
      {
        required: true,
        message: "Please type the rule name.",
        trigger: "blur",
      },
      {
        min: 3,
        message: "The rule name must be at least 3 characters.",
        trigger: "blur",
      },
    ],
  };

  private actionGroups: any[] | any = [];

  private roleGroups: RoleGroup[] | any = [];

  private currentStep: number = 0;

  private ruleName: string = "";

  private advancedRuleName = "";

  // get CurrentEntity() {
  //   return this.entity
  // }

  // entityId = "com.msp.dao.entities.cse.custom.Cse_AxEntity"
  // private entity:Entity |null=null;
  // async getEntity() {
  //   this.entity = await EntitiesModule.getEntity(this.entityId)
  // }

  // async created() {
  //   await this.getEntity()
  // }

  get CurrentWorkflow() {
    return WorkflowModule.ActiveWorkflow;
  }

  get currentEntity() {
    return EntitiesModule.currentEntity;
  }

  mounted() {
    this.onSysNameChange();
  }

  rule: StopWorkflowRule | undefined;

  @Watch("ruleName", { immediate: true })
  setAdvancedRuleName() {
    if (this.ruleName) {
      this.items.ruleName = this.ruleName.toUpperCase();
      this.advancedRuleName = "cse_" + this.items.ruleName;
    }
  }

  @Watch("visibleWizard", { immediate: true })
  setUp(val: boolean) {
    if (val) this.currentStep = 0;

    if (this.action.displayName) {
        this.rule = this.action;

        this.items.ruleName = this.rule.displayName;
        this.roleGroups = this.rule.conditions?.roleGroups;
        this.actionGroups = this.rule.actionGroup?.actions;
        this.items.propertyFirst.value = [];
        this.items.propertyFirst.displayName = "";
        this.items.propertySecond.value = [];
        this.items.propertySecond.displayName = "";
        let message = this.rule.message;
        if (message?.length > 1) {
          if (message[0].myspType === "TextAssemblyTranslation") {
            let text = new TextAssembly();
            text.parts = message[0].textAssembly.parts;
            this.items.propertyFirst.value = text;
          }

          if (message[1].myspType === "TextAssemblyTranslation") {
            let text = new TextAssembly();
            text.parts = message[1].textAssembly.parts;
            this.items.propertySecond.value = text;
          }
        }
        console.log("message", message);
      }
     else {
      this.onAddEveryone();
      this.items.ruleName = "";
      this.roleGroups = [];
      this.actionGroups = [];
      this.items.propertyFirst = {
        value: [],
        displayName: ""
      };
      this.items.propertySecond = {
        value: [],
        displayName: ""
      }
    }
  }

  display(part: any) {console.log(part)
    if (Array.isArray(part)) {
      console.log(part)
      let first = part[0].value ? part[0].value : part[0].key;
      first = first.split("_");
      first = first[first.length - 1];

      let second = part[1].key ? part[1].key : part[1].value;
      second = second.split("_");
      second = second[second.length - 1];
      return `${first} : ${second}`;
    } else {
      return part;
    }
  }

  getMessage(step: any) {
    switch (step.type) {
      case 0:
        switch (step.stepsToIncludeType) {
          case 0:
            return "Progress";
          case 2:
            return `Progress to step ${step.stepSystemName} or beyound it.`;
          case 3:
            return `Progress to step ${step.stepSystemName} or before it.`;
        }
        break;
      case 1:
        switch (step.stepsToIncludeType) {
          case 0:
            return "Regress";
          case 2:
            return `Regress to step ${step.stepSystemName} or beyound it.`;
          case 3:
            return `Regress to step ${step.stepSystemName} or before it.`;
        }
        break;
      case 2:
        switch (step.stepsToIncludeType) {
          case 0:
            return "Move to side step.";
          case 1:
            return `Move to side step ${step.stepSystemName}.`;
        }
        break;
      case 3:
        switch (step.stepsToIncludeType) {
          case 0:
            return "Return to main flow";
          case 2:
            return `Return to step ${step.stepSystemName} or beyound it.`;
          case 3:
            return `Return to step ${step.stepSystemName} or before it.`;
        }
        break;
    }
  }
  private showProperty: any = {
    show: false,
    id: 0,
  };

  private showPreference: any = {
    show: false,
    id: 0,
  };

  insertPropertyFirst() {
    this.showProperty.show = true;
    this.showProperty.id = 0;
    console.log(this.showProperty);
  }

  insertPreferenceFirst() {
    this.showPreference.show = true;
    this.showPreference.id = 0;
  }

  insertPropertySecond() {
    this.showProperty.show = true;
    this.showProperty.id = 1;
  }

  insertPreferenceSecond() {
    this.showPreference.show = true;
    this.showPreference.id = 1;
  }

  onPrefSelected(value: ApplicationPreference) {
    console.log(this.showProperty.id);
    if (this.showPreference.id) {
      if (value?.displayName)
        this.items.propertySecond.value.parts.push(value.displayName);
    } else {
      if (value?.displayName)
        this.items.propertyFirst.value.parts.push(value.displayName);
    }
  }

  closeFirstTag(key: number) {
    this.items.propertyFirst.value.parts?.splice(key,1);
  }

  closeSecondTag(key: number) {
    this.items.propertySecond.value.parts?.splice(key,1);
  }

  async resultHandler(displayPaths: KeyValue, value: KeyValue[]) {
    console.log("property", value);
    console.log(this.showProperty.id);
    if (this.showProperty.id) {
      this.items.propertySecond.value.parts.push(value);
    } else {
      this.items.propertyFirst.value.parts.push(value);
    }
  }

  handleClose() {
    this.$emit("update:visibleWizard", false);
    this.currentStep == 0;
  }

  onAddEveryone() {
    this.conditionsTree.push({
      label: "Everyone",
      children: [],
    });
  }

  onNext() {
    this.currentStep++;
  }

  onPrev() {
    this.currentStep--;
  }

  onOk() {
    (this.$refs.form as ElForm).validate((valid: boolean) => {
      if (valid) {
        if (!this.rule) this.rule = new StopWorkflowRule();
        if (this.rule && !this.rule.conditions)
          this.rule.conditions = new Restriction();
        this.rule.conditions.roleGroups = this.roleGroups;
        if (this.rule && !this.rule.actionGroup)
          this.rule.actionGroup = new ActionGroup();
        this.rule.actionGroup.actions = this.actionGroups;
        this.rule.systemName = this.advancedRuleName;
        this.rule.displayName = this.items.ruleName;
        this.rule.message = [];

        this.rule.message.push({
          language: "en",
          myspType: "TextAssemblyTranslation",
          textAssembly: this.items.propertyFirst.value,
        });

        this.rule.message.push({
          language: "he",
          myspType: "TextAssemblyTranslation",
          textAssembly: this.items.propertySecond.value,
        });

        this.$emit("onSave", this.rule);
        this.$emit("update:visibleWizard", false);
      }
    });
  }

  onNodeClick(node: any, props: any, tree: any) {
    if (node && node.label != "Everyone") {
      this.selectedCondition = node.data;
    } else {
      this.selectedCondition = null;
    }
  }
}
</script>

<style lang="scss">
$border-color: #cacaca;

.action-rule {
  .el-dialog {
    &__body {
      padding: 0 15px;
      border-bottom: 1px soild $border-color;
      height: 490px;

      .el-container {
        height: 100%;
      }

      .message {
        position: relative;
        margin-top: 15px;
        padding: 10px;
        border: 1px solid $border-color;
        height: 350px;

        &__detail {
          div {
            margin-top: 20px;
          }
          &--language {
            font-size: 17px;
            font-weight: 500;
            border-bottom: 2px solid $border-color;
          }
          &--tags {
            border: 1px solid $border-color;
            height: 3.5vh;
            align-items: center;
            overflow-x: auto;
          }
        }
      }
    }

    &__footer {
      padding: 0 15px;
      align-items: center;

      .footer {
        height: 70px;
        border-top: 1px solid $border-color;
        align-items: center;

        .el-button {
          width: 120px;
          margin: 20px 10px;

          &--text {
            text-decoration: underline;
          }
        }
      }
    }
  }

  &__row {
    margin-top: 10px;

    &--detail {
      border: 1px solid $border-color;
      height: 31vh;
    }

    &--text {
      height: 20px;
      color: #e4e4e4;
      position: absolute;
      bottom: 0;
      font-style: italic;
    }

    &--last {
      height: calc(30vh + 20px);
      padding-bottom: 20px;
    }

    &--input {
      width: 50%;
    }
  }
}
</style>
