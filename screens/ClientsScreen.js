import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Appbar, Card, Text, FAB, IconButton } from 'react-native-paper';
import { getClients, deleteClient } from '../services/clientsStorage';

export default function ClientsScreen({ navigation }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadClients();
    });
    return unsubscribe;
  }, [navigation]);

  async function loadClients() {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os clientes.');
    }
  }

  async function handleDeleteClient(id) {
    Alert.alert(
      'Confirmar exclusão',
      'Deseja realmente excluir este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteClient(id);
              loadClients();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o cliente.');
            }
          },
        },
      ]
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('EditClient', { clientId: item.id })}
      accessibilityLabel={`Editar cliente ${item.name}`}
    >
      <Card style={styles.card}>
        <Card.Title
          title={item.name}
          subtitle={item.email}
          right={() => (
            <IconButton
              icon="delete"
              onPress={() => handleDeleteClient(item.id)}
              accessibilityLabel={`Excluir cliente ${item.name}`}
            />
          )}
        />
        <Card.Content>
          <Text>Telefone: {item.phone}</Text>
          <Text>Endereço: {item.address}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Clientes" />
      </Appbar.Header>

      <View style={styles.container}>
        <FlatList
          data={clients}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={clients.length === 0 && styles.emptyList}
          ListEmptyComponent={<Text>Nenhum cliente cadastrado.</Text>}
        />

        <FAB
          icon="plus"
          label="Adicionar Cliente"
          onPress={() => navigation.navigate('AddClient')}
          style={styles.fab}
          accessibilityLabel="Adicionar novo cliente"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
