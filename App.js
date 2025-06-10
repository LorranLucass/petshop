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

// Removi import NewsScreen

import { ThemeProvider, ThemeContext } from './screens/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const primaryColor = '#00A86B';   // Verde clássico petshop famoso
const secondaryColor = '#FFFFFF'; // Branco para textos e ícones selecionados
const backgroundColor = '#F0F0F0'; // Cinza claro de fundo das abas
const inactiveColor = '#8e8e93';  // Cinza para ícones inativos

function PetsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: primaryColor },
        headerTintColor: secondaryColor,
      }}
    >
      <Stack.Screen name="PetsList" component={PetsScreen} options={{ title: 'Meus Pets' }} />
      <Stack.Screen name="AddPet" component={AddPetScreen} options={{ title: 'Adicionar Pet' }} />
      <Stack.Screen name="EditPet" component={EditPetScreen} options={{ title: 'Editar Pet' }} />
    </Stack.Navigator>
  );
}

function ProductsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: primaryColor },
        headerTintColor: secondaryColor,
      }}
    >
      <Stack.Screen name="ProductsList" component={ProductsScreen} options={{ title: 'Produtos' }} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Adicionar Produto' }} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} options={{ title: 'Editar Produto' }} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: { backgroundColor: backgroundColor },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Pets') iconName = 'dog';
          else if (route.name === 'Products') iconName = 'shopping';
          // Removi linha do ícone News
          else if (route.name === 'Settings') iconName = 'cog';
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pets" component={PetsStack} />
      <Tab.Screen name="Products" component={ProductsStack} />
      {/* Removi Tab.Screen News */}
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
      primary: primaryColor,
      onPrimary: secondaryColor,
      background: '#fff',
      surface: '#fff',
      text: '#000',
    },
  };

  const customNavigationLightTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      primary: primaryColor,
      background: '#fff',
      card: primaryColor,
      text: secondaryColor,
      border: '#ddd',
      notification: primaryColor,
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
