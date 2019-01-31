export interface Stations {
  station: StationType;
  train_lines: LineType[];
}

export interface StationType {id: number; name: string;}
export interface LineType { id: number; name: string;}
