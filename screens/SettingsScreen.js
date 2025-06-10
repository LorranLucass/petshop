import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Switch, Text } from 'react-native-paper';
import { ThemeContext } from './ThemeContext';

export default function SettingsScreen() {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Configurações" />
      </Appbar.Header>

      <View style={styles.container}>
        <Text style={styles.label}>Modo Escuro</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
