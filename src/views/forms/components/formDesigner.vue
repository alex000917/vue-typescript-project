<template>
  <el-container
    class="elcontainer"
    size="mini"
  >

    <propertyselector :entity="formEntity" :formData="formData" :formProperties="formProperties"/>
    <!-- <el-aside class="elaside">
      <el-collapse accordion>
        <el-collapse-item
          title="Properties"
          name="1"
        >
          
        </el-collapse-item>
        <el-collapse-item
          title="Tables"
          name="2"
        >
        <tableselector />
        </el-collapse-item>

        <el-collapse-item
          title="Development"
          name="4"
        >
        <developmentselector />
        </el-collapse-item>
      </el-collapse>
    </el-aside> -->

    <el-main

      class="elmain"
    >
      <div>form designer: {{ formId }}</div>

      <!-- <miniTable></miniTable> -->
      <!-- <miniTree :treeData="entities.children"></miniTree> -->
      <el-row>
        <el-col>
          <el-form style="float:right;position:relative">
            <el-dropdown>
              <el-button
                :plain="true"
                @command="onFormAddCommand"
              >
                <i class="el-icon-plus" />
              </el-button>
              <el-dropdown-menu
                slot="dropdown"
              >
                <el-dropdown-item>
                  <el-button
                      class="formAddDropDownButtons"
                      size="mini"
                      type="text"
                      icon="el-icon-plus"
                      title="Add New Tab"
                      @click="onAddTab"
                  >
                    Tab
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button
                      class="formAddDropDownButtons"
                      size="mini"
                      type="text"
                      icon="el-icon-plus"
                      title="Add New Section"
                      @click="onAddSection"
                  >
                    Section
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button
                      class="formAddDropDownButtons"
                      size="mini"
                      type="text"
                      icon="el-icon-plus"
                      title="Add New Report"
                      @click="onAddReport"
                  >
                    Report
                  </el-button>
                </el-dropdown-item>
                <el-divider />
                <!--Show "Workflow Graph" button only if the form doesn't already have a Workflow Graph -->
                <el-dropdown-item v-if="true">Workflow Graph</el-dropdown-item>
                <el-dropdown-item>Information Section</el-dropdown-item>
                <el-divider />
                <el-dropdown-item>Integration Tab</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              :plain="true"
              icon="el-icon-setting"
              title="Form settings"
              @click="openFormGeneralSettings"
            />
            <el-button
              :plain="true"
              icon="el-icon-delete"
              title="Delete form"
              @click.prevent="onDeleteForm"
            />
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-tabs
            v-if="formData"
            v-model="activeTab"
            type="border-card"
            editable

            @edit="handleTabsEdit"
          >
            <el-tab-pane
              v-for="(item,index) in formData.tabs"
              :key="item.displayName"
              :label="item.displayName"
              :name="index.toString()"
            >
            <draggable group="properties" v-model="item.controlsContainers" :move="checkMove" :end="onDrop" :key="item.displayName" @change="logChange" :add="onAddProp"> 
              <el-row class="property-button property-box">
                <span>Drop table properties here</span>
              </el-row>
            </draggable>
              <el-card
                v-for="row in item.controlsContainers"
                :key="row.displayName"
                shadow="always"
                class="tab-card"
              >
                <div
                  class="clearfix card-header bg-purple-light"
                  v-if="row.displayName == 'Workflow Graph'"
                >
                  <el-popover
                    placement="right"
                    trigger="hover"
                  >
                    <el-form>
                      <el-button
                        :plain="true"
                        icon="el-icon-top"
                        title="Move Up "
                        @click="moveSectionUp(row)"
                      />
                      <el-button
                        :plain="true"
                        icon="el-icon-bottom"
                        title="Move Down "
                        @click="moveSectionDown(row)"
                      />
                      <el-button
                        :plain="true"
                        icon="el-icon-setting"
                        title="Settings "
                        @click="openSettings=true"
                      />
                      <el-button
                        :plain="true"
                        icon="el-icon-s-promotion"
                        title="Move "
                      />
                      <el-button
                        :plain="true"
                        icon="el-icon-delete"
                        title="delete"
                        @click="onItemDelete(row)"
                      />
                    </el-form>
                    <el-button
                      slot="reference"
                      type="text"
                    >
                    <span>
                    
                    <h2> 
                      {{
                        row.displayName
                      }}
                    </h2>
                     <h4>
                       Let users see the workflow steps and the step the entity is currently at.
                     </h4>
                    </span>

                    </el-button>
                  </el-popover>
                </div>
                <div slot="header"
                  class="clearfix card-header" v-else>
                  <el-popover
                    placement="right"
                    trigger="hover"
                  >
                    <el-form>
                      <el-button
                        :plain="true"
                        icon="el-icon-top"
                        title="Move Up "
                        @click="moveSectionUp(row)"
                      />
                      <el-button
                        :plain="true"
                        icon="el-icon-bottom"
                        title="Move Down "
                        @click="moveSectionDown(row)"
                      />
                      <el-button
                        :plain="true"
                        icon="el-icon-setting"
                        title="Settings "
                        @click="openSettings=true"
                      />
                      <el-button
                        :plain="true"
                        icon="el-icon-s-promotion"
                        title="Move "
                      />
                      <el-button
                        :plain="true"
                        icon="el-icon-delete"
                        title="delete"
                        @click="onItemDelete(row)"
                      />
                    </el-form>
                    <el-button
                      slot="reference"
                      type="text"
                    >

                    <span class="card-header" >
                      <h2>
                      {{
                        row.displayName
                      }}
                      </h2>
                    </span>
                      
                    </el-button>
                  </el-popover>
                </div>
                <el-row v-bind:id="row.systemName" v-if="row.displayName != 'Workflow Graph'">
                  
                  <el-row >
                 
                    <!-- v-bind:class="['box-height-' + property.colspan]" -->
                    <template v-if="row.controlsInARow != 0">
                   <draggable group="properties" v-model="row.controls" :move="checkMove" :end="onDrop" :key="row.controls.displayName" @change="logChange" :add="onAddProp"> 
                     <el-col v-for="property in row.controls"
                  :key="property.systemName" :span="24/row.controlsInARow * property.colspan">
                  
                  
                      <div v-if="row.controlsInARow != 0" class="grid-content ">
                        <!-- <draggable group="properties"> -->
                        <div @drop="checkDrop" @dragenter="checkDragEnter" @dragend="checkDragEnd">
                        <div class="property-button" v-bind:id="property.systemName">
                          <div v-if="property.myspType == 'TextAreaControl'" class="box-height-2">
                            {{property.displayName}}
                            <template v-if="property.mandatoryProperty">
                              <span v-if="property.mandatoryProperty.mandatory" class="mandatory">*</span></template>
                          
                          </div>
                            <div v-else>
                              {{property.displayName}}
                              <template v-if="property.mandatoryProperty"><span v-if="property.mandatoryProperty.mandatory" class="mandatory">*</span>
                            </template>
                          </div> 
                        </div>
                        </div>
                        <!-- </draggable> -->
                      </div>
                      
                      
                      <div class="grid-content" v-else>
                        <!-- <draggable group="table"> -->
                          <div @drop="checkDrop" @dragenter="checkDragEnter" @dragend="checkDragEnd">
                        <el-card class="box-card" v-bind:id="property.systemName">
                          <div slot="header" class="clearfix table-property-header">
                            <span>{{property.displayName}}</span>
                            <template v-if="property.mandatoryProperty"><span v-if="property.mandatoryProperty.mandatory" class="mandatory">*</span>
                            </template>
                            </div>
                            <div></div>
                        </el-card>
                          </div>
                        <!-- </draggable> -->
                      </div>
                     
                  </el-col>
                   </draggable>
                     </template>
                     <template v-else>
                       <draggable group="table" v-model="row.controls" :move="checkMove" :end="onDrop" :key="row.controls.displayName" @change="logChange" :add="onAddProp">
                         <el-col v-for="property in row.controls"
                  :key="property.systemName" :span="24/row.controlsInARow * property.colspan">
                  
                  
                      <div v-if="row.controlsInARow != 0" class="grid-content ">
                        <!-- <draggable group="properties"> -->
                          <div @drop="checkDrop" @dragenter="checkDragEnter" @dragend="checkDragEnd">
                        <div class="property-button" v-bind:id="property.systemName">
                          <div v-if="property.myspType == 'TextAreaControl'" class="box-height-2">
                            {{property.displayName}}
                            <template v-if="property.mandatoryProperty">
                              <span v-if="property.mandatoryProperty.mandatory" class="mandatory">*</span></template>
                          
                          </div>
                            <div v-else>
                              {{property.displayName}}
                              <template v-if="property.mandatoryProperty"><span v-if="property.mandatoryProperty.mandatory" class="mandatory">*</span>
                            </template>
                          </div> 
                        </div>
                        </div>
                        <!-- </draggable> -->
                      </div>
                      
                      
                      <div class="grid-content" v-else>
                        <!-- <draggable group="table"> -->
                          <div @drop="checkDrop" @dragenter="checkDragEnter" @dragend="checkDragEnd">
                        <el-card class="box-card" v-bind:id="property.systemName">
                          <div slot="header" class="clearfix table-property-header">
                            <span>{{property.displayName}}</span>
                            <template v-if="property.mandatoryProperty"><span v-if="property.mandatoryProperty.mandatory" class="mandatory">*</span>
                            </template>
                            </div>
                            <div></div>
                        </el-card>
                          </div>
                        <!-- </draggable> -->
                      </div>
                     
                  </el-col>
                       </draggable>
                      </template>
                  </el-row>
                   
                  <template v-if="row.entityId != null">
                  <draggable group="table" v-model="row.controls">
                    <el-row class="property-button property-box">
                      <span>Drop table properties here</span>
                    </el-row>
                  </draggable>
                  </template>
                  <template v-else>
                    <draggable group="properties"  v-model="row.controls">
                    <el-row class="property-button property-box">
                      <span>Drop form properties here</span>
                    </el-row>
                    </draggable>
                  </template>
                </el-row>
                
              </el-card>
            </el-tab-pane>
          </el-tabs>

          <el-dialog
            :title="formData.displayName + ' Settings'"
            :visible.sync="openSettings"
            class="formDesignerDialogWindow"
          >
            <el-tabs
              type="border-card"
              tab-position="left"
              style="height: 100%;"
            >
              <el-tab-pane label="Display">
                
                <el-row class="formSettingsTabTitle">
                  <i class="el-icon-monitor"></i> Display name and description
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  Set this form's display name and description.
                </el-row>

                <el-form style="border:1px solid lightgrey; padding: 0 15px">
                  <el-row class="elRow">
                    <el-col>
                      <el-divider content-position="left">
                        English
                      </el-divider>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="4" class="elColDisplayName">
                      Display name
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        prop="displayName"
                        class="elDisplayNameInput"
                      >
                        <el-input                    
                          :value="displayNameEn" 
                          @input="updateEnDisplayName"
                          placeholder="Type English display name here"
                          style="width: 100%;"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="4" class="elColDisplayName">
                      Description
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        style="padding: 2px; margin-bottom: 2px"
                      >
                        <el-input
                          v-model="form.description"
                          type="textarea"
                          :autosize="{maxRows: 2}"
                          class="description"
                          placeholder="Type description here"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
              
                  <el-row class="elRow">
                    <el-col>
                      <HebrewInput
                        ref="heInput"
                        :translation="form.heLang"
                      />
                    </el-col>
                  </el-row>
                </el-form>
              </el-tab-pane>

              <el-tab-pane label="Header">  
                <el-row class="formSettingsTabTitle">
                  <i class="el-icon-tickets"></i> Header
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  Edit the form's header:
                </el-row>

                <el-form style="border:1px solid lightgrey; padding: 0 15px 20px 15px">
                  <el-row class="elRow">
                    <el-col>
                      <el-divider content-position="left">
                        English
                      </el-divider>
                    </el-col>
                  </el-row>
              <!--    <div class="propertiesDiv"></div>
                   <el-row>
                    <el-col :span="4.5" class="insertButton">
                        <el-button type="info" plain>Insert Property...</el-button>
                    </el-col>
                    <el-col :span="7" class="insertButton">
                        <el-button type="info" plain>Insert Application Preference...</el-button>
                    </el-col>
                  </el-row> -->
                  <el-row style="margin-top: 20px">
                    <el-col>
                      <!-- <tags-view :items="entity.lookupDefaultNameFormat" /> -->
                      <InputTagsView
                    
                        :base-entity-id="formEntity.id"
                        :data="formEntity.lookupDefaultNameFormat"
                      />
                    </el-col>
                  </el-row>

                  <el-row class="elRow">
                    <el-col>
                      <el-divider content-position="left">
                        Hebrew
                      </el-divider>
                    </el-col>
                  </el-row>
                 <!--  <div class="propertiesDiv"></div>
                  <el-row>
                    <el-col :span="4.5" class="insertButton">
                        <el-button type="info" plain>Insert Property...</el-button>
                    </el-col>
                    <el-col :span="7" class="insertButton">
                        <el-button type="info" plain>Insert Application Preference...</el-button>
                    </el-col>
                  </el-row> -->
                  <el-row style="margin-top: 20px">
                    <el-col>
                      <!-- <tags-view :items="entity.lookupDefaultNameFormat" /> -->
                      <InputTagsView
                    
                        :base-entity-id="formEntity.id"
                        :data="formEntity.lookupDefaultNameFormat"
                      />
                    </el-col>
                  </el-row>
                </el-form>
              </el-tab-pane>

              <el-tab-pane label="Viewed By">
                <el-row class="formSettingsTabTitle">
                  <i class="el-icon-view"></i> Viewed By
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  Restrict viewing this form by adding conditions.
                </el-row>
                <el-row class="formSettingsTabDescription">
                  Use role group to check different conditions based on the role of the logged-in user.
                </el-row>
              <!--   <br>
                <FormConditions v-bind:conditionsDivHeight="true"/>   -->       
                <Conditions />     
              </el-tab-pane>

              <el-tab-pane label="Edited By">
                <el-row class="formSettingsTabTitle">
                  <i class="el-icon-edit"></i> Edited By
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  Restrict editing this form by adding conditions.
                </el-row>
                <el-row class="formSettingsTabDescription">
                  Use role group to check different conditions based on the role of the logged-in user.
                </el-row>
             <!--    <br>
                <FormConditions v-bind:conditionsDivHeight="true"/> -->
                <Conditions />
              </el-tab-pane>

              <el-tab-pane label="Notes">        
                <el-row class="formSettingsTabTitle">
                  <i class="el-icon-notebook-2"></i>  Notes
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  Notes:
                </el-row>
                <el-form>
                  <el-form-item
                    style="padding: 2px; margin-bottom: 2px;"
                  >
                    <el-input
                      :value="formData.notes"
                      @input="updateNotes"
                      type="textarea"
                      :autosize="{minRows: 14, maxRows: 14}"
                      class="description"
                      placeholder="Type your notes here"
                    />
                  </el-form-item>
                </el-form>
              </el-tab-pane>

              <el-tab-pane label="Advanced">
                <el-row class="formSettingsTabTitle">
                  <i class="el-icon-document-copy"></i> Advanced
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  This form is based on the entity: <b>{{ formEntity.displayName }}</b>
                </el-row>
                <el-row class="formSettingsTabDescription">
                  System name: <b>{{ formId }}</b>
                </el-row>
                <el-row class="formSettingsTabDescription">
                  Authorization tree: <b>{{ formData.authorizationTreeId }}</b>
                </el-row>
                <el-row class="advancedTabCheckbox">
                  <el-checkbox v-model="advancedHideCheckbox">Hide list button</el-checkbox>
                </el-row>
                <el-row>
                  <el-checkbox v-model="advancedExcludeCheckbox">Exclude form buttons</el-checkbox>
                </el-row>
              </el-tab-pane>

              <el-tab-pane label="XML Extensions">
                <el-row class="formSettingsTabTitle">
                  <i class="el-icon-arrow-left"></i><i class="el-icon-arrow-right"></i> XML Extensions
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  Use the following to add XML attributes and elements to the form XML definition file.
                </el-row>
                <br>
                <el-form>
                  <el-row class="formSettingsTabDescription">
                    Attributes:
                  </el-row>
                  <el-form-item
                      style="padding: 2px; margin-bottom: 2px;"
                  >
                    <el-input
                      :value="formData.attributes"
                      @input="updateXmlAttributes"
                      type="textarea"
                      :autosize="{minRows: 5, maxRows: 5}"
                      class="description"
                    />
                  </el-form-item>
                  <br>
                  <el-row class="formSettingsTabDescription">
                    Child Elements:
                  </el-row>
                  <el-form-item
                      style="padding: 2px; margin-bottom: 2px;"
                  >
                    <el-input
                      :value="formData.childrenXml"
                      @input="updateXmlChildren"
                      type="textarea"
                      :autosize="{minRows: 6, maxRows: 6}"
                      class="description"
                    />
                  </el-form-item>
                </el-form>
              </el-tab-pane>

              <el-tab-pane label="Action Items">
                <el-row class="formSettingsTabTitle">
                  <i class="el-icon-document-checked"></i> Action Items
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  Use the following conditions to control the level of CRUD for the Action Items.
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  <b>Create:</b> present the "Add New Action Item" section.
                  <Conditions v-bind:conditionsDivHeight="true"/>
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  <b>Edit:</b> enable "Mark Complete", present "Edit" button with "Edit" title and the Edit Action Item popup form should be "Editable".
                  <Conditions v-bind:conditionsDivHeight="true"/>
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  <b>Delete:</b> enable "Delete" action in the Edit Action Item popup form.
                  <Conditions v-bind:conditionsDivHeight="true"/>
                </el-row> 
              </el-tab-pane>

              <el-tab-pane label="Attachments">
                <el-row class="formSettingsTabTitle">
                  <i class="el-icon-paperclip"></i> Attachments
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  Use the following conditions to control the level of CRUD for the Attachments Items.
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  <b>Create:</b> present the "Drop files to attach" or "Browse" or "Paste URL" message and enable the "Drag and Drop" functionality.
                  <Conditions v-bind:conditionsDivHeight="true"/>
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  <b>Edit:</b> present the "Edit" button with the "Edit" title, and also the "Edit Attachment Description" popup form should be "Editable".
                  <Conditions v-bind:conditionsDivHeight="true"/>
                </el-row>
                <br>
                <el-row class="formSettingsTabDescription">
                  <b>Delete:</b> enable "Delete Attachment" button.
                  <Conditions v-bind:conditionsDivHeight="true"/>
                </el-row> 
              </el-tab-pane>

            </el-tabs>
            <span
              slot="footer"
              class="dialog-footer"
            >
              <el-button @click="openSettings = false">Cancel</el-button>
              <el-button
                type="primary"
                @click="openSettings = false"
              >Confirm</el-button>
            </span>
          </el-dialog>
        </el-col>
      </el-row>
    </el-main>

    <newTab
            v-if="showAddNewTabWindow"
            :show="showAddNewTabWindow"
            :entity="currentEntity"
            :on-ok="onTabOk"
            :on-cancel="onTabCancel"
    />
    <newSection
            v-if="showAddNewSectionWindow"
            :show="showAddNewSectionWindow"
            :entity="currentEntity"
            :on-ok="onSectionOk"
            :on-cancel="onSectionCancel"
    />
    <newReport
            v-if="showAddNewReportWindow"
            :show="showAddNewReportWindow"
            :entity="currentEntity"
            :on-ok="onReportOk"
            :on-cancel="onReportCancel"
    />

  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import miniTable from "@/components/Tables/miniTable.vue"
import miniTree from "@/components/Tables/miniTree.vue"
import propertyselector from "./propertyselector.vue"
import tableselector from "./tableselector.vue"
import developmentselector from "./developmentselector.vue"
import JsonEditor from "@/components/JsonEditor/index.vue"
import axios from "axios"
import { AppCacheModule } from "@/store/modules/appCache"
import { FormsModule } from "@/store/modules/FormsStore"
import { Loading, Message } from "element-ui"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import PropertyList from "@/views/entities/components/propertyList.vue"
import PropertySelectModel  from "@/components/PropertySelector/index.vue"
import { Entity } from "@/models/Entity"
import newTab from "./newTab.vue"
import newSection from "./newSection.vue"
import newReport from "./newReport.vue"
import FormConditions from "./formConditions.vue"
import { BaseProperty, Property } from "@/models/Properties"
import { ElForm } from "element-ui/types/form"
import HebrewInput from "@/components/LangInput/hebrewInput.vue"
import Draggable from "vuedraggable"
import { DataTypeFactory } from "@/models/Utils/DataTypeFactory";
import {
  BaseDataType,
  ChoiceDataType,
  EntityBasedDataType
} from "@/models/DataTypes"
import { LanguageTranslation } from "@/models/LanguageTranslation"
import { ChoiceOption } from "@/models/ChoiceOption" 
import {  Mutation} from "vuex-module-decorators"
import InputTagsView from "@/components/Tags/index.vue";
import Conditions from "@/components/Conditions/index.vue"

export class PropertyForm {
  displayName: null | string = null;
  displayNameEn: null | string = null;
  description: null | string = null;
  heLang = new LanguageTranslation("he", "", "");
  dataType:
    | BaseDataType
    | EntityBasedDataType
    | ChoiceDataType = new BaseDataType();

  options: ChoiceOption[] = [];
  selectedDataType = "2";
  periodPickerType = "2";
  useThousandSeparator = false;
  numberOfDecimalPlaces = 2;
  selectedNode: Node | null = null;
  selectedNodeId: string | null = null;
  lookupClassName: undefined | string = undefined;
  LookupProperty: BaseProperty | null = null;
  systemName: string | null = null;
  databaseColumnName: string | null = null;
  databaseKeyColumnName: string | null = null;
  rowFilter: string | null = null;
  orderBy: string | null = null;
  notes: string | null = null;
  xmlAttributes: string | null = null;
  xmlChildElements: string | null = null;
  childrenXml: string | null = null;
  attributes: string | null = null;
  reverse: {
    eng: LanguageTranslation
    he: LanguageTranslation
  } = {} as any;

  referenceColumn: string | null = null;
  referenceTable: string | null = null;
  reverseLookupSystemName: string | null = null;
}

@Component({
  name: "formDesigner",
  components: { miniTable, miniTree, propertyselector, JsonEditor, tableselector, developmentselector, 
                PropertySelectModel, PropertyList, newTab, newSection, newReport, HebrewInput, FormConditions,
                Conditions, InputTagsView, Draggable }
})
export default class extends Vue {

  @Prop({ required: false }) addTab!: any;
  @Prop({ required: false }) conditionsDivHeight!: boolean; 

  data() {
      return {
        advancedHideCheckbox: false,
        advancedExcludeCheckbox: false
      }; 
  }

  propertiesView = {
    properties: [],
    selectedProperty: null,
    serach: null
  };

  anyArray= [] as any
  tabsData = {
    editableTabsValue: "2",
    editableTabs: this.anyArray,
    tabIndex: 2
  };

  openSettings=false;
  displayNameEn=""
  displayNameHe=""
  activeTab="0"
  formId = this.$route.params.formid;
  form = new PropertyForm();

  // checkMove(evt: any){
  //   console.log(evt.draggedContext.element);
  //   console.log(evt)
  // }

  moveSectionUp(row: any){
    let isMoved = false;
    this.formData.tabs.forEach((tabs: { controlsContainers: any[] }) => {
      tabs.controlsContainers.forEach((section, index) => {
        for (var i: number = 0; i < tabs.controlsContainers.length; i++){
          let section = tabs.controlsContainers[i];
            if (section.systemName != null && row.systemName != null) {
              console.log("system name ", section.systemName)
              console.log("display name ", section.displayName)
              if ((section.systemName.trim().toLocaleLowerCase() == row.systemName.trim().toLocaleLowerCase()) && isMoved == false && i != 0) {
                let tempSection = tabs.controlsContainers[i-1]
                tabs.controlsContainers[i-1] = section;
                tabs.controlsContainers[i] = tempSection;
                isMoved = true;
                break;
              }
            }
            else if (row.displayName == 'Workflow Graph' && section.displayName == 'Workflow Graph' && i != 0) {
              let tempSection = tabs.controlsContainers[i-1]
              tabs.controlsContainers[i-1] = section;
              tabs.controlsContainers[i] = tempSection;
              isMoved = true;
              break;
            }
          if (isMoved) { break; }
        }
       
      });
    });
    this.$forceUpdate();
    var tooltips = document.getElementsByClassName('el-popover');
    for (let i = 0; i<tooltips.length; i++) { tooltips[i].style.display = 'none' }
  }

  @Mutation
  moveSectionDown(row: any){
    let isMoved = false;
    this.formData.tabs.forEach((tabs: { controlsContainers: any[] }) => {
      tabs.controlsContainers.forEach((section, index) => {
        for (var i: number = 0; i < tabs.controlsContainers.length; i++){
          if (isMoved) {
            break;
          }
          let section = tabs.controlsContainers[i];
          debugger;
            if (section.systemName != null && row.systemName != null) {
              debugger;
              console.log("system name ", section.systemName)
              console.log("display name ", section.displayName)
              if ((section.systemName.trim().toLocaleLowerCase() == row.systemName.trim().toLocaleLowerCase()) && isMoved == false && i != tabs.controlsContainers.length - 1) {
                let tempSection = tabs.controlsContainers[i+1]
                tabs.controlsContainers[i+1] = section;
                tabs.controlsContainers[i] = tempSection;
                isMoved = true;
                break;
              }
            }
            else if (row.displayName == 'Workflow Graph' && section.displayName == 'Workflow Graph' && i != tabs.controlsContainers.length - 1) {
              console.log (section)
                let tempSection = tabs.controlsContainers[i+1]
                tabs.controlsContainers[i+1] = section;
                tabs.controlsContainers[i] = tempSection;
                isMoved = true;
                break;
            }
            if (isMoved) { break; }
        }
       
      });
    });
    this.$forceUpdate();
    var tooltips = document.getElementsByClassName('el-popover');
    for (let i = 0; i<tooltips.length; i++) { tooltips[i].style.display = 'none' }
  }

  onFormAddCommand(cmd:any) {
    if (cmd === "addTab" && this.formData) {
      const tabid = this.formData.tabs.length + 1
      this.formData.tabs.push({
        title: "New Tab" + tabid,
        name: tabid,
        content: "new Tab Content"
      })
    }
  }

  checkDragEnter(event: any) {

    console.log("check drag enter", event)
  }

  checkDragEnd(event: any) {

    console.log("check drag end", event)
  }

  onDrop(event: any) {
    console.log("drop event ", event);
    console.log("data transfer drop", event.dataTransfer.getData())
  }

  onAddProp(event: any) {
    console.log(event)
  }


  handleTabsEdit(targetName:any, action:any) {
    if (action === "add") {
      const newTabName = ++this.tabsData.tabIndex + ""
      const obj:any = {
        title: "New Tab",
        name: newTabName,
        content: "New Tab content"
      }
      this.tabsData.editableTabs.push(obj)
      this.tabsData.editableTabsValue = newTabName
    }
    if (action === "remove") {
      const tabs = this.tabsData.editableTabs
      let activeName = this.tabsData.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab:any, index:number) => {
          if (tab.name === targetName) {
            const nextTab:any = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.tabsData.editableTabsValue = activeName
      this.tabsData.editableTabs = tabs.filter((tab:any) => tab.name !== targetName)
    }
  }

  // onPropertySelected(value) {}

  // onNewPropertyClick(evt) {}
  // onAllPropertyClick(evt) {}
  // onAppPrefClick(evt) {}

  get entities() {
    return EntitiesModule.EntitiesTree
  }

  openFormGeneralSettings() {
    this.openSettings=true
    this.displayNameEn=this.formData.displayName
    this.displayNameHe=this.formData.displayName
  }

   // Add New Tab Window
  private showAddNewTabWindow = false;
  onAddTab() {
        this.showAddNewTabWindow = true
  }
  private onTabOk(property: Property) {
        this.showAddNewTabWindow = false
        // this.currentEntity.properties.push(property)
  }
  private onTabCancel() {
      this.showAddNewTabWindow = false
  }

  // Add New Section Window
  private showAddNewSectionWindow = false;
  onAddSection() {
        this.showAddNewSectionWindow = true
  }
  private onSectionOk(property: Property) {
        this.showAddNewSectionWindow = false
        // this.currentEntity.properties.push(property)
  }
  private onSectionCancel() {
      this.showAddNewSectionWindow = false
  }

  // Add New Report Window
  private showAddNewReportWindow = false;
  onAddReport() {
        this.showAddNewReportWindow = true
  }
  private onReportOk(property: Property) {
        this.showAddNewReportWindow = false
        // this.currentEntity.properties.push(property)
  }
  private onReportCancel() {
      this.showAddNewReportWindow = false
  }

  private updateEnDisplayName(e: any) {
      this.displayNameEn = e
  }

  private updateHeDisplayName(e: any) {
      this.displayNameHe = e
  }

  private updateNotes(e :any) {
      this.formData.notes = e
  }

  private updateXmlChildren(e :any) {
    this.formData.childrenXml = e
  }

  private updateXmlAttributes(e :any) {
    this.formData.attributes = e
  }

  onItemDelete(obj:any) {
    this.$confirm("This will  delete the Item you have selected." + JSON.stringify(obj) + " . Continue?", "Warning", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning"
    }).then(() => {
      this.$message({
        type: "success",
        message: "Form Delete completed"
      })
    }).catch(() => {
      this.$message({
        type: "info",
        message: "Form Delete canceled"
      })
    })
  }

  onDeleteForm(val:any) {
    this.$confirm("This will  delete the form. Continue?", "Warning", {
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      type: "warning"
    }).then(() => {
      this.$message({
        type: "success",
        message: "Form Delete completed"
      })
    }).catch(() => {
      this.$message({
        type: "info",
        message: "Form Delete canceled"
      })
    })
  }

  formEntity = {} as any; 
  async currentEntity() {
    await EntitiesModule.getEntity(this.formData.entityId).then((result) => {
      this.formEntity = result;
      
    }).catch( (err) => {console.log(err)})
  }
  
  
  formData = {} as any;
  private async getFormData(formId: any) {
    await FormsModule.getActiveForm(formId).then((rs) => {
      this.formData = rs
      this.currentEntity()
      this.inFormProperties()
    }).finally(() => {
      this.loadingInstance.close()
    })
  }

  formProperties = [] as any;
  inFormProperties() {
    
    this.formData.tabs.forEach((element: { controlsContainers: any[] }) => {
      element.controlsContainers.forEach((element: { myspType: string; controls: any[] }) => {
        if(element.myspType == "CompositeTable") {
          this.formProperties.push(element);
        }
        else {
          element.controls.forEach((element: any) => {
            this.formProperties.push(element)
          });
        }
      });
    });
  }
  
  iconUrl(key: string) {
    const dataTypeicon = DataTypeFactory.getDataTypeIcon(key);
    return dataTypeicon;
  }
  movedProperty = [] as any;
  checkDrop(event: any) {
    event.preventDefault();
    console.log("check drop event", event);
    console.log("data transfer drop", event.dataTransfer.getData("text"))
    let propertyList = this.formEntity.properties
    console.log(propertyList);
    propertyList.forEach((element: { systemName: string }) => {
      //console.log(element.systemName)
      if (element.systemName.trim().toLocaleLowerCase() == event.dataTransfer.getData("text").trim().toLocaleLowerCase()) {
        console.log("element is ", element);
        this.movedProperty = JSON.parse(JSON.stringify(element))
      }
    });
    this.formProperties.forEach((element: { systemName: string }) => {
      if (element.systemName.trim().toLocaleLowerCase() == event.target.id.trim().toLocaleLowerCase()) {
        
      }
    });

    console.log("moved property ", this.movedProperty)
    // var parsedobj = JSON.parse(JSON.stringify(this.movedProperty))
    // console.log("moved property is ", parsedobj);
    debugger;
  }

  logChange(event: any, item: any) {
    console.log("change log", event)
    this.$forceUpdate()
    debugger;
    console.log("change event item ", item)
    if (event.added) {
      console.log("event added")
      this.$forceUpdate()
    }
  }

loadingInstance :any;
  private loadingConfig={
    lock: true,
    text: "Loading...",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)"
  };

  mounted() {
    const formid = this.$route.params.formid
    if (!formid) {
      this.$router.push("forms")
    }
    this.loadingInstance = Loading.service(this.loadingConfig)
    this.getFormData(formid)
    
  }
}
</script>

<style lang="scss">
.formDesignerDialogWindow {
  width: 114% !important;
}

.formSettingsTabTitle {
  font-size: 18px;
  font-weight: 500;
}

.card-header {
  text-align: center;
}

.tab-card {
  margin-bottom: 20px;
  margin-top: 20px;
}

.formSettingsTabDescription {
  font-size: 12px;
  padding-bottom: 10px;
}

.formAddDropDownButtons {
  padding-right: 85px;
}

.advancedTabCheckbox {
  padding-top: 230px;
}

.insertButton {
  padding-right: 5px;
}

.propertiesDiv {
  border:1px solid lightgrey; 
  height: 30px; 
  width: 90%;
  margin: 15px 0;
}

.bg-purple-light {
    background: #e5e9f2;
  }
  button.el-button.el-button--text.el-button--mini.el-popover__reference {
    color: #1f2d3d;
  }
  .bg-purple-dark {
     background: #99a9bf;
  }

  .property-button {
    border: 1px;
    color: black;
    border-width: 1px;
    border-style: solid;
    padding: 10px;
    font-size: 12px;
  }
  .property-box {
    text-align: center;
    font-style: italic;
    margin-top: 10px;
  }

  .mandatory {
    color: red;
  }

  .table-property-header {
    background-color: #74bcff;
  }

  .box-card .el-card__header {
    background-color:  #74bcff;
  }

  .box-height-1 {
    min-height: 35px;
  }
  .box-height-2 {
    min-height: 75px;
    padding-top: 30px;
  }
  .box-height-3 {
    min-height: 110px;
  }
  .box-height-4 {
    min-height: 145px;
  }
</style>
