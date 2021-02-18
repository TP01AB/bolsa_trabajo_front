#!/bin/sh
echo "------npm nodejs install------"
apk add --update nodejs npm
echo "------npm install------"
npm install -y
echo "-----FIN -----"
echo "------Iniciar servidor------"
npm start -y

echo "------Fin de Script------"
