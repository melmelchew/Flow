import 'reactflow/dist/style.css';
import { useCallback, useRef, DragEvent, useState, MouseEvent } from 'react';
import ReactFlow, { ReactFlowInstance, Node, addEdge, Connection, Edge, useNodesState, useEdgesState, Background, BackgroundVariant, MiniMap, NodeProps, EdgeTypes } from 'reactflow';
import {Controls, ClusterNode, initialNodes, initialEdges, Sidebar, InfoSidebar } from './components';
import styles from './dnd.module.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Switch } from '@mui/material'

const theme = createTheme({
  components: {
    // Name of Component
    MuiSwitch: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          zIndex: 5,
        },
      },
    },
  },
});

const nodeTypes = {
  clusterNode: ClusterNode
  
};

const rfStyle = {
  // backgroundColor: 'rgba(39, 245, 245, 0.3)',
  backgroundColor: 'white',
};

// methods for drag and drop
const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = () => `dndnode_${id++}`;

// methods for drag and drop

// methods for the minimap
const nodeColor = (node: Node) => {
  switch (node.id) {
    case '2':
      return '#2785f54d';
    case '3':
      return '#f59b276b'
  };
  switch (node.parentNode) {
    case '2':
      return '#2785f54d';
    case '3':
      return '#f59b276b';
    default:
      return '#ff0072';
  }
};

const nodeStrokeColor = (node: Node) => {
  if (node.style?.background) return `${node.style.background}`;
  if (node.type === "input") return "#0041d0";
  if (node.type === "output") return "#ff0072";
  if (node.type === "default") return "#1a192b";
  return "#eee";
}

// methods for the minimap 

const App = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setRfInstance] = useState<ReactFlowInstance | null>(null);
  const onConnect = useCallback((params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const [isOpen, setIsOpen] = useState(false); // toggle sidebar
  const [toggleInfo, setToggleInfo] = useState(false) //toggle node info sidebar
  const [nodeInfo, setNodeInfo] = useState<Node>(); // selected node's info

  const onInit = useCallback((reactFlowInstance: ReactFlowInstance) => setRfInstance(reactFlowInstance), []); 

  // methods for drag and drop//

  const ToggleSidebar = () => {
    isOpen === true ? setIsOpen(false) : setIsOpen(true);
  }

  const onDrop = (event: DragEvent) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY - 40,
      });
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    }
  };

// methods for drag and drop

// method for dynamic grouping

// const onNodeDragStart = (evt: MouseEvent, node: Node) => {
//   dragRef.current = node;
//   console.log("The current dragged node is", {dragRef})
// };

// const onNodeDrag = (evt: MouseEvent, node: Node) => {
//   // calculate the center point of the current dragging node from position and dimensions
//   const centerX = node.position.x + parseInt(node.style?.width?.toString() || "0") /2;
//   const centerY = node.position.y + parseInt(node.style?.height?.toString() || "0") / 2;

//   // find a node where the center point is inside
//   const targetNode = nodes.find(
//     (n) =>
//       centerX > n.position.x &&
//       centerX < n.position.x + parseInt(node.style?.width?.toString() || "0") &&
//       centerY > n.position.y &&
//       centerY < n.position.y + parseInt(node.style?.height?.toString() || "0") &&
//       n.id !== node.id // this is needed, otherwise we would always find the dragged node
//   );

//   setTarget(targetNode);
//   console.log("The target node's center point is:", target)
// };
const onNodeClick = (event: MouseEvent, node: Node ) => {
  console.log('Node is clicked:', node);
  setToggleInfo(true)
  setNodeInfo(node)
};
const handleDragEnd = useCallback(
  (event: MouseEvent<Element>, node: Node) => {
    let groupNode: Node = node;

    if (node.type === "clusterNode") return;

    if (reactFlowInstance){
    const nodes = reactFlowInstance.getNodes()
    
    nodes.forEach((nds: Node) => {
      if ("parentNode" in nds) {
        if (
          nds.position.x <= node.position.x &&
          nds.position.x + parseInt(nds.style?.width?.toString() || "0") >=
            node.position.x &&
          nds.position.y <= node.position.y &&
          nds.position.y + parseInt(nds.style?.height?.toString() || "0") >=
            node.position.y
        ) {
          groupNode = nds;
        }
      }
    });

    if (groupNode.id !== node.id) {
      setNodes((prevNodes) => {
        return prevNodes.map((nds) => {
          if (nds.id === node.id) {
            nds.parentNode = groupNode?.id;
            nds.position = {
              x: node.positionAbsolute?.x! - groupNode.position.x,
              y: node.positionAbsolute?.y! - groupNode.position.y
            };
          }
          return nds;
        });
      });
    } else {
      setNodes((prevNodes) => {
        return prevNodes.map((nds) => {
          if (nds.id === node.id) {
            nds.parentNode = undefined;
            nds.position = node.positionAbsolute!;
          }
          return nds;
        });
      });
    }
  }
},
  [setNodes]
);
// method for dynamic grouping

  return (
    <>
    <div className={styles.dndflow}>
      <div className={styles.wrapper}>
      <ReactFlow
        onInit={onInit}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        // onNodeDragStart={onNodeDragStart}
        // onNodeDrag={onNodeDrag}
        onNodeDragStop={handleDragEnd}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        style={rfStyle}
        minZoom={0.001}
        fitView
      >
        <ThemeProvider theme={theme}>
        <Switch checked={isOpen} onChange={ToggleSidebar} inputProps={{ 'aria-label': 'controlled' }} />
        </ThemeProvider>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <InfoSidebar toggleInfo={toggleInfo} setToggleInfo={setToggleInfo} node={nodeInfo} />
        <Background color="#ccc" variant={BackgroundVariant.Dots} />
        <Controls setNodes={setNodes} setEdges={setEdges} />
        <MiniMap nodeStrokeColor={nodeStrokeColor} nodeColor={nodeColor} zoomable pannable position='bottom-left'/>
      </ReactFlow>
      </div>
      
    </div>
    </>
  );
};

export default App;