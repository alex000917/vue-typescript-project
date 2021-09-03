<template>
  <el-dialog
    :title="title"
    :visible.sync="showModal"
    destroy-on-close
    :close-on-click-modal="false"
    append-to-body
    width="40%"
    close-on-press-escape
  >
    <el-row type="flex">
      <span>Send the e-mail notification to the following users:</span>
    </el-row>
    <el-divider />
    <el-row>
      <el-col>
        <span style="min-width: 50px">To:</span>
      </el-col>
      <el-col>
        <InputTagsView
          :allowed-properties="validPropertyTypes"
          :allowed-entity-name="validLookupName"
          :base-entity-id="entity.id"
          :data="notification.toRecipients"
          @onItemsUpdated="onToItemsUpdated"
        />
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <span style="min-width: 50px">Cc:</span>
      </el-col>
      <el-col>
        <InputTagsView
          :allowed-properties="validPropertyTypes"
          :allowed-entity-name="validLookupName"
          :base-entity-id="entity.id"
          :data="notification.ccRecipients"
          @onItemsUpdated="onCcItemsUpdated"
        />
      </el-col>
    </el-row>

    <el-row>
      <el-col>
        <span style="min-width: 50px">Bcc:</span>
      </el-col>
      <el-col>
        <InputTagsView
          :allowed-properties="validPropertyTypes"
          :allowed-entity-name="validLookupName"
          :base-entity-id="entity.id"
          :data="notification.bccRecipients"
          @onItemsUpdated="onBccItemsUpdated"
        />
      </el-col>
    </el-row>

    <el-row style="margin-bottom: 0">
      <span>Separate tag reprents a users or e-mail addresses </span>
    </el-row>
    <div slot="footer">
      <el-button
        type="primary"
        @click="okHandler()"
      >
        Ok
      </el-button>
      <el-button @click="cancelHandler()">
        cancel
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { Notification } from "@/models/Notification"
import { EntitiesModule } from "@/store/modules/entitiesMod"
import { TextAssembly } from "@/models/TextAssembly"
import InputTagsView from "@/components/Tags/index.vue"
@Component({
  name: "recipients",
  components: { InputTagsView }
})
export default class extends Vue {
  @Prop({ required: false, default: "Notification" }) private title!: string;
  @Prop({ required: true }) private isOpen!: boolean;
  @Prop({ required: true }) private data!: Notification;
  @Prop({ required: false, default: () => ["1", "2"] }) private allowedProperties!: String[];
  @Prop({ required: false }) private allowedEntityName!: string;
  get entity() {
    return EntitiesModule.getCurrentEntity
  }

  get validPropertyTypes() {
    return this.allowedProperties
  }

  get validLookupName() {
    return this.allowedEntityName
  }

  get showModal(): boolean {
    return this.isOpen
  }

  set showModal(value: boolean) {
    this.showModal = false
    this.$emit("update:isOpen", value)
  }

  onItemChanged(value: any) {
    console.log("changed to " + value)
  }

  onToItemsUpdated(data:any) {
    if (!this.notification.toRecipients) {
      this.notification.toRecipients = new TextAssembly()
    }
    this.notification.toRecipients = data
  }

  onCcItemsUpdated(data:any) {
    if (!this.notification.ccRecipients) {
      this.notification.ccRecipients = new TextAssembly()
    }
    this.notification.ccRecipients = data
  }

  onBccItemsUpdated(data:any) {
    if (!this.notification.bccRecipients) {
      this.notification.bccRecipients = new TextAssembly()
    }
    this.notification.bccRecipients = data
  }

  okHandler() {
    this.$emit("onOkRecipients", this.notification)
    this.$emit("update:isOpen", false)
  }

  cancelHandler() {
    this.$emit("onCancelRecipients")
    this.$emit("update:isOpen", false)
  }

 notification:Notification= new Notification()
 mounted() {
   if (this.data) {
     
     this.notification = this.data as Notification
     if (!this.notification.toRecipients) {
       this.notification.toRecipients = new TextAssembly()
     }
     if (!this.notification.ccRecipients) {
       this.notification.ccRecipients = new TextAssembly()
     }
     if (!this.notification.bccRecipients) {
       this.notification.bccRecipients = new TextAssembly()
     }
   }
 }
}
</script>
<style lang="scss" scoped>

.tags-container {
  background-color: white;
  border: 1px solid $borderGray;
  line-height: 30px;
  max-height: 50px;
  overflow-y: auto;
  display: inline-flex;
  width: 450px;

  .tag-item {
    border-color: $borderGray;
    color: $borderGray;
    margin: 0 5px;
  }
}
</style>
