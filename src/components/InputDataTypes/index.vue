<template>
  <div>
    <el-form>
      <el-row>
        <el-col :span="6">
          <span> Data Types </span>
          <el-divider />
        </el-col>
        <el-col :span="18">
          <span> Inputs for Selected type </span>
          <el-checkbox v-model="isShowConfig">
            Show config
          </el-checkbox>
          <el-checkbox v-model="isShowInputs">
            Show Inputs
          </el-checkbox>
          <el-divider />
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item prop="dataType">
            <el-radio-group
              v-model="form.dataType"
              prop="dataType"
              @change="onSelectionChanged"
            >
              <el-row
                v-for="p in dataTypes"
                :key="p.value"
              >
                <el-col>
                  <el-tooltip placement="right-start">
                    <div slot="content">
                      <el-image

                        :src="getImage(p.value)"
                      />
                    </div>
                    <el-radio :label="p.value">
                      {{ p.key }}
                    </el-radio>
                  </el-tooltip>
                </el-col>
              </el-row>
              <br>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <SingleLineDataType
            v-if="form.dataType === 1"
            :show-config="showConfig"
            :show-inputs="showInputs"
            @onDataTypeValueChanged="onSelectedValueChanged"
          />
          <TextareaDataType
            v-if="form.dataType === 2"
            :show-config="showConfig"
            :show-inputs="showInputs"
            @onDataTypeValueChanged="onSelectedValueChanged"
          />
          <ChoiceDataType
            v-if="form.dataType === 3"
            :show-config="showConfig"
            :show-inputs="showInputs"
            @onDataTypeValueChanged="onSelectedValueChanged"
          />
          <DateTimeDataType
            v-if="form.dataType === 4"
            :show-config="showConfig"
            :show-inputs="showInputs"
            @onDataTypeValueChanged="onSelectedValueChanged"
          />
          <YesNoDataType
            v-if="form.dataType === 5"
            :show-config="showConfig"
            :show-inputs="showInputs"
            @onDataTypeValueChanged="onSelectedValueChanged"
          />
          <NumberDataType
            v-if="form.dataType === 6 || form.dataType === 7 || form.dataType === 8"
            :show-config="showConfig"
            :show-inputs="showInputs"
            @onDataTypeValueChanged="onSelectedValueChanged"
          />
          <LookupDataType
            v-if="form.dataType === 9"
            :show-config="showConfig"
            :show-inputs="showInputs"
          />
          <TableDataType
            v-if="form.dataType === 10"
            :show-config="showConfig"
            :show-inputs="showInputs"
          />
          <MultiLookupDataType
            v-if="form.dataType === 11"
            :show-config="showConfig"
            :show-inputs="showInputs"
          />

          <WorkflowStepDataType
            v-if="form.dataType === 12"
            :show-config="showConfig"
            :show-inputs="showInputs"
          />
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col>
        {{ selectedValue }}
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"

import SingleLineDataType from "./SingleLineDataType.vue"
import TextareaDataType from "./TextareaDataType.vue"
import ChoiceDataType from "./ChoiceType/ChoiceDataType.vue"
import DateTimeDataType from "./DateTimeType/DateTimeDataType.vue"
import YesNoDataType from "./YesNoDataType.vue"
import NumberDataType from "./NumberType/NumberDataType.vue"
import LookupDataType from "./LookupDataType.vue"
import TableDataType from "./TableDataType.vue"
import MultiLookupDataType from "./MultiLookupDataType.vue"
import WorkflowStepDataType from "./WorkflowStepDataType.vue"
import { AppCacheModule } from "@/store/modules/appCache"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory"
@Component({
  name: "InputDataType",
  components: {
    SingleLineDataType,
    TextareaDataType,
    ChoiceDataType,
    DateTimeDataType,
    YesNoDataType,
    NumberDataType,
    LookupDataType,
    TableDataType,
    MultiLookupDataType,
    WorkflowStepDataType
  }
})
export default class extends Vue {
  selectedValue={} as any

isShowConfig=true
get showConfig() {
  return this.isShowConfig
}

isShowInputs =false
get showInputs() {
  return this.isShowInputs
}

onSelectedValueChanged(value:any) {
  this.selectedValue = {
    value: value,
    dataType: this.form.dataType
  }
}

  private dataTypes = [
    {
      key: "Single Line of Text",
      value: "1"
    },
    {
      key: "Textarea",
      value: "2"
    },
    {
      key: "Choice",
      value: "3"
    },
    {
      key: "Date and Time",
      value: "4"
    },
    {
      key: "Yes No",
      value: "5"
    },
    {
      key: "Number",
      value: "6"
    },
    {
      key: "Large Number",
      value: "7"
    },
    {
      key: "Number with Decimal Point",
      value: "8"
    },
    {
      key: "Lookup",
      value: "9"
    },
    {
      key: "Table",
      value: "10"
    },
    {
      key: "Multi Lookup",
      value: "11"
    },
    {
      key: "WORKFLOW_STEP",
      value: "12"
    }
  ];

  form = {
    dataType: 0
  };

  options=AppCacheModule.FlexSettings.baseRoles

  onSelectionChanged(val:any) {
    this.form.dataType = Number.parseInt(val)
  }

  getImage(type:string) {
    // const data = this.dataTypes.find((x) => x.value === type)
    // return `/img/typPrv/${data.key}.png`
    return DataTypeFactory.getPreviewImage(type)
  }
}
</script>
