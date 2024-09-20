import { memo, useState } from 'react';
import './app.css';

import { Sheet, List, ListItem, ListItemButton } from '@mui/joy';
import {
  CreateLinkState,
  DefaultState,
  Diagram,
  DragCanvasState,
  DragNodeState,
  EngineModel,
  ZoomHandler,
} from '@mastir/react-diagram';

import { BaseNodes } from './BaseNodes';
import { InputOutputNodes } from './InputOutputNodes';

const engine = new EngineModel();
engine.state.addStateHandler(new DefaultState());
engine.state.addStateHandler(new CreateLinkState());
engine.state.addStateHandler(new DragNodeState());
engine.state.addStateHandler(new DragCanvasState());
engine.state.actions.push(new ZoomHandler(engine));
/**
 * The main application component that renders the diagramming interface.
 * It uses React's memoization feature to optimize rendering performance.
 * @returns {JSX.Element} - The rendered application component.
 */
export function App() {
  // State variable to store the current demo mode
  const [demo, setDemo] = useState('basic');
  const demos = {
    basic: () => <BaseNodes />,
    inout: () => <InputOutputNodes />,
  };
  const links = [];

  // Render Main container with secondary color and solid variant
  return (
    <Sheet
      color="secondary"
      variant="solid"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Sidebar with primary color and solid variant */}
      <Sheet color="primary" variant="solid" sx={{ flex: '200px 0 0' }}>
        <List>
          {Object.keys(demos).map((k) => (
            <ListItem>
              <ListItemButton
                color={demo === k ? 'primary' : 'secondary'}
                onClick={(e) => setDemo(k)}
                key={{ k }}
              >
                {k}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Sheet>

      {/* Diagram container with primary color and outlined variant
      Renders the current demo component */}
      <Sheet color="primary" variant="outlined" sx={{ flex: '1 1' }}>
        <Diagram
          engine={engine} // Diagram engine instance
          links={links} // Array of diagram links
          size={[1000, 1000]} // Diagram size
          style={{ backgroundColor: '#111', height: '100%' }}
        >
          {demos[demo]()}
        </Diagram>
      </Sheet>
    </Sheet>
  );
}

const memoApp = memo(App);

export default memoApp;
