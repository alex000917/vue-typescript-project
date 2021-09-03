<template>
  <el-row style="margin-top: 30px; height: calc(100% - 62px); width: 100%">
    <el-row style="height: 100%; width: 100%">
      <el-col :span="10">
        <el-row>Reporting mode:</el-row>
        <el-radio-group v-model="reportingRadio">
          <el-row>
            <el-radio :label="`actualWorkAndProgress`">
              Actual work and progress
            </el-radio>
          </el-row>
          <el-row
            type="flex"
            align="middle"
            style="margin-bottom: 10px; padding-left: 10px"
          >
            <el-col
              style="color: black; font-size: 14px"
              class="link-description"
              :span="8"
            >
              Progress column:
            </el-col>
            <el-select
              v-model="actualWorkAndProgressValue"
              placeholder="Select"
              size="mini"
              :disabled="reportingRadio !== 'actualWorkAndProgress'"
            >
              <el-option
                v-for="item in [
                  {
                    value: trackingTypes.REMAINING_WORK,
                    label: languagesPresentationModel.REMAINING_WORK,
                  },
                  {
                    value: trackingTypes.PERCENT_COMPLETE,
                    label: getLocalizedString(
                      languagesPresentationModel.PERCENT_COMPLETE
                    ),
                  },
                ]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-row>
          <el-row
            class="link-description require-content"
            style="font-size: 14px; padding-left: 10px"
          >
            User manually update this column. The other column is updated
            automatically
          </el-row>
          <el-row>
            <el-radio :label="`actualWorkEstimated`">
              Actual work(against estimated work)
            </el-radio>
          </el-row>
          <el-row>
            <el-radio :label="`actualWorkUnLimited`">
              Actual work (unlimited)
            </el-radio>
          </el-row>
          <el-row>
            <el-radio :label="`complete`"> % Complete only </el-radio>
          </el-row>
        </el-radio-group>
        <el-row type="flex" align="middle" style="margin: 10px 0">
          <el-col
            style="color: black; font-size: 14px"
            class="link-description"
            :span="6"
          >
            Work property:
          </el-col>
          <el-select
            v-model="propertyHoldingPlannedWorkComboBox"
            placeholder="Select"
            size="mini"
            value-key="systemName"
            :disabled="
              reportingRadio === 'actualWorkUnLimited' ||
              reportingRadio === 'complete'
            "
          >
            <el-option
              v-for="item in workProperties"
              :key="item.systemName"
              :label="item.displayName"
              :value="item"
            />
          </el-select>
        </el-row>
      </el-col>
      <el-col
        :span="12"
        style="border-left: 1px solid gray; padding-left: 11px"
      >
        <el-row>Worksheet columns behaviour:</el-row>
        <div style="padding-left: 10px">
          <el-row>
            Day Columns:
            <span class="require-content">{{ dayColumnsLabel }}</span>
          </el-row>
          <el-row>
            % Complete:
            <span class="require-content">{{ percentCompleteLabel }}</span>
          </el-row>
          <el-row>
            Remaining Work:
            <span class="require-content">{{ remainingWorkLabel }}</span>
          </el-row>
          <el-row>
            Work:
            <span class="require-content">{{ workLabel }}</span>
          </el-row>
          <el-row style="word-break: initial" class="require-content">
            <span>{{ behaviourLabelsHelpText }}</span>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>
<script lang='ts'>
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { LanguagesPresentationModel } from "@/models/Utils/LanguagesPresentationModel";
import { TrackingTypes } from "@/models/Utils/TrackingTypes";
import { Entity } from "@/models/Entity";
import { EntitiesModule } from "@/store/modules/entitiesMod";

@Component({
  name: "",
})
export default class extends Vue {
  @Prop({ required: true }) private entity!: Entity;

  private reportingRadio = "actualWorkAndProgress";
  private actualWorkAndProgressValue = TrackingTypes.REMAINING_WORK;

  // Labels.
  private dayColumnsLabel = "";
  private workLabel = "";
  private percentCompleteLabel = "";
  private remainingWorkLabel = "";
  private behaviourLabelsHelpText = "";
  private languagesPresentationModel = LanguagesPresentationModel;
  private trackingTypes = TrackingTypes;

  public propertyHoldingPlannedWorkComboBox = {} as any;
  public trackingType: number | null = null;
  private entityObject = {} as any;

  getLocalizedString(val: string) {
    const languagesModel = LanguagesPresentationModel.getInstance();
    return languagesModel.getLocalizedString(val);
  }

  get workProperties() {
    return this.entityObject?.properties?.filter((property: any) => {
      return (
        property.dataType.value === "6" ||
        property.dataType.value === "7" ||
        property.dataType.value === "8"
      );
    });
  }

  @Watch("reportingRadio")
  onChangeReportingRadio(val: string) {
    switch (val) {
      case "actualWorkAndProgress":
        this.dayColumnsLabel = this.getLocalizedString(
          this.languagesPresentationModel.DAY_COLUMNS_USER_REPORT
        );
        this.workLabel = this.getLocalizedString(
          this.languagesPresentationModel.NOT_APPLICABLE
        );
        this.onChangeActualWorkAndProgressValue(
          this.actualWorkAndProgressValue
        );
        break;
      case "actualWorkEstimated":
        this.dayColumnsLabel = this.getLocalizedString(
          this.languagesPresentationModel.DAY_COLUMNS_USER_REPORT
        );
        this.workLabel = this.getLocalizedString(
          this.languagesPresentationModel.WORK_USER_REPORT
        );
        this.percentCompleteLabel = this.getLocalizedString(
          this.languagesPresentationModel.NOT_APPLICABLE
        );
        this.remainingWorkLabel = this.getLocalizedString(
          this.languagesPresentationModel.NOT_APPLICABLE
        );
        this.behaviourLabelsHelpText = this.getLocalizedString(
          this.languagesPresentationModel
            .ACTUAL_WORK_AGAINST_ESTIMATED_WORK_HELP
        );

        this.trackingType =
          this.trackingTypes.ACTUAL_WORK_AGAINST_ESTIMATED_WORK;
        break;
      case "actualWorkUnLimited":
        this.dayColumnsLabel = this.getLocalizedString(
          this.languagesPresentationModel.DAY_COLUMNS_USER_REPORT
        );
        this.workLabel = this.getLocalizedString(
          this.languagesPresentationModel.NOT_APPLICABLE
        );
        this.percentCompleteLabel = this.getLocalizedString(
          this.languagesPresentationModel.NOT_APPLICABLE
        );
        this.remainingWorkLabel = this.getLocalizedString(
          this.languagesPresentationModel.NOT_APPLICABLE
        );
        this.behaviourLabelsHelpText = this.getLocalizedString(
          this.languagesPresentationModel.ACTUAL_WORK_UNLIMITED_HELP
        );

        this.trackingType = this.trackingTypes.ACTUAL_WORK_UNLIMITED;
        break;
      case "complete":
        this.dayColumnsLabel = this.getLocalizedString(
          this.languagesPresentationModel.NOT_APPLICABLE
        );
        this.workLabel = this.getLocalizedString(
          this.languagesPresentationModel.NOT_APPLICABLE
        );
        this.percentCompleteLabel = this.getLocalizedString(
          this.languagesPresentationModel.PERCENT_COMPLETE_USER_REPORT
        );
        this.remainingWorkLabel = this.getLocalizedString(
          this.languagesPresentationModel.NOT_APPLICABLE
        );
        this.behaviourLabelsHelpText = "";

        this.trackingType = this.trackingTypes.PERCENT_COMPLETE_ONLY;
        break;
      default:
        break;
    }
  }

  @Watch("actualWorkAndProgressValue")
  onChangeActualWorkAndProgressValue(val: number) {
    if (val === TrackingTypes.REMAINING_WORK) {
      this.percentCompleteLabel = this.getLocalizedString(
        this.languagesPresentationModel.PERCENT_COMPLETE_CALCULATED_AS
      );
      this.remainingWorkLabel = this.getLocalizedString(
        this.languagesPresentationModel.REMAINING_WORK_USER_REPORT
      );

      this.trackingType =
        this.trackingTypes.ACTUAL_WORK_AND_PROGRESS_REMAINING_WORK;
    } else {
      this.percentCompleteLabel = this.getLocalizedString(
        this.languagesPresentationModel.PERCENT_COMPLETE_USER_REPORT
      );
      this.remainingWorkLabel = this.getLocalizedString(
        this.languagesPresentationModel.REMAINING_WORK_CALCULATED_AS
      );

      this.trackingType =
        this.trackingTypes.ACTUAL_WORK_AND_PROGRESS_PERCENT_COMPLETE;
    }
  }

  mounted() {
    EntitiesModule.getEntity(this.entity.id).then((entity) => {
      this.entityObject = entity;
    });

    this.onChangeReportingRadio(this.reportingRadio);
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
