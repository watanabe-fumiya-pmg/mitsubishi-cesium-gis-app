// src/components/DisplaySwitchPageHeader.tsx
import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PiKeyReturnBold } from 'react-icons/pi';
import '../../assets/styles/custom.scss';

const DisplaySwitchPageHeader = () => {
    const navigate = useNavigate();

    const handleToggle = () => {
        navigate('/');
    };

    return (
        <Container fluid className="display-switch-header-container">
            <Navbar>
                <Navbar.Brand onClick={handleToggle}>
                    <PiKeyReturnBold size={34} /> 表示切替
                </Navbar.Brand>
            </Navbar>
        </Container>
    );
};

export default DisplaySwitchPageHeader;
