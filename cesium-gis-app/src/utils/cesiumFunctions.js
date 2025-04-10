import * as Cesium from 'cesium';

export const setInitialView = (viewer, homePosition) => {
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(
            homePosition.longitude,
            homePosition.latitude,
            homePosition.height
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: 0,
        },
    });
};

export const zoomIn = (viewer) => {
    viewer.camera.defaultZoomAmount = 1000;
    viewer.camera.zoomIn();
};

export const zoomOut = (viewer) => {
    viewer.camera.defaultZoomAmount = 1000;
    viewer.camera.zoomOut();
};

export const goHome = (viewer, homePosition) => {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            homePosition.longitude,
            homePosition.latitude,
            homePosition.height
        ),
        duration: 2, // 移動の速さ（2秒）
    });
};

export const handleLeftClick = (viewer, movement, setClickedPosition) => {
    const scene = viewer.scene;
    const cartesian = viewer.camera.pickEllipsoid(
        movement.position,
        scene.globe.ellipsoid
    );

    if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude);

        setClickedPosition({ latitude, longitude });
    } else {
        console.log('クリック位置が無効です');
    }
};

export const convert3DTo2D = (viewer) => {
    const camera = viewer.camera;
    // 現在のカメラ位置を取得
    const currentPosition = camera.positionCartographic;

    // 2D俯瞰視点を設定
    const latitude = currentPosition.latitude;
    const longitude = currentPosition.longitude;

    // 2D視点にするためにカメラの方向を設定
    camera.flyTo({
        destination: Cesium.Cartesian3.fromRadians(longitude, latitude, 10000), // 高度を調整して俯瞰視点に
        orientation: {
            heading: 0,
            pitch: Cesium.Math.toRadians(-90),
            roll: 0,
        },
        duration: 3,
    });
};