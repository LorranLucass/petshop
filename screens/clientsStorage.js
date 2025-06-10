import AsyncStorage from '@react-native-async-storage/async-storage';

const CLIENTS_KEY = 'clients';

export async function getClients() {
  try {
    const json = await AsyncStorage.getItem(CLIENTS_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Erro ao carregar clientes:', e);
    return [];
  }
}

export async function saveClients(clients) {
  try {
    const json = JSON.stringify(clients);
    await AsyncStorage.setItem(CLIENTS_KEY, json);
  } catch (e) {
    console.error('Erro ao salvar clientes:', e);
  }
}

export async function addClient(client) {
  const clients = await getClients();
  clients.push(client);
  await saveClients(clients);
}

export async function updateClient(updatedClient) {
  const clients = await getClients();
  const newClients = clients.map(c => (c.id === updatedClient.id ? updatedClient : c));
  await saveClients(newClients);
}

export async function deleteClient(id) {
  const clients = await getClients();
  const filtered = clients.filter(c => c.id !== id);
  await saveClients(filtered);
}
