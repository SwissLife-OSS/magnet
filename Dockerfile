FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app

COPY published ./
EXPOSE 80

ENTRYPOINT ["dotnet", "Magnet.Server.dll"]
