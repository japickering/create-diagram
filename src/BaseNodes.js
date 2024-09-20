import { Box, Sheet, Typography } from '@mui/joy';
import { Node, NodeDragZone, Port } from '@mastir/react-diagram';

export function BaseNodes(props) {
  const nodes = [
    { title: 'First', x: -50, y: 0, ports: [{ name: 'A' }, { name: 'B' }] },
    { title: 'Second', x: 50, y: 0, ports: [{ name: 'C' }, { name: 'D' }] },
  ];

  return nodes.map((node, i) => (
    <Node key={i} model={node} position={[node.x, node.y]}>
      <Sheet
        variant="outlined"
        style={{ userSelect: 'none', borderRadius: 8, overflow: 'hidden' }}
      >
        <NodeDragZone
          onMove={(x, y) => {
            node.x = x;
            node.y = y;
          }}
        >
          <Typography
            variant="solid"
            color="primary"
            level={'title-md'}
            sx={{ paddingX: 2, marginBottom: 1 }}
          >
            {node.title}
          </Typography>
        </NodeDragZone>
        {node.ports.map((port) => (
          <Box key={port.name} sx={{ display: 'flex', marginY: 1 }}>
            <Port model={port} linkOffset={[-1, 0]}>
              <Sheet
                color="primary"
                variant="outlined"
                sx={{
                  width: 16,
                  height: 16,
                  display: 'inline-block',
                  marginRight: 1,
                }}
              />
            </Port>
            <Typography level={'title-sm'}>{port.name}</Typography>
          </Box>
        ))}
      </Sheet>
    </Node>
  ));
}
