FROM node:lts-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.json eslint.config.ts jest.config.js ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "node", "dist/index.js" ]