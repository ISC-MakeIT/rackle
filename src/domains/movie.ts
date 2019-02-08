export interface GuideLineObject {
  id: number;
  name: string;
  file_path: string;
  thumbnail_path: string;
  latitude: number;
  longitude: number;
  floor: string;
  type: 'movie' | 'elevator';
  caption:'12人乗り' | '18人乗り';
}

export interface ObjectPoints {
  objectPoints: GuideLineObject[];
}
