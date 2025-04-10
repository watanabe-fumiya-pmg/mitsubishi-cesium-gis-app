// src/routes/AppRoutes.js
import { Routes, Route } from 'react-router-dom';
import DisplaySwitchPage from '../pages/DisplaySwitchPage.js';
import MapViewPage from '../pages/MapViewPage.js';
import GenerateMapPage from '../pages/GenerateMapPage.js';
import ServerStatusPage from '../pages/ServerStatusPage.js';
import SettingsPage from '../pages/SettingsPage.js';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DisplaySwitchPage />} />
            <Route path="/map" element={<MapViewPage />} />
            <Route path="/generate-map" element={<GenerateMapPage />} />
            <Route path="/server-status" element={<ServerStatusPage />} />
            <Route path="/settings" element={<SettingsPage />} />
        </Routes>
    );
};

export default AppRoutes;