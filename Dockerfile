FROM node:14.12-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:ssr

EXPOSE 4000

CMD [ "node", "./dist/villetta-client/server/main.js" ]

# FROM nginx:1.19-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/dist/villetta-client /usr/share/nginx/html


