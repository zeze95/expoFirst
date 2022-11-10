import { ThemeProvider } from "@react-navigation/native";
import { Asset } from "expo-asset";
import { StatusBar, Image } from "react-native";
import * as Font from "expo-font";

import { theme } from "./src/theme";
import { useState } from "react";

const cacheImages = images => {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

const cacheFonts = fonts => {
  return fonts.map(font => Font.loadAsync(font));
};
export default function App() {
  const [isReady, setIsReady] = useState(false);

  const _loadAssets = async () => {
    const imageAssets = cacheImages([require("./assets/splash.png")]);
    const fontAssets = cacheFonts([]);
    await Promise.all([...imageAssets, ...fontAssets]);
  };

  return isReady ? (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
    </ThemeProvider>
  ) : (
    <AppLoading
      startAsync={_loadAssets}
      onFinish={() => setIsReady(true)}
      onError={console.warn}
    />
  );
}
