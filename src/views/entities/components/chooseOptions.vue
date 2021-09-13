<template>
  <el-container
    direction="vertical"
    :class="{'disabled-container': disabled}"
  >
    <el-row
      type="flex"
      justify="space-around"
      align="middle"
      class="header-container"
    >
      <el-col :class="{'disabled-opacity': disabled}">
        Choice options:
      </el-col>
      <el-col class="command-btn-container">
        <el-button
          type="text"
          icon="el-icon-circle-plus"
          title="Add new choice option"
          :disabled="disabled"
          @click="addHandler"
        />
        <el-button
          type="text"
          title="Edit choice option"
          icon="el-icon-edit"
          :disabled="disabled"
          @click="editHandler"
        />
        <el-button
          type="text"
          title="Delete choice option"
          icon="el-icon-delete"
          :disabled="disabled"
          @click="deleteHandler"
        />
      </el-col>
    </el-row>
    <draggable
      :list="listItems"
      group="article"
      :class="['dragArea', {'disabled-opacity': disabled}]"
      :disabled="disabled"
    >
      <el-button
        v-for="element in listItems"
        :key="element"
        class="list-complete-item"
        :disabled="disabled"
        @click="selectedItem = element"
      >
        <div class="list-complete-item-handle">
          {{ element }}
        </div>
      </el-button>
    </draggable>
    <el-row :class="['descrption-text', {'disabled-opacity': disabled}]">
      Drag items to re-order
    </el-row>
    <el-dialog
      :title="modal.title"
      :visible.sync="modal.visible"
      width="15%"
      :before-close="handleClose"
      top="30vh"
    >
      <el-row
        type="flex"
        align="middle"
      >
        <el-col>Option title:</el-col>
        <el-col>
          <el-input
            v-model="modal.data"
            type="text"
            size="mini"
          />
        </el-col>
      </el-row>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="mini"
          @click="modal.visible = false"
        >Cancel</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="modalOkHandler"
        >Ok</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator"
import Draggable from "vuedraggable"
import { mixins } from "vue-class-component"
import ModalMixin from "../modalMixin"
import { BaseContent } from "@/models/BaseContent"

@Component({
  name: "",
  components: { Draggable }
})
export default class extends mixins(ModalMixin) {
  @Prop({ required: true, default: [] }) data!: string[];
  @Prop({ default: false }) disabled!: boolean;

  private listItems: string[] = [];
  private modal = {
    visible: false,
    data: "",
    title: ""
  };

  private selectedItem = "";

  addHandler() {
    this.modal = {
      visible: true,
      data: "",
      title: "Add new option"
    }
  }

  editHandler() {
    this.modal = {
      visible: true,
      data: this.selectedItem,
      title: "Edit option"
    }
  }

  deleteHandler() {
    const index = this.listItems.indexOf(this.selectedItem)
    if (index > -1) {
      this.listItems.splice(index, 1)
    }
    this.submitHandler()
  }

  modalOkHandler() {
    this.modal.visible = false
    if (this.modal.title === "Edit option") {
      const index = this.listItems.indexOf(this.selectedItem)
      this.listItems[index] = this.modal.data
    } else {
      this.listItems.push(this.modal.data)
    }
    this.submitHandler()
  }

  submitHandler() {
    this.selectedItem = ""
    const dataInstance = this.listItems.map((d: string) => {
      const baseContent = new BaseContent()
      baseContent.displayName = d
      return baseContent
    })
    this.$emit("update:data", dataInstance)
  }

  created() {
    this.listItems = this.data.map((d: any) => {
      return d.displayName
    })
  }
}
</script>

<style lang='scss' scoped>
.command-btn-container {
  text-align: right;
}
.header-container {
  margin-bottom: 0px !important;
}
.descrption-text {
  color: #8e8e8e;
  margin-top: 10px;
}
.dragArea {
  height: 150px;
  background: white;
  overflow: auto;
}
.disabled-container {
  cursor: not-allowed;
  .disabled-opacity {
    opacity: 0.7;
  }
}
.is-disabled {
  color: #8e8e8e;
  &:hover {
    color: #8e8e8e;
  }
}
</style>
