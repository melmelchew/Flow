import { Node } from 'reactflow';
import { Drawer, Typography, IconButton  } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

const InfoSidebar = ({toggleInfo, setToggleInfo, node}: {toggleInfo: boolean, setToggleInfo: React.Dispatch<React.SetStateAction<boolean>>, node: Node|undefined}) => {
  return (
    <Drawer variant='temporary' sx={{display:'flex',
    width: 200,}} anchor='right' hideBackdrop={true} open={toggleInfo}>
      {/* <Switch checked={toggleInfo} onChange={() => {setToggleInfo(false)}} /> */}
      <IconButton onClick={() => {setToggleInfo(false)}}>
            <CloseOutlined/>
      </IconButton>
      <Typography sx={{display: 'flex', margin:1,
      }} variant='caption'>Displaying node data: {node?.id} </Typography>

    </Drawer>
  );
};

export default InfoSidebar;