import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { addClient } from '../services/clientsStorage';

export default function AddClientScreen({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  async function handleSave() {
    if (!name || !phone || !email || !address) {
      alert('Preencha todos os campos');
      return;
    }
    const newClient = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      address,
    };
    await addClient(newClient);
    navigation.goBack();
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Adicionar Cliente" />
      </Appbar.Header>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        <TextInput
          label="Nome"
          value={name}
          onChangeText={setName}
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="Telefone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{ marginBottom: 12 }}
        />
        <TextInput
          label="Endereço"
          value={address}
          onChangeText={setAddress}
          style={{ marginBottom: 12 }}
        />
        <Button mode="contained" onPress={handleSave}>
          Salvar
        </Button>
      </ScrollView>
    </>
  );
}
