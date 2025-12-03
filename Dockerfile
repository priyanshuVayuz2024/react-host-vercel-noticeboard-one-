FROM node:20-slim as server
ENV PORT=8000
WORKDIR /app

# Copy already-built React files
COPY dist ./dist

# Copy server code
COPY ./server ./server

WORKDIR /app/server
RUN npm install && npm cache clean --force

EXPOSE $PORT
CMD ["node", "index.js"]
