<template>
  <el-form
    ref="newform"
    @submit.prevent="onSubmit"
    @reset="onReset"
  >
    <el-form-group
      v-for="language in appLanguages"
      :id="language.key"
      :key="language.key"
      :state="stateName"
      :label-for="language.key"
      invalid-feedback="input required"
    >
      <span>{{ language.key }}</span>
      <hr>
      <el-form-input
        class="form__input"
        type="text"
        required
        placeholder="Display Name: "
      />
    </el-form-group>
    <span>This form is based on:</span>
    <hr>

    <el-form-item label="Select Entity">
      <el-select
        id="entity-list"
        v-model="form.selectedEntity"
        :options="EntityList"
        text-field="text"
        value-field="value"
        required
        @change="onSelectedEntityChanged"
      />
    </el-form-item>
    <el-form-item
      id="input-group-4"
      label="Authorizable:"
      label-for="auth-list"
    >
      <el-select
        id="auth-list"
        v-model="form.selectedAuthTree"
        :options="AuthList"
        text-field="text"
        value-field="value"
        required
      />
    </el-form-item>

    <el-collapse
      v-model="activeName"
      accordion
    >
      <el-collapse-item
        title="Advanced Settings"
        name="1"
      >
        <el-form-item>
          <el-input
            :v-model="form.SystemName"
            type="text"
            required
            placeholder=" System Name "
          />
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component({
  name: "NewForm",
  components: {}
})
export default class extends Vue {
  form = {
    langData: [],
    selectedEntity: null,
    selectedAuthTree: null,
    SystemName: null
  };

  submitStatus = null;
  EntityList:any[] = [];
  AuthList:any[] = [];

  //   get appLanguages() {
  //     return this.$store.state.FlexApplicationPreferences.Languages;
  //   }
  //   get entities() {
  //     return this.getEntities(this.$store.getters.Entities);
  //   }
  //   get authTree() {
  //     return this.getAuthTree(this.$store.state.AuthorizableEntities);
  //   }

  onSubmit(evt:any) {
    console.log("checking validation.", evt)
  }

  // onOkClick() {}

  onReset() { console.log("onReset") }

  getEntities(entity:any) {
    console.log(entity.name)

    entity.children.forEach((element:any) => {
      this.EntityList.push({ text: element.name, value: element.id })
      if (element.children) {
        this.getEntities(element)
      }
    })
  }

  onSelectedEntityChanged(value:any) {
    console.log("select Entity--", value)
  }

  getAuthTree(entity:any) {
    entity.children.forEach((item:any) => {
      this.AuthList.push({ text: item.name, value: item.id })
      if (item.children) {
        this.getAuthTree(item)
      }
    })
  }
}
</script>
