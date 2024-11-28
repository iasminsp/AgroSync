import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getVaquinhas, addVaquinha, deleteVaquinha } from '@/src/services/vaquinhaService';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface Vaquinha {
  id: string;
  nome: string;
  descricao: string;
  peso: string;
  tipo: string;
  raca: string;
}

const Index: React.FC = () => {
  const [vaquinhas, setVaquinhas] = useState<Vaquinha[]>([]);

  useEffect(() => {
    const fetchVaquinhas = async () => {
      const data = await getVaquinhas();
      setVaquinhas(data);
    };

    fetchVaquinhas();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteVaquinha(id);
      setVaquinhas((prevVaquinhas) => prevVaquinhas.filter((item) => item.id !== id));
    } catch (e) {
      console.error('Erro ao excluir vaquinha:', e);
    }
  };

  const handleAdd = async () => {
    try {
      const newVaquinha: Omit<Vaquinha, 'id'> = {
        nome: '',
        descricao: '',
        peso: '',
        tipo: '',
        raca: '',
      };
      const docRef = await addVaquinha(newVaquinha.nome, newVaquinha.descricao, newVaquinha.peso, newVaquinha.tipo, newVaquinha.raca);
      setVaquinhas((prevVaquinhas) => [...prevVaquinhas, { ...newVaquinha, id: docRef.id }]);
    } catch (e) {
      console.error('Erro ao adicionar vaquinha:', e);
    }
  };

  const handleNavigate = (id: string) => {
    router.push({ pathname: 'src/app/(tabs)/menu/informacoesVaquinha', params: { id } });
  };

  const renderItem = ({ item }: { item: Vaquinha }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Ionicons name="trash-bin" size={20} color="#000" />
        </TouchableOpacity>
        <Image source={require('../../../../assets/images/vaquinha.png')} style={styles.image} />
        <Text style={styles.cardTitle}>{item.nome || 'Sem nome'}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigate(item.id)}
        >
          <Text style={styles.buttonText}>Ver Detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#d4d4d4' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Vaquinhas</Text>
          <TouchableOpacity onPress={handleAdd}>
            <Ionicons name="add-circle" size={30} color="#1E4034" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={vaquinhas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </View>
      <StatusBar style="dark" backgroundColor="#d4d4d4" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#d4d4d4",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  cardContainer: {
    width: '100%',
    marginBottom: 27,
  },
  card: {
    backgroundColor: '#1E4034',
    height: 160,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0E5959',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    padding: 5,
  },
});

export default Index;
