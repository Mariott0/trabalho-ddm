import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
}

export default function CadastroProfissional() {
  const [nome, setNome] = useState<string>('');
  const [especialidade, setEspecialidade] = useState<string>('');
  const [crm, setCrm] = useState<string>('');
  const [profissionaisList, setProfissionaisList] = useState<Profissional[]>([]);

  const handleCadastro = () => {
    const novoProfissional: Profissional = { id: Date.now().toString(), nome, especialidade, crm };
    setProfissionaisList((prevList) => {
      const updatedList = [...prevList, novoProfissional];
      console.log('Profissional cadastrado:', novoProfissional);
      console.log('Lista de Profissionais:', updatedList);
      return updatedList;
    });
    setNome('');
    setEspecialidade('');
    setCrm('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Profissional</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#9B9B9B"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Especialidade"
        placeholderTextColor="#9B9B9B"
        value={especialidade}
        onChangeText={setEspecialidade}
      />
      <TextInput
        style={styles.input}
        placeholder="CRM/CRO"
        placeholderTextColor="#9B9B9B"
        value={crm}
        onChangeText={setCrm}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFFFFF' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A4A4A', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#F2F2F2',
    backgroundColor: '#F2F2F2',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    color: '#4A4A4A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});