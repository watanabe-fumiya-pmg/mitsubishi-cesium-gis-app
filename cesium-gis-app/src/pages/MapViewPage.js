import React, { useEffect, useState } from 'react';
import { Viewer } from 'resium';
import { MapProvider, useMapContext } from '../providers/MapContext.js';
import { setInitialPosition } from '../utils/initialPosition.js';
import { handleBaseMapChange } from '../utils/baseMapUtils.js';
import { loadSettingConfig } from '../services/loadConfig.js';
import MapViewHeader from '../components/Headers/MapViewHeader.js';
import MapViewToolbar from '../components/Toolbars/MapViewToolbar.js';
import MapViewFooter from '../components/Footers/MapViewFooter.js';

const MapViewPage = () => {
    const { viewerRef } = useMapContext();
    const [homePosition, setHomePosition] = useState(null);
    const [selectedMap, setSelectedMap] = useState('OSM');

    // 設定値読み込み
    const fetchConfig = async () => {
        try {
            const configSetting = await loadSettingConfig();
            if (configSetting) {
                setHomePosition(configSetting.homePosition);
                setSelectedMap(configSetting.defaultSelectMap);
            }
        } catch (err) {
            console.error('初期設定の読み込みに失敗しました:', err);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    // 初期位置設定
    useEffect(() => {
        if (homePosition) {
            const viewer = viewerRef.current?.cesiumElement;
            if (viewer) {
                setInitialPosition(viewer, homePosition);
                handleBaseMapChange(viewer, selectedMap);
            }
        }
    }, [homePosition]);

    return (
        <>
            <MapViewHeader viewerRef={viewerRef} />

            <Viewer
                ref={viewerRef}
                fluid
                className="map-view-main-container"
                ScreenSpaceEventHandler={false}
                selectedImageryProviderViewModel={null}
                homeButton={false}
                geocoder={false}
                sceneModePicker={false}
                timeline={false}
                navigationHelpButton={false}
                animation={false}
                showRenderLoopErrors={false}
                logo={false}
                infoBox={false}
                baseLayerPicker={false}
            />

            <MapViewToolbar
                viewerRef={viewerRef}
                homePosition={homePosition}
            />
            <MapViewFooter viewerRef={viewerRef} />
        </>
    );
};

export default () => (
    <MapProvider>
        <MapViewPage />
    </MapProvider>
);
