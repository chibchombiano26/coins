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