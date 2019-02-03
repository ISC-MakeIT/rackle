export interface ToiletMarker {
  floor: string;
  latitude: number;
  longitude: number;
}

export type ElevatorCapacity = 6 | 8 | 12;

export interface ElevatorMarker {
  floor: string;
  capacity: ElevatorCapacity;
  latitude: number;
  longitude: number;
}

export interface GuideLine {
  floor: string;
  latitude: number;
  longitude: number;
}

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface Gate {
  id: number;
  train_line_name: string;
  name: string;
  latitude: number;
  longitude: number;
  floor: string;
}
