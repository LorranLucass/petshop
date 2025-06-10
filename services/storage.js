import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pets';

/**
 * Busca todos os pets armazenados
 */
export async function getPets() {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar pets:', error);
    return [];
  }
}

/**
 * Adiciona um novo pet (com fotoUri opcional)
 */
export async function addPet(pet) {
  try {
    const pets = await getPets();
    pets.push(pet); // pet deve conter {id, name, species, breed, age, weight, photoUri?}
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pets));
  } catch (error) {
    console.error('Erro ao adicionar pet:', error);
    throw error;
  }
}

/**
 * Atualiza um pet existente
 */
export async function updatePet(updatedPet) {
  try {
    const pets = await getPets();
    const newPets = pets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet));
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newPets));
  } catch (error) {
    console.error('Erro ao atualizar pet:', error);
    throw error;
  }
}

/**
 * Exclui um pet pelo ID
 */
export async function deletePet(id) {
  try {
    const pets = await getPets();
    const filtered = pets.filter((pet) => pet.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao excluir pet:', error);
    throw error;
  }
}
