<template>
  <el-container id="target">
    <div id="promptDialog"></div>
    <el-aside style="padding: 5px">
      <el-card class="box-card" :body-style="{ padding: '5px' }">
        <div class="clearfix el-card__header">
          <span>Diagram overview</span>
        </div>
        <div>
          <ejs-overview
            id="overview"
            :source-i-d="overviewsourceID"
            :width="overviewwidth"
            :height="overviewheight"
          />
        </div>
      </el-card>
      <el-card class="box-card" :body-style="{ padding: '5px' }">
        <div class="clearfix el-card__header">
          <span>Transition picker</span>
        </div>
        <div>
          <div style="margin-left: 10px">
            <p style="margin: 0">From:</p>
            <i class="el-icon-right" />
            <el-dropdown trigger="click" @command="selectFromInput">
              <span
                class="el-dropdown-link"
                v-html="selectFromTransition.name"
                @click="getNodeButton"
              >
              </span>
              <el-dropdown-menu slot="dropdown" class="dropdown-popup">
                <el-dropdown-item
                  class="item iio"
                  v-for="(val, key) in nodesList"
                  :key="key"
                  :command="val"
                >
                  {{ val.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <i class="el-icon-sort" @click="swipe" />
          <div style="margin-left: 10px">
            <p style="margin: 0; line-height: 15px">To:</p>
            <i class="el-icon-right" />
            <el-dropdown trigger="click" @command="selectToInput">
              <span
                class="el-dropdown-link"
                v-html="selectToTransition.name"
                @click="getNodeButton"
              >
              </span>
              <el-dropdown-menu slot="dropdown" class="dropdown-popup">
                <el-dropdown-item
                  class="item iio"
                  v-for="(val, key) in nodesList"
                  :key="key"
                  :command="val"
                >
                  {{ val.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <!-- <div style="margin-left: 10px; margin-top: 5px">
            <p style="margin: 0; line-height: 15px">allowed users:</p>
            <el-button class="btn-select" type="text">
              Backlog approvers
            </el-button>
            <p style="margin: 0; line-height: 15px">buttons:</p>
            <el-button class="btn-select" type="text">
              cancel agile project
            </el-button>
          </div> -->

          <el-button
            cssClass="e-small"
            variant="outline-primary"
            icon="el-icon-link"
            @click="addTransition()"
          >
            Add Transition
          </el-button>
          <i class="el-icon-delete tansition-trash" @click="deleteTransition" />
        </div>
      </el-card>
      <el-card class="box-card" :body-style="{ padding: '5px' }">
        <div class="clearfix el-card__header">
          <span>Show Transition</span>
        </div>
        <div style="text-align: right">
          <el-button class="btn-select" type="text" @click="resetTransition()">
            Reset
          </el-button>
        </div>

        <el-table
          :data="tableData"
          default-expand-all
          :show-header="showHeader"
          style="width: 100%"
        >
          <el-table-column type="expand" class="table-column">
            <template slot-scope="props">
              <div>
                <!-- <el-checkbox v-if="props.row.name != 'Button'" :id="props.row.name+'_$all'" v-on:click.native="updateTransition(props.row.name,'$all')">
                All
              </el-checkbox>
              <br> -->
                <el-checkbox
                  v-for="(val, key) in props.row.stepName"
                  :key="key"
                  :id="props.row.name + '_' + val.id"
                  v-on:click.native="updateTransition(props.row.name, val.id)"
                >
                  {{ val.name }}
                </el-checkbox>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="" prop="name" />
        </el-table>
      </el-card>
    </el-aside>
    <el-container>
      <div style="margin: 10px; height: 50px; background: white; width: 100%">
        <el-row style="margin: 5px">
          <el-col :span="24">
            <div>
              <el-button
                class="inverseIcon"
                variant="outline-primary"
                icon="el-icon-edit"
                @click="onEditSwitch()"
              />
              <!-- <el-button
                variant="outline-primary"
                icon="el-icon-thumb"
                @click="onEditSwitch()"
              /> -->
              <el-button
                variant="outline-primary"
                icon="el-icon-zoom-out"
                @click="onZoomOut()"
              />
              <el-button
                variant="outline-primary"
                icon="el-icon-zoom-in"
                @click="onZoomIn()"
              />
              <!-- <el-button
                variant="outline-primary"
                icon="el-icon-link"
                @click="onAddTransition()"
              >
                Add Transition
              </el-button> -->
              <!-- <el-button
                variant="outline-primary"
                icon="el-icon-plus"
                @click="onAddRole()"
              >
                Add Role
              </el-button> -->
              <span style="margin: 5px">|</span>
              <el-button
                variant="outline-primary"
                icon="el-icon-s-management"
                @click="onCenter()"
              />
              <el-button
                variant="outline-primary"
                icon="el-icon-s-shop"
                @click="onFixed()"
              />
              <span style="margin: 5px">|</span>

              <el-button
                @click="(openDailog = 'workstep'), (showDialog = true)"
                variant="outline-primary"
                icon="el-icon-postcard"
                style="color: green"
              />
              <el-button
                @click="(openDailog = 'sidestep'), (showDialog = true)"
                variant="outline-primary"
                icon="el-icon-postcard"
                style="color: blue"
              />

              <span style="margin: 5px">|</span>

              <el-button
                @click="(openDailog = 'workbuttons'), (showDialog = true)"
                variant="outline-primary"
                icon="el-icon-menu"
              />
              <el-button
                @click="(openDailog = 'worksettings'), (showDialog = true)"
                variant="outline-primary"
                icon="el-icon-setting"
              />
              <el-button
                variant="outline-primary"
                icon="el-icon-delete-solid"
              />
              <el-button variant="outline-primary" @click="onSave()">
                Save
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-container class="editor">
            <el-col :span="24">
              <ejs-diagram
                id="diagram"
                width="100%"
                height="100%"
                :nodes="nodes"
                :constraints="constraints"
                :connectors="connectors"
                :selectedItems="selectedItems"
                :getCustomTool="getCustomTool"
                :selectionChange="selectionChange"
                :rulerSettings="{ showRulers: true }"
              />
            </el-col>
          </el-container>
        </el-row>

        <el-row>
          <el-col>
            <new-work-step
              v-if="openDailog == 'workstep'"
              :dialog-visible.sync="showDialog"
              :Status="Status"
              :Assignee="Assignee"
              :StatusUsed="currentWorkflowStatus"
            ></new-work-step>
            <side-step
              v-if="openDailog == 'sidestep'"
              :dialog-visible.sync="showDialog"
              :Status="Status"
              :Assignee="Assignee"
            >
            </side-step>
            <workflow-buttons
              v-if="openDailog == 'workbuttons'"
              :dialog-visible.sync="showDialog"
              :current-workflow="currentWorkflow"
            >
            </workflow-buttons>
            <workflow-settings
              v-if="openDailog == 'worksettings'"
              :visible.sync="showDialog"
            ></workflow-settings>
          </el-col>
        </el-row>
      </div>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { WorkflowModule } from "@/store/modules/WorkflowMod";
import {
  Diagram,
  DiagramConstraints,
  DiagramPlugin,
  Overview,
  OverviewPlugin,
  PortConstraints,
  PortVisibility,
  PointPortModel,
  ZoomOptions,
  ConnectorModel,
  ISelectionChangeEventArgs,
  SelectorConstraints,
  ConnectorConstraints,
  MouseEventArgs,
  MoveTool,
  ToolBase,
  UserHandleModel,
  SelectorModel,
  LaneModel,
  NodeModel,
  SwimLaneModel,
  NodeConstraints,
  Rect,
} from "@syncfusion/ej2-vue-diagrams";

import _ from "lodash";
import { Workflow } from "@/models/Workflows/workflow";
import { METHODS } from "http";
import NewWorkStep from "./../components/newWorkStep.vue";
import { Entity } from "@/models/Entity";
import { Status } from "@/models/Status";
import { AuthorizationModule } from "@/store/modules/AuthorizationMod";
import { AuthorizationTree } from "@/models/authorizations/AuthorizationTree";
import { AuthorizationNode } from "@/models/authorizations/AuthorizationNode";
import SideStep from "./../components/sideStep.vue";
import WorkflowButtons from "./../components/WorkflowButtons.vue";
import { Dialog } from "@syncfusion/ej2-popups";
import WorkflowSettings from "./../components/SettingsModal/index.vue";

import { EntitiesModule } from "@/store/modules/entitiesMod";

Vue.use(DiagramPlugin);
Vue.use(OverviewPlugin);

let overview: Overview;

@Component({
  name: "workFlowsEdit",
  components: {
    DiagramPlugin,
    NewWorkStep,
    SideStep,
    WorkflowButtons,
    WorkflowSettings,
  },
})
export default class extends Vue {
  originWorkFlow: Workflow | undefined = new Workflow();
  showDiagram = false;
  showHeader = false;
  diagramInstance: Diagram | undefined;
  constraints: DiagramConstraints | undefined = 452;
  overviewsourceID = "diagram";
  overviewwidth = "100%";
  overviewheight = "150px";
  workStepDialog: boolean = false;
  openDailog: string = "";

  _status: Status[] = [];
  asigneeAuth: AuthorizationNode[] = [];
  showDialog: boolean = false;
  @Watch("showDialog", { immediate: true, deep: true })
  private changeDailogValue(value: string) {
    if (!value) {
      this.openDailog = "";
    }
  }

  get tableData() {
    return [
      {
        step: false,
        name: "From",
        stepName: this.nodesList,
      },
      {
        step: false,
        name: "To",
        stepName: this.nodesList,
      },
      // {
      //   step: false,
      //   name: "Buttons",
      //   stepName: this.nodesList
      // }
    ];
  }

  isSideStep = false;
  sourceConnector = {};
  targetConnector = {};
  lanesCounter = 550;
  sideStepNode = 0;
  sideStepLaneId = "";
  selectedLane = [];
  roles = [];
  promptDialogObj: Dialog = new Dialog();
  selectFromTransition = { name: "select", id: "select" };
  selectToTransition = { name: "select", id: "select" };
  nodesList = [];

  resetTransition() {
    this.sourceConnector = { name: "select", id: "select" };
    this.targetConnector = { name: "select", id: "select" };

    this.diagramInstance?.connectors.forEach((connector) => {
      const visible = connector.properties.addInfo.showInGraph;
      this.diagramInstance?.updateElementVisibility(
        connector.wrapper,
        connector,
        visible
      );
    });
    this.nodesList.forEach((node) => {
      document.getElementById("From_" + node.id).innerHTML = document
        .getElementById("From_" + node.id)
        .innerHTML.replace("is-checked", "");
      document.getElementById("To_" + node.id).innerHTML = document
        .getElementById("To_" + node.id)
        .innerHTML.replace("is-checked", "");
    });
    // document.getElementById('From_'+node.id).innerHTML = document.getElementById('From_'+node.id).innerHTML.replace("el-checkbox__input", "el-checkbox__input is-checked");
    // document.getElementById('To_'+node.id).innerHTML = document.getElementById('To_'+node.id).innerHTML.replace("el-checkbox__input", "el-checkbox__input is-checked");
  }

  updateTransition(name, id) {
    //console.log(name)
    if (name == "From") this.sourceConnector = id;
    if (name == "To") this.targetConnector = id;
    this.nodesList.forEach((node) => {
      if (node.id === id) {
        //console.log(document.getElementById(name+'_'+node.id))
        document.getElementById(name + "_" + node.id).innerHTML = document
          .getElementById(name + "_" + node.id)
          .innerHTML.replace("is-checked", "");
        document.getElementById(name + "_" + node.id).innerHTML = document
          .getElementById(name + "_" + node.id)
          .innerHTML.replace(
            "el-checkbox__input",
            "el-checkbox__input is-checked"
          );
      } else {
        //console.log(document.getElementById(name+'_'+node.id))
        document.getElementById(name + "_" + node.id).innerHTML = document
          .getElementById(name + "_" + node.id)
          .innerHTML.replace("is-checked", "");
      }
    });
    // if($id == '$all'){
    //   document.getElementById(name+'_'+node.id).innerHTML = document.getElementById(name+'_'+node.id).innerHTML.replace("el-checkbox__input", "el-checkbox__input is-checked");
    // }else{
    //   document.getElementById(name+'_'+node.id).innerHTML = document.getElementById(name+'_'+node.id).innerHTML.replace("is-checked", "");
    // }
    this.diagramInstance?.connectors.forEach((connector) => {
      if (
        connector.properties.sourceID != this.sourceConnector ||
        connector.properties.targetID != this.targetConnector
      ) {
        this.diagramInstance?.updateElementVisibility(
          connector.wrapper,
          connector,
          false
        );
      } else {
        this.diagramInstance?.updateElementVisibility(
          connector.wrapper,
          connector,
          true
        );
      }
    });
  }

  getNodeButton() {
    this.nodesList = [];
    this.diagramInstance?.nodes.forEach((node) => {
      if (
        !node.isLane &&
        !node.isHeader &&
        node.properties.id != "swimlane" &&
        node.properties.id != "swimlane2" &&
        node.properties.id != "stepBtn" &&
        node.properties.id != "flowBtn"
      ) {
        const tmp = {
          id: node.properties.id,
          name: node.properties.addInfo.name,
        };
        this.nodesList.push(tmp);
      }
    });
  }

  addTransition() {
    if (
      this.selectFromTransition.id != "select" &&
      this.selectToTransition.id != "select" &&
      this.selectFromTransition.id != this.selectToTransition.id
    ) {
      const transition = {
        style: {
          strokeColor: "#6BA5D7",
          fill: "#6BA5D7",
          strokeWidth: 2,
        },
        sourceID: this.selectFromTransition.id,
        targetID: this.selectToTransition.id,
        type: "Orthogonal",
      };
      this.diagramInstance?.addConnector(transition);
      this.diagramInstance?.refreshDiagramLayer();
    }
  }

  deleteTransition() {
    if (
      this.selectFromTransition.id != "select" &&
      this.selectToTransition.id != "select" &&
      this.selectFromTransition.id != this.selectToTransition.id
    ) {
      this.diagramInstance?.connectors.forEach((connector) => {
        if (
          connector.properties.sourceID == this.selectFromTransition.id &&
          connector.properties.targetID == this.selectToTransition.id
        ) {
          this.diagramInstance?.remove(connector);
          this.diagramInstance?.refreshDiagramLayer();
        }
      });
    }
  }

  swipe() {
    if (
      this.selectFromTransition.id != "select" &&
      this.selectToTransition.id != "select"
    ) {
      const tmp = this.selectFromTransition;
      this.selectFromTransition = this.selectToTransition;
      this.selectToTransition = tmp;
    }
  }

  selectFromInput(command) {
    this.selectFromTransition = command;
  }

  selectToInput(command) {
    this.selectToTransition = command;
  }

  ports = [
    {
      id: "Port1",
      offset: { x: 0, y: 0.5 },
      visibility: PortVisibility.Connect | PortVisibility.Hover,
      constraints: PortConstraints.Default | PortConstraints.Draw,
    },
    {
      id: "Port2",
      offset: { x: 0.5, y: 0 },
      visibility: PortVisibility.Connect | PortVisibility.Hover,
      constraints: PortConstraints.Default | PortConstraints.Draw,
    },
    {
      id: "Port3",
      offset: { x: 1, y: 0.5 },
      visibility: PortVisibility.Connect | PortVisibility.Hover,
      constraints: PortConstraints.Default | PortConstraints.Draw,
    },
    {
      id: "Port4",
      offset: { x: 0.5, y: 1 },
      visibility: PortVisibility.Connect | PortVisibility.Hover,
      constraints: PortConstraints.Default | PortConstraints.Draw,
    },
  ];

  handles: UserHandleModel[] = [
    {
      name: "clone",
      pathData:
        "M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0 L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109 c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483 c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788 S18.707,9.212,18.271,9.212z",
      visible: true,
      offset: 0,
      disableConnectors: true,
      side: "Left",
      backgroundColor: "#1E90FF",
      pathColor: "White",
      margin: { top: 0, bottom: 20, left: 0, right: 0 },
    },
    {
      name: "clone",
      pathData:
        "M15.475,6.692l-4.084-4.083C11.32,2.538,11.223,2.5,11.125,2.5h-6c-0.413,0-0.75,0.337-0.75,0.75v13.5c0,0.412,0.337,0.75,0.75,0.75h9.75c0.412,0,0.75-0.338,0.75-0.75V6.94C15.609,6.839,15.554,6.771,15.475,6.692 M11.5,3.779l2.843,2.846H11.5V3.779z M14.875,16.75h-9.75V3.25h5.625V7c0,0.206,0.168,0.375,0.375,0.375h3.75V16.75z",
      visible: true,
      offset: (0.5, 0),
      disableConnectors: true,
      side: "Left",
      backgroundColor: "#3CB371",
      pathColor: "White",
      margin: { top: 0, bottom: 20, left: 50, right: 0 },
    },
    {
      name: "remove",
      pathData:
        "M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306",
      visible: true,
      offset: (0.5, 0),
      disableConnectors: true,
      side: "Right",
      backgroundColor: "#FF6347",
      pathColor: "White",
      margin: { top: 0, bottom: 20, left: 0, right: 0 },
    },
    {
      name: "clone",
      pathData:
        "M17.498,11.697c-0.453-0.453-0.704-1.055-0.704-1.697c0-0.642,0.251-1.244,0.704-1.697c0.069-0.071,0.15-0.141,0.257-0.22c0.127-0.097,0.181-0.262,0.137-0.417c-0.164-0.558-0.388-1.093-0.662-1.597c-0.075-0.141-0.231-0.22-0.391-0.199c-0.13,0.02-0.238,0.027-0.336,0.027c-1.325,0-2.401-1.076-2.401-2.4c0-0.099,0.008-0.207,0.027-0.336c0.021-0.158-0.059-0.316-0.199-0.391c-0.503-0.274-1.039-0.498-1.597-0.662c-0.154-0.044-0.32,0.01-0.416,0.137c-0.079,0.106-0.148,0.188-0.22,0.257C11.244,2.956,10.643,3.207,10,3.207c-0.642,0-1.244-0.25-1.697-0.704c-0.071-0.069-0.141-0.15-0.22-0.257C7.987,2.119,7.821,2.065,7.667,2.109C7.109,2.275,6.571,2.497,6.07,2.771C5.929,2.846,5.85,3.004,5.871,3.162c0.02,0.129,0.027,0.237,0.027,0.336c0,1.325-1.076,2.4-2.401,2.4c-0.098,0-0.206-0.007-0.335-0.027C3.001,5.851,2.845,5.929,2.77,6.07C2.496,6.572,2.274,7.109,2.108,7.667c-0.044,0.154,0.01,0.32,0.137,0.417c0.106,0.079,0.187,0.148,0.256,0.22c0.938,0.936,0.938,2.458,0,3.394c-0.069,0.072-0.15,0.141-0.256,0.221c-0.127,0.096-0.181,0.262-0.137,0.416c0.166,0.557,0.388,1.096,0.662,1.596c0.075,0.143,0.231,0.221,0.392,0.199c0.129-0.02,0.237-0.027,0.335-0.027c1.325,0,2.401,1.076,2.401,2.402c0,0.098-0.007,0.205-0.027,0.334C5.85,16.996,5.929,17.154,6.07,17.23c0.501,0.273,1.04,0.496,1.597,0.66c0.154,0.047,0.32-0.008,0.417-0.137c0.079-0.105,0.148-0.186,0.22-0.256c0.454-0.453,1.055-0.703,1.697-0.703c0.643,0,1.244,0.25,1.697,0.703c0.071,0.07,0.141,0.15,0.22,0.256c0.073,0.098,0.188,0.152,0.307,0.152c0.036,0,0.073-0.004,0.109-0.016c0.558-0.164,1.096-0.387,1.597-0.66c0.141-0.076,0.22-0.234,0.199-0.393c-0.02-0.129-0.027-0.236-0.027-0.334c0-1.326,1.076-2.402,2.401-2.402c0.098,0,0.206,0.008,0.336,0.027c0.159,0.021,0.315-0.057,0.391-0.199c0.274-0.5,0.496-1.039,0.662-1.596c0.044-0.154-0.01-0.32-0.137-0.416C17.648,11.838,17.567,11.77,17.498,11.697 M16.671,13.334c-0.059-0.002-0.114-0.002-0.168-0.002c-1.749,0-3.173,1.422-3.173,3.172c0,0.053,0.002,0.109,0.004,0.166c-0.312,0.158-0.64,0.295-0.976,0.406c-0.039-0.045-0.077-0.086-0.115-0.123c-0.601-0.6-1.396-0.93-2.243-0.93s-1.643,0.33-2.243,0.93c-0.039,0.037-0.077,0.078-0.116,0.123c-0.336-0.111-0.664-0.248-0.976-0.406c0.002-0.057,0.004-0.113,0.004-0.166c0-1.75-1.423-3.172-3.172-3.172c-0.054,0-0.11,0-0.168,0.002c-0.158-0.312-0.293-0.639-0.405-0.975c0.044-0.039,0.085-0.078,0.124-0.115c1.236-1.236,1.236-3.25,0-4.486C3.009,7.719,2.969,7.68,2.924,7.642c0.112-0.336,0.247-0.664,0.405-0.976C3.387,6.668,3.443,6.67,3.497,6.67c1.75,0,3.172-1.423,3.172-3.172c0-0.054-0.002-0.11-0.004-0.168c0.312-0.158,0.64-0.293,0.976-0.405C7.68,2.969,7.719,3.01,7.757,3.048c0.6,0.6,1.396,0.93,2.243,0.93s1.643-0.33,2.243-0.93c0.038-0.039,0.076-0.079,0.115-0.123c0.336,0.112,0.663,0.247,0.976,0.405c-0.002,0.058-0.004,0.114-0.004,0.168c0,1.749,1.424,3.172,3.173,3.172c0.054,0,0.109-0.002,0.168-0.004c0.158,0.312,0.293,0.64,0.405,0.976c-0.045,0.038-0.086,0.077-0.124,0.116c-0.6,0.6-0.93,1.396-0.93,2.242c0,0.847,0.33,1.645,0.93,2.244c0.038,0.037,0.079,0.076,0.124,0.115C16.964,12.695,16.829,13.021,16.671,13.334 M10,5.417c-2.528,0-4.584,2.056-4.584,4.583c0,2.529,2.056,4.584,4.584,4.584s4.584-2.055,4.584-4.584C14.584,7.472,12.528,5.417,10,5.417 M10,13.812c-2.102,0-3.812-1.709-3.812-3.812c0-2.102,1.71-3.812,3.812-3.812c2.102,0,3.812,1.71,3.812,3.812C13.812,12.104,12.102,13.812,10,13.812",
      visible: true,
      offset: (0.5, 0),
      disableConnectors: true,
      side: "Right",
      backgroundColor: "#634FF7",
      pathColor: "White",
      margin: { top: 0, bottom: 20, left: 0, right: 50 },
    },
    {
      name: "switch",
      pathData:
        "M12.319,5.792L8.836,2.328C8.589,2.08,8.269,2.295,8.269,2.573v1.534C8.115,4.091,7.937,4.084,7.783,4.084c-2.592,0-4.7,2.097-4.7,4.676c0,1.749,0.968,3.337,2.528,4.146c0.352,0.194,0.651-0.257,0.424-0.529c-0.415-0.492-0.643-1.118-0.643-1.762c0-1.514,1.261-2.747,2.787-2.747c0.029,0,0.06,0,0.09,0.002v1.632c0,0.335,0.378,0.435,0.568,0.245l3.483-3.464C12.455,6.147,12.455,5.928,12.319,5.792 M8.938,8.67V7.554c0-0.411-0.528-0.377-0.781-0.377c-1.906,0-3.457,1.542-3.457,3.438c0,0.271,0.033,0.542,0.097,0.805C4.149,10.7,3.775,9.762,3.775,8.76c0-2.197,1.798-3.985,4.008-3.985c0.251,0,0.501,0.023,0.744,0.069c0.212,0.039,0.412-0.124,0.412-0.34v-1.1l2.646,2.633L8.938,8.67z M14.389,7.107c-0.34-0.18-0.662,0.244-0.424,0.529c0.416,0.493,0.644,1.118,0.644,1.762c0,1.515-1.272,2.747-2.798,2.747c-0.029,0-0.061,0-0.089-0.002v-1.631c0-0.354-0.382-0.419-0.558-0.246l-3.482,3.465c-0.136,0.136-0.136,0.355,0,0.49l3.482,3.465c0.189,0.186,0.568,0.096,0.568-0.245v-1.533c0.153,0.016,0.331,0.022,0.484,0.022c2.592,0,4.7-2.098,4.7-4.677C16.917,9.506,15.948,7.917,14.389,7.107 M12.217,15.238c-0.251,0-0.501-0.022-0.743-0.069c-0.212-0.039-0.411,0.125-0.411,0.341v1.101l-2.646-2.634l2.646-2.633v1.116c0,0.174,0.126,0.318,0.295,0.343c0.158,0.024,0.318,0.034,0.486,0.034c1.905,0,3.456-1.542,3.456-3.438c0-0.271-0.032-0.541-0.097-0.804c0.648,0.719,1.022,1.659,1.022,2.66C16.226,13.451,14.428,15.238,12.217,15.238",
      visible: true,
      offset: (0.5, 0),
      disableConnectors: true,
      side: "Left",
      backgroundColor: "#634FF7",
      pathColor: "White",
      margin: { top: 0, bottom: 20, left: 50, right: 0 },
    },
    {
      name: "removeLane",
      pathData:
        "M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306",
      visible: true,
      offset: (0.5, 0),
      disableConnectors: true,
      side: "Left",
      backgroundColor: "#FF6347",
      pathColor: "White",
      margin: { top: 0, bottom: 20, left: 0, right: 0 },
    },
    {
      name: "removeConnector",
      pathData:
        "M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306",
      visible: true,
      offset: 0,
      disableNodes: true,
      side: "Left",
      backgroundColor: "#FF6347",
      pathColor: "White",
      margin: { top: 30, bottom: 0, left: 0, right: 0 },
    },
  ];

  selectedItems: SelectorModel = {
    constraints: SelectorConstraints.All,
    userHandles: this.handles,
  };

  getCustomTool(action: string) {
    if (
      action === "remove" ||
      action === "removeConnector" ||
      action === "removeLane"
    ) {
      if (window.confirm("Are you sure you want to delete?")) {
        this.onDelete();
        if (action === "removeLane") {
          this.diagramInstance!.nodes[1].offsetY =
            this.diagramInstance?.nodes[1].offsetY - 100;
          this.diagramInstance?.refreshDiagramLayer();
          this.getLanes();
        }
      }
    }
    if (action === "switch") {
      //let lanesList = this.diagramInstance?.nodes.find((node) => node.isLane == true);
      //console.log(this.selectedLane.id)
      let laneList = "";
      var index = 0;
      this.diagramInstance?.nodes.forEach((element) => {
        //console.log(element)
        if (
          element.isLane &&
          element.parentId === "swimlane" &&
          element.properties.id.toLowerCase().indexOf("0_header") === -1 &&
          element.properties.id != this.selectedLane.id &&
          element.properties.id != "swimlaneflowLane0" &&
          element.properties.id != "swimlanestartLane0"
        ) {
          index++;
          var id = element.properties.id.replaceAll("swimlane", "");
          id = id.substring(0, id.length - 1);
          laneList += "<option>" + id + "</option>";
        }
      });
      //console.log(laneList)

      //this.promptDialogObj.destroy()
      if (laneList.length) {
        document.getElementById("promptDialog").innerHTML = "";
        document.getElementById("promptDialog").style.display = "block";
        this.promptDialogObj = new Dialog({
          header: "Select Lane",
          visible: false,
          showCloseIcon: false,
          closeOnEscape: false,
          content:
            '<div class="dialogContent"><select id="getSelection">' +
            laneList +
            "</select></div>",
          buttons: [
            {
              click: this.switchLane,
              buttonModel: { content: "Select", isPrimary: true },
            },
            {
              click: this.close,
              buttonModel: { content: "Cancel" },
            },
          ],
          width: "330px",
          target: document.getElementById("target"),
          animationSettings: { effect: "None" },
          //open: dialogOpen, close: dialogClose
        });

        this.promptDialogObj.appendTo("#promptDialog");
        this.promptDialogObj.show();
      }
      //this.promptDialogObj.hide();
      //this.diagramInstance!.addChild(this.selectedLane,node)
    }
  }
  async switchLane() {
    let selection = document.getElementById("getSelection").value;
    if (selection) {
      let laneList = [];
      this.diagramInstance?.nodes.forEach((element) => {
        if (
          element.isLane &&
          element.parentId === "swimlane" &&
          element.properties.id.toLowerCase().indexOf("0_header") === -1 &&
          element.properties.id != this.selectedLane.id &&
          element.properties.id != "swimlaneflowLane0" &&
          element.properties.id != "swimlanestartLane0"
        )
          laneList.push(element);
      });

      let nodes = [];
      this.selectedLane.children.forEach((nodeId) => {
        nodes.push(this.diagramInstance?.getNodeObject(nodeId));
      });

      //var id = laneList[selection-1].id.replaceAll("swimlane", "")
      //id = id.substring(0, id.length-1)
      // nodes.forEach(node => {
      //   console.log(node)

      //   this.diagramInstance?.addNodeToLane(nodes.pop(),'swimlane',id);
      // });
      while (nodes.length) {
        try {
          this.diagramInstance?.addNodeToLane(
            nodes.pop(),
            "swimlane",
            selection
          );
        } catch (error) {}
      }
      //this.diagramInstance?.refreshDiagramLayer()
      this.onDelete();
      this.diagramInstance!.nodes[1].offsetY =
        this.diagramInstance?.nodes[1].offsetY - 101;
      this.diagramInstance?.refreshDiagramLayer();
      this.getLanes();
    }
    this.close();
    this.diagramInstance?.clearSelection();
  }

  close() {
    document.getElementById("promptDialog").innerHTML = "";
    document.getElementById("promptDialog").style.display = "none";
  }

  selectionChange(args: ISelectionChangeEventArgs) {
    if (args.newValue.length) {
      if (args.newValue[0].properties.id == "swimlane") {
        this.diagramInstance?.clearSelection();
      } else if (
        args.newValue[0] &&
        (args.newValue[0] as SwimLaneModel).isLane
      ) {
        this.diagramInstance.selectedItems.userHandles[0].visible = false;
        this.diagramInstance.selectedItems.userHandles[1].visible = false;
        this.diagramInstance.selectedItems.userHandles[2].visible = false;
        this.diagramInstance.selectedItems.userHandles[3].visible = false;

        if (
          args.newValue[0].id === "swimlane2stepLane0" ||
          args.newValue[0].id === "swimlaneflowLane0" ||
          args.newValue[0].id === "swimlanestartLane0" ||
          args.newValue[0].id?.includes("0_header")
        ) {
          this.diagramInstance.selectedItems.userHandles[4].visible = false;
          this.diagramInstance.selectedItems.userHandles[5].visible = false;
          this.selectedLane = [];
        } else {
          this.diagramInstance.selectedItems.userHandles[4].visible = true;
          this.diagramInstance.selectedItems.userHandles[5].visible = true;
          this.selectedLane = args.newValue[0].properties;
        }
      } else {
        this.diagramInstance.selectedItems.userHandles[0].visible = true;
        this.diagramInstance.selectedItems.userHandles[1].visible = true;
        this.diagramInstance.selectedItems.userHandles[2].visible = true;
        this.diagramInstance.selectedItems.userHandles[3].visible = true;
        this.diagramInstance.selectedItems.userHandles[4].visible = false;
        this.diagramInstance.selectedItems.userHandles[5].visible = false;
        if (args.newValue[0].properties.id === "START") {
          this.diagramInstance.selectedItems.userHandles[0].visible = false;
          this.diagramInstance.selectedItems.userHandles[1].visible = false;
        }
      }
    }
    this.close();
    //console.log(args.newValue[0].constructor.name)
  }

  AddStepNode: NodeModel = {
    // Position of the node
    id: "stepBtn",
    // Size of the node
    width: 110,
    height: 30,
    style: {
      fill: "#6BA5D7",
      strokeColor: "white",
    },
    //sets the type of the shape as HTML
    shape: {
      type: "HTML",
      content:
        '<div style="height:100%;width:100%;"><button value="Add Node" class="addNode" type="button" > Add Node</button></div>',
    },
  };

  AddFlowNode: NodeModel = {
    // Position of the node
    id: "flowBtn",
    // Size of the node
    width: 110,
    height: 30,
    style: {
      fill: "#6BA5D7",
      strokeColor: "white",
    },
    //sets the type of the shape as HTML
    shape: {
      type: "HTML",
      content:
        '<div style="height:100%;width:100%;"><select class="addRole" > <option value="" disabled selected hidden>Add Role</option></select></div>',
    },
    constraints: NodeConstraints.None,
  };

  connector: ConnectorModel[] = [];

  //port: any[] = [];

  port: PointPortModel[] = [
    {
      id: "Port1",
      offset: { x: 0, y: 0.5 },
      visibility: PortVisibility.Connect | PortVisibility.Hover,
      constraints: PortConstraints.Default | PortConstraints.Draw,
    },
    {
      id: "Port2",
      offset: { x: 0.5, y: 0 },
      visibility: PortVisibility.Connect | PortVisibility.Hover,
      constraints: PortConstraints.Default | PortConstraints.Draw,
    },
    {
      id: "Port3",
      offset: { x: 1, y: 0.5 },
      visibility: PortVisibility.Connect | PortVisibility.Hover,
      constraints: PortConstraints.Default | PortConstraints.Draw,
    },
    {
      id: "Port4",
      offset: { x: 0.5, y: 1 },
      visibility: PortVisibility.Connect | PortVisibility.Hover,
      constraints: PortConstraints.Default | PortConstraints.Draw,
    },
  ];

  get currentWorkflow() {
    return WorkflowModule.ActiveWorkflow;
  }

  get currentWorkflowStatus() {
    return this.currentWorkflow?.flowSteps;
  }

  get Status() {
    if (this.currentWorkflowStatus)
      return this._status.filter(
        (c) =>
          (
            this.currentWorkflowStatus?.map((c) => c.systemName) as string[]
          ).indexOf(c.systemName) < 0
      );
    else return [];
  }

  get Assignee() {
    return this.asigneeAuth;
  }

  mounted() {
    WorkflowModule.getActiveWorkFlow(this.$route.params?.id).then((result) => {
      console.log(result);
      this.loadEntity();
      this.loadAuthorization();
    });

    let diagramObj: any = document.getElementById("diagram");

    this.diagramInstance = diagramObj.ej2_instances[0];
    this.constraints =
      DiagramConstraints.Default & ~DiagramConstraints.PageEditable;

    window.dispatchEvent(new Event("resize"));
  }

  beforeDestroy() {
    this.diagramInstance?.destroy();
    WorkflowModule.setActiveWorkFlowNull();
  }

  loadEntity() {
    if (this.currentWorkflow)
      EntitiesModule.getEntity(this.currentWorkflow.entityId as string).then(
        (entity) => {
          if (entity) {
            console.log(entity);
            this._status = entity.status;
            EntitiesModule.setCurrentEntity(entity);
          }
        }
      );
  }

  loadAuthorization() {
    if (this.currentWorkflow)
      AuthorizationModule.getAuth(
        this.currentWorkflow.authorizationTreeId as string
      ).then((auth: AuthorizationTree) => {
        auth.root.children[0].children.forEach((c) => {
          this.getChild(c);
        });
        console.log(this.asigneeAuth);
      });
  }

  getChild(auth: AuthorizationNode) {
    console.log(auth);
    this.asigneeAuth.push(auth);

    if (auth.children && auth.children.length > 0) {
      auth.children.forEach((child) => {
        this.getChild(child);
      });
    }
  }

  getLanes() {
    document.getElementsByClassName("addRole")[1].innerHTML =
      '<option value="" disabled selected hidden>Add Role</option>';
    this.Assignee.forEach((role) => {
      var isRole = false;
      this.diagramInstance?.nodes.forEach((node) => {
        //console.log(node.properties.id,node.isLane)
        if (node.isLane) {
          console.log(node.properties.id);
          var id = node.properties.id.replaceAll("swimlane", "");
          id = id.substring(0, id.length - 1);
          if (id == role.systemName) isRole = true; //console.log(node.properties.id,role.systemName)
        }
      });
      if (!isRole)
        document.getElementsByClassName("addRole")[1].innerHTML +=
          '<option value="' +
          role.systemName +
          '">' +
          role.displayName +
          "</option>";
    });
    //document.getElementsByClassName("addRole")[1].innerHTML = laneOptions
    //return laneOptions
  }
  addClassEvent() {
    const flowBt = document.querySelectorAll(".addfNode");
    flowBt.forEach((el) =>
      el.addEventListener("click", (event) => {
        this.openDailog = "workstep";
        this.showDialog = true;
      })
    );
  }

  addEvent() {
    document.getElementsByClassName("addNode")[1].onclick = () => {
      this.diagramInstance?.clearSelection();
      if (this.sideStepLaneId.length) {
        this.openDailog = "sidestep";
        this.isSideStep = true;
        this.showDialog = true;
        /*
        let random = Math.random() * (500 - 1) + 1;
        this.sideStepNode = this.sideStepNode + 260;
        let node = {
          id: "n" + random,
          annotations: [
            {
              content: "n" + random,
              style: { fontSize: 11 },
            },
          ],
          addInfo: { button: true },
          margin: {
            left: this.sideStepNode,
            top: 30,
          },
          height: 40,
          width: 100,
          ports: this.port,
          IsChildNode: true,
        } as NodeModel;
        this.diagramInstance?.addNodeToLane(
          node,
          "swimlane2",
          this.sideStepLaneId
        );
        */
      }
    };
    document.getElementsByClassName("addRole")[1].onchange = () => {
      //console.log(document.getElementsByClassName("addRole")[1].value)
      if (document.getElementsByClassName("addRole")[1].value) {
        this.onAddRole();
        this.diagramInstance?.clearSelection();
      }
    };
    this.getLanes();
  }

  get Lanes() {
    const out: any[] = [];

    this.currentWorkflow?.flowSteps?.forEach((step) => {
      if (
        step.assigneeAuthorizationNodeSystemName &&
        out.map((c) => c.id).indexOf(step.assigneeAuthorizationNodeSystemName) <
          0
      ) {
        this.roles.push(step.assigneeAuthorizationNodeSystemName);
        const obj = {
          id: step.assigneeAuthorizationNodeSystemName,
          header: {
            annotation: { content: step.assigneeAuthorizationNodeSystemName },
            width: 50,
            style: { fontSize: 11 },
          },
          style: { fill: "#0745ff17" },
          height: 150,
          children: [],
          canMove: false,
          constraints: NodeConstraints.Select,
        } as any;
        out.push(obj);
        this.lanesCounter = this.lanesCounter + 150;
      } else if (step.assigneeAuthorizationNodeSystemName == null) {
        const obj = {
          header: {
            annotation: { content: "" },
            width: 50,
            style: { fontSize: 11 },
          },
          style: { fill: "#0745ff17" },
          height: 100,
          children: [],
          canMove: false,
        } as any;
        out.push(obj);
        this.lanesCounter = this.lanesCounter + 100;
      }
    });

    if (out.length) {
      let obj = {
        id: "flowLane",
        header: {
          annotation: { content: "" },
          width: 50,
          style: { fontSize: 11 },
        },
        height: 50,
        children: [this.AddFlowNode],
        canMove: false,
      } as any;
      out.push(obj);
    }

    const maxWidth = this.setChildNodes(out);
    return {
      Lane: out,
      MaxWidth: maxWidth + 200,
    };
  }

  setChildNodes(lanes: any[]) {
    let lastLeftMargin = 0;
    let idx = 0;
    const conn: ConnectorModel[] = [];
    this.currentWorkflow?.flowSteps?.forEach((step) => {
      var lane = lanes.find(
        (c) => c.id == step.assigneeAuthorizationNodeSystemName
      );
      if (!lane) return;
      if (!lane.children) lane.children = [];

      lane.children.push({
        id: step.systemName,
        annotations: [
          {
            content: step.displayName,
            style: { fontSize: 11 },
          },
        ],
        addInfo: { button: true, name: step.displayName },
        margin: {
          left: (lastLeftMargin = idx * 200 + 60),
          top: 30,
        },
        height: 40,
        width: 100,
        ports: this.port,
        constraints:
          step.displayName === "Start"
            ? NodeConstraints.Default &
              ~NodeConstraints.Drag &
              ~NodeConstraints.Resize
            : NodeConstraints.Default,
        IsChildNode: true,
      });

      if (!lane.id) lane.id = "startLane";

      step.transitions?.forEach((transition) => {
        conn.push({
          id: transition.button.displayName,
          // zIndex: 3,
          style: {
            strokeColor: "#6BA5D7",
            fill: "#6BA5D7",
            strokeWidth: 2,
          },
          //sourcePortID: 'Port4',
          //targetPortID: 'Port1',
          addInfo: { showInGraph: transition.showInGraph },
          sourceID: transition.sourceStep,
          targetID: transition.destinationStep,
          type: "Orthogonal",
          visible: transition.showInGraph,
        });
      });

      idx++;
    }, this.loadConnector(conn, false));

    return lastLeftMargin;
  }

  loadConnector(conn: ConnectorModel[], IssideStep: boolean) {
    setTimeout(() => {
      //console.log(conn)
      conn?.forEach((con) => {
        //this.onEditSwitch()
        this.diagramInstance?.addConnector(con);
        this.diagramInstance?.refreshDiagramLayer();
        //this.onDisableEdit()
      });
      if (IssideStep) {
        this.addEvent();
        this.getNodeButton();
      }
    }, 2000);
  }

  setSlideStepChildNodes(lanes: any[]) {
    let lastLeftMargin = 0;
    let idx = 0;
    const conn: ConnectorModel[] = [];
    this.currentWorkflow?.sideSteps?.forEach((step) => {
      var lane = lanes.find((c) => c.id == step.systemName);
      if (!lane) return;
      if (!lane.children) lane.children = [];

      this.sideStepNode = idx * 200 + 60;

      lane.children.push({
        id: step.systemName,
        annotations: [
          {
            content: step.displayName,
            style: { fontSize: 11 },
          },
        ],
        addInfo: { button: true, name: step.displayName },
        margin: {
          left: (lastLeftMargin = idx * 200 + 60),
          top: 30,
        },
        height: 40,
        width: 100,
        ports: this.port,
        IsChildNode: true,
        constraints:
          NodeConstraints.Default &
          ~NodeConstraints.Drag &
          ~NodeConstraints.Resize,
      });

      step.transitions?.forEach((transition) => {
        conn.push({
          id: transition.button.displayName,
          // zIndex: 3,
          style: {
            strokeColor: "#6BA5D7",
            fill: "#6BA5D7",
            strokeWidth: 2,
          },
          //sourcePortID: 'Port4',
          //targetPortID: 'Port1',
          addInfo: { showInGraph: transition.showInGraph },
          sourceID: transition.sourceStep,
          targetID: transition.destinationStep,
          type: "Orthogonal",
          visible: transition.showInGraph,
        });
      });

      idx++;
    }, this.loadConnector(conn, true));

    return lastLeftMargin;
  }

  get flowSteps() {
    return [
      {
        id: "swimlane",
        shape: {
          type: "SwimLane",
          orientation: "Horizontal",
          header: {
            annotation: { content: " Flowsteps " },
            height: 50,
          },
          lanes: this.Lanes.Lane,
        },
        offsetX: this.Lanes.MaxWidth / 2 + 50,
        offsetY: this.lanesCounter / 2 - 150,
        height: 100,
        width: this.Lanes.MaxWidth,
      },
    ];
  }

  get nodes() {
    return [this.flowSteps[0], this.sideSteps[0]];
  }

  get connectors() {
    return this.connector;
  }

  get GetSideSteps() {
    const out: any[] = [];
    // console.log(this.currentWorkflow);

    this.currentWorkflow?.sideSteps?.forEach((step) => {
      if (
        step.assigneeAuthorizationNodeSystemName &&
        out.map((c) => c.id).indexOf(step.assigneeAuthorizationNodeSystemName) <
          0
      ) {
        if (this.sideStepLaneId.length == 0)
          this.sideStepLaneId = step.systemName;
        let obj = {
          id: step.systemName,
          header: {
            annotation: { content: "" },
            width: 50,
            style: { fontSize: 11 },
          },
          height: 100,
          children: [],
          canMove: false,
        } as any;
        out.push(obj);
      }
    });
    if (out.length) {
      let obj = {
        id: "stepLane",
        header: {
          annotation: { content: "" },
          width: 50,
          style: { fontSize: 11 },
        },
        height: 50,
        children: [this.AddStepNode],
        canMove: false,
        constraints: NodeConstraints.None,
      } as any;
      out.push(obj);
    }
    const maxWidth = this.setSlideStepChildNodes(out);

    return {
      Lane: out,
      MaxWidth: maxWidth + 200,
    };
  }

  get sideSteps() {
    return [
      {
        id: "swimlane2",
        shape: {
          type: "SwimLane",
          orientation: "Horizontal",
          header: {
            annotation: { content: "Slide Steps" },
            height: 50,
          },
          lanes: this.GetSideSteps.Lane,
          phaseSize: 20,
        },
        canMove: false,
        constraints: 0,
        offsetX: 250,
        offsetY: this.lanesCounter - 150,
        height: 100,
        width: 400,
      },
    ];
  }

  onZoomOut() {
    this.onDisableEdit();
    this.diagramInstance?.clearSelection();
    const zoomOptions = {
      type: "ZoomOut",
      zoomFactor: 0.5,
    } as ZoomOptions;
    // zoomout the diagram
    this.diagramInstance?.zoomTo(zoomOptions);
  }

  onZoomIn() {
    this.onDisableEdit();
    this.diagramInstance?.clearSelection();
    const zoomOptions = {
      type: "ZoomIn",
      zoomFactor: 0.5,
    } as ZoomOptions;
    this.diagramInstance?.zoomTo(zoomOptions);
  }

  onEditSwitch() {
    this.constraints =
      DiagramConstraints.Default & DiagramConstraints.PageEditable;
  }

  onDisableEdit() {
    this.constraints =
      DiagramConstraints.Default & ~DiagramConstraints.PageEditable;
  }

  onAddTransition() {
    this.onEditSwitch();
    this.diagramInstance?.nodes.forEach((node) => {
      if ((node as any).IsChildNode) {
        this.diagramInstance?.addPorts(node, this.ports);
      }
    });
    //this.onDisableEdit()
  }

  onAddRole() {
    this.onDisableEdit();
    let counter = -1;
    this.diagramInstance?.nodes.forEach((element) => {
      if (
        element.isLane &&
        element.parentId === "swimlane" &&
        element.properties.id.toLowerCase().indexOf("0_header") === -1
      )
        counter++;
    });
    const laneID = document.getElementsByClassName("addRole")[1].value;
    let random = Math.floor(Math.random() * 500) + 1;
    const AddfNode = {
      // Position of the node
      id: "flowBT" + random,
      // Size of the node
      width: 110,
      height: 30,
      style: {
        fill: "#6BA5D7",
        strokeColor: "white",
      },
      //sets the type of the shape as HTML
      shape: {
        type: "HTML",
        content:
          '<div style="height:100%;width:100%;"><button value="Add Node" class="addfNode" type="button" > Add Node</button></div>',
      },
    } as NodeModel;
    let lanex: LaneModel[] = [
      {
        id: laneID,
        header: {
          annotation: { content: laneID },
          width: 50,
          style: { fontSize: 11 },
        },
        style: { fill: "#0745ff17" },
        height: 150,
        canMove: false,
      },
    ];
    this.diagramInstance?.addLanes(
      this.diagramInstance?.nodes[0],
      lanex,
      counter
    );
    this.diagramInstance?.addNodeToLane(AddfNode, "swimlane", laneID);
    this.diagramInstance!.nodes[1].offsetY =
      this.diagramInstance?.nodes[1].offsetY + 150;
    this.diagramInstance?.refreshDiagramLayer();
    this.addClassEvent();
    this.getLanes();
  }

  onDelete() {
    this.diagramInstance?.remove(
      this.diagramInstance?.selectedObject.actualObject
    );
    this.diagramInstance?.refreshDiagramLayer();
  }

  onSave() {
    var json = this.currentWorkflow;
    json?.flowSteps?.forEach((step, index) => {
      if (this.diagramInstance?.getNodeObject(step.systemName).id == null)
        json?.flowSteps?.splice(index, 1);
    });
    console.log(json);
  }

  createFlow(data) {
    this.diagramInstance?.nodes.forEach((node) => {
      if (node.isLane && node.properties.id == "swimlane" + data[1] + "0") {
        console.log(node.properties.id);
      }
    });
    if (data.length) {
      const statusObj = this.Status.find(
        (status) => status.systemName === data[0]
      );
      var laneID = "swimlane" + data[1] + "0";
      console.log(laneID);
      if (statusObj) {
        let node = {
          id: statusObj.systemName,
          annotations: [
            {
              content: statusObj.displayName,
              style: { fontSize: 11 },
            },
          ],
          addInfo: { button: true, name: statusObj.displayName },
          margin: {
            left: 260,
            top: 30,
          },
          height: 40,
          width: 100,
          ports: this.port,
          IsChildNode: true,
        } as NodeModel;
        this.diagramInstance?.addNodeToLane(node, "swimlane", data[1]);
        this.diagramInstance?.refreshDiagramLayer();
      }
    }
    this.showDialog = false;
  }
  createStep(data) {
    if (data.length) {
      const statusObj = this.Status.find(
        (status) => status.systemName === data[0]
      );
      if (statusObj) {
        console.log("sideSteplane", this.sideStepLaneId);
        this.sideStepNode = this.sideStepNode + 260;
        let node = {
          id: statusObj.systemName,
          annotations: [
            {
              content: statusObj.displayName,
              style: { fontSize: 11 },
            },
          ],
          addInfo: { button: true },
          margin: {
            left: this.sideStepNode,
            top: 30,
          },
          height: 40,
          width: 100,
          ports: this.port,
          IsChildNode: true,
        } as NodeModel;
        this.diagramInstance?.addNodeToLane(
          node,
          "swimlane2",
          this.sideStepLaneId
        );
        this.diagramInstance!.nodes[1].offsetX =
          this.diagramInstance?.nodes[1].width / 2 + 50;
        this.diagramInstance?.refreshDiagramLayer();
      }
    }
    this.isSideStep = false;
    this.showDialog = false;
  }
  
onCenter() {
    this.onDisableEdit();
    this.diagramInstance?.clearSelection();
    //  var nodeBounds = new Rect(-300, 50, 300, 180);
    // this.diagramInstance?.bringToCenter(nodeBounds);

    this.diagramInstance?.fitToPage({
      mode: "Page",
      region: "Content",
      margin: {
        bottom: 100,
        top: 100,
      },
      canZoomIn: true,
    });
  }

  onFixed() {
    console.log(JSON.stringify(this.currentWorkflow));
    this.onDisableEdit();
    this.diagramInstance?.clearSelection();
    this.diagramInstance?.fitToPage({
      mode: "Page",
      region: "Content",
      canZoomIn: true,
    });

  }
}
</script>
<style lang="scss" scoped>
@import "../../../../node_modules/@syncfusion/ej2-vue-diagrams/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";

.el-container {
  min-height: calc(100vh - 50px);
  height: calc(100vh - 50px);
}

.el-card__header {
  padding: 5px 20px;
}

.el-card__body {
  padding: 5px !important;
}

.editor {
  min-height: calc(100vh - 150px);
}

.inverseIcon {
  transform: scaleX(-1);
}

.el-button + .el-button {
  margin-left: 5px;
}

.el-button {
  font-size: 20px;
}

.btn-select {
  font-size: 15px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  margin-left: 5px;
  font-size: 15px;
  padding-right: 50px;
}

.item {
  font-size: 16px;
}

.dropdown-popup {
  margin-left: 25px;
  margin-top: 0px;
}

.tansition-trash {
  float: right;
  margin: 5px 20px 10px 0px;
  cursor: pointer;
}

.table-column {
  padding: 5px;
}
</style>