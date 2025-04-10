export const loadSettingConfig = async () => {
    try {
        const response = await fetch('/setting.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const config = await response.json();
        return config;
    } catch (error) {
        console.error('設定の読み込みに失敗しました:', error);
    }
};

export const loadGeoJsonData = async (filename) => {
    try {
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const geoJsonData = await response.json();
        return geoJsonData;
    } catch (error) {
        console.error('GeoJSONの読み込みに失敗しました:', error);
    }
};

export const loadGeojsonDataShowPlotList = [
    '/data/sampleGeoData01.geojson',
    '/data/sampleGeoData02.geojson',
];

export const loadGeojsonDataSetLayerList = [
    '/data/sampleGeoData01.geojson',
    '/data/sampleGeoData02.geojson',
    '/data/sampleGeoData03.geojson',
    '/data/sampleGeoData04.geojson',
    '/data/sampleGeoData05.geojson',
    '/data/sampleGeoData06.geojson',
];