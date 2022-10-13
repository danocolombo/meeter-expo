import { useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
////RB ---
import { QueryClient, QueryClientProvider } from 'react-query';
import Navigation from './src/navigation/Navigation';
import { store } from './src/app/store';
import { Provider, useSelector } from 'react-redux';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import theme from './theme';
import awsconfig from './src/aws-exports';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});
import { Amplify, Auth, Hub } from 'aws-amplify';
const queryClient = new QueryClient();

function App() {
    const [fontsLoaded] = useFonts({
        'Merriweather-Bold': require('./assets/fonts/Merriweather-Bold.ttf'),
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
