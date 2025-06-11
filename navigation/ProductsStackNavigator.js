import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProductsScreen from '../screens/ProductsScreen';
import AddProductScreen from '../screens/AddProductScreen';
import EditProductScreen from '../screens/EditProductScreen';

import ClientsScreen from '../screens/ClientsScreen';
import AddClientScreen from '../screens/AddClientScreen';
import EditClientScreen from '../screens/EditClientScreen';

import PetsScreen from '../screens/PetsScreen';
import AddPetScreen from '../screens/AddPetScreen';
import EditPetScreen from '../screens/EditPetScreen';


import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProductsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#00A86B' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Products" component={ProductsScreen} options={{ title: 'Produtos' }} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Adicionar Produto' }} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} options={{ title: 'Editar Produto' }} />
    </Stack.Navigator>
  );
}

function ClientsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#00A86B' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Clients" component={ClientsScreen} options={{ title: 'Clientes' }} />
      <Stack.Screen name="AddClient" component={AddClientScreen} options={{ title: 'Adicionar Cliente' }} />
      <Stack.Screen name="EditClient" component={EditClientScreen} options={{ title: 'Editar Cliente' }} />
    </Stack.Navigator>
  );
}

function PetsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#00A86B' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Pets" component={PetsScreen} options={{ title: 'Pets' }} />
      <Stack.Screen name="AddPet" component={AddPetScreen} options={{ title: 'Adicionar Pet' }} />
      <Stack.Screen name="EditPet" component={EditPetScreen} options={{ title: 'Editar Pet' }} />
    </Stack.Navigator>
  );
}

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
          else iconName = 'help-circle-outline';

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Produtos" component={ProductsStack} />
      <Tab.Screen name="Clientes" component={ClientsStack} />
      <Tab.Screen name="Pets" component={PetsStack} />
    </Tab.Navigator>
  );
}
