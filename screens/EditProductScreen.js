import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getProductsAPI, updateProductAPI } from '../services/api';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  price: yup.number().typeError('Preço inválido').required('Preço é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
}).required();

export default function EditProductScreen({ route, navigation }) {
  const { productId } = route.params;
  const [loading, setLoading] = useState(true);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    async function loadProduct() {
      try {
        const products = await getProductsAPI();
        const product = products.find(p => p.id === productId);
        if (!product) {
          Alert.alert('Erro', 'Produto não encontrado');
          navigation.goBack();
          return;
        }
        setValue('name', product.name);
        setValue('price', product.price.toString());
        setValue('description', product.description);
      } catch (error) {
        Alert.alert('Erro', 'Falha ao carregar produto');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  async function onSubmit(data) {
    try {
      await updateProductAPI(productId, data);
      Alert.alert('Sucesso', 'Produto atualizado!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  }

  if (loading) return null;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Editar Produto" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Controller
          control={control}
          name="name"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Nome"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.name}
                style={{ marginBottom: 8 }}
                mode="outlined"
              />
              {errors.name && <TextInput.HelperText type="error">{errors.name.message}</TextInput.HelperText>}
            </>
          )}
        />
        <Controller
          control={control}
          name="price"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Preço"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="decimal-pad"
                error={!!errors.price}
                style={{ marginBottom: 8 }}
                mode="outlined"
              />
              {errors.price && <TextInput.HelperText type="error">{errors.price.message}</TextInput.HelperText>}
            </>
          )}
        />
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                label="Descrição"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                error={!!errors.description}
                style={{ marginBottom: 8 }}
                mode="outlined"
              />
              {errors.description && <TextInput.HelperText type="error">{errors.description.message}</TextInput.HelperText>}
            </>
          )}
        />
        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Salvar
        </Button>
      </ScrollView>
    </>
  );
}
