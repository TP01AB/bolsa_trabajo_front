# Create image based on the official Node 6 image from dockerhub
FROM node:alpine

# Change directory so that our commands run inside this new directory
WORKDIR /app


COPY package.json /app

RUN apk add nodejs npm
RUN npm install -g @angular/cli

#RUN apk add --update nodejs npm
#RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

# Serve the app
CMD npm start


# Expose the port the app runs in
EXPOSE 4200

