import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Appbar, Card, Paragraph, ActivityIndicator, Button, List } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  // Como a frase é fixa, não precisa buscar da API, só simula loading
  async function fetchQuote() {
    setLoading(true);
    // Simula um pequeno delay para efeito de loading
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoading(false);
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  const quote = "Cuidar de um pet é aprender a amar incondicionalmente todos os dias.";

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="PetShop App" />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchQuote} />
        }
      >
        {/* Card Frase Motivacional */}
        <Card style={styles.card}>
          <Card.Title title="Frase Motivacional do Dia" />
          <Card.Content>
            {loading ? (
              <ActivityIndicator animating={true} />
            ) : (
              <Paragraph style={{ fontStyle: 'italic' }}>{quote}</Paragraph>
            )}
          </Card.Content>
        </Card>

        {/* Card Acesso Rápido */}
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://placedog.net/640/480?id=1' }} />
          <Card.Title title="Acesso Rápido" subtitle="Gerencie seu PetShop" />
          <Card.Content>
            <Paragraph>Toque abaixo para acessar suas seções principais.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Pets')}>Ver Pets</Button>
            <Button onPress={() => navigation.navigate('Products')}>Ver Produtos</Button>
          </Card.Actions>
        </Card>

        {/* Card Dicas para seu Pet */}
        <Card style={styles.card}>
          <Card.Title title="Dicas para seu Pet" />
          <Card.Content>
            <List.Section>
              <List.Item
                title="Alimente seu pet com ração adequada"
                left={props => <List.Icon {...props} icon="food" />}
              />
              <List.Item
                title="Mantenha a vacinação em dia"
                left={props => <List.Icon {...props} icon="needle" />}
              />
              <List.Item
                title="Leve-o para passear diariamente"
                left={props => <List.Icon {...props} icon="walk" />}
              />
              <List.Item
                title="Ofereça bastante água fresca"
                left={props => <List.Icon {...props} icon="water" />}
              />
              <List.Item
                title="Faça visitas regulares ao veterinário"
                left={props => <List.Icon {...props} icon="stethoscope" />}
              />
            </List.Section>
          </Card.Content>
        </Card>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
  },
});
