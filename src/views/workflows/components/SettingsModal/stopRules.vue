<template>
  <el-container direction="vertical">
    <el-row
      type="flex"
      align="middle"
    >
      <el-image
        src="/assets/img/stop-rule-32x32.png"
        fit="fill"
      />
      <span style="font-size: 18px; margin-left: 5px">Action Rules</span>
    </el-row>
    <el-row style="margin-top: 30px">
      <el-row>
        Action rules modify or move item's workflow. <br>
        For example: when item cancelled, cancel all child items as well.
      </el-row>
    </el-row>
    <el-row
      type="flex"
      justify="start"
      align="middle"
      style="margin-top: 20px"
    >
      <el-dropdown
        trigger="click"
        size="small"
        placement="bottom-start"
        style="margin-right: 8px;"
      >
        <el-button type="text">
          <el-row
            type="flex"
            justify="center"
            align="middle"
          >
            <el-image
              src="/assets/img/stop-rule-16x16.png"
              style="padding-right: 5px"
            />
            New action rule
          </el-row>
        </el-button>
        <el-dropdown-menu
          slot="dropdown"
          style="margin-top: 0"
        >
          <el-dropdown-item
            v-for="dropdown in newStopRuleDropDowns"
            :key="dropdown"
          >
            {{ dropdown }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="text">
        <el-row
          type="flex"
          justify="center"
          align="middle"
        >
          <el-image
            src="/assets/img/edit16x16.png"
            style="padding-right: 5px"
          />
          Edit
        </el-row>
      </el-button>
      <el-button type="text">
        <el-row
          type="flex"
          justify="center"
          align="middle"
        >
          <el-image
            src="/assets/img/delete-16x16.png"
            style="padding-right: 5px"
          />
          Delete
        </el-row>
      </el-button>
    </el-row>
    <el-row>
      <draggable
        v-model="myArray"
        class="draggable-list"
      >
        <transition-group>
          <el-row
            v-for="element in myArray"
            :key="element.order"
          >
            <el-button
              style="width: 100%; text-align: left;"
            >
              {{ element.name }}
            </el-button>
          </el-row>
        </transition-group>
      </draggable>
    </el-row>
    <p class="require-content">
      Drag items to re-order
    </p>
    <el-row type="flex" align="middle" style="margin-top: 20px;">
      <el-image src="/assets/img/information-32x32.png" />
      <span style="padding-left: 5px; font-weight: 600;">Stop rules are triggered after action rules.</span>
    </el-row>
  </el-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Draggable from "vuedraggable"

@Component({
  name: "",
  components: { Draggable }
})
export default class extends Vue {
  newStopRuleDropDowns = ["Attachment Stop Rule", "Stop Rule Wizard", "Xml Rule"]
  myArray = [
    {
      name: "vue.draggable",
      order: 1,
      fixed: false
    },
    {
      name: "draggable",
      order: 2,
      fixed: false
    },
    {
      name: "component",
      order: 3,
      fixed: false
    },
    {
      name: "for",
      order: 4,
      fixed: false
    },
    {
      name: "vue.js 2.0",
      order: 5,
      fixed: false
    },
    {
      name: "based",
      order: 6,
      fixed: false
    },
    {
      name: "on",
      order: 7,
      fixed: false
    },
    {
      name: "Sortablejs",
      order: 8,
      fixed: false
    }
  ]
}
</script>

<style lang="scss" scoped>
.draggable-list {
  border: 1px solid rgb(142 145 152);
  padding: 5px;
}
</style>
