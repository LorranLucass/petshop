const API_BASE = 'http://192.168.1.50:3000';  // seu IP e porta do backend

export async function getProductsAPI() {
  try {
    const response = await fetch(`${API_BASE}/products`);
    if (!response.ok) throw new Error('Erro ao buscar produtos');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// repita a mesma lógica nos outros métodos:
export async function addProductAPI(product) {
  try {
    const response = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Erro ao adicionar produto');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateProductAPI(productId, product) {
  try {
    const response = await fetch(`${API_BASE}/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Erro ao atualizar produto');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProductAPI(productId) {
  try {
    const response = await fetch(`${API_BASE}/products/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar produto');
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
