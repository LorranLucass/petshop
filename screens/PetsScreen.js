import React, { useState, useEffect } from 'react';
import { FlatList, View, Alert, Image } from 'react-native';
import { Appbar, FAB, List, Snackbar, IconButton } from 'react-native-paper';
import { getPets, deletePet } from '../services/storage';

const primaryColor = '#00A86B';
const accentColor = '#FF6F61';
const backgroundColor = '#F0F0F0';
const textColor = '#333333';

export default function PetsScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPets();
    });
    return unsubscribe;
  }, [navigation]);

  async function loadPets() {
    try {
      const data = await getPets();
      setPets(data);
    } catch (e) {
      console.log(e);
    }
  }

  function handleDeletePet(id) {
    Alert.alert(
      'Excluir Pet',
      'Tem certeza que deseja excluir este pet?',
      [
        { text: 'Cancelar' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await deletePet(id);
              await loadPets();
              setSnackbarVisible(true);
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o pet.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  }

  function renderItem({ item }) {
    return (
      <List.Item
        title={item.name}
        description={`Espécie: ${item.species}`}
        onPress={() => navigation.navigate('EditPet', { pet: item })}
        titleStyle={{ color: textColor }}
        descriptionStyle={{ color: textColor }}
        left={(props) =>
          item.photoUri ? (
            <Image
              source={{ uri: item.photoUri }}
              style={{ width: 50, height: 50, borderRadius: 25, marginRight: 8 }}
            />
          ) : (
            <List.Icon {...props} icon="dog" color={primaryColor} />
          )
        }
        right={(props) => (
          <IconButton
            {...props}
            icon="delete"
            color={accentColor}
            onPress={() => handleDeletePet(item.id)}
          />
        )}
      />
    );
  }

  return (
    <>
      <Appbar.Header style={{ backgroundColor: primaryColor }}>
        <Appbar.Content title="Meus Pets" titleStyle={{ color: 'white' }} />
      </Appbar.Header>

      <View style={{ flex: 1, backgroundColor: backgroundColor }}>
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>

      <FAB
        icon="plus"
        onPress={() => navigation.navigate('AddPet')}
        style={{
          position: 'absolute',
          right: 16,
          bottom: 16,
          backgroundColor: primaryColor,
        }}
        color="white"
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: primaryColor }}
        theme={{ colors: { text: 'white' } }}
      >
        Pet excluído com sucesso!
      </Snackbar>
    </>
  );
}
