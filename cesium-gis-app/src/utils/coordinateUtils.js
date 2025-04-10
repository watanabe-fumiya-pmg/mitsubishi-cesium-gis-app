// utils/coordinateUtils.js
import * as Cesium from 'cesium';
import { forward } from 'mgrs';

const formatMgrs = (mgrs) => {
    if (!mgrs || mgrs.length < 10) return mgrs;

    // 基本的な MGRS 構造をパース
    const zone = mgrs.slice(0, 3); // "52S"
    const grid = mgrs.slice(3, 5); // "XD"
    const easting = mgrs.slice(5, 10); // "12345"
    const northing = mgrs.slice(10); // "12345"

    return `${zone} ${grid} ${easting} ${northing}`;
};

/**
 * マウスの位置に基づいてMGRS座標を取得する関数
 * @param {Cesium.Viewer} viewer CesiumのViewerインスタンス
 * @param {Function} setMgrsCoord MGRS座標を設定するための関数
 */
export const handleMouseMove = (viewer, setMgrsCoord) => {
    // マウスムーブイベントリスナーを設定
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction((movement) => {
        const cartesian = viewer.camera.pickEllipsoid(
            movement.endPosition,
            viewer.scene.globe.ellipsoid
        );

        if (cartesian) {
            // 緯度経度を取得
            const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            const latitude = Cesium.Math.toDegrees(cartographic.latitude);
            const longitude = Cesium.Math.toDegrees(cartographic.longitude);

            // MGRS 座標に変換
            const mgrsCoord = forward([longitude, latitude]);
            const formatMgrsCoord = formatMgrs(mgrsCoord);

            setMgrsCoord(formatMgrsCoord); // MGRS座標を更新
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};