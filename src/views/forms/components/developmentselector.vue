<template>
    <div>
        <el-row>
            <el-button
                size="mini"
                type="text"
                icon="el-icon-plus"
                title="New XML Control"
                @click="onXMLControl"
            >
                XML Control
            </el-button>
        </el-row>
        <el-row>
            <el-button
                size="mini"
                type="text"
                icon="el-icon-plus"
                title="New XML Container"
                @click="onXMLContainer"
            >
                XML Container
            </el-button>
        </el-row>
        <newXmlControl
            v-if="showNewXmlControl"
            :show="showNewXmlControl"
            :entity="currentEntity"
            :on-ok="onPropertyOk"
            :on-cancel="onPropertyCancel"
        />
        <newXmlContainer
            v-if="showNewXmlContainer"
            :show="showNewXmlContainer"
            :entity="currentEntity"
            :on-ok="onContainerOk"
            :on-cancel="onContainerCancel"
          />
    </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import newXmlControl from "./newXmlControl.vue"
import newXmlContainer from "./newXmlContainer.vue"
import { BaseProperty, Property } from "@/models/Properties"

@Component({
    name: "developmentselector",
    components: {newXmlControl, newXmlContainer}
})
export default class extends Vue {
    private showNewXmlControl = false;
    private showNewXmlContainer = false;

    private onPropertyOk(property: Property) {
        this.showNewXmlControl = false
        // this.currentEntity.properties.push(property)
    }

    private onPropertyCancel() {
        this.showNewXmlControl = false
    }

    onXMLControl() {
        this.showNewXmlContainer = false
        this.showNewXmlControl = true
    }

    private onContainerOk(property: Property) {
        this.showNewXmlContainer = false
        // this.currentEntity.properties.push(property)
    }

    private onContainerCancel() {
        this.showNewXmlContainer = false
    }

    onXMLContainer() {
        this.showNewXmlContainer = true
        this.showNewXmlControl = false
    }
}
</script>