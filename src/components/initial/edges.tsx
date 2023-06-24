import { Edge, MarkerType } from "reactflow";

const initialEdges: Edge[] = [
    {
    id:"2.2-2.3",
    source:"2.2",
    target:"2.3",
    type: "step",
    markerEnd: {type: MarkerType.ArrowClosed, color: 'black', },
    style: {strokeWidth: 2, stroke: 'black'},
    },
    {
    id:"2.3-3.1",
    source:"2.3",
    target:"3.1",
    type: "step",
    markerEnd: {type: MarkerType.ArrowClosed, color: 'black', },
    style: {strokeWidth: 2, stroke: 'black'},
    },
    {
    id:"2.1-2.3",
    source:"2.1",
    target:"2.3",
    type: "step",
    markerEnd: {type: MarkerType.ArrowClosed, color: 'black', },
    style: {strokeWidth: 2, stroke: 'black'},
    },
    {
    id:"1-2.1",
    source:"1",
    target:"2.1",
    type: "step",
    markerEnd: {type: MarkerType.ArrowClosed, color: 'black', },
    style: {strokeWidth: 2, stroke: 'black'},
    }
  ]
export default initialEdges;