import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic.js';

const Map = dynamic(() => import('../components/map.js'), {
  ssr: false,
  loading: () => <p>Loading map</p>
})

export default Map;
