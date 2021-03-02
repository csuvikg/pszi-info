FROM node:lts-alpine as builder

WORKDIR /app

COPY . .

RUN npm install --silent

RUN npm run build

FROM nginx:mainline-alpine

COPY --from=builder /app/build /usr/share/nginx/html
