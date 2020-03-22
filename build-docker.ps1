rm published -Force -Recurse
dotnet publish  .\src\Host\Host.csproj  -c Release -o published
docker build --no-cache -t magnet:dev2  .
#docker run -it --rm -p 5005:80 magnet:dev1

docker tag magnet:dev2 spcasquadron.azurecr.io/magnet-server:latest
docker push spcasquadron.azurecr.io/magnet-server:latest

docker tag magnet:dev2 spcasquadron.azurecr.io/magnet-server:v9
docker push spcasquadron.azurecr.io/magnet-server:v9
