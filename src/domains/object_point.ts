export interface ObjectPoint {
  id: number;
  name: string;
  file_path: string;
  thumbnail_path: string;
  latitude: number;
  longitude: number;
  floor: string;
  type: 'movie' | 'elevator' | 'gate';
  caption: string;
}
