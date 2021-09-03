<template>
  <el-container>
    <el-main>
      <el-form
        v-for="l in languages"
        :key="l.key"
        label-position="Top"
        :model="translation"
      >
        <span>{{ l.key }}</span>
        <el-divider />
        <el-form-item label="display Name">
          <el-input v-model="l.displayName" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="l.description" />
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { AppModule } from "@/store/modules/app"
import { LanguageTranslation } from "@/models/LanguageTranslation"
import { AppCacheModule } from "@/store/modules/appCache"
@Component({
  name: "LangInput"
})
export default class extends Vue {
  translation: LanguageTranslation | object = {};

  get languages() {
    return AppCacheModule.FlexSettings.languages
  }

  private handleSetLanguage(lang: string) {
    this.$i18n.locale = lang
    AppModule.SetLanguage(lang)
    this.$message({
      message: "Switch Language Success",
      type: "success"
    })
  }
}
</script>
