<template>
  <div class="container">
    <el-header>
      <slot name="header">
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          class="header-content"
        >
          <el-col
            :span="8"
          >
            <b>{{ headerData.title }}</b>
          </el-col>
          <el-col
            :span="16"
            class="button-group"
          >
            <span
              v-for="({handler, title}, index) in headerData.commands"
              :key="title"
            >
              <el-button
                type="text"
                class="text-button"
                @click="handler"
              >{{
                title
              }}</el-button>
              <el-divider
                v-if="index === 0"
                direction="vertical"
              />
            </span>
          </el-col>
        </el-row>
      </slot>
    </el-header>
    <slot name="filter">
      <div class="filter-container" />
    </slot>
    <el-main>
      <slot />
    </el-main>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
  name: "",
  components: {}
})
export default class extends Vue {
  @Prop({ required: true, default: "" }) headerData!: string;
  private data = [
    {
      label: "Level one 1",
      children: [
        {
          label: "Level two 1-1",
          children: [
            {
              label: "Level three 1-1-1"
            }
          ]
        }
      ]
    },
    {
      label: "Level one 2",
      children: [
        {
          label: "Level two 2-1",
          children: [
            {
              label: "Level three 2-1-1"
            }
          ]
        },
        {
          label: "Level two 2-2",
          children: [
            {
              label: "Level three 2-2-1"
            }
          ]
        }
      ]
    },
    {
      label: "Level one 3",
      children: [
        {
          label: "Level two 3-1",
          children: [
            {
              label: "Level three 3-1-1"
            }
          ]
        },
        {
          label: "Level two 3-2",
          children: [
            {
              label: "Level three 3-2-1"
            }
          ]
        }
      ]
    }
  ];

  private defaultProps = {
    children: "children",
    label: "label"
  };
}
</script>

<style lang='scss' scoped>
.container {
  height: 100%;
  color: $textGray;
  .el-header {
    background: $panelBg;
    display: flex;
    align-items: center;
    min-height: 60px;
    height: auto !important;
    .button-group {
      text-align: right;
    }
    .el-divider {
      background: $textGray;
    }
  }
  .filter-container {
    background: $panelBg;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0;
  }
  .el-main {
    padding: 0;
  }
}
</style>
