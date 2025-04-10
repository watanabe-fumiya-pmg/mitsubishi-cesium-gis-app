import {
    UrlTemplateImageryProvider,
    ArcGisMapServerImageryProvider,
} from 'cesium';

const addOSMBaseMap = (viewer) => {
    const imageryLayerCollection = viewer.imageryLayers;
    imageryLayerCollection.removeAll(); // 現在のレイヤーを削除

    // OpenStreetMapタイルレイヤーを追加
    imageryLayerCollection.addImageryProvider(
        new UrlTemplateImageryProvider({
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        })
    );
};

const addSatelliteBaseMap = (viewer) => {
    const imageryLayerCollection = viewer.imageryLayers;
    imageryLayerCollection.removeAll(); // 現在のレイヤーを削除

    // ESRI衛星タイルレイヤーを追加
    imageryLayerCollection.addImageryProvider(
        new ArcGisMapServerImageryProvider({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',
        })
    );
};

/**
 * Handle base map change based on the map type.
 * @param {object} viewer Cesium Viewer instance
 * @param {string} mapType The type of map ('OSM' or 'Satellite')
 */
export const handleBaseMapChange = (viewer, mapType) => {
    if (viewer) {
        mapType === 'OSM'
            ? addOSMBaseMap(viewer)
            : addSatelliteBaseMap(viewer);
    }
};