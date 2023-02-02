import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
// import MapView from 'react-native-maps';
import MapView from "react-native-map-clustering";
import {LocalTile, UrlTile, Marker, Callout} from 'react-native-maps';
import RNFS from 'react-native-fs';
export default function App() {
  const [files, setFiles] = useState([]);

  const [demoMarkers, setDemoMarkers] = useState([
    {
      title: 'demo1',
      description: 'this is demo1',
      coordinate: {latitude: 37.78825, longitude: -122.4324},
    },
    {
      title: 'demo2',
      description: 'this is demo2',
      coordinate: {latitude: 3.78825, longitude: -125.4324},
    },
    {
      title: 'demo3',
      description: 'this is demo3',
      coordinate: {latitude: 45.493055288012876, longitude: -73.61964404317784},
    },
    {
      title: 'demo4',
      description: 'this is demo4',
      coordinate: {latitude: 45.78825, longitude: 122.4324},
    },
    {
      title: 'demo5',
      description: 'this is demo5',
      coordinate: {latitude: 20.78825, longitude: 108.2565},
    },
    {
      title: 'demo6',
      description: 'this is demo6',
      coordinate: {latitude: 20.88825, longitude: 108.2565},
    },
    {
      title: 'demo7',
      description: 'this is demo7',
      coordinate: {latitude: 20.88825, longitude: 108.3565},
    },
  ]);

  const getFileContent = async path => {
    const reader = await RNFS.readDir(path);

    setFiles(reader);
  };
  useEffect(() => {
    getFileContent(`${RNFS.DownloadDirectoryPath}/555`); //run the function on the first render.
  }, []);

  const Item = ({name, isFile}) => {
    return (
      <View>
        <Text style={styles.name}>Name: {name}</Text>
        <Text> {isFile ? 'It is a file' : "It's a folder"}</Text>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <View>
        <Text style={styles.title}>{index}</Text>
        {/* The isFile method indicates whether the scanned content is a file or a folder*/}
        <Item name={item.name} isFile={item.isFile()} />
      </View>
    );
  };

  // return (
  //   <SafeAreaView>
  //     <FlatList
  //       data={files}
  //       renderItem={renderItem}
  //       keyExtractor={(item) => item.name}
  //     />
  //   </SafeAreaView>
  // )

  const INITIAL_REGION = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      {/*Render our MapView*/}
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        mapType={Platform.OS == 'android' ? 'none' : 'standard'}
        // zoomEnabled={true}
        // scrollEnabled={true}
        // showsScale={true}
        // mapType={'standard'}
        //specify our coordinates.
        // initialRegion={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      >
        {/* <LocalTile
          // The path template of the locally stored tiles. The patterns {x} {y} {z} will be replaced at runtime
          // For example, /storage/emulated/0/mytiles/{z}/{x}/{y}.png
          pathTemplate={`${RNFS.DownloadDirectoryPath}/555/{z}/{x}/{y}.png`}
          // The size of provided local tiles (usually 256 or 512).
          tileSize={256}
          zIndex={10}
        /> */}

        {demoMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            // description={marker.description}
          >
             <Image source={require('./Philippine.png')} style={{height: 35, width:35 }} />
             <Callout>
                <Text>{marker.description}123</Text>
             </Callout>
            </Marker>
        ))}

        <UrlTile
          urlTemplate={
            'https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            // `file://${RNFS.DownloadDirectoryPath}/555/{z}/{x}/{y}.png`
            // 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
          }
          zIndex={9}
        />
      </MapView>
    </View>
  );
}

//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },

  tinyLogo: {
    width: 50,
    height: 50,
  },
});
