FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app

COPY dist/host ./
EXPOSE 80

ENTRYPOINT ["dotnet", "Magnet.Sample.dll"]
