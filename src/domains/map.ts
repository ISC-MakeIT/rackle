export interface ToiletMarker {
  id: number;
  name: string;
  floor: string;
  latitude: number;
  longitude: number;
}

export interface LocationPoint {
    floor: string;
    latitude: number;
    longitude: number;
}

export interface GuideLines {
  id: string;
  name: string;
  location_points: LocationPoint[];
}

export interface GuideLineMarker {
  guideLineMarkers: LocationPoint[];
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface GuideLinePoint {
  guideLines: GuideLines;
}

export interface Elevators {
  elevators: LocationPoint[];
}

export interface toilets {
  toilets: ToiletMarker;
}
