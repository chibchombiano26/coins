# coins


docker build -t coins .

docker run -i -t coins

//Refresh
docker-compose build --no-cache


gem install travis
travis encrypt DOCKER_EMAIL=jose.douglas.ramirez@outlook.com --add env.global
travis encrypt DOCKER_USER=chibchombiano26 --add env.global
travis encrypt DOCKER_PASS=iguazo262 --add env.global

//Create a respository insert on .travis.yml
//First external port then local
dbcoin:
  image: 'rethinkdb:latest'
  ports:
    - '8085:8080'
    - '28017:28015'
servercoin:
  environment:
    - RDB_HOST=dbcoin
    - RDB_PORT=28017
  image: 'chibchombiano26/coins:latest'
  links:
    - dbcoin
  ports:
    - '8084:80'