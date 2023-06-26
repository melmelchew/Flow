import { DragEvent, } from 'react';
import { Paper, Drawer, Typography, Switch,  } from '@mui/material';
import styles from './dnd.module.css';

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};


const Sidebar = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <Drawer variant='temporary' sx={{display:'flex', 
    maxWidth: 180,
    width: 1/5,}} anchor='left' hideBackdrop={true} open={isOpen}>
      <Switch checked={isOpen} onChange={() => {setIsOpen(false)}} />
      {/* <IconButton onClick={() => {setIsOpen(false)}}>
            <ChevronLeft />
      </IconButton> */}
      <Typography sx={{display: 'flex',
      maxWidth:180, margin:1,
      }} variant='caption'>You can drag these nodes to the pane on the right.</Typography>

      <Paper className="react-flow__node-input" onDragStart={(event: DragEvent) => onDragStart(event, 'input')} draggable sx={{margin:1}}>
        Input Node
      </Paper>
      <Paper
        className="react-flow__node-default"
        onDragStart={(event: DragEvent) => onDragStart(event, 'default')}
        draggable sx={{margin:1}}
      >
        Default Node
      </Paper>
      <Paper
        className="react-flow__node-output"
        onDragStart={(event: DragEvent) => onDragStart(event, 'output')}
        draggable sx={{margin:1}}
      >
        Output Node
      </Paper>
      {/* <div
        className={styles.colorSelector}
        onDragStart={(event: DragEvent) => onDragStart(event, 'selectColor')}
        draggable
      >
        Select Color
      </div> */}
    </Drawer>
  );
};

export default Sidebar;