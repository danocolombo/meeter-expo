module.exports = ({ config }) => {
    let BASE_version = '1.0.0';
    let ANDROID_version = 1;
    let COMBO_version = BASE_version + '-' + ANDROID_version.toString();
    console.log('NAME: ' + config.name); // prints 'My App'
    console.log('COMBO_version: ' + COMBO_version);
    return {
        ...config,
        version: BASE_version,
        orientation: 'portrait',
        icon: './assets/icon.png',
        userInterfaceStyle: 'light',
        splash: {
            image: './assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },

        extra: {
            eas: {
                projectId: '7ef587ae-ab5b-4032-905d-af78d83b8fd9',
            },
            meeter: COMBO_version,
        },

        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
            bundleIdentifier: 'guru.fortson.meeter',
            infoPlist: {
                // UIBackgroundModes: ['location', 'fetch'],
            },
            config: {},
        },
        android: {
            package: 'guru.fortson.meeter',
            versionCode: ANDROID_version,

            adaptiveIcon: {
                foregroundImage: './assets/adaptive-icon.png',
                backgroundColor: '#FFFFFF',
            },
            config: {},
        },
        web: {
            favicon: './assets/favicon.png',
        },
        description: COMBO_version,
    };
};
