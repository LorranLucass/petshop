import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@products';

/**
 * Retorna todos os produtos armazenados
 */
export async function getProducts() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Adiciona um novo produto
 */
export async function addProduct(product) {
  const products = await getProducts();
  products.push(product);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

/**
 * Atualiza um produto existente
 */
export async function updateProduct(updatedProduct) {
  const products = await getProducts();
  const updatedList = products.map((p) => p.id === updatedProduct.id ? updatedProduct : p);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
}

/**
 * Exclui um produto pelo ID
 */
export async function deleteProduct(id) {
  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
