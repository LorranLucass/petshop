import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProductsStack from './ProductsStack';  
import ClientsStack from './ClientsStack';    
import PetsStack from './PetsStack';          
import NewsScreen from '../screens/NewsScreen';  // importe a tela de notícias

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00A86B',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Produtos') iconName = 'cart-outline';
          else if (route.name === 'Clientes') iconName = 'account-group-outline';
          else if (route.name === 'Pets') iconName = 'dog';
          else if (route.name === 'Noticias') iconName = 'newspaper-variant-outline';  // ícone para notícias

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Produtos" component={ProductsStack} />
      <Tab.Screen name="Clientes" component={ClientsStack} />
      <Tab.Screen name="Pets" component={PetsStack} />
      <Tab.Screen name="Noticias" component={NewsScreen} />  {/* aba de notícias */}
    </Tab.Navigator>
  );
}
