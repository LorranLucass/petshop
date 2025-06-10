import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { getClients, updateClient } from '../services/clientsStorage';

export default function EditClientScreen({ route, navigation }) {
  const { clientId } = route.params;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    async function loadClient() {
      try {
        const clients = await getClients();
        const client = clients.find(c => c.id === clientId);
        if (client) {
          setName(client.name);
          setPhone(client.phone);
          setEmail(client.email);
          setAddress(client.address);
        }
      } catch (error) {
        Alert.alert('Erro', 'Falha ao carregar cliente.');
      }
    }
    loadClient();
  }, [clientId]);

  async function handleSave() {
    if (!name.trim() || !phone.trim() || !email.trim() || !address.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    const updatedClient = {
      id: clientId,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
    };

    try {
      await updateClient(updatedClient);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} accessibilityLabel="Voltar" />
        <Appbar.Content title="Editar Cliente" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <TextInput
          label="Nome"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
          autoComplete="name"
          accessibilityLabel="Nome do cliente"
        />
        <TextInput
          label="Telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
          mode="outlined"
          autoComplete="tel"
          accessibilityLabel="Telefone do cliente"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
          mode="outlined"
          autoComplete="email"
          accessibilityLabel="Email do cliente"
        />
        <TextInput
          label="Endereço"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          mode="outlined"
          autoComplete="street-address"
          accessibilityLabel="Endereço do cliente"
        />

        <Button mode="contained" onPress={handleSave} style={styles.button} accessibilityLabel="Salvar alterações">
          Salvar Alterações
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 8,
  },
});
