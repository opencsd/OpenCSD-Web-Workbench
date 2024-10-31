docker_id="ketidevit2"
controller_name="opencsd-web-workbench"
version="v1.0"

docker build -t $docker_id/$controller_name:$version . && \
docker push $docker_id/$controller_name:$version