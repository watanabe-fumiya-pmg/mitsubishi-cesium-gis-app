import React, { useState } from 'react';
import { Button, Offcanvas, CloseButton } from 'react-bootstrap';
import { FaMap } from 'react-icons/fa';
import '../../assets/styles/custom.scss';

const BaseMapMenu = ({ handleBaseMapChange }) => {
    const [show, setShow] = useState(false);
    const [selectedMap, setSelectedMap] = useState('OSM');

    const toggleShow = () => setShow(!show);

    const handleSelect = (mapType) => {
        handleBaseMapChange(mapType);
        setSelectedMap(mapType);
        setShow(false);
    };

    return (
        <>
            <Button
                variant="light"
                onClick={toggleShow}
                className={`map-toggle-btn ${show ? 'active' : ''}`}
            >
                <FaMap size={24} />
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
                            ベースマップ切り替え
                        </div>
                        <CloseButton
                            className="text-white position-absolute end-0 me-3"
                            onClick={() => setShow(false)}
                        />
                    </div>

                    <div
                        className={`offcanvas-item ${
                            selectedMap === 'OSM' ? 'selected' : ''
                        }`}
                        onClick={() => handleSelect('OSM')}
                    >
                        {selectedMap === 'OSM' && '✔ '}OpenStreetMap
                    </div>
                    <div
                        className={`offcanvas-item ${
                            selectedMap === 'Satellite' ? 'selected' : ''
                        }`}
                        onClick={() => handleSelect('Satellite')}
                    >
                        {selectedMap === 'Satellite' && '✔ '}Satellite
                    </div>
                </div>
            </Offcanvas>
        </>
    );
};

export default BaseMapMenu;
