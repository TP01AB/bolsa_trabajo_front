# Create image based on the official Node 6 image from dockerhub
FROM node:alpine

# Change directory so that our commands run inside this new directory
RUN mkdir -p /app
WORKDIR /app
# Serve the app
COPY ./init.sh /tmp/
ENTRYPOINT ["sh","/tmp/init.sh"]

# Expose the port the app runs in
EXPOSE 4200

