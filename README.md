This project was created by @mastir as a simple replacement for [projectstorm/react-diagrams](https://github.com/projectstorm/react-diagrams).

# What is it

React diagram is a collection of base components to create flow chart or process flow.

[Live demo](https://codesandbox.io/p/sandbox/react-diagram-sv4743)

# What is included

- React components to implement base logic: Diagram, Node, Port, NodeDragZone
- callbacks to handle business logic: Port.canConnect, Port.onConnect, NodeDragZone.onMove
- base state handlers for: scroll, zoom, drag view, move nodes, connect ports.

# Setup

`npm i --save @mastir/react-diagram`

# How to use

This react-diagram library packages the main app using a CSS wrapper to inject CSS and a memo wrapper, instead of the native React useMemo() hook to memoize the diagram engine.

```index.js
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StyledEngineProvider, CssVarsProvider } from "@mui/joy/styles";
import { App } from "./App";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider>
        <App />
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
```

# Components

## User defined types

TNode, TPort, TLink - unique `string` or any `object` representing element ( you should avoid object recreation or duplication )

## Diagram

Root component

| prop         | type             | description                                                                                          |
| ------------ | ---------------- | ---------------------------------------------------------------------------------------------------- |
| engine\*     | EngineModel      | Main diagram container                                                                               |
| links\*      | TLink[]          | List of all links to display                                                                         |
| createLink   | (TPort)=>TLink   | TLink factory                                                                                        |
| getLinkStyle | (TLink) => style | default {color:'#FFF', width: 2, curviness: 50}                                                      |
| linksLayer   | React.Element    | You can pass LinksLayer state handler wrap component (to avoid whole diagram redraw on link updates) |

## Node

Container for any element placed in Diagram

| prop       | type            | description                                                    |
| ---------- | --------------- | -------------------------------------------------------------- |
| model\*    | TNode           | any object represented by this element                         |
| position\* | [number,number] | node position x axis                                           |
| key        | string          | required for all nodes, its recomended to use any generated id |

## Port

Container for connectors in Node

| prop       | type                    | description                                                                         |
| ---------- | ----------------------- | ----------------------------------------------------------------------------------- |
| model\*    | TPort                   | any object represented by this element                                              |
| linkOffset | [number,number]         | link connection point ([-1,1] = left bottom, [0,-1] = center,top), default = [0, 0] |
| createLink | ()=>TLink               | new TLink factory, created from this port                                           |
| canConnect | (TPort, TLink)=>boolean | default: ()=>true                                                                   |
| onConnect  | (TPort, TLink)=>void    | callback for new link connection                                                    |

## NodeDragZone

| prop   | type        | description                |
| ------ | ----------- | -------------------------- |
| onMove | (x,y)=>void | callback for node move end |

## LinksLayer

react component to render links in svg

## EngineModel

This is core container of the diagram. Engine contains 3 services: canvas, state, links

### CanvasModel

Contain information about currently rendered elements and provide methods to work with coordinates and elements

### StateMachineModel

Event processing service, active state handler can trigger state transitions.
All of the action logic ([zoom](src/State/ZoomHandler.js), [drag canvas](src/State/DragCanvasState.js), [move node](src/State/DragNodeState.js), [create link](src/State/CreateLinkState.js)) realised in state handlers and can be extended and customized.

### LinkListModel

Contain information about rendered TLink[] models and methods to redraw them
