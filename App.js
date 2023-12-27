import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Index from './src/Index';

export default function App() {
  return (
    <ImageBackground  source={require('./assets/weatherappbg.png')} 
    resizeMode="cover" 
    style={styles.image} >
     <Index />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: "column",
    objectFit: "cover",
    height: "100vh"
  },
});
