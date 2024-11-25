import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type VaquinhaCardProps = {
  nome: string;
  onDelete: () => void;
  peso: string;
  tipo: string;
  raca: string;
  onPress: () => void;
};

const VaquinhaCard = ({ nome, onDelete, peso, tipo, raca, onPress }: VaquinhaCardProps) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{nome}</Text>
          <Text style={styles.cardInfo}>Peso: {peso} kg</Text>
          <Text style={styles.cardInfo}>Tipo: {tipo}</Text>
          <Text style={styles.cardInfo}>Raça: {raca}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Ionicons name="trash-bin" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    padding: 15,
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
  },
  cardContent: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E4034',
  },
  cardInfo: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default VaquinhaCard;
