import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

interface Vaquinha {
  id?: string;
  nome: string;
  descricao: string;
  peso: string;
  tipo: string;
  raca: string;
}

export const addVaquinha = async (nome: string, descricao: string, peso: string, tipo: string, raca: string): Promise<any> => {
  try {
    const docRef = await addDoc(collection(db, 'vaquinhas'), {
      nome,
      descricao,
      peso,
      tipo,
      raca,
    });
    console.log('Documento adicionado com ID:', docRef.id);
    return docRef;
  } catch (e) {
    console.error('Erro ao adicionar documento:', e);
    throw e;
  }
};

export const getVaquinhas = async (): Promise<Vaquinha[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, 'vaquinhas'));
    const vaquinhas: Vaquinha[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Vaquinha;
      vaquinhas.push({ id: doc.id, ...data });
    });
    return vaquinhas;
  } catch (e) {
    console.error('Erro ao buscar vaquinhas:', e);
    return [];
  }
};

export const updateVaquinha = async (id: string, updatedData: Partial<Vaquinha>): Promise<void> => {
  const vaquinhaRef = doc(db, 'vaquinhas', id);
  try {
    await updateDoc(vaquinhaRef, updatedData);
    console.log('Documento atualizado com sucesso');
  } catch (e) {
    console.error('Erro ao atualizar documento:', e);
    throw e;
  }
};

export const deleteVaquinha = async (id: string): Promise<void> => {
  const vaquinhaRef = doc(db, 'vaquinhas', id);
  try {
    await deleteDoc(vaquinhaRef);
    console.log('Documento deletado com sucesso');
  } catch (e) {
    console.error('Erro ao deletar documento:', e);
    throw e;
  }
};
