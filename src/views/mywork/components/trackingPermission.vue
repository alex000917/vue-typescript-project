<template>
  <el-collapse
    accordion
    value="workWeekDays"
  >
    <p style="margin: 20px 10px;">
      Set tracking permissions for days, tasks and attendance.
    </p>
    <el-collapse-item
      title="Work week days"
      name="workWeekDays"
    >
      <conditions
        :data="[]"
        :visible-conditions="['state']"
      >
        <template #description>
          Open work week days for tracking. <br>Use role grops to check different
          conditions based on the role of the logged-in user.
        </template>
      </conditions>
    </el-collapse-item>
    <el-collapse-item
      title="Non-work week days"
      name="nonworWeekDays"
    >
      <conditions
        :data="[]"
        :visible-conditions="['state']"
      >
        <template #description>
          Open work week days for tracking. <br>Use role gropus to check different
          conditions based on the role of the logged-in user.
        </template>
      </conditions>
    </el-collapse-item>
    <el-collapse-item
      title="Dayexceptions"
      name="dayexceptions"
    >
      <conditions
        :data="[]"
        :visible-conditions="['state']"
      >
        <template #description>
          Open day exceptions(managed in calendars) for tracking. <br>Use role groups
          to check different conditions based on the role of the logged-in user.
        </template>
      </conditions>
    </el-collapse-item>
    <el-collapse-item
      title="Tasks"
      name="tasks"
    >
      <conditions
        :data="[]"
        :visible-conditions="['state']"
      >
        <template #description>
          Open task lines for tracking. Can be used to lock tasks for employees
          at certain workflow steps. <br>Use role groups to check different conditions based on the role of the logged-in user.
        </template>
      </conditions>
    </el-collapse-item>
    <el-collapse-item
      title="Admin Time"
      name="adminTime"
    >
      <conditions
        :data="[]"
        :visible-conditions="['state']"
      >
        <template #description>
          Open admin time lines for tracking. <br>Use role groups to check different conditions based on the
          role of the logged-in user.
        </template>
      </conditions>
    </el-collapse-item>
    <el-collapse-item
      title="Attendance"
      name="attendance"
    >
      <conditions
        :data="[]"
        :visible-conditions="['state']"
      >
        <template #description>
          Open attendance lines for tracking. <br>Use role gropus to check different
          conditions based on the role of the logged-in user.
        </template>
      </conditions>
    </el-collapse-item>
  </el-collapse>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator"
import Conditions from "@/components/Conditions/index.vue"

@Component({
  name: "",
  components: { Conditions }
})
export default class extends Vue {}
</script>

<style lang='scss' scoped>
</style>
