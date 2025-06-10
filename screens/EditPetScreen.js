import React, { useEffect, useState } from 'react';
import { View, Alert, Image, ScrollView } from 'react-native';
import { Appbar, Button, TextInput, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { updatePet, deletePet } from '../services/storage';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  species: yup.string().required('Espécie é obrigatória'),
  breed: yup.string().required('Raça é obrigatória'),
  age: yup.number().typeError('Idade deve ser um número').required('Idade é obrigatória'),
  weight: yup.number().typeError('Peso deve ser um número').required('Peso é obrigatório'),
}).required();

export default function EditPetScreen({ route, navigation }) {
  const { pet } = route.params;
  const [photoUri, setPhotoUri] = useState(pet.photoUri || null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    setValue('name', pet.name);
    setValue('species', pet.species);
    setValue('breed', pet.breed);
    setValue('age', String(pet.age));
    setValue('weight', String(pet.weight));
  }, [pet, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedPet = {
        ...pet,
        ...data,
        age: parseInt(data.age, 10),
        weight: parseFloat(data.weight),
        photoUri,
      };
      await updatePet(updatedPet);
      Alert.alert('Sucesso', 'Pet atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao atualizar pet');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmar',
      'Deseja realmente deletar este pet?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deletePet(pet.id);
              Alert.alert('Sucesso', 'Pet deletado!');
              navigation.goBack();
            } catch (error) {
              Alert.alert('Erro', 'Falha ao deletar pet');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Editar Pet" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {photoUri && (
          <Image
            source={{ uri: photoUri }}
            style={{ width: 150, height: 150, borderRadius: 10, alignSelf: 'center', marginBottom: 16 }}
          />
        )}

        {[
          { name: 'name', label: 'Nome do Pet' },
          { name: 'species', label: 'Espécie' },
          { name: 'breed', label: 'Raça' },
          { name: 'age', label: 'Idade', keyboardType: 'numeric' },
          { name: 'weight', label: 'Peso (kg)', keyboardType: 'numeric' },
        ].map(({ name, label, keyboardType }) => (
          <Controller
            key={name}
            control={control}
            name={name}
            defaultValue=""
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  label={label}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors[name]}
                  keyboardType={keyboardType}
                  style={{ marginBottom: 8 }}
                  mode="outlined"
                />
                <HelperText type="error" visible={!!errors[name]}>
                  {errors[name]?.message}
                </HelperText>
              </>
            )}
          />
        ))}

        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={{ marginBottom: 16 }}>
          Salvar Alterações
        </Button>

        <Button mode="outlined" onPress={handleDelete} color="red">
          Deletar Pet
        </Button>
      </ScrollView>
    </>
  );
}
