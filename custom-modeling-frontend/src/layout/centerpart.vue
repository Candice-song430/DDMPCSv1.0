<template>
  <div class="center-container">
    <div
      class="map-container"
      @drop.stop="map_drop_handler($event)"
      @dragover.stop="map_dragover_handler($event)"
    >
      <map-area class="map-area">
        <curve-line
          v-for="line in getLinePosAll"
          :start="line.start"
          :end="line.end"
          :id="line.id"
          :key="line.id"
        ></curve-line>


        <curve-line :start="lineTemp.start" :end="lineTemp.end"></curve-line>
      </map-area>
      <div>
        <my-node
          v-for="node in nodearr"
          :key="node.id"
          :node="node"
          @node-drag-ing="draging"
          @node-drag-start="onStart"
          @node-drag-end="onEnd"
        ></my-node>
      </div>
    </div>

    <div class="query-container">
      <el-button plain @click="dataProcessing">Data Processing</el-button>
      <el-button plain @click="dataAnalysis">Data Analysis</el-button>
      <el-button plain @click="modelDetail">Model Details</el-button>
      <el-button plain @click="saveModel">Save Model</el-button>
      <el-button plain @click="deleteLine">Delete Line</el-button>
      <el-button plain @click="deleteNode">Delete Node</el-button>
      <el-button plain @click="resetModel">Reset Model</el-button>
    </div>

    <div class="button-tool">
      <button-tool
        v-for="item in tools"
        :item_title="item.item_title"
        :item_url="item.url"
        :item_type="item.item_title | getCategoryType"
      ></button-tool>
    </div>

  </div>
</template>

<script>
import mapArea from "@/components/MapArea";
import { mapGetters, mapActions } from "vuex";
import methods from "@/utils/throttle";
import { getCategoryType } from "@/utils/categories";

let dragExec = methods.throttle(e => {
  // console.log(e);
}, 100);
export default {
  components: {
    mapArea
  },
  data() {
    return {
      dragingStarte: null,
      tools: [
      {
        item_title: "Inner Join",
        url: require("@/assets/png/n.png")
      },
      {
        item_title: "Outer Join",
        url: require("@/assets/png/w.png")
      },
      {
        item_title: "Left Join",
        url: require("@/assets/png/z.png")
      },
      {
        item_title: "Right Join",
        url: require("@/assets/png/y.png")
      },
      {
        item_title: "Sort",
        url: require("@/assets/png/p.png")
      },
      {
        item_title: "Distinct",
        url: require("@/assets/png/c.png")
      },
      {
        item_title: "Export",
        url: require("@/assets/png/d.png")
      },
      {
        item_title: "Copy",
        url: require("@/assets/png/f.png")
      },
      {
        item_title: "Intersection",
        url: require("@/assets/png/j.png")
      },
      {
        item_title: "Union",
        url: require("@/assets/png/b.png")
      },
      {
        item_title: "Difference",
        url: require("@/assets/png/cj.png")
      },
      {
        item_title: "Conditional Filter",
        url: require("@/assets/png/s.png")
      }
  ]
    };
  },
  computed: {
    ...mapGetters(["nodearr", "getLinePosAll", "lineTemp"])
  },
  methods: {
    ...mapActions({
      nodeChangePos: "mynodes/changePositionByID",
      createNode: "mynodes/createNode",
      changeCurrentClickNode: "mynodes/changeCurrentClickNode",
      deleteLine: "mylines/deleteLine",
      deleteNode: "mynodes/deleteNode",
      saveModel: "mymodel/saveModel",
      setMyNodes: "mynodes/setMyNodes",
      setMyLines: "mylines/setMyLines",
      resetModel: "mymodel/resetModel"
    }),
    /**
     */
    delete_line() {
      this.deleteLine();
    },
    delete_node() {
      this.deleteNode();
    },
    shujvchuli () {
      window.open('http://192.168.0.111:5051/', '_blank')
    },
    dataAnalysis () {
      window.open('http://localhost:8080/#/data-exploration/index', '_blank')
    },
    shujvfenxi () {
      window.open('http://www.baidu.com/', '_blank')
    },
    /**
     *
     */
    model_detail() {
      let payload = {
        nodeId: -2
      };
      this.changeCurrentClickNode(payload);
    },

    map_dragover_handler(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    },
    /**
     *
     */
    reLocateNode(e) {
      let startClientX = e.dataTransfer.getData("startClientX");
      let startClientY = e.dataTransfer.getData("startClientY");
      let nodeId = e.dataTransfer.getData("nodeId");
      let payload = {
        id: nodeId,
        pos_x: e.clientX - startClientX,
        pos_y: e.clientY - startClientY
      };
      this.nodeChangePos(payload);
    },
    /**
     */
    createNodeDatabase(e) {
     
      let payload = {
        title: e.dataTransfer.getData("title"),

        x: e.clientX - 527,
        y: e.clientY,
        type: e.dataTransfer.getData("createNodeType"),

        data_state: e.dataTransfer.getData("item_data"),
        ports: [
          {
            pos_x: 90,
            pos_y: 30
          }
        ]
      };
      // console.log(payload);
      this.createNode(payload);
    },
    /**
     */
    createNodeConnection(e) {
      let payload = {
        title: e.dataTransfer.getData("title"),

        x: e.clientX - 427,
        y: e.clientY,

        type: e.dataTransfer.getData("title"),
        ports: [
          {
            pos_x: 45,
            pos_y: 0
          },
          {
            pos_x: 135,
            pos_y: 0
          },
          {
            pos_x: 90,
            pos_y: 30
          }
        ]
      };
      // console.log(payload);
      this.createNode(payload);
    },
    createNodeSoloPort(e) {
      let payload = {
        title: e.dataTransfer.getData("title"),

        x: e.clientX - 527,
        y: e.clientY,

        type: e.dataTransfer.getData("title"),

        ports: [
          {
            pos_x: 90,
            pos_y: 0
          },
          {
            pos_x: 90,
            pos_y: 30
          }
        ]
      };
      // console.log(payload);
      this.createNode(payload);
    },
    /**

     */
    createNodeSoloInNoOut(e) {
      let payload = {
        title: e.dataTransfer.getData("title"),

        x: e.clientX - 527,
        y: e.clientY,
        type: e.dataTransfer.getData("title"),

        ports: [
          {
            pos_x: 90,
            pos_y: 0
          }
        ]
      };
      // console.log(payload);
      this.createNode(payload);
    },
    /**
     */
    createNodeModelNode(e) {
      let item = JSON.parse(e.dataTransfer.getData("item"));
      console.log(item);
      this.$axios
        .post("/all-models/getModelById", {
          id: item.model_id
        })
        .then(res => {
          console.log("res", res.data);
          let { model_nodes, model_lines } = res.data[0];
          model_nodes = JSON.parse(model_nodes);
          model_lines = JSON.parse(model_lines);
          this.setMyNodes(model_nodes);
          this.setMyLines(model_lines);
        });
    },
    map_drop_handler(e) {
    e.preventDefault();

    let myEventType = e.dataTransfer.getData("myEventType");
    if (myEventType == "reLocateNode") {
      this.reLocateNode(e);
    } else if (myEventType == "createNode") {
      let payload = {
        nodeId: -1
      };
      this.changeCurrentClickNode(payload);
      let createNodeType = e.dataTransfer.getData("createNodeType");
      if (createNodeType === "Database") {
        this.createNodeDatabase(e);
      } else if (createNodeType === "Double Entry Tool") {
        this.createNodeConnection(e);
      } else if (createNodeType === "Single Entry Tool") {
        this.createNodeSoloPort(e);
      } else if (createNodeType === "Single Entry No Output") {
        this.createNodeSoloInNoOut(e);
      } else if (createNodeType === "Model Node") {
        this.createNodeModelNode(e);
      }
    }
  },

  draging(e, node) {
    dragExec(e);
  },

  onStart(e, node) {
    this.dragingStarte = {
      clientX: e.clientX,
      clientY: e.clientY,
      offsetX: e.offsetX,
      offsetY: e.offsetY
    };
  },

  consoleEvent(e) {
    console.log("Event clientX", e.clientX);
    console.log("Event clientY", e.clientY);
    console.log("Event offsetX", e.offsetX);
    console.log("Event offsetY", e.offsetY);
  },
    onEnd(e, node) {

    }
  }
};
</script>

<style lang="scss" scoped>
.center-container {
  box-sizing: border-box;
  position: relative;
  // border: 1px solid black;
  flex: 1;
  // z-index: -1;
  min-height: 100vh;
  background: #f1f3f7;
}
.map-container {
  position: absolute;

  width: 900px;
  height: 870px;
  left: 65px;
  top: 40px;
}
.button-tool {
  width: 100px;
  position: absolute;
  right: 150px;
  top: 15%;
}
.center-text {
  overflow: hidden;
  z-index: 9999;
  opacity: 0.1;
  font-size: 14px;
  font-family: 微软雅黑;
  text-align: center;
  width: 220px;
  height: 50px;
  display: block;
  pointer-events: none;
  .center-text-t1 {
    transform: rotate(-20deg);
    position: absolute;
    left: 65px;
    top: 70px;
  }
  .center-text-t2 {
    transform: rotate(-20deg);
    position: absolute;
    left: 235px;
    top: 70px;
  }
  .center-text-t3 {
    transform: rotate(-20deg);
    position: absolute;
    left: 435px;
    top: 70px;
  }
  .center-text-t4 {
    transform: rotate(-20deg);
    position: absolute;
    left: 635px;
    top: 70px;
  }
  .center-text-t5 {
    transform: rotate(-20deg);
    position: absolute;
    left: 815px;
    top: 70px;
  }
  .center-text-t11 {
    transform: rotate(-20deg);
    position: absolute;
    left: 65px;
    top: 190px;
  }
  .center-text-t21 {
    transform: rotate(-20deg);
    position: absolute;
    left: 235px;
    top: 190px;
  }
  .center-text-t31 {
    transform: rotate(-20deg);
    position: absolute;
    left: 435px;
    top: 190px;
  }
  .center-text-t41 {
    transform: rotate(-20deg);
    position: absolute;
    left: 635px;
    top: 190px;
  }
  .center-text-t51 {
    transform: rotate(-20deg);
    position: absolute;
    left: 815px;
    top: 190px;
  }
  .center-text-t111 {
    transform: rotate(-20deg);
    position: absolute;
    left: 65px;
    top: 290px;
  }
  .center-text-t211 {
    transform: rotate(-20deg);
    position: absolute;
    left: 235px;
    top: 290px;
  }
  .center-text-t311 {
    transform: rotate(-20deg);
    position: absolute;
    left: 435px;
    top: 290px;
  }
  .center-text-t411 {
    transform: rotate(-20deg);
    position: absolute;
    left: 635px;
    top: 290px;
  }
  .center-text-t511 {
    transform: rotate(-20deg);
    position: absolute;
    left: 815px;
    top: 290px;
  }
  .center-text-tt1 {
    transform: rotate(-20deg);
    position: absolute;
    left: 65px;
    top: 390px;
  }
  .center-text-tt2 {
    transform: rotate(-20deg);
    position: absolute;
    left: 235px;
    top: 390px;
  }
  .center-text-tt3 {
    transform: rotate(-20deg);
    position: absolute;
    left: 435px;
    top: 390px;
  }
  .center-text-tt4 {
    transform: rotate(-20deg);
    position: absolute;
    left: 635px;
    top: 390px;
  }
  .center-text-tt5 {
    transform: rotate(-20deg);
    position: absolute;
    left: 815px;
    top: 390px;
  }
  .center-text-tt11 {
    transform: rotate(-20deg);
    position: absolute;
    left: 65px;
    top: 490px;
  }
  .center-text-tt21 {
    transform: rotate(-20deg);
    position: absolute;
    left: 235px;
    top: 490px;
  }
  .center-text-tt31 {
    transform: rotate(-20deg);
    position: absolute;
    left: 435px;
    top: 490px;
  }
  .center-text-tt41 {
    transform: rotate(-20deg);
    position: absolute;
    left: 635px;
    top: 490px;
  }
  .center-text-tt51 {
    transform: rotate(-20deg);
    position: absolute;
    left: 815px;
    top: 490px;
  }
  .center-text-tt111 {
    transform: rotate(-20deg);
    position: absolute;
    left: 65px;
    top: 590px;
  }
  .center-text-tt211 {
    transform: rotate(-20deg);
    position: absolute;
    left: 235px;
    top: 590px;
  }
  .center-text-tt311 {
    transform: rotate(-20deg);
    position: absolute;
    left: 435px;
    top: 590px;
  }
  .center-text-tt411 {
    transform: rotate(-20deg);
    position: absolute;
    left: 635px;
    top: 590px;
  }
  .center-text-tt511 {
    transform: rotate(-20deg);
    position: absolute;
    left: 815px;
    top: 590px;
  }
  .center-text-ttt1 {
    transform: rotate(-20deg);
    position: absolute;
    left: 65px;
    top: 690px;
  }
  .center-text-ttt2 {
    transform: rotate(-20deg);
    position: absolute;
    left: 235px;
    top: 690px;
  }
  .center-text-ttt3 {
    transform: rotate(-20deg);
    position: absolute;
    left: 435px;
    top: 690px;
  }
  .center-text-ttt4 {
    transform: rotate(-20deg);
    position: absolute;
    left: 635px;
    top: 690px;
  }
  .center-text-ttt5 {
    transform: rotate(-20deg);
    position: absolute;
    left: 815px;
    top: 690px;
  }
  .center-text-ttt11 {
    transform: rotate(-20deg);
    position: absolute;
    left: 65px;
    top: 790px;
  }
  .center-text-ttt21 {
    transform: rotate(-20deg);
    position: absolute;
    left: 235px;
    top: 790px;
  }
  .center-text-ttt31 {
    transform: rotate(-20deg);
    position: absolute;
    left: 435px;
    top: 790px;
  }
  .center-text-ttt41 {
    transform: rotate(-20deg);
    position: absolute;
    left: 635px;
    top: 790px;
  }
  .center-text-ttt51 {
    transform: rotate(-20deg);
    position: absolute;
    left: 815px;
    top: 790px;
  }
}
.query-container {
  width: 850px;
  align-items: center;
  position: absolute;
  top: 920px;
  width: 80%;
  /* margin-left: -150px; */
  left: 50px;
  button {
    height: 40px;
    background: #409eff;
    color: #fff;
  }
}
</style>
