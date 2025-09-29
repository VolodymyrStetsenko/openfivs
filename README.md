# OpenFIVS – Federated Immersive Virtual Spaces

OpenFIVS is an experimental open‑source project aimed at building a privacy‑preserving, decentralised framework for immersive virtual spaces.  It combines open standards such as ActivityPub and WebXR to allow anyone to host their own 3D worlds, interconnect them with existing federated social networks and maintain control over their data.

This repository contains a minimal proof‑of‑concept implementation consisting of a lightweight Node.js server and a browser‑based client that demonstrate how users can connect to a server, appear as simple avatars and broadcast their movements to other participants.  The code is intentionally simple and intended as a starting point for further work.

## Features

* **Self‑hosted:** run your own instance locally or on a server.  There is no dependency on proprietary cloud services.
* **Real‑time updates:** the server uses WebSockets to broadcast join, leave and movement events to all connected clients.
* **3D experience:** the client uses [Three.js](https://threejs.org/) to render a basic grid and represent participants as coloured cubes.
* **Extensible architecture:** the protocol used between client and server is JSON‑based and intentionally simple.  Future versions will integrate ActivityPub messages to support federation and richer interactions.

## Getting started

The project is split into a `server` and a `client` folder.

### Prerequisites

* [Node.js](https://nodejs.org/) ≥ 20 is required to run the server.

### Running the server

```
cd server
npm install
npm start
```

The server will listen on port `3000` by default and expose a `GET /health` endpoint that returns a JSON status.  WebSocket clients should connect to `ws://<host>:3000`.

### Running the client

Open `client/src/index.html` in a modern web browser.  After entering a display name and clicking **Join**, the client will connect to the WebSocket server.  Moving the mouse over the canvas will update your avatar’s position; other connected users will appear as coloured cubes.

### Deployment

You can deploy the server on any Linux host that supports Node.js.  A Dockerfile and additional deployment scripts will be added in future milestones.

## Contributing

Contributions are welcome!  Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, how to file issues and submit patches.

## License

This project is licensed under the **GNU Affero General Public License v3.0**.  See the [LICENSE](LICENSE) file for details.

## Credits

This project was initiated by **Volodymyr Stecenko** as part of an NGI Commons Fund proposal.  It is a work‑in‑progress intended to demonstrate the feasibility of federated immersive virtual spaces built entirely with open‑source technologies.
