# pull official base image
FROM node:17.5.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
RUN rm -rf /app/node_modules
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
COPY yarn.lock ./
# add app
COPY . ./
# RUN yarn install
RUN rm -rf node_modules/ && yarn install
# Expose port 9000
EXPOSE 9000
# start app
CMD ["yarn", "start"]
