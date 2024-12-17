registry="ketidevit2"
image_name="opencsd-web-workbench"
version="v1.0"

# 1.컨테이너 실행 중지 및 컨테이너, 이미지 삭제
docker stop $image_name
docker rm $image_name 
docker rmi $registry/$image_name:$version 

# 2.컨테이너 이미지 획득 
docker pull $registry/$image_name:$version 

# 3.컨테이너 실행 
docker run -d -it --privileged \
 -p 40805:40805 \
 --network host \
 --name $image_name $registry/$image_name:$version 
