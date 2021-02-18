# Create image based on the official Node 6 image from dockerhub
FROM node:alpine

# Change directory so that our commands run inside this new directory

WORKDIR /app
COPY  . /app
# Serve the app
COPY ./init.sh /usr/bin/
#ENTRYPOINT ["sh","/usr/local/bin/init.sh"]
ENTRYPOINT ["sh","/usr/bin/init.sh"]

# Expose the port the app runs in
EXPOSE 4200

