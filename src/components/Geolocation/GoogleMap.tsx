"use client"
import { PropsWithChildren } from "react";
import { APIProvider, Map, MapProps, AdvancedMarker, Pin, ControlPosition } from "@vis.gl/react-google-maps"

interface IGoogleMapsProps extends PropsWithChildren<MapProps> {
    latitude: number | undefined;
    longitude: number | undefined;
}

// const PoiMarkers = ({ latitude, longitude }:{latitude: number, longitude: number}) => {
//     return (
//         <>
//             <AdvancedMarker position={{ lat: latitude, lng: longitude }}>
//                 <Pin background={'#FBBC04'} glyphColor={'#000'} borderColor={'#000'} />
//             </AdvancedMarker>
//         </>
//     )
// }

export const GoogleMap = ({ children, latitude, longitude, className, ...restProps }: IGoogleMapsProps) => {
    return (

        <APIProvider apiKey={`${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}>
            {
                latitude && longitude ?
                    <Map
                        defaultZoom={15}
                        defaultCenter={{ lat: latitude, lng: longitude }}
                        className={className}
                        zoomControlOptions={{ position: ControlPosition.RIGHT_CENTER }}
                        {...restProps}
                    >
                        {/* <PoiMarkers latitude={latitude} longitude={longitude}/> */}
                        {children}
                    </Map>
                    :
                    <div>
                        <h1>Localizando...</h1>
                    </div>
            }
        </APIProvider>


    )
}