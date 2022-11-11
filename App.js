import { useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import NetInfo from '@react-native-community/netinfo';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
////RB ---
import {
    QueryClient,
    QueryClientProvider,
    onlineManager,
    useOnlineManager,
} from '@tanstack/react-query';
// import NetInfo from '@react-native-community/netinfo';
import Navigation from './src/navigation/Navigation';
import { store } from './src/app/store';
import { Provider, useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});
import { Auth, Hub } from 'aws-amplify';
// onlineManager.setEventListener((setOnline) => {
//     return NetInfo.addEventListener((state) => {
//         setOnline(state.isConnected);
//     });
// });
onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
        setOnline(!!state.isConnected);
    });
});
const queryClient = new QueryClient();

function App() {
    const [fontsLoaded] = useFonts({
        'Merriweather-Bold': require('./assets/fonts/Merriweather-Bold.ttf'),
        'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
        'Roboto-BlackItalic': require('./assets/fonts/Roboto-BlackItalic.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
        'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
        'Roboto-LightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Thin': require('./assets/fonts/Roboto-Thin.ttf'),
        'Roboto-ThinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf'),
    });

    useEffect(() => {
        async function prepare() {
            await SplashScreen.preventAutoHideAsync();
            await SplashScreen.hideAsync();
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.preventAutoHideAsync();
            // await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <PaperProvider theme={theme}>
                    <SafeAreaView
                        style={
                            Platform === 'ios'
                                ? styles.containerIOS
                                : styles.container
                        }
                    >
                        <Navigation theme={theme} />
                    </SafeAreaView>
                </PaperProvider>
            </QueryClientProvider>
        </Provider>
    );
}
export default App;
const styles = StyleSheet.create({
    containerIOS: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 50,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
