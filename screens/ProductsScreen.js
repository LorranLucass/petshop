import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'; 
import { Card, Text, FAB, IconButton } from 'react-native-paper';
import { getProductsAPI, deleteProductAPI } from '../services/api';

export default function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleDeleteProduct(id) {
    Alert.alert(
      'Confirmação',
      'Deseja realmente excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProductAPI(id);
              loadProducts();
            } catch (error) {
              Alert.alert('Erro', error.message);
            }
          }
        },
      ]
    );
  }

  async function loadProducts() {
    setLoading(true);
    try {
      const data = await getProductsAPI();
      setProducts(data);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar produtos');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadProducts);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('EditProduct', { productId: item.id })}
              activeOpacity={0.7}
            >
              <Card style={{ marginBottom: 12 }}>
                <Card.Title 
                  title={item.name} 
                  subtitle={`R$ ${item.price.toFixed(2)}`} 
                  right={(props) => (
                    <IconButton 
                      {...props}
                      icon="delete" 
                      onPress={(e) => {
                        e.stopPropagation(); // evita disparar o onPress do card
                        handleDeleteProduct(item.id);
                      }} 
                    />
                  )}
                />
                <Card.Content>
                  <Text>{item.description}</Text>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}

      <FAB
        icon="plus"
        label="Adicionar Produto"
        onPress={() => navigation.navigate('AddProduct')}
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
      />
    </View>
  );
}
