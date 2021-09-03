<template>
  <div>
    {{ title }}
    <div id="workflowCanvas" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// import draw2d from "draw2d"
// import $ from "jquery"
// import { log } from "node:console"

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// $.fn.draggable = () => {}
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// $.fn.droppable = () => {}

@Component({
  name: "workFlowsEdit",
  components: {},
  data() {
    return {
      title: "hello",
      showToolbar: false
    }
  }
})
export default class extends Vue {
  mounted() {
    // const that = this
    // let showToolbarTimer, hiddenToolbarTimer
    // const canvas = new draw2d.Canvas("workflowCanvas")
    // $(canvas.html).find("svg").css("top", 0)
    // $(canvas.html).find("svg").css("position", "relative")
    // // create and add two nodes which contains Ports (In and OUT)
    // //
    // const start = new draw2d.shape.node.Start()
    // const end = new draw2d.shape.node.End()

    // const toolbarButton = (logText: string) => {
    //   const btn = new draw2d.shape.icon.Acw()

    //   btn.setSelectable(true)
    //   btn.addCssClass("svg_clickable")
    //   btn.on("click", function(d, e) {
    //     that.title = logText
    //   })
    //   btn.on("mouseenter", function() {
    //     that.showToolbar = true
    //   })
    //   btn.on("mouseleave", function() {
    //     that.showToolbar = false
    //     clearTimeout(hiddenToolbarTimer)
    //     hiddenToolbarTimer = setTimeout(() => toolbar.setVisible(false), 200)
    //   })

    //   return btn
    }
    // const toolbarInstance = draw2d.shape.layout.FlexGridLayout.extend({
    //   init: function(attr: any, setter: any, getter: any) {
    //     this._super(
    //       $.extend(
    //         {
    //           columns: "20px, 20px, 20px, 20px, 20px",
    //           rows: "20px",
    //           stroke: 0
    //         },
    //         attr
    //       ),
    //       setter,
    //       getter
    //     )
    //     this.add(toolbarButton("Acw"), { row: 0, col: 0 })
    //     this.add(toolbarButton("hello_2"), { row: 0, col: 1 })
    //     this.add(toolbarButton("hello_3"), { row: 0, col: 2 })
    //     this.add(toolbarButton("hello_4"), { row: 0, col: 3 })
    //     this.add(toolbarButton("hello_5"), { row: 0, col: 4 })
    //     this.setDimension(60, 20)
    //     this.setDraggable(false)
    //     this.setVisible(false)
    //   }
    // })
    // const toolbar = new toolbarInstance()

    // // ...events
    // start.on("mouseenter", (event: any) => {
    //   const { x, y } = event
    //   toolbar.setDimension(60, 20)
    //   toolbar.setX(x - 5)
    //   toolbar.setY(y - 20)
    //   clearTimeout(showToolbarTimer)
    //   clearTimeout(hiddenToolbarTimer)
    //   showToolbarTimer = setTimeout(() => toolbar.setVisible(true), 200)
    // })
    // start.on("mouseleave", (emitter, event) => {
    //   hiddenToolbarTimer = setTimeout(() => {
    //     if (!that.showToolbar) toolbar.setVisible(false)
    //   }, 200)
    // })

    // end.on("mouseenter", (event: any) => {
    //   const { x, y } = event
    //   toolbar.setX(x - 5)
    //   toolbar.setY(y - 20)
    //   clearTimeout(showToolbarTimer)
    //   clearTimeout(hiddenToolbarTimer)
    //   showToolbarTimer = setTimeout(() => toolbar.setVisible(true), 200)
    // })
    // end.on("mouseleave", (emitter, event) => {
    //   hiddenToolbarTimer = setTimeout(() => {
    //     if (!that.showToolbar) toolbar.setVisible(false)
    //   }, 200)
    // })

    // // ...add it to the canvas
    // canvas.add(toolbar, 0, 0)
    // canvas.add(start, 50, 50)
    // canvas.add(end, 230, 80)

    // // Create a Connection and connect the Start and End node
    // //
    // const c = new draw2d.Connection()

    // // Set the endpoint decorations for the connection
    // //
    // c.setSourceDecorator(new draw2d.decoration.connection.BarDecorator())
    // c.setTargetDecorator(new draw2d.decoration.connection.DiamondDecorator())
    // // Connect the endpoints with the start and end port
    // //
    // c.setSource(start.getOutputPort(0))
    // c.setTarget(end.getInputPort(0))

    // // and finally add the connection to the canvas
    // canvas.add(c)
  // }
}
</script>
<style lang="scss" scoped>
#workflowCanvas {
  width: 1200px;
  height: 800px;
  svg {
    top: 0 !important;
  }
  ::v-deep .svg_clickable {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
