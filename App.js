import React, { useContext } from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
  useTheme,
} from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './screens/HomeScreen';
import PetsScreen from './screens/PetsScreen';
import AddPetScreen from './screens/AddPetScreen';
import EditPetScreen from './screens/EditPetScreen';
import ProductsScreen from './screens/ProductsScreen';
import AddProductScreen from './screens/AddProductScreen';
import EditProductScreen from './screens/EditProductScreen';
import SettingsScreen from './screens/SettingsScreen';

import { ThemeProvider, ThemeContext } from './screens/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PetsStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.onPrimary || '#fff',
      }}
    >
      <Stack.Screen name="PetsList" component={PetsScreen} options={{ title: 'Meus Pets' }} />
      <Stack.Screen name="AddPet" component={AddPetScreen} options={{ title: 'Adicionar Pet' }} />
      <Stack.Screen name="EditPet" component={EditPetScreen} options={{ title: 'Editar Pet' }} />
    </Stack.Navigator>
  );
}

function ProductsStack() {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: theme.colors.onPrimary || '#fff',
      }}
    >
      <Stack.Screen name="ProductsList" component={ProductsScreen} options={{ title: 'Produtos' }} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Adicionar Produto' }} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} options={{ title: 'Editar Produto' }} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant || 'gray',
        tabBarStyle: { backgroundColor: theme.colors.background },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Pets') iconName = 'dog';
          else if (route.name === 'Products') iconName = 'shopping';
          else if (route.name === 'Settings') iconName = 'cog';
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pets" component={PetsStack} />
      <Tab.Screen name="Products" component={ProductsStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { isDarkTheme } = useContext(ThemeContext);

  const customPaperLightTheme = {
    ...PaperDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: '#00A86B',
      onPrimary: '#FFFFFF',
    },
  };

  const customNavigationLightTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      primary: '#00A86B',
      background: '#fff',
      card: '#00A86B',
      text: '#FFFFFF',
      border: '#ddd',
      notification: '#00A86B',
    },
  };

  const paperTheme = isDarkTheme ? PaperDarkTheme : customPaperLightTheme;
  const navTheme = isDarkTheme ? NavigationDarkTheme : customNavigationLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navTheme}>
        <MainTabs />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
