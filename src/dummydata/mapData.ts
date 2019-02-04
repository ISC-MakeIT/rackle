import {
  ActiveMapState
} from 'src/screens/GuideScreen';

export const MapData: ActiveMapState = {
  indoorLevel: '1',
  currentScreen: 'video',
  initializedLocation: {
    latitude: 35.46588771428577,
    longitude: 139.62227088041905,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  },
  start_gate: {
    id: 1,
    train_line_name: '京急',
    name: '中央',
    latitude: 35.46591086799952600,
    longitude: 139.62309032678604000,
    floor:'B1',
  },
  end_gate: {
    id : 2,
    train_line_name: '東急東横',
    name: '南',
    latitude: 35.46599142339890400,
    longitude: 139.62201878428460000,
    floor: 'B3',
  },
  toiletMarkers: [{
    floor: 'B1',
    latitude: 35.46549853231885,
    longitude: 139.62226923555136,
  }],
  elevatorMarkers: [{
    floor: 'B1',
    capacity: 6,
    latitude: 35.46598896577774,
    longitude: 139.62186254560947,
  }, {
    floor: 'B2',
    capacity: 6,
    latitude: 35.466408671769514,
    longitude: 139.62231114506721,
  }, {
    floor: 'B3',
    capacity: 12,
    latitude: 35.46599115032989,
    longitude: 139.62186221033335,
  }, {
    floor: 'B2',
    capacity: 6,
    latitude: 35.46600043467584,
    longitude: 139.6218601986766,
  }, {
    floor: 'B2',
    capacity: 6,
    latitude: 35.467070038770146,
    longitude: 139.62299410253763,
  }, {
    floor: 'B3',
    capacity: 6,
    latitude: 35.46662521408242,
    longitude: 139.62260585278273,
  }, {
    floor: 'B3',
    capacity: 6,
    latitude: 35.46662521408242,
    longitude: 139.62260585278273,
  }, {
    floor: 'B1',
    capacity: 6,
    latitude: 35.4662273546807,
    longitude: 139.62275706231594,
  }, {
    floor: 'B1',
    capacity: 12,
    latitude: 35.46601927643347,
    longitude: 139.62302025407553,
  }, {
    floor: 'B1',
    capacity: 12,
    latitude: 35.4659865081565,
    longitude: 139.62323047220707,
  }, {
    floor: 'B1',
    capacity: 12,
    latitude: 35.46614024587368,
    longitude: 139.62289653718472,
  }, {
    floor: 'B1',
    capacity: 12,
    latitude: 35.4663073636272,
    longitude: 139.6226128935814,
  }],
  guideLines: [{
    floor: 'B1',
    latitude: 35.465821301223436,
    longitude: 139.62295688688755,
  }, {
    floor: 'B1',
    latitude: 35.46571343866254,
    longitude: 139.62286870926619,
  }, {
    floor: 'B1',
    latitude: 35.465792082771856,
    longitude: 139.62272554636002,
  }, {
    floor: 'B1',
    latitude: 35.465903768197734,
    longitude: 139.62255354970694,
  }, {
    floor: 'B1',
    latitude: 35.466043852632446,
    longitude: 139.6223419904709,
  }, {
    floor: 'B1',
    latitude: 35.46616127214609,
    longitude: 139.6221974864602,
  }, {
    floor: 'B1',
    latitude: 35.46594281709978,
    longitude: 139.62197788059711,
  }, {
    floor: 'B1',
    latitude: 35.46598896577774,
    longitude: 139.62186254560947,
  }, {
    floor: 'B3',
    latitude: 35.46599115032989,
    longitude: 139.62186221033335,
  }, {
    floor: 'B3',
    latitude: 35.46597258163476,
    longitude: 139.62195876985788,
  }],
  movies: [{
    id: 1,
    name: '1メートル先',
    file_path: 'hoge1.mp4',
    thumbnail_path: 'hoge1.jpg',
    latitude: 35.46571343866254,
    longitude: 139.62286870926619,
    floor: 'B1',
  }, {
    id: 2,
    name: '2メートル先',
    file_path: 'hoge1.mp4',
    thumbnail_path: 'hoge2.jpg',
    latitude: 35.466141611216216,
    longitude: 139.6222035214305,
    floor: 'B1',
  }, {
    id: 3,
    name: '3メートル先',
    file_path: 'hoge1.mp4',
    thumbnail_path: 'hoge3.jpg',
    latitude: 35.46594281709978,
    longitude: 139.62197788059711,
    floor: 'B1',
  }, {
    id: 4,
    name: '4メートル先',
    file_path: 'hoge1.mp4',
    thumbnail_path: 'hoge4.jpg',
    latitude: 35.465954286004475,
    longitude: 139.6219688281417,
    floor: 'B3',
  }],
  // 'toilets': [{
  //   'id': 1,
  //   'name': '横浜駅中央改札付近',
  //   'latitude': 35.465481875005196,
  //   'longitude': 139.62215926498175,
  //   'floor': -1
  // }],
};
