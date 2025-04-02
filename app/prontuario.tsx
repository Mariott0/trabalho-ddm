import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

interface Historico {
  data: string;
  descricao: string;
}

interface Dente {
  numero: number; // 11-18, 21-28, 31-38, 41-48
  procedimento?: string; // Ex.: "Cárie", "Extração", "Restauração"
  anotacao?: string; // Anotação específica do dente
}

interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  historico: Historico[];
  odontograma: Dente[]; // Novo campo para o odontograma
}

export default function Prontuario() {
  const [pacientesList, setPacientesList] = useState<Paciente[]>([
    {
      id: '1',
      nome: 'João Silva',
      cpf: '123.456.789-00',
      historico: [{ data: '15/03/2025', descricao: 'Consulta de rotina' }],
      odontograma: Array.from({ length: 32 }, (_, i) => ({ numero: i < 16 ? 11 + i : 31 + (i - 16) })),
    },
    {
      id: '2',
      nome: 'Maria Oliveira',
      cpf: '987.654.321-00',
      historico: [],
      odontograma: Array.from({ length: 32 }, (_, i) => ({ numero: i < 16 ? 11 + i : 31 + (i - 16) })),
    },
  ]);
  const [search, setSearch] = useState<string>('');
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(null);
  const [novoHistorico, setNovoHistorico] = useState<string>('');
  const [selectedDente, setSelectedDente] = useState<Dente | null>(null);
  const [procedimento, setProcedimento] = useState<string>('');
  const [anotacaoDente, setAnotacaoDente] = useState<string>('');

  const filteredPacientes = pacientesList.filter((paciente) =>
    paciente.nome.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddHistorico = () => {
    if (selectedPaciente && novoHistorico) {
      const updatedHistorico = [...selectedPaciente.historico, { data: new Date().toLocaleDateString(), descricao: novoHistorico }];
      const updatedPaciente = { ...selectedPaciente, historico: updatedHistorico };
      setPacientesList((prevList) => prevList.map((p) => (p.id === selectedPaciente.id ? updatedPaciente : p)));
      setNovoHistorico('');
      console.log('Prontuário atualizado:', updatedPaciente);
    }
  };

  const handleUpdateOdontograma = () => {
    if (selectedPaciente && selectedDente) {
      const updatedOdontograma = selectedPaciente.odontograma.map((dente) =>
        dente.numero === selectedDente.numero ? { ...dente, procedimento, anotacao: anotacaoDente } : dente
      );
      const updatedPaciente = { ...selectedPaciente, odontograma: updatedOdontograma };
      setPacientesList((prevList) => prevList.map((p) => (p.id === selectedPaciente.id ? updatedPaciente : p)));
      setProcedimento('');
      setAnotacaoDente('');
      setSelectedDente(null);
      console.log('Odontograma atualizado:', updatedPaciente);
    }
  };

  const renderPaciente = ({ item }: { item: Paciente }) => (
    <TouchableOpacity style={styles.item} onPress={() => setSelectedPaciente(item)}>
      <Text style={styles.itemText}>{item.nome}</Text>
      <Text style={styles.itemSubText}>CPF: {item.cpf}</Text>
    </TouchableOpacity>
  );

  const renderDente = (dente: Dente) => (
    <TouchableOpacity
      key={dente.numero.toString()} // Adicionada a propriedade key única
      style={[styles.dente, dente.procedimento ? styles.denteMarcado : null]}
      onPress={() => setSelectedDente(dente)}
    >
      <Text style={styles.denteText}>{dente.numero}</Text>
      {dente.procedimento && <Text style={styles.denteSubText}>{dente.procedimento}</Text>}
    </TouchableOpacity>
  );

  const procedimentosDisponiveis = ['Cárie', 'Extração', 'Restauração', 'Limpeza', 'Nenhum'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prontuário</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquisar paciente"
        placeholderTextColor="#9B9B9B"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredPacientes}
        renderItem={renderPaciente}
        keyExtractor={(item: Paciente) => item.id}
        style={styles.list}
      />
      {selectedPaciente && (
        <ScrollView style={styles.card}>
          <Text style={styles.cardTitle}>{selectedPaciente.nome}</Text>
          <Text style={styles.cardSubText}>CPF: {selectedPaciente.cpf}</Text>

          {/* Odontograma */}
          <Text style={styles.sectionTitle}>Odontograma</Text>
          <View style={styles.odontogramaContainer}>
            {/* Quadrante Superior Direito (11-18) */}
            <View style={styles.quadrante}>
              {selectedPaciente.odontograma.slice(0, 8).map(renderDente)}
            </View>
            {/* Quadrante Superior Esquerdo (21-28) */}
            <View style={styles.quadrante}>
              {selectedPaciente.odontograma.slice(8, 16).map(renderDente)}
            </View>
            {/* Quadrante Inferior Direito (41-48) */}
            <View style={styles.quadrante}>
              {selectedPaciente.odontograma.slice(24, 32).map(renderDente)}
            </View>
            {/* Quadrante Inferior Esquerdo (31-38) */}
            <View style={styles.quadrante}>
              {selectedPaciente.odontograma.slice(16, 24).map(renderDente)}
            </View>
          </View>

          {/* Edição do Dente Selecionado */}
          {selectedDente && (
            <View style={styles.denteEditor}>
              <Text style={styles.sectionTitle}>Dente {selectedDente.numero}</Text>
              <Text style={styles.label}>Procedimento:</Text>
              <View style={styles.procedimentoContainer}>
                {procedimentosDisponiveis.map((proc) => (
                  <TouchableOpacity
                    key={proc} // Adicionada a propriedade key única
                    style={[styles.procedimentoButton, procedimento === proc && styles.procedimentoSelected]}
                    onPress={() => setProcedimento(proc === 'Nenhum' ? '' : proc)}
                  >
                    <Text style={styles.procedimentoText}>{proc}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={styles.input}
                placeholder="Anotação para o dente"
                placeholderTextColor="#9B9B9B"
                value={anotacaoDente}
                onChangeText={setAnotacaoDente}
              />
              <TouchableOpacity style={styles.button} onPress={handleUpdateOdontograma}>
                <Text style={styles.buttonText}>Salvar Alterações</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Histórico Geral */}
          <Text style={styles.sectionTitle}>Histórico</Text>
          {selectedPaciente.historico.map((entry: Historico, index: number) => (
            <View key={index.toString()} style={styles.historicoItem}>
              <Text style={styles.itemText}>{entry.data}</Text>
              <Text style={styles.itemSubText}>{entry.descricao}</Text>
            </View>
          ))}
          <TextInput
            style={styles.input}
            placeholder="Adicionar ao histórico"
            placeholderTextColor="#9B9B9B"
            value={novoHistorico}
            onChangeText={setNovoHistorico}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddHistorico}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A4A4A', marginBottom: 20 },
  searchInput: {
    borderWidth: 1,
    borderColor: '#F2F2F2',
    backgroundColor: '#F2F2F2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    color: '#4A4A4A',
  },
  list: { flex: 1 },
  item: { backgroundColor: '#F2F2F2', padding: 15, borderRadius: 8, marginBottom: 10 },
  itemText: { fontSize: 16, fontWeight: '600', color: '#4A4A4A' },
  itemSubText: { fontSize: 14, color: '#9B9B9B' },
  card: { backgroundColor: '#F2F2F2', padding: 15, borderRadius: 8, marginTop: 20 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#4A4A4A' },
  cardSubText: { fontSize: 14, color: '#9B9B9B' },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#4A4A4A', marginTop: 10, marginBottom: 5 },
  historicoItem: { padding: 10, backgroundColor: '#FFFFFF', borderRadius: 5, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#F2F2F2',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    color: '#4A4A4A',
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  odontogramaContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  quadrante: { width: '48%', marginBottom: 10 },
  dente: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  denteMarcado: { backgroundColor: '#E57373' },
  denteText: { fontSize: 14, fontWeight: '600', color: '#4A4A4A' },
  denteSubText: { fontSize: 12, color: '#FFFFFF' },
  denteEditor: { marginTop: 10 },
  label: { fontSize: 14, color: '#4A4A4A', marginBottom: 5 },
  procedimentoContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  procedimentoButton: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  procedimentoSelected: { backgroundColor: '#7ED321' },
  procedimentoText: { color: '#FFFFFF', fontSize: 12 },
});