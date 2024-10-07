import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const ModalExemplo = () => {
  const [visivel, setVisivel] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="Abrir Modal" onPress={() => setVisivel(true)} />
      <Modal
        transparent={true}
        visible={visivel}
        onRequestClose={() => setVisivel(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Este é um modal!</Text>
          <Button title="Fechar" onPress={() => setVisivel(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalExemplo;

/*
Exibe mensagens ou formulários sem mudar de tela.

Como usar:
<ModalExemplo />
*/