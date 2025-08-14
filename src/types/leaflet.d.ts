import type { Map as LeafletMap } from 'leaflet';

export interface LeafletWindow extends Window {
  __LEAFLET_MAP__?: LeafletMap;
}
