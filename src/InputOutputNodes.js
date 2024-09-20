import { Box, Sheet, Typography } from '@mui/joy';
import { Node, NodeDragZone, Port } from '@mastir/react-diagram';

export function InputOutputNodes(props) {
  const nodes = [
    { title: 'Output', x: -100, y: -50, outputs: [{ name: 'O' }] },
    { title: 'Input', x: 100, y: 50, inputs: [{ name: 'I' }] },
    {
      title: 'Mixed',
      x: 0,
      y: 0,
      inputs: [{ name: 'A' }],
      outputs: [{ name: 'B' }],
    },
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
            {' '}
            {node.title}
          </Typography>
        </NodeDragZone>
        {node.inputs &&
          node.inputs.map((port, i) => (
            <Box key={'in' + i} sx={{ display: 'flex', marginY: 1 }}>
              <Port
                model={port}
                linkOffset={[-1, 0]}
                canConnect={(to_port) =>
                  !!nodes.find(
                    (n) => n.outputs && n.outputs.indexOf(to_port) !== -1
                  )
                }
              >
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
        {node.outputs &&
          node.outputs.map((port, i) => (
            <Box
              key={'out' + i}
              sx={{ display: 'flex', marginY: 1, justifyContent: 'flex-end' }}
            >
              <Typography level={'title-sm'}>{port.name}</Typography>
              <Port
                model={port}
                linkOffset={[1, 0]}
                canConnect={(to_port) =>
                  !!nodes.find(
                    (n) => n.inputs && n.inputs.indexOf(to_port) !== -1
                  )
                }
              >
                <Sheet
                  color="primary"
                  variant="outlined"
                  sx={{
                    width: 16,
                    height: 16,
                    display: 'inline-block',
                    marginLeft: 1,
                  }}
                />
              </Port>
            </Box>
          ))}
      </Sheet>
    </Node>
  ));
}
