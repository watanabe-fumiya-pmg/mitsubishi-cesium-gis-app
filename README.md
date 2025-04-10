# demo_cesium_app

GIS app

# docker build

docker-compose -f docker/docker-compose.dev.yml up --build
docker-compose -f docker/docker-compose.prod.yml up --build

# 初期構築

cd .\cesium-gis-app\
npm ci
npm run start

# バグ事項（後ほど issue 管理）

https://sixtusagbo.medium.com/how-i-solved-webpack-chokidar-error-error-ebusy-resource-busy-or-locked-lstat-c-dumpstack-log-e7d5fc76c861
