import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList, Image} from 'react-native';
import MapView from 'react-native-maps';
import {LocalTile, UrlTile} from 'react-native-maps';
import RNFS from 'react-native-fs';
export default function App() {
  const [files, setFiles] = useState([]);

  const getFileContent = async path => {
    const reader = await RNFS.readDir(path);
    setFiles(reader);
  };
  useEffect(() => {
    getFileContent(`${RNFS.DownloadDirectoryPath}`); //run the function on the first render.
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

  console.log("path", `${RNFS.DownloadDirectoryPath}/123/{z}/{x}/{y}.png`)

  return (
    <View style={styles.container}>
      {/*Render our MapView*/}
      <MapView
        style={styles.map}
        // mapType={Platform.OS == 'android' ? 'none' : 'standard'}
        mapType={'standard'}
        //specify our coordinates.
        // initialRegion={{
        //   latitude: 37.78825,
        //   longitude: -122.4324,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
      >
        <LocalTile
          
           // The path template of the locally stored tiles. The patterns {x} {y} {z} will be replaced at runtime
           // For example, /storage/emulated/0/mytiles/{z}/{x}/{y}.png
           
          pathTemplate={`${RNFS.DownloadDirectoryPath}/123/{z}/{x}/{y}.png`}
          
           // The size of provided local tiles (usually 256 or 512).
           
          tileSize={512}
        />

        {/* <UrlTile
          urlTemplate={
            // 'https://a.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            `file://${RNFS.DownloadDirectoryPath}/123/{z}/{x}/{y}.png`
            // 'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg'
          }
          zIndex={10}
        /> */}
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
