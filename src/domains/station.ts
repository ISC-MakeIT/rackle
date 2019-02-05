export interface Stations {
  station: StationType;
  train_lines: LineType[];
}

export interface StationType {id: number; name: string; latitude: number; longitude: number;}
export interface LineType { id: number; name: string;}
