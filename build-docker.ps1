rm published -Force -Recurse
dotnet publish  .\src\Host\Host.csproj  -c Release -o published
docker build --no-cache -t magnet:dev1  .
#docker run -it --rm -p 5005:80 magnet:dev1

docker tag magnet:dev1 spcasquadron.azurecr.io/magnet-server:v2
docker push spcasquadron.azurecr.io/magnet-server:v2
