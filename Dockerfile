FROM node:14
# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
#COPY .sentryclirc ./
#COPY sentry.properties ./
#COPY sentry.client.config.js ./
#COPY sentry.server.config.js ./

RUN npm install

# Copying source files
COPY . .

ARG BUILD_ENV=stage
RUN cp .env.${BUILD_ENV} .env.production

# Building app
RUN npm run build
EXPOSE 80
# Running the app
CMD [ "npm", "start" ]