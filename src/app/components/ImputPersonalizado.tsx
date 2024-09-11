import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface InputProps {
  valor: string;
  onChange: (text: string) => void;
  placeholder?: string;
}

const InputPersonalizado: React.FC<InputProps> = ({ valor, onChange, placeholder }) => {
  return (
    <TextInput
      style={styles.input}
      value={valor}
      onChangeText={onChange}
      placeholder={placeholder}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default InputPersonalizado;

/*
Captura entradas do usuário, como nome ou descrição.

Como usar:
const [nome, setNome] = useState('');

<InputPersonalizado valor={nome} onChange={setNome} placeholder="Digite seu nome" />
*/