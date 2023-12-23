// import * as Y from 'yjs';
// import { WebsocketProvider } from 'y-websocket';
// import { WebrtcProvider } from 'y-webrtc';

// const createYWebrtcProvider = (name, email) => {
//   const ydoc = new Y.Doc();
//   let provider;

//   try {
//     // Create a WebSocketProvider as a backup for peer discovery
//     // const wsProvider = new WebsocketProvider('ws://localhost:8080', 'unique-room-id', ydoc);
//     provider = new WebrtcProvider('unique-room-id', ydoc);

    
//   } catch (error) {
//     console.error('Failed to set up Y-Webrtc:', error);
//   }
  
//   return { ydoc, provider };
// };

// export default createYWebrtcProvider;

// src/store.ts
import { WebrtcProvider } from "y-webrtc";
import { WebsocketProvider } from "y-websocket";
import { Doc } from "yjs";

// Create the shared doc (from Yjs)
export const ydoc = new Doc();

// Create a provider
export const provider = new WebrtcProvider(
  "testroom",
  ydoc
);

// Get the provider's awareness API
export const awareness = provider.awareness;

// Set the local awareness state


