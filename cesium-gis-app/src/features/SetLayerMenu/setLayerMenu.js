import React, { useState } from 'react';
import { Button, Form, Offcanvas, CloseButton } from 'react-bootstrap';
import { FaLayerGroup } from 'react-icons/fa';

const SetLayerMenu = ({
    geoJsonDataShowPlotList,
    setGeoJsonDataShowPlotList,
    geoJsonDataSetLayerList,
    setGeoJsonDataSetLayerList,
}) => {
    const [show, setShow] = useState(false);
    const [checkedItems, setCheckedItems] = useState(
        geoJsonDataSetLayerList.reduce((acc, fileName) => {
            acc[fileName] = geoJsonDataShowPlotList.includes(fileName);
            return acc;
        }, {})
    );

    const handleCheckboxChange = (fileName) => {
        setCheckedItems((prevCheckedItems) => ({
            ...prevCheckedItems,
            [fileName]: !prevCheckedItems[fileName],
        }));
    };

    const handleAddSelectedItems = () => {
        const newItems = geoJsonDataSetLayerList.filter(
            (fileName) =>
                checkedItems[fileName] &&
                !geoJsonDataShowPlotList.includes(fileName)
        );
        setGeoJsonDataShowPlotList((prevList) => [...prevList, ...newItems]);
    };

    const toggleShow = () => setShow(!show); // Function to toggle the Offcanvas visibility

    return (
        <>
            <Button
                variant="light"
                onClick={toggleShow}
                className={`map-toggle-btn ${show ? 'active' : ''}`}
            >
                <FaLayerGroup size={24} />
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
                            レイヤ追加
                        </div>
                        <CloseButton
                            className="text-white position-absolute end-0 me-3"
                            onClick={() => setShow(false)}
                        />
                    </div>
                    <div className="offcanvas-item">
                        {geoJsonDataSetLayerList.map((fileName, index) => (
                            <Form.Check
                                key={index} // Adding key for list items
                                type="checkbox"
                                label={fileName}
                                checked={checkedItems[fileName] || false}
                                onChange={() => handleCheckboxChange(fileName)}
                            />
                        ))}
                        <Button
                            onClick={handleAddSelectedItems}
                            variant="primary"
                            size="sm"
                        >
                            追加
                        </Button>
                    </div>
                </div>
            </Offcanvas>
        </>
    );
};

export default SetLayerMenu;
