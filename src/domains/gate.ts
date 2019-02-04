export interface Gate {
  id: number;
  train_line_name: string;
  name: string;
  latitude: number;
  longitude: number;
  floor: string;
}

export interface StartGate {
  startGate: Gate;
}

export interface EndGate {
  endGate: Gate;
}
