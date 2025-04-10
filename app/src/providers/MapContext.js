import React, { createContext, useContext, useRef } from 'react';

// MapContextを作成
const MapContext = createContext();

// 親コンポーネントで`viewerRef`を提供する`MapProvider`
export const MapProvider = ({ children }) => {
    const viewerRef = useRef(null); // viewerRefを定義

    return (
        <MapContext.Provider value={{ viewerRef }}>{children}</MapContext.Provider>
    );
};

// 子コンポーネントで`viewerRef`を取得するためのカスタムフック
export const useMapContext = () => useContext(MapContext);