# coins


docker build -t coins .

docker run -i -t coins

//Refresh
docker-compose build --no-cache


gem install travis
travis encrypt DOCKER_EMAIL=<docker-cloud-email> --add env.global
travis encrypt DOCKER_USER=<docker-cloud-user> --add env.global
travis encrypt DOCKER_PASS=<-docker-cloud-pass> --add env.global

//Create a respository insert on .travis.yml

db:
  image: 'rethinkdb:latest'
  ports:
    - '8080:8082'
    - '28015:28017'
web:
  environment:
    - PROJECT_NAME=Hefesoft
    - RDB_HOST=db
    - RDB_PORT=28017
  image: 'chibchombiano26/coins'
  links:
    - db
  ports:
    - '80:8081'