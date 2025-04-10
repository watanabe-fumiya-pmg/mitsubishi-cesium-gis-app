// utils/initialPosition.js
import * as Cesium from 'cesium';

/**
 * 初期位置をセットする関数
 * @param {Cesium.Viewer} viewer CesiumのViewerインスタンス
 * @param {object} homePosition ホーム地点の緯度経度、高度
 */
export const setInitialPosition = (viewer, homePosition) => {
    // 初期ビュー：東京駅を中心にズームレベル9でカメラをセット
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
            homePosition.longitude,
            homePosition.latitude,
            homePosition.height
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(270),
            roll: 1000,
        },
    });
};
