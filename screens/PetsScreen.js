import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Card, Text, FAB, IconButton, useTheme } from 'react-native-paper';
import { getPets, deletePet } from '../services/storage';

export default function PetsScreen({ navigation }) {
  const { colors, dark } = useTheme();

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  async function loadPets() {
    setLoading(true);
    try {
      const data = await getPets();
      setPets(data);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar pets');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadPets);
    return unsubscribe;
  }, [navigation]);

  function handleDeletePet(id) {
    Alert.alert(
      'Excluir Pet',
      'Tem certeza que deseja excluir este pet?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePet(id);
              await loadPets();
              setSnackbarVisible(true);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o pet.');
            }
          },
        },
      ]
    );
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('EditPet', { pet: item })}
      >
        <Card style={{ marginBottom: 12 }}>
          <Card.Title
            title={item.name}
            subtitle={`Espécie: ${item.species || 'N/A'} - Idade: ${item.age ? item.age + ' anos' : 'N/A'}`}
            right={(props) => (
              <IconButton
                {...props}
                icon="delete"
                onPress={(e) => {
                  e.stopPropagation();
                  handleDeletePet(item.id);
                }}
                color={colors.accent || '#FF6F61'}
              />
            )}
          />
          <Card.Content>
            <Text>Peso: {item.weight ? `${item.weight} kg` : 'N/A'}</Text>
            <Text>Raça: {item.breed || 'N/A'}</Text>
            {item.photoUri ? (
              <Card.Cover
                source={{ uri: item.photoUri }}
                style={{ marginTop: 8, borderRadius: 8 }}
              />
            ) : null}
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: colors.background }}>
      {loading ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Carregando...</Text>
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}

      <FAB
        icon="plus"
        label="Adicionar Pet"
        onPress={() => navigation.navigate('AddPet')}
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
