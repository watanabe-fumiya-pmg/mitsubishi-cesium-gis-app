// DisplaySwitchPage.js
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaMap } from 'react-icons/fa';
import { FaMapLocationDot } from 'react-icons/fa6';
import { CiSettings } from 'react-icons/ci';
import { FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DisplaySwitchPageHeader from '../components/Headers/DisplaySwitchPageHeader.js';
import '../assets/styles/components/_display-switch-page.scss';

const DisplaySwitchPage = () => {
    const displaySwitchButtonData = [
        { text: '地図表示', icon: FaMap, link: '/map' },
        { text: '地図生成', icon: FaMapLocationDot, link: '/generate-map' },
        {
            text: 'サーバーステータス',
            icon: FaHeartbeat,
            link: '/server-status',
        },
        { text: '設定', icon: CiSettings, link: '/settings' },
    ];

    return (
        <>
            <DisplaySwitchPageHeader />
            <Container fluid className="display-switch-main-container">
                <Row className="justify-content-center">
                    {displaySwitchButtonData.map((button, index) => {
                        const IconComponent = button.icon;
                        return (
                            <Col
                                xs={12}
                                md={6}
                                key={index}
                                className="display-switch-col mb-4"
                            >
                                <Link
                                    to={button.link}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Button className="display-switch-button">
                                        <IconComponent className="mb-2" />
                                        <span>{button.text}</span>
                                    </Button>
                                </Link>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};

export default DisplaySwitchPage;
