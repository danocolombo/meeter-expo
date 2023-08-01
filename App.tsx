import { useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import {
    QueryClient,
    QueryClientProvider,
    onlineManager,
    useOnlineManager,
} from '@tanstack/react-query';
import AuthContextProvider from './src/contexts/AuthContext';
import UserContextProvider from './src/contexts/UserContext';
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
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
// import { Auth, Hub } from 'aws-amplify';

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
    //const isLoadingComplete = useCachedResources();
    // const colorScheme = useColorScheme();

    // if (!isLoadingComplete) {
    //     return null;
    // } else {
    return (
        <Provider store={store}>
            <AuthContextProvider>
                <UserContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <PaperProvider theme={theme}>
                            <SafeAreaProvider>
                                <Navigation />
                                <StatusBar />
                            </SafeAreaProvider>
                        </PaperProvider>
                    </QueryClientProvider>
                </UserContextProvider>
            </AuthContextProvider>
        </Provider>
    );
    // }
}
export default App;
