import { FC, memo} from 'react';
import { Handle, Position, NodeProps, useReactFlow, useStoreApi, NodeResizer } from 'reactflow';
import {Typography } from '@mui/material';

const ClusterNode: FC<NodeProps> = ({ id, data, isConnectable, selected }) => {
    const { setNodes } = useReactFlow();
    const store = useStoreApi();

  return (
    <div className="cluster-node">
    <NodeResizer 
    minWidth={data.minWidth ?? undefined}
        maxWidth={data.maxWidth ?? undefined}
        minHeight={data.minHeight ?? undefined}
        maxHeight={data.maxHeight ?? undefined}
        isVisible={data.isVisible ?? selected}
        shouldResize={data.shouldResize ?? undefined}
        onResizeStart={data.onResizeStart ?? undefined}
        onResize={data.onResize ?? undefined}
        onResizeEnd={data.onResizeEnd ?? undefined}
        keepAspectRatio={data.keepAspectRatio ?? undefined} />
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div className='title'>
      <Typography variant="subtitle2">
      {data.label}
      </Typography>
      </div>
      
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default memo(ClusterNode);
