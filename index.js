// import 'react-native-gesture-handler';

// import { registerRootComponent } from 'expo';

// import App from './App';
// registerRootComponent(App);

import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { RootSiblingParent } from 'react-native-root-siblings'; // Import RootSiblingParent
import App from './App';

const AppWithRootSibling = () => (
    <RootSiblingParent>
        <App />
    </RootSiblingParent>
);

registerRootComponent(AppWithRootSibling); // Register the wrapped App component
