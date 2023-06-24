import React, { memo, useCallback, Dispatch, FC, } from 'react';
import { useReactFlow, Edge, Node, ReactFlowJsonObject } from 'reactflow';
import localforage from 'localforage';
import {Button, ButtonGroup} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import styles from './save.module.css';
import test from './initial/output.json';

localforage.config({
  name: 'react-flow',
  storeName: 'flows',
});

const flowKey = 'example-flow';


const getNodeId = () => `randomnode_${+new Date()}`;

type ControlsProps = {
  setNodes: Dispatch<React.SetStateAction<Node<any>[]>>;
  setEdges: Dispatch<React.SetStateAction<Edge<any>[]>>;
};


const Controls: FC<ControlsProps> = ({ setNodes, setEdges }) => {
  const { setViewport, toObject } = useReactFlow();

  const onSave = useCallback(() => {
    const flow = toObject();
    console.log(flow);
    localforage.setItem(flowKey, flow);
    //document.write(JSON.stringify(flow));
  }, [toObject]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow: ReactFlowJsonObject | null = await localforage.getItem(flowKey);

      if (flow) {
        const { x, y, zoom } = flow.viewport;

        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom: zoom || 0 });
      }
    };

    restoreFlow();
  }, [setNodes, setEdges, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: `random_node-${getNodeId()}`,
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onLoad = useCallback(() => {
    const restoreFlow = async () => {
      //const flow: ReactFlowJsonObject | null = await localforage.getItem(flowKey);
      const flow: ReactFlowJsonObject = test;

      if (flow) {
        const { x, y, zoom } = flow.viewport;

        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom: zoom || 0 });
      }
    };

    restoreFlow();
  }, [setNodes, setEdges, setViewport]);

  const onAddGroup = useCallback( () => {
    const newGroupNode = {
      id: `group_node-${getNodeId()}`,
      data: { 
        label: 'Group Node Resizable',
        
      },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
      type: 'clusterNode',
      style: {
        zIndex: -1,
        keepAspectRatio: true,
        minWidth: 320,
        minHeight: 210,
        maxWidth: 1000,
        maxHeight: 1000,
        backgroundColor: 'rgba(153,26,152,.1)',
        border: 10,
      }
    };
    setNodes((nds) => nds.concat(newGroupNode));
  }, [setNodes])
  
  return (
    <ButtonGroup variant="outlined" className={styles.controls} aria-label="outlined primary button group">
      <Button className={styles.button} onClick={onSave} startIcon={<SaveIcon />}>
        save
      </Button>
      <Button className={styles.button} onClick={onRestore}>
        restore
      </Button>
      <Button className={styles.button} onClick={onAdd}>
        add node
      </Button>
      <Button className={styles.button} onClick={onAddGroup}>
        add group node
      </Button>
      <Button className={styles.button} onClick={onLoad}>
        Import
      </Button>
      </ButtonGroup>
  );
};

export default memo(Controls);