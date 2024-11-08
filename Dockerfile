FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
#copy credential file to image
COPY secret/capstone-glowfy-storage.json ./capstone-glowfy-storage.json

CMD ["npm", "start"]
