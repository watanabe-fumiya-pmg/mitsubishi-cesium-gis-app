import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button, Offcanvas, CloseButton } from 'react-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { loadGeoJsonData } from '../../services/loadConfig.js';
import { GeoJsonDataSource } from 'cesium';
import '../../assets/styles/custom.scss';

const ShowPlotMenu = ({
    geoJsonDataShowPlotList,
    setGeoJsonDataShowPlotList,
    viewerRef,
}) => {
    const [showPlots, setShowPlots] = useState({});
    const [dataSources, setDataSources] = useState({});
    const [show, setShow] = useState(false); // Added state to control Offcanvas visibility

    const addGeoData = async (viewerRef, filename) => {
        if (!viewerRef.current?.cesiumElement?.dataSources) {
            console.error('Viewer reference is not available.');
            return;
        }
        const geoJsonData = await loadGeoJsonData(filename);
        const geoJsonDataSource = await GeoJsonDataSource.load(geoJsonData);
        viewerRef.current.cesiumElement.dataSources.add(geoJsonDataSource);

        setDataSources((prevState) => ({
            ...prevState,
            [filename]: geoJsonDataSource,
        }));
    };

    const removeGeoData = async (viewerRef, filename) => {
        if (!viewerRef.current?.cesiumElement?.dataSources) {
            console.error('Viewer reference is not available.');
            return;
        }
        const geoJsonDataSource = dataSources[filename];
        if (geoJsonDataSource) {
            viewerRef.current.cesiumElement.dataSources.remove(
                geoJsonDataSource
            );
            setDataSources((prevState) => {
                const newState = { ...prevState };
                delete newState[filename];
                return newState;
            });
        }
    };

    const handleCheckboxChange = (fileName) => async (event) => {
        const newCheckedState = event.target.checked;

        setShowPlots((prevState) => {
            const newState = { ...prevState, [fileName]: newCheckedState };

            if (newCheckedState) {
                addGeoData(viewerRef, fileName);
            } else {
                removeGeoData(viewerRef, fileName);
            }

            return newState;
        });
    };

    const toggleShow = () => setShow(!show);

    return (
        <>
            <Button
                variant="light"
                onClick={toggleShow}
                className={`map-toggle-btn ${show ? 'active' : ''}`}
            >
                <FaMapMarkerAlt size={24} />
            </Button>

            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                placement="end"
                className="custom-side-offcanvas"
                backdrop={false}
            >
                <div className="offcanvas-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="offcanvas-title text-center w-100 text-white">
                            レイヤ切替
                        </div>
                        <CloseButton
                            className="text-white position-absolute end-0 me-3"
                            onClick={() => setShow(false)}
                        />
                    </div>
                    <div className="offcanvas-item">
                        {geoJsonDataShowPlotList.map((fileName, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={fileName}
                                checked={showPlots[fileName] || false}
                                onChange={handleCheckboxChange(fileName)}
                            />
                        ))}
                    </div>
                </div>
            </Offcanvas>
        </>
    );
};

export default ShowPlotMenu;
