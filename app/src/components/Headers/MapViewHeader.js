import React, { useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { PiKeyReturnBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';

import BaseMapMenu from '../../features/BaseMapMenu/baseMapMenu.js';
import ShowPlotMenu from '../../features/ShowPlotMenu/showPlotMenu.js';
import SetLayerMenu from '../../features/SetLayerMenu/setLayerMenu.js';
import { handleBaseMapChange } from '../../utils/baseMapUtils.js';

import {
    loadGeojsonDataShowPlotList,
    loadGeojsonDataSetLayerList,
} from '../../services/loadConfig.js';
import '../../assets/styles/custom.scss';

const MapViewHeader = ({ viewerRef }) => {
    const [showBaseMapMenu, setShowBaseMapMenu] = useState(false);
    const [geoJsonDataShowPlotList, setGeoJsonDataShowPlotList] = useState(
        loadGeojsonDataShowPlotList
    );
    const [geoJsonDataSetLayerList, setGeoJsonDataSetLayerList] = useState(
        loadGeojsonDataSetLayerList
    );
    const navigate = useNavigate();

    const handleToggle = () => {
        navigate('/');
    };

    // ベースマップ切替
    const onBaseMapChange = (mapType) => {
        const viewer = viewerRef.current?.cesiumElement;
        handleBaseMapChange(viewer, mapType);
        setShowBaseMapMenu(false);
    };

    return (
        <Container fluid className="map-view-header-container">
            <Navbar>
                {/* 左端の表示切替アイコン */}
                <Navbar.Brand onClick={handleToggle}>
                    <PiKeyReturnBold size={34} /> 地図表示
                </Navbar.Brand>

                <div className="ms-auto d-flex align-items-center">
                    {/* 右端のベースマップの切り替え */}
                    <BaseMapMenu
                        showBaseMapMenu={showBaseMapMenu}
                        setShowBaseMapMenu={setShowBaseMapMenu}
                        handleBaseMapChange={onBaseMapChange}
                    />
                    {/* 右端のプロット表示の切り替え */}
                    <ShowPlotMenu
                        geoJsonDataShowPlotList={geoJsonDataShowPlotList}
                        setGeoJsonDataShowPlotList={setGeoJsonDataShowPlotList}
                        viewerRef={viewerRef}
                    />
                    {/* 右端のレイヤー選択の切り替え */}
                    <SetLayerMenu
                        geoJsonDataShowPlotList={geoJsonDataShowPlotList}
                        setGeoJsonDataShowPlotList={setGeoJsonDataShowPlotList}
                        geoJsonDataSetLayerList={geoJsonDataSetLayerList}
                        setGeoJsonDataSetLayerList={setGeoJsonDataSetLayerList}
                    />
                </div>
            </Navbar>
        </Container>
    );
};

export default MapViewHeader;
