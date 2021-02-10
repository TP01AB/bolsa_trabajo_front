# Create image based on the official Node 6 image from dockerhub
FROM node:alpine

# Change directory so that our commands run inside this new directory
RUN mkdir -p /app
WORKDIR /app

COPY package.json  /app

RUN apk add nodejs npm

RUN npm install && npm update && npm install -g @angular/cli && npm install --save-dev @angular-devkit/build-angular

# Serve the app
COPY ./init.sh /tmp/
ENTRYPOINT ["sh","/tmp/init.sh"]

# Expose the port the app runs in
EXPOSE 4200

