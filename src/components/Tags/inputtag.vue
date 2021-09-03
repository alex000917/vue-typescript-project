<template>
  <div
    class="el-input-tag input-tag-wrapper"
    :class="[size ? 'el-input-tag--' + size : '']"
    @click="foucusTagInput"
  >
    <!-- <el-tag
      v-for="(tag, idx) in innerTags"
      :key="tag.key"
      v-bind="$attrs"
      :size="size"
      :closable="!readOnly"
      :disable-transitions="false"
      @close="remove(idx)"
    >
      {{ tag.key }}
    </el-tag> -->
    <my-tag
      v-for="(tag, idx) in innerTags"
      :key="idx"
      v-bind="$attrs"
      :size="size"
      :closable="!readOnly"
      :disable-transitions="false"
      :value="tag"
      @close="remove(idx)"
    >
      <!-- {{ tag }} -->
      <!-- {{ tag | pathToString }} -->
    </my-tag>
    <input
      v-if="!readOnly"
      v-model="newTag"
      class="tag-input"
      @keydown.delete.stop="removeLastTag"
      @keydown="addNew"
      @blur="addNew"
    >
  </div>
</template>

<script>
import { KeyValue } from "@/models/KeyValue"
import stringInputVue from "@/views/entities/components/propertyEditor/stringInput.vue"
import { PropertyFactory } from "@/models/Utils/PropertyFactory"
import { ApplicationPreferenceFactory } from "@/models/Utils/ApplicationPreferenceFactory"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { Entity } from "@/models/Entity"
import { AppPreferencesModule } from "@/store/modules/AppPreferencesMod"
import { ConditionUtils } from "@/models/Utils/ConditionUtils"
import myTag from "./myTag.vue"
import AsyncComputed from "vue-async-computed"
export default {
  name: "InputTag",
  components: { myTag, AsyncComputed },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    addTagOnKeys: {
      type: Array,
      default: () => [13, 59]
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    size: String
  },
  data() {
    return {
      newTag: "",
      innerTags: [...this.value]
    }
  },
  watch: {
    value() {
      this.innerTags = [...this.value]
    }
    // innerTags: {
    //   deep: true,
    //   immediate: true,
    //   updateInput(val) {
    //    this.tagChange()
    //     }
    //   }
  },

  methods: {
    foucusTagInput() {
      if (this.readOnly || !this.$el.querySelector(".tag-input")) {
      } else {
        this.$el.querySelector(".tag-input").focus()
      }
    },
    addNew(e) {
      if (e && !this.addTagOnKeys.includes(e.keyCode) && e.type !== "blur") {
        return
      }
      if (e) {
        e.stopPropagation()
        e.preventDefault()
      }
      let addSuucess = false
      if (this.newTag.includes(";")) {
        this.newTag.split(";").forEach((item) => {
          if (this.addTag(item.trim())) {
            addSuucess = true
          }
        })
      } else {
        if (this.addTag(this.newTag.trim())) {
          addSuucess = true
        }
      }
      if (addSuucess) {
        this.tagChange()
        this.newTag = ""
      }
    },
    addTag(tag) {
      
      if (!tag) return

      if (this.innerTags.findIndex((x) => x === tag) > -1) {
        // duplicate keys.
        return false
      }
      const type = typeof tag
      if (type === "string") {
        tag = tag.trim()
        this.innerTags.push(tag)
        this.tagChange()
        return true
      } else if (tag?.key) {
        this.innerTags.push(tag)
        this.tagChange()
        return true
      }
      // else {
      //   console.warn("Tags unknown added ");
      //   this.innerTags.push(tag);
      //   return true;
      // }

      return false
    },
    remove(index) {
      this.innerTags.splice(index, 1)
      this.tagChange()
    },
    removeLastTag() {
      if (this.newTag) {
        return
      }
      this.innerTags.pop()
      this.tagChange()
    },
    tagChange() {
      
      this.$emit("change", this.innerTags)
    }
  }
}
</script>

<style scoped>
.input-tag-wrapper {
  position: relative;
  font-size: 14px;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  outline: none;
  padding: 0 10px 0 5px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
.el-tag {
  margin-right: 4px;
}
.tag-input {
  background: transparent;
  border: 0;
  font-size: inherit;
  outline: none;
  padding-left: 0;
  width: 100px;
}
.el-input-tag {
  height: 40px;
  line-height: 40px;
}
.el-input-tag--mini {
  height: 28px;
  line-height: 28px;
  font-size: 12px;
}
.el-input-tag--small {
  height: 32px;
  line-height: 32px;
}
.el-input-tag--medium {
  height: 36px;
  line-height: 36px;
}
</style>
