import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Ajuste o caminho conforme a estrutura do seu projeto

// Função para adicionar uma nova vaquinha
export const addVaquinha = async (nome, descricao) => {
  try {
    const docRef = await addDoc(collection(db, 'vaquinhas'), {
      nome,
      descricao,
    });
    console.log('Documento adicionado com ID:', docRef.id);
  } catch (e) {
    console.error('Erro ao adicionar documento:', e);
  }
};

// Função para buscar todas as vaquinhas
export const getVaquinhas = async () => {
  const querySnapshot = await getDocs(collection(db, 'vaquinhas'));
  const vaquinhas = [];
  querySnapshot.forEach((doc) => {
    vaquinhas.push({ id: doc.id, ...doc.data() });
  });
  return vaquinhas;
};

// Função para atualizar uma vaquinha existente
export const updateVaquinha = async (id, updatedData) => {
  const vaquinhaRef = doc(db, 'vaquinhas', id);
  try {
    await updateDoc(vaquinhaRef, updatedData);
    console.log('Documento atualizado com sucesso');
  } catch (e) {
    console.error('Erro ao atualizar documento:', e);
  }
};

// Função para deletar uma vaquinha
export const deleteVaquinha = async (id) => {
  const vaquinhaRef = doc(db, 'vaquinhas', id);
  try {
    await deleteDoc(vaquinhaRef);
    console.log('Documento deletado com sucesso');
  } catch (e) {
    console.error('Erro ao deletar documento:', e);
  }
};
