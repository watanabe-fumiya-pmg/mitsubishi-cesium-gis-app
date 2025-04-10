import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {
    FaSearchPlus,
    FaSearchMinus,
    FaHome,
    FaCompass,
} from 'react-icons/fa';
import {
    zoomIn,
    zoomOut,
    goHome,
    convert3DTo2D,
} from '../../utils/cesiumFunctions.js';

const MapViewToolbar = ({ viewerRef, homePosition }) => {
    return (
        <Card
            style={{
                position: 'fixed',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}
        >
            <Button
                variant="light"
                className="mb-2"
                onClick={() => zoomIn(viewerRef.current?.cesiumElement)}
            >
                <FaSearchPlus size={24} />
            </Button>
            <Button
                variant="light"
                className="mb-2"
                onClick={() => zoomOut(viewerRef.current?.cesiumElement)}
            >
                <FaSearchMinus size={24} />
            </Button>
            <Button
                variant="light"
                className="mb-2"
                onClick={() =>
                    goHome(viewerRef.current?.cesiumElement, homePosition)
                }
            >
                <FaHome size={24} />
            </Button>
            <Button
                variant="light"
                onClick={() => convert3DTo2D(viewerRef.current?.cesiumElement)}
            >
                <FaCompass size={24} />
            </Button>
        </Card>
    );
};

export default MapViewToolbar;
