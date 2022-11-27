import React from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet'

const LSPDIcon = new L.Icon({
    iconUrl: '/img/blips/lspd.png',
    iconSize: [32, 32],
})

const LSSDIcon = new L.Icon({
    iconUrl: '/img/blips/lssd.png',
    iconSize: [32, 32]
})

const HospitalIcon = new L.Icon({
    iconUrl: '/img/blips/hospital.png',
    iconSize: [32, 32]
})

const LSFDIcon = new L.Icon({
    iconUrl: '/img/blips/fire.png',
    iconSize: [32, 32]
})

const LSSDMarkers = [
    {name: 'Station du shérif de Davis', position: [-72.6, -1.5], icon: LSSDIcon},
    {name: 'Station du shérif de Paleto Bay', position: [73.8, -27.5], icon: LSSDIcon},
    {name: 'Palais de justice de Davis - Shérif HQ', position: [-72.9, -1.9], icon: LSSDIcon},
    {name: 'S.T.A.R.S. Center - Académie LSSD', position: [-59.7, -26.7], icon: LSSDIcon},
    {name: 'TTCF - Twin Towers Correctional Facility', position: [-59.2, 57.5], icon: LSSDIcon},
    {name: 'Station du shérif de Sandy Shores', position: [39.95,37.75], icon: LSSDIcon}
]

const LSPDMarkers = [
    {name: 'LSPD Vespucci HQ', position: [-65.5, -46.3], icon: LSPDIcon},
    {name: 'Poste de police de Mission Row', position: [-67.3,-1.8], icon:  LSPDIcon}
]

const HospitalMarkers = [
    {name: 'Centre médical de Sandy Shores', position: [40.3,38.8], icon: HospitalIcon},
    {name: 'Centre médical de Mont Zonah', position: [-58.4,-28.7], icon: HospitalIcon},
    {name: 'Centre médical central de Los Santos', position: [-71.5,-4.9], icon: HospitalIcon},
    {name: 'Hopital St Fiacre', position: [-72.7,18.0], icon: HospitalIcon},
    {name: 'Centre médical de Pillbox Hill', position: [-62.2,-5.4], icon: HospitalIcon}
]

const LSFDMarkers = [
    {name:'Station 1 - Paleto Bay Fire Station', position: [74.5,-25.6], icon: LSFDIcon},
    {name:'Station 3 - Davis Fire Station', position: [-73.5,-8.8], icon: LSFDIcon},
    {name:'Station 4 - Sandy Shores Fire Station', position: [38.1,34.1], icon: LSFDIcon},
    {name:'Station 5 - Fort Zancudo Fire Station', position: [18.5,-76.1], icon: LSFDIcon},
    {name:'Station 6 - Los Santos International Airport Fire Station', position: [-78.4,-45.6], icon: LSFDIcon},
    {name:'Station 7 - El Burro Heights Fire Station', position: [-72.0,19.9], icon: LSFDIcon}
]

export default function Map() {
    return (
        <MapContainer center={[-70, 0]} zoom={3} minZoom={0} maxZoom={5} scrollWheelZoom={true}>
            <TileLayer
                url={'/img/map/{z}/{x}/{y}.jpg'}
                noWrap={true}
            />
            <LayersControl position='bottomleft'>
                <LayersControl.Overlay checked name={'Batiment du LSSD'} collapsed={false}>
                    <LayerGroup>
                        {LSSDMarkers.map(({name, position, icon}) => {
                            return (
                                <Marker key={position} position={position} icon={icon}>
                                    <Popup>
                                        {name}
                                    </Popup>
                                </Marker>
                            )
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name={'Batiment du LSSD'}>
                    <LayerGroup>
                        {LSPDMarkers.map(({name, position, icon}) => {
                            return (
                                <Marker key={position} position={position} icon={icon}>
                                    <Popup>
                                        {name}
                                    </Popup>
                                </Marker>
                            )
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name={'Centre médical'}>
                    <LayerGroup>
                        {HospitalMarkers.map(({name, position, icon}) => {
                            return (
                                <Marker key={position} position={position} icon={icon}>
                                    <Popup>
                                        {name}
                                    </Popup>
                                </Marker>
                            )
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name={'Station du LSFD'}>
                    <LayerGroup>
                        {LSFDMarkers.map(({name, position, icon}) => {
                            return (
                                <Marker key={position} position={position} icon={icon}>
                                    <Popup>
                                        {name}
                                    </Popup>
                                </Marker>
                            )
                        })}
                    </LayerGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
    )
}
