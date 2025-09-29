# Architectural Overview

## Motivation

OpenFIVS aims to create an **open, federated architecture** for immersive virtual spaces.  Existing metaverse platforms tend to be either closed ecosystems or loosely federated at best.  By building on top of open protocols such as ActivityPub and WebXR, OpenFIVS allows independent operators to host their own virtual worlds while still connecting to a wider social fabric.

## Components

The project is split into two principal components:

| Component | Description |
|---|---|
| **Server** | A Node.js application that exposes a WebSocket API for real‑time state updates (join/leave/move events).  Future versions will implement the ActivityPub protocol to federate events between servers. |
| **Client** | A browser‑based application built with Three.js that connects to a server via WebSockets, renders a simple 3D scene and represents participants as coloured cubes.  Users control their avatar by moving the mouse. |

## Data Flow

1. A user opens the client and enters a display name.
2. The client creates a WebSocket connection to the server and sends a `join` message.
3. The server assigns a unique identifier and broadcasts a `join` event to all other connected clients.
4. Each client creates a cube to represent the new participant.
5. As a user moves their mouse, the client sends `move` messages containing their new 3D coordinates.  The server relays these to other clients, which update the position of the corresponding cube.
6. When a client disconnects, the server broadcasts a `leave` event to remove the avatar from other clients.

## Future Work

* **ActivityPub Integration:** define message types representing world state changes (e.g. join, move, chat) and implement an ActivityPub actor for each hosted world.  Use shared inbox/outbox mechanisms to federate events across servers.
* **Persistent Worlds:** store and synchronise scene state using a versioned, append‑only log (e.g. permaweb or IPFS).  Allow worlds to persist across server restarts.
* **Authentication:** integrate self‑sovereign identity (SSI) technologies (e.g. DID/VC) to allow users to prove ownership of avatars and assets without revealing personal information.
* **Rich Avatars and Assets:** support glTF and USD formats for avatars and environments.  Provide tooling for converting and validating assets under open licences.

## Security and Privacy Considerations

* **Minimal Data Collection:** clients transmit only essential information (identifier, display name, coordinates).  No personal data beyond the chosen display name is stored on the server.
* **Encryption:** future versions will support TLS and end‑to‑end encryption of ActivityPub messages.  WebSocket connections should be upgraded to WSS in production deployments.
* **Access Control:** once ActivityPub integration is in place, standard mechanisms such as signed HTTP requests and authenticated inboxes can restrict access to trusted peers.
