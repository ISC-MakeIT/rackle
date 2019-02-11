import * as React from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native';
import Modal from 'react-native-modal';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Region, ToiletMarker } from 'src/domains/map';
import { Gate } from 'src/domains/gate';
import MovieNavigateComponent from '../components/movieComponents/MovieNavigateComponent';
import MapViewComponent from '../components/mapComponents/MapViewComponent';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Modal as CarouselModal } from '../components/Modal';
import Colors from '../constants/Colors';
import movieIcon from '../../assets/images/movie-load-icon.png';
import { getGuidelines } from '../services/guidelines';
import { ObjectPoint } from '../domains/object_point';
import { LocationPoint } from '../domains/location_point';
import { S3MoviePath, S3ThumbnailPath } from '../services/s3_manager';
import { Ionicons } from '@expo/vector-icons';

interface Props { navigation: any; }

type Type = 'movie' | 'gate' | 'elevator';

interface State {
  showModal: boolean;
  movieModalVisible: boolean;
  indoorLevel: string;
  initializedLocation: Region;
  objectPoint: ObjectPoint[] | undefined;
  toilets: ToiletMarker[] | undefined;
  object_points: ObjectPoint[];
  guidelines: Partial<ObjectPoint>[];
  currentCarousel: Carousel;
  objectPoints: ObjectPoint[];
  guideLineMarkers: LocationPoint[];
}

export default class GuideScreen extends React.Component<Props, State> {
  public static navigationOptions = {
    headerStyle: { display: 'none' },
  };

  readonly state: State = {
    showModal: false,
    movieModalVisible: false,
  };

  async componentDidMount () {
    const mapData = await getGuidelines(6, 11);
    const objectPoints = this.indoorChanges(mapData.object_points);

    this.setState({
      indoorLevel: '1',
      initializedLocation: {
        latitude: 35.46588771428577,
        longitude: 139.62227088041905,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      guideLineMarkers: this.indoorChanges(mapData.guidelines.location_points),
      toilets: this.indoorChanges(mapData.toilets),
      objectPoints,
      currentCarousel: objectPoints[0],
    });
  }

  public render () {
    // NITS もう少し厳密に判断した方がいい説 :thinking:
    if (this.state.indoorLevel == undefined) return null;

    const {
      indoorLevel,
      initializedLocation,
      toilets,
      guideLineMarkers,
      objectPoints,
    } = this.state;

    const {height, width} = Dimensions.get('screen');

    const currentCarousel: ObjectPoint[] = objectPoints.filter((objectPoint: ObjectPoint) => objectPoint.floor === indoorLevel);
    // BUG １枚目の画像を無理やり表示させる対応
    // currentCarousel.forEach((objectPoint, index) => {
    //   objectPoint.thumbnail_path = 'KK_TY_P' + (index + 1) + '.jpg';
    // });

    return (
      <View style={styles.content_wrap}>
        <Ionicons name='md-arrow-back' size={45} style={styles.backBtn} onPress={this.goBack}/>
        <MapViewComponent
          indoorLevel={indoorLevel}
          initializedLocation={initializedLocation!}
          movieMarkers={this.createMarkers(currentCarousel, indoorLevel, 'movie')}
          toiletMarkers={this.createToiletMarkers(toilets, indoorLevel)}
          elevatorMarkers={this.createMarkers(currentCarousel, indoorLevel, 'elevator')}
          guideLines={this.createGuideLineMarkers(guideLineMarkers, indoorLevel)}
          changeIndoorLevel={this.changeIndoorLevel}
          currentCarousel={this.state.currentCarousel}
          changeCarousel={this.changeCarousel}
          gate={this.createMarkers(currentCarousel, indoorLevel, 'gate')}
          hideModal={this.hideModal}
          modalChange={this.state.showModal}
        />
        <CarouselModal modalView={this.state.showModal}>
          <Carousel
            data={currentCarousel}
            itemWidth={width * 0.8}
            sliderWidth={width}
            sliderHeight={height}
            renderItem={this.carouselRenderItem}
            lockScrollWhileSnapping={true}
            onSnapToItem={this.carouselOnSnapToItem}
            inactiveSlideShift={0.1}
            firstItem={this.carouselFirstItem(currentCarousel)}
          />
          <Pagination
            activeDotIndex={this.carouselFirstItem(currentCarousel) ? this.currentPaginationPoint(currentCarousel) : 0}
            dotsLength={currentCarousel.length > 6 ? 6 : currentCarousel.length}
            dotStyle={styles.paginationDotStyle}
          />
        </CarouselModal>
        <Modal
          presentationStyle='fullScreen'
          isVisible={this.state.movieModalVisible}
          swipeDirection='down'
          onSwipe={this.closeMovieModal}
          deviceHeight={height}
          deviceWidth={width}
        >
          <MovieNavigateComponent setMovieModalVisible={this.closeMovieModal} carouselMarker={this.state.currentCarousel} />
        </Modal>
        {
          currentCarousel.length !== 0 ? (
            <View style={styles.showModalBottomAround}>
              <TouchableOpacity onPress={this.changeModal.bind(this, initializedLocation)} style={styles.showModalBottom} >
                {
                  this.state.showModal ? (
                    <View style={styles.closeModalBottomText}>
                      <Text style={styles.closeText}>
                        CLOSE
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.openModalBottomText}>
                      <Text style={styles.openText}>
                        OPEN
                      </Text>
                    </View>
                  )
                }
              </TouchableOpacity>
            </View>
          ) : null
        }
      </View>
    );
  }

  private goBack = () => this.props.navigation.goBack();

  private setMovieModalVisible = (movieModalVisible: boolean) => this.setState({ movieModalVisible });

  private openMovieModal = () => this.setMovieModalVisible(true);

  private closeMovieModal = () => this.setMovieModalVisible(false);

  private indoorChanges = (items: any) => {
    if (items == undefined) return;

    return items.map((item: Gate) => {
      const floor = String(item.floor).replace('-', 'B');
      item.floor = floor;
      return item;
    });
  }

  private currentPaginationPoint = (currentCarousel: ObjectPoint[]) => {
    const currentPoint = this.carouselFirstItem(currentCarousel);

    if (currentPoint == undefined) return 0;
    if (currentCarousel.length > 6 ) return Math.round(((currentPoint + 1) / currentCarousel.length) * 6 - 1);
    return currentPoint;
  }

  private carouselRenderItem = ({item}: any)=> {
    const carousel = this.state.objectPoints;
    const index = carousel.indexOf(item);

    return (
      <View style={styles.carousel}>
        <View style={styles.carouselInThumbnail}>
          <Image source={{ uri: S3ThumbnailPath(item.thumbnail_path) }} style={styles.thumbnailImage} />
        </View>
        <View style={styles.carouselInText}>
          <Text style={styles.carouselText}>{index + 1}</Text>
        </View>
        {
          item.type === 'movie' || item.type === 'gate' ? (
            <View style={styles.carouselMovieBottom}>
              <TouchableOpacity style={styles.carouselMovieBottomRadius} onPress={this.openMovieModal}>
                <Image source={movieIcon} style={styles.movieIcon} />
                {/* <Text style={styles.carouselMovieBottomText}>再生</Text> */}
              </TouchableOpacity>
            </View>
          ) : null
        }
      </View>
    );
  }

  private carouselOnSnapToItem = (index: number) => {
    if (this.state.objectPoints == undefined) return;

    const currentCarousel = this.state.objectPoints.filter(objectPoint => objectPoint.floor === this.state.indoorLevel);
    return this.changeInitializedLocation(currentCarousel[index]);
  }

  private changeModal = (initializedLocation: Region) => {
    const centerLatitude = -0.0006;
    const currentCarousel = this.state.currentCarousel == undefined ? this.state.objectPoints[0] : this.state.currentCarousel;
    this.state.showModal ?
    this.setState({
      showModal: false,
      initializedLocation: {
        latitude: initializedLocation.latitude - centerLatitude,
        longitude: initializedLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
    }) : this.setState({
      showModal: true,
      currentCarousel,
      initializedLocation: {
        latitude: initializedLocation.latitude + centerLatitude,
        longitude: initializedLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
    });
  }

  private changeIndoorLevel = (nextIndoorLevel: string) => {
    const validatedIndoorLevel = nextIndoorLevel.replace(/階/, '');
    const indoorLevel = validatedIndoorLevel.substr(-2);
    this.setState({ indoorLevel });
  }

  private changeInitializedLocation = (carousel: ObjectPoint) => {
    const centerLatitude = -0.0006;
    const latitude = carousel.latitude + centerLatitude;
    this.setState({
      initializedLocation: {
        latitude: latitude,
        longitude: carousel.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      currentCarousel: carousel,
    });
  }

  private createMarkers = (objectPoints: ObjectPoint[], indoorLevel: string, type: Type) => {
    if (objectPoints == undefined) return;

    const markerPoints = objectPoints.filter(objectPoint => objectPoint.type === type);
    if (this.state.currentCarousel == undefined) return markerPoints.filter(markerPoint => markerPoint.floor === indoorLevel);
    if (this.state.currentCarousel.type === type) return markerPoints.filter(markerPoint => markerPoint !== this.state.currentCarousel);
    return markerPoints;
  }

  private createGuideLineMarkers = (guideLins: LocationPoint[], indoorLevel: string) => {
    if (guideLins == undefined) return;

    return guideLins.filter(guideLin => guideLin.floor === indoorLevel);
  }

  private createToiletMarkers = (toiletMarkers: ToiletMarker[] | undefined, indoorLevel: string) => {
    if (toiletMarkers == undefined) return;

    return toiletMarkers.filter(toiletMarker => toiletMarker.floor === indoorLevel);
  }

  private changeCarousel = (currentCarousel: ObjectPoint) => {
    const centerLatitude = -0.0006;
    const latitude = currentCarousel.latitude + centerLatitude;
    this.setState({
      showModal: true,
      currentCarousel,
      initializedLocation: {
        latitude: latitude,
        longitude: currentCarousel.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
    });
  }

  private carouselFirstItem = (currentCarousels: ObjectPoint[]) => {
    const currentCarousel = this.state.currentCarousel;
    return currentCarousels.indexOf(currentCarousel);
  }

  private hideModal = () => {
    this.setState({
      showModal: false,
    });
  }
}

EStyleSheet.build();
const {width, height} = Dimensions.get('screen');

const styles = EStyleSheet.create({
  content_wrap: {
    flex: 1,
    top: 0,
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    height: 45,
    width: 45,
    left: 20,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  thumbnails: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 90,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  modal: {
    width: width * 0.79,
    height: height * 0.48,
    backgroundColor: 'red',
    marginBottom: height * 0.05,
  },
  modalInView: {
    width: width * 0.79,
    height: height * 0.48,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  showModalBottom: {
    width: width * 0.42,
    height: height * 0.05,
    justifyContent: 'center',
    position: 'absolute',
  },
  openModalBottomText: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.subColorRed,
    width: width * 0.44,
    height: height * 0.08,
    borderRadius: '0.3rem',
    paddingBottom: '0.3rem',
  },
  openText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: '0.05rem',
  },
  closeText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: '0.05rem',
  },
  closeModalBottomText: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    width: width * 0.44,
    height: height * 0.08,
    borderRadius: '0.3rem',
    paddingBottom: '0.3rem',
  },
  showModalBottomAround: {
    width: width,
    height: height * 0.08,
    position: 'absolute',
    bottom: '-1rem',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  carousel: {
    width: width * 0.79,
    height: height * 0.33,
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
  },
  view: {
    width: width,
    height: '50%',
    backgroundColor: 'rgba(50, 50, 50, 1)',
  },
  paginationDotStyle: {
    backgroundColor: '#fff',
    marginBottom: height * 0.03,
    marginTop: height * -0.025,
    zIndex: 5,
  },
  carouselInThumbnail: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselInText: {
    position: 'absolute',
    width: width * 0.12,
    height: width * 0.12,
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(77, 178, 124, 0.8)',
  },
  carouselText: {
    color: Colors.white,
    fontSize: '2rem',
    fontWeight: '700',
    fontFamily: 'MPLUS1p-Medium',
  },
  carouselMovieBottom: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 50,
    zIndex: 100,
  },
  carouselMovieBottomRadius: {
    borderRadius: 50,
    width: width * 0.16,
    height: width * 0.16,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselMovieBottomText: {
    color: Colors.white,
    fontWeight: '700',
  },
  movieIcon: {
    width: width * 0.085,
    height: width * 0.085,
  },
});
