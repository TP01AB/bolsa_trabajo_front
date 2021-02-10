echo "*** FRONT***"

echo "borrando contenedores"
docker-compose down --rmi all

echo "*** compose build ***"
docker build

echo "compose up :)"
docker-compose up -d --quiet-pull  

echo "***************DESPLEGANDO BACK *******************"
cd ..
cd bolsa_trabajo_back

echo "--------------borrando contenedores--------------"
docker-compose down --rmi all

echo "----------------- compose build & up ------------------"
docker build

echo "compose up :)"
docker-compose up -d --quiet-pull  

echo "*** Fin ***"