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
import { S3ThumbnailPath } from '../services/s3_manager';
import { Ionicons } from '@expo/vector-icons';
import * as _ from 'lodash';

interface Props { navigation: any; }

type ObjectType = 'movie' | 'gate' | 'elevator';
type PlusOrMinus = 'plus' | 'minus';

interface State {
  showCarouselModalVisible: boolean;
  movieModalVisible: boolean;
  indoorLevel: string;
  initializedLocation: Region;
  objectPoint: ObjectPoint[] | undefined;
  toilets: ToiletMarker[] | undefined;
  guidelines: Partial<ObjectPoint>[];
  selectedCarousel: Carousel;
  objectPoints: ObjectPoint[];
  guideLineMarkers: LocationPoint[];
}

export default class GuideScreen extends React.Component<Props, State> {
  public static navigationOptions = {
    headerStyle: { display: 'none' },
  };

  readonly state: State = {
    showCarouselModalVisible: false,
    movieModalVisible: false,
  };

  async componentDidMount () {
    const mapData = await getGuidelines(6, 11);
    const objectPoints = this.indoorChanges(mapData.object_points);
    const initialSelectedCarousel = objectPoints[0];

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
      selectedCarousel: initialSelectedCarousel,
    });
  }

  public render () {
    if (this.state.indoorLevel == undefined) return null;

    const {
      indoorLevel,
      initializedLocation,
      toilets,
      guideLineMarkers,
    } = this.state;

    const {height, width} = Dimensions.get('screen');

    const carouselFilteredByFloor = this.carouselFilteredByIndoorLevel();

    return (
      <View style={styles.content_wrap}>
        <Ionicons name='md-arrow-back' size={45} style={styles.backBtn} onPress={this.goBack}/>
        <MapViewComponent
          indoorLevel={indoorLevel}
          initializedLocation={initializedLocation!}
          movieMarkers={this.createMarkers('movie')}
          toiletMarkers={this.createToiletMarkers(toilets, indoorLevel)}
          elevatorMarkers={this.createMarkers('elevator')}
          guideLines={this.createGuideLineMarkers(guideLineMarkers, indoorLevel)}
          changeIndoorLevel={this.changeIndoorLevel}
          currentCarousel={this.state.selectedCarousel}
          changeCarousel={this.changeCarousel}
          gate={this.createMarkers('gate')}
          hideModal={this.hideModal}
          modalChange={this.state.showCarouselModalVisible}
        />
        <CarouselModal modalView={this.state.showCarouselModalVisible}>
          <Carousel
            data={carouselFilteredByFloor}
            itemWidth={width * 0.8}
            sliderWidth={width}
            sliderHeight={height}
            renderItem={this.carouselRenderItem}
            lockScrollWhileSnapping={true}
            onSnapToItem={this.carouselOnSnapToItem}
            inactiveSlideShift={0.1}
            firstItem={carouselFilteredByFloor.indexOf(this.state.selectedCarousel)}
          />
          <Pagination
            activeDotIndex={this.currentPaginationPoint(carouselFilteredByFloor)}
            dotsLength={carouselFilteredByFloor.length > 6 ? 6 : carouselFilteredByFloor.length}
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
          <MovieNavigateComponent
            setMovieModalVisible={this.closeMovieModal}
            carouselMarker={this.state.selectedCarousel}
          />
        </Modal>
        {this.renderCarouselModalButton()}
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

  private currentPaginationPoint = (carouselFilteredByFloor: ObjectPoint[]) => {
    const selectedCarouselIndex = _.findIndex(
      carouselFilteredByFloor,carousel => carousel === this.state.selectedCarousel
    );
    if (carouselFilteredByFloor.length <= 6) return selectedCarouselIndex;

    return Math.round(((selectedCarouselIndex + 1) / carouselFilteredByFloor.length) * 6 - 1);
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
          item.type === 'elevator' ?
            <View style={styles.carouselElevatorLabel}>
              <Text style={styles.carouselElevatorLabelText}>{item.caption}</Text>
            </View> : null
        }
        <View style={styles.carouselMovieBottom}>
          <TouchableOpacity style={styles.carouselMovieBottomRadius} onPress={this.openMovieModal}>
            <View style={styles.carouselMovieBottomTextAround}>
              <Image source={movieIcon} style={styles.movieIcon} />
              <Text style={styles.carouselMovieBottomText}>再生</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  private renderCarouselModalButton = () => {
    const carousels = this.carouselFilteredByIndoorLevel();
    if (carousels.length === 0) return;

    const carouselModalVisible = this.state.showCarouselModalVisible;
    const containerStyle = carouselModalVisible ? styles.closeModalButtonContainer : styles.openModalButtonContainer;
    const textStyle = carouselModalVisible ? styles.closeText : styles.openText;

    return (
      <View style={styles.showModalBottomAround}>
        <TouchableOpacity
          onPress={() => this.changeModal(this.state.initializedLocation)}
          style={styles.showModalBottom}
        >
          <View style={containerStyle}>
            <Text style={textStyle}>
              {carouselModalVisible ? 'CLOSE' : 'OPEN'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  private centerLatitude = (type: PlusOrMinus) => {
    return type === 'plus' ? 0.0006 : -0.0006;
  }

  private carouselOnSnapToItem = (index: number) => {
    if (this.state.objectPoints == undefined) return ;
    return this.changeInitializedLocation(this.carouselFilteredByIndoorLevel()[index]);
  }

  private carouselFilteredByIndoorLevel = () => {
    return this.state.objectPoints.filter(point => point.floor === this.state.indoorLevel);
  }

  private changeModal = (initializedLocation: Region) => {
    const selectedCarousel = this.state.selectedCarousel || this.state.objectPoints[0];

    this.state.showCarouselModalVisible ?
      this.setState({
        showCarouselModalVisible: false,
        initializedLocation: {
          latitude: initializedLocation.latitude + this.centerLatitude('plus'),
          longitude: initializedLocation.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        },
      }) : this.setState({
        showCarouselModalVisible: true,
        selectedCarousel,
        initializedLocation: {
          latitude: initializedLocation.latitude + this.centerLatitude('minus'),
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
    const latitude = carousel.latitude + this.centerLatitude('minus');
    this.setState({
      initializedLocation: {
        latitude: latitude,
        longitude: carousel.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      selectedCarousel: carousel,
    });
  }

  private createMarkers = (type: ObjectType) => {
    const objectPoints = this.carouselFilteredByIndoorLevel();
    if (objectPoints == undefined) return;

    const indoorLevel = this.state.indoorLevel;
    const markerPoints = objectPoints.filter(objectPoint => objectPoint.type === type);

    if (this.state.selectedCarousel == undefined) {
      return markerPoints.filter(markerPoint => markerPoint.floor === indoorLevel);
    }

    if (this.state.selectedCarousel.type === type) {
      return markerPoints.filter(markerPoint => markerPoint !== this.state.selectedCarousel);
    }
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

  private changeCarousel = (selectedCarousel: ObjectPoint) => {
    const latitude = selectedCarousel.latitude + this.centerLatitude('minus');

    this.setState({
      showCarouselModalVisible: true,
      selectedCarousel,
      initializedLocation: {
        latitude: latitude,
        longitude: selectedCarousel.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
    });
  }

  private hideModal = () => {
    const initializedLocation = this.state.initializedLocation;
    this.setState({
      showCarouselModalVisible: false,
      initializedLocation: {
        latitude: initializedLocation.latitude  + this.centerLatitude('plus'),
        longitude: initializedLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
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
  openModalButtonContainer: {
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
  closeModalButtonContainer: {
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
    bottom: 0,
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
    top: -10,
    right: -10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
  carouselMovieBottomTextAround: {
    alignItems: 'center',
    height: width * 0.13,
  },
  movieIcon: {
    width: width * 0.085,
    height: width * 0.085,
  },
  carouselElevatorLabel: {
    position: 'absolute',
    bottom: 0,
    left: width * 0.15,
    height: width * 0.12,
    justifyContent: 'center',
  },
  carouselElevatorLabelText: {
    fontSize: '1rem',
    fontWeight: '700',
    fontFamily: 'MPLUS1p-Medium',
    color: Colors.white,
  },
});
