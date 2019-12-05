FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

WORKDIR /app
COPY published ./
EXPOSE 80

ENTRYPOINT ["dotnet", "Magnet.Server.Host.dll"]
