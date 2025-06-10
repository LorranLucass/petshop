import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { Appbar, Card, Paragraph, ActivityIndicator, Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchQuote() {
    setLoading(true);
    try {
      const res = await fetch('https://zenquotes.io/api/today');
      const data = await res.json();
      setQuote(data[0].q + ' — ' + data[0].a);
    } catch (e) {
      setQuote('Não foi possível carregar a frase do dia.');
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchQuote();
  }, []);

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
