import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions({
      openTable:'centertable/openTable',
      setTable:'centertable/setTable',
      setField: 'centertable/setField',
      setChart: 'centertable/setChart'
    }),

    getNodeByLine(node, portId){
      let state = this.$store.state;
      let lineId = node.ports[portId].lineId;
      if(lineId === -1) return null;
      else {
        let selfName = node.ports[portId].name;
        let line = state.mylines.lines[lineId];
        let otherNode;
        if(line.start === selfName){
          otherNode = line.end.split('_')[0];
        }
        else {
          otherNode = line.start.split('_')[0];
        }
        return state.mynodes.nodes[otherNode];
      }
    }
  },
}