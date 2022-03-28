# Image source
FROM node:14.16.1-alpine

# Docker working directory
WORKDIR /app

# Copying file into APP directory of docker
COPY ./package.json ./yarn.lock /app/

# Then install the NPM module
RUN yarn install --pure-lockfile

# Copy current directory to APP folder
COPY . /app/

EXPOSE 3000
CMD ["yarn", "start:dev"]