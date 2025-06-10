import React, { useState } from 'react';
import { ScrollView, View, Image, Alert } from 'react-native';
import { Appbar, Button, TextInput, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import uuid from 'react-native-uuid';
import * as ImagePicker from 'expo-image-picker';

import { addPet } from '../services/storage';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  species: yup.string().required('Espécie é obrigatória'),
  breed: yup.string().required('Raça é obrigatória'),
  age: yup.number().typeError('Idade deve ser um número').required('Idade é obrigatória'),
  weight: yup.number().typeError('Peso deve ser um número').required('Peso é obrigatório'),
}).required();

export default function AddPetScreen({ navigation }) {
  const [photoUri, setPhotoUri] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      species: '',
      breed: '',
      age: '',
      weight: '',
    },
  });

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar suas fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  const onSubmit = async (data) => {
    const newPet = { id: uuid.v4(), photoUri, ...data };
    await addPet(newPet);
    navigation.goBack();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Adicionar Pet" />
      </Appbar.Header>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
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
                />
                <HelperText type="error" visible={!!errors[name]}>
                  {errors[name]?.message}
                </HelperText>
              </>
            )}
          />
        ))}

        <Button mode="outlined" onPress={pickImage} style={{ marginVertical: 12 }}>
          {photoUri ? 'Alterar Foto' : 'Escolher Foto'}
        </Button>

        {photoUri && (
          <Image
            source={{ uri: photoUri }}
            style={{ width: 150, height: 150, borderRadius: 10, alignSelf: 'center', marginBottom: 16 }}
          />
        )}

        <Button mode="contained" onPress={handleSubmit(onSubmit)}>
          Salvar
        </Button>
      </ScrollView>
    </>
  );
}
