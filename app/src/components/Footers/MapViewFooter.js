import React, { useEffect, useState } from 'react';
import { Navbar, Container, Row, Col } from 'react-bootstrap';
import { useCurrentTime } from '../../utils/currentTime.js';
import { handleMouseMove } from '../../utils/coordinateUtils.js';
import '../../assets/styles/custom.scss';

const MapViewFooter = ({ viewerRef }) => {
    const [mgrsCoord, setMgrsCoord] = useState('');
    const currentTime = useCurrentTime('');

    useEffect(() => {
        if (viewerRef.current?.cesiumElement) {
            const viewer = viewerRef.current.cesiumElement;
            handleMouseMove(viewer, setMgrsCoord);
        }
    }, [viewerRef]);

    return (
        <Navbar fixed="bottom" className="map-view-footer-container">
            <Container fluid>
                <Row className="footer-row">
                    <Col className="footer-col-left">
                        <span className="footer-col-left-datetime-icon">
                            ●
                        </span>
                        <span>DATA: {currentTime}</span>
                    </Col>
                    <Col className="footer-col-right">
                        <span>MGRS: {mgrsCoord}</span>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    );
};

export default MapViewFooter;
