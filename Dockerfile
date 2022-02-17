# pull official base image
FROM node:17.5.0-alpine
RUN npm install -g yarn

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# add app
COPY . ./
# Expose port 9000
EXPOSE 9000
# start app
CMD ["yarn", "start"]
