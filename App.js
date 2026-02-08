/**
 * @format
 */

import React, { useState } from 'react';
import { StatusBar, Text } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/screens/Dashboard';
import Splash from './src/screens/Splash';
import Disclaimer from './src/screens/Disclaimer';
import CheckSimScreen from './src/screens/CheckSimScreen';
import SimOwnerDetails from './src/screens/SimOwnerDetails';
import CheckAllSims from './src/screens/CheckAllSims';
import CheckAllSimsDetail from './src/screens/CheckAllSimsDetail';
import { glassColors } from './src/theme/glass';
import SideMenu from './src/components/SideMenu';

const Stack = createNativeStackNavigator();

if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.style = [{ fontWeight: '700' }, Text.defaultProps.style];

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigate = (route, params) => {
    setMenuOpen(false);
    if (navigationRef.isReady()) {
      navigationRef.navigate(route, params);
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Disclaimer" component={Disclaimer} />
        <Stack.Screen name="Dashboard">
          {({ navigation }) => (
            <>
              <StatusBar barStyle="dark-content" backgroundColor={glassColors.background} />
              <Dashboard
                onSimPress={() => navigation.navigate('CheckSimScreen')}
                onCnicPress={() => navigation.navigate('CheckAllSims')}
                onMenuPress={() => setMenuOpen(true)}
              />
            </>
          )}
        </Stack.Screen>
        <Stack.Screen name="CheckSimScreen">
          {({ navigation }) => (
            <>
              <StatusBar barStyle="dark-content" backgroundColor={glassColors.background} />
              <CheckSimScreen navigation={navigation} onMenuPress={() => setMenuOpen(true)} />
            </>
          )}
        </Stack.Screen>
        <Stack.Screen name="SimOwnerDetails">
          {({ navigation, route }) => (
            <>
              <StatusBar barStyle="dark-content" backgroundColor={glassColors.background} />
              <SimOwnerDetails
                navigation={navigation}
                route={route}
                onMenuPress={() => setMenuOpen(true)}
              />
            </>
          )}
        </Stack.Screen>
        <Stack.Screen name="CheckAllSims">
          {({ navigation }) => (
            <>
              <StatusBar barStyle="dark-content" backgroundColor={glassColors.background} />
              <CheckAllSims navigation={navigation} onMenuPress={() => setMenuOpen(true)} />
            </>
          )}
        </Stack.Screen>
        <Stack.Screen name="CheckAllSimsDetail">
          {({ navigation, route }) => (
            <>
              <StatusBar barStyle="dark-content" backgroundColor={glassColors.background} />
              <CheckAllSimsDetail
                navigation={navigation}
                route={route}
                onMenuPress={() => setMenuOpen(true)}
              />
            </>
          )}
        </Stack.Screen>
      </Stack.Navigator>
      <SideMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavigate}
      />
    </NavigationContainer>
  );
}
