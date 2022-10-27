import { registerRootComponent } from 'expo';

import awsconfig from './src/aws-exports';
import { Amplify } from 'aws-amplify';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});
import App from './App';
registerRootComponent(App);
