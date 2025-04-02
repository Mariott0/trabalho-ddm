import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';

interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
}

export default function CadastroPaciente() {
  const [nome, setNome] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [pacientesList, setPacientesList] = useState<Paciente[]>([]);

  const handleCadastro = () => {
    const novoPaciente: Paciente = { id: Date.now().toString(), nome, cpf, telefone };
    setPacientesList((prevList) => {
      const updatedList = [...prevList, novoPaciente];
      console.log('Paciente cadastrado:', novoPaciente);
      console.log('Lista de Pacientes:', updatedList);
      return updatedList;
    });
    setNome('');
    setCpf('');
    setTelefone('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Paciente</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor="#9B9B9B"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#9B9B9B"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor="#9B9B9B"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
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