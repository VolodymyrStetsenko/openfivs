FROM node:20-alpine
WORKDIR /app

# Copy server code
COPY server/package.json server/package-lock.json* ./server/
RUN cd server && npm install --production

COPY server/src ./server/src

EXPOSE 3000
CMD ["node", "server/src/server.js"]
