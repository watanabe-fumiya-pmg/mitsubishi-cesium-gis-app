# demo_cesium_app

GIS app

# docker build

docker-compose -f docker/docker-compose.dev.yml up --build
docker-compose -f docker/docker-compose.prod.yml up --build

# 初期構築

cd .\cesium-gis-app\
npm ci
npm run start
