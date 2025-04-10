import * as Cesium from 'cesium';

// エンティティの更新処理
export const updateDataLayer = (viewer, plotData, showPlots) => {
    plotData.forEach(({ fileName, data }) => {
        data.forEach((item) => {
            const entityId = `plot-${item.layername}-${item.id}`;
            const existingEntity = viewer.entities.getById(entityId);
            // 基本的なエンティティの追加処理
            if (!existingEntity && showPlots[fileName]) {
                if (item.type === 'entity' && showPlots[fileName]) {
                    // ポイントエンティティ
                    viewer.entities.add({
                        id: entityId,
                        position: Cesium.Cartesian3.fromDegrees(
                            item.longitude,
                            item.latitude
                        ),
                        point: {
                            pixelSize: 10,
                            color: Cesium.Color.RED,
                            outlineColor: Cesium.Color.WHITE,
                            outlineWidth: 2,
                        },
                        label: {
                            text: item.label,
                            font: '14px sans-serif',
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            fillColor: Cesium.Color.WHITE,
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 2,
                            pixelOffset: new Cesium.Cartesian2(0, -20),
                        },
                        show: showPlots[fileName],
                    });
                } else if (item.type === 'line' && showPlots[fileName]) {
                    // ラインエンティティ
                    const coordinates = item.coordinates
                        .map((coord, index) => {
                            if (index % 3 === 0) {
                                return Cesium.Cartesian3.fromDegrees(
                                    item.coordinates[index],
                                    item.coordinates[index + 1],
                                    item.coordinates[index + 2]
                                );
                            }
                            return null;
                        })
                        .filter((coord) => coord !== null);

                    viewer.entities.add({
                        id: entityId,
                        polyline: {
                            positions: coordinates,
                            width: 3,
                            material: Cesium.Color.RED,
                        },
                        label: {
                            text: item.label,
                            font: '14px sans-serif',
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            fillColor: Cesium.Color.WHITE,
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 2,
                            pixelOffset: new Cesium.Cartesian2(0, -20),
                        },
                        show: showPlots[fileName],
                    });
                } else if (item.type === 'polygon' && showPlots[fileName]) {
                    // ポリゴンエンティティ
                    const coordinates = item.coordinates
                        .map((coord, index) => {
                            if (index % 3 === 0) {
                                return Cesium.Cartesian3.fromDegrees(
                                    item.coordinates[index],
                                    item.coordinates[index + 1],
                                    item.coordinates[index + 2]
                                );
                            }
                            return null;
                        })
                        .filter((coord) => coord !== null);

                    viewer.entities.add({
                        id: entityId,
                        polygon: {
                            hierarchy: new Cesium.PolygonHierarchy(
                                coordinates
                            ),
                            material: Cesium.Color.BLUE.withAlpha(0.5),
                        },
                        label: {
                            text: item.label,
                            font: '14px sans-serif',
                            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                            fillColor: Cesium.Color.WHITE,
                            outlineColor: Cesium.Color.BLACK,
                            outlineWidth: 2,
                            pixelOffset: new Cesium.Cartesian2(0, -20),
                        },
                        show: showPlots[fileName],
                    });
                }
            } else if (existingEntity) {
                existingEntity.show = showPlots[fileName];
            }
        });
    });
};