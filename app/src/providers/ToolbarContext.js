// ToolbarContext.js
import React, { createContext, useState, useContext } from 'react';

const ToolbarContext = createContext();

export const ToolbarProvider = ({ children }) => {
    const [zoomLevel, setZoomLevel] = useState(0);

    const zoomIn = () => setZoomLevel(zoomLevel + 1);
    const zoomOut = () => setZoomLevel(zoomLevel - 1);
    const goHome = (homePosition) => {
    // ここで初期位置に戻す処理を書く
    };

    return (
        <ToolbarContext.Provider value={{ zoomIn, zoomOut, goHome }}>
            {children}
        </ToolbarContext.Provider>
    );
};

export const useToolbarContext = () => useContext(ToolbarContext);