import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Appbar, Button, TextInput, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { addProductAPI } from '../services/api';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  price: yup
    .number()
    .typeError('Preço inválido')
    .positive('Preço deve ser positivo')
    .required('Preço é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
}).required();

export default function AddProductScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    try {
      // Converte o preço para número, substituindo ',' por '.' para decimal correto
      const payload = { 
        ...data,
        price: parseFloat(data.price.replace(',', '.'))
      };
      await addProductAPI(payload);
      Alert.alert('Sucesso', 'Produto adicionado!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao adicionar produto.');
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} accessibilityLabel="Voltar" />
        <Appbar.Content title="Adicionar Produto" />
      </Appbar.Header>

      <View style={styles.container}>
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
                style={styles.input}
                mode="outlined"
                accessibilityLabel="Nome do produto"
                editable={!isSubmitting}
              />
              <HelperText type="error" visible={!!errors.name}>
                {errors.name?.message}
              </HelperText>
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
                onChangeText={(text) => onChange(text.replace(',', '.'))}
                value={value}
                keyboardType="decimal-pad"
                error={!!errors.price}
                style={styles.input}
                mode="outlined"
                accessibilityLabel="Preço do produto"
                editable={!isSubmitting}
              />
              <HelperText type="error" visible={!!errors.price}>
                {errors.price?.message}
              </HelperText>
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
                style={styles.input}
                mode="outlined"
                accessibilityLabel="Descrição do produto"
                editable={!isSubmitting}
              />
              <HelperText type="error" visible={!!errors.description}>
                {errors.description?.message}
              </HelperText>
            </>
          )}
        />

        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          style={styles.button}
          accessibilityLabel="Salvar produto"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
});
