
FROM node:8.9.3

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm i -g @angular/cli@1.0.2

# Install app dependencies
COPY package.json /usr/src/app/

RUN npm install -g npm@3.5.2 --silent

COPY . .

RUN ng build --env=prod 

EXPOSE 4200
CMD ["ng", "serve", "--env=prod", "--host", "0.0.0.0"] 
