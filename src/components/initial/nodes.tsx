import { Node } from 'reactflow';

const initialNodes: Node[] = [
    {
        style:{"width":150,"height":40, fontFamily: 'Tahoma'},
        id:"1",
        type:"input",
        // you can also pass a React component as a label
        data:{label:"1"},
        position:{x: 150, y: 5}
        },
        {
        style:{backgroundColor: "rgba(39, 133, 245, 0.3)", width:500, height:700, fontFamily: 'Tahoma'},
        id:"2",
        type:"default",
        data:{label:"2"},
        position:{"x":100,"y":100}
  
        },
        {
        style:{width:150, height:40, backgroundColor: '#2785f54d', fontFamily: 'Tahoma', display: 'flex', justifyContent: 'center', overflowWrap: 'anywhere'},
        id:"2.3",
        type:"default",
        data:{label:"2.3"},
        position:{"x":175,"y":360},
        parentNode:"2"
        },
        {
        style:{width:150,height:40, backgroundColor: '#2785f54d', fontFamily: 'Tahoma', display: 'flex', justifyContent: 'center', overflowWrap: 'anywhere'},
        id:"2.1",
        type:"default",
        data:{label:"2.1"},
        position:{x:50,y:110},
        parentNode:"2"
        },
        {
        style:{width:150,height:40, backgroundColor: "#2785f54d", fontFamily: 'Tahoma'},
        id:"2.2",
        type:"default",
        data:{label:"2.2"},
        position:{"x":310,"y":110},
        parentNode:"2"
        },
        {
        style:{width:200, height:200, backgroundColor:"rgba(245,176,39,0.5)", fontFamily: 'Tahoma'},
        id:"3",
        type:"default",
        data:{label:"3"},
        position:{x:150,y:450},
        parentNode:"2"
        },
        {
        style:{width:150, height:40, backgroundColor: 'orange', fontFamily: 'Tahoma'},
        id:"3.1",
        type:"output",
        data:{label:"3.1"},
        position:{x:25,y:100},
        parentNode: "3"
        }
]
export default initialNodes