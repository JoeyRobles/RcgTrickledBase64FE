FROM node:14.21-alpine3.16 as build
WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .
RUN npm install
COPY . .
RUN ng build --configuration=development

FROM nginx as runtime
COPY --from=build /app/dist/joey-rcg-try-out-fe /usr/share/nginx/html
