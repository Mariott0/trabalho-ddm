import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native'; // Adicionado TextInput
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

// Dados fictícios de pacientes e profissionais
const pacientesList = [
  { id: '1', nome: 'João Silva' },
  { id: '2', nome: 'Maria Oliveira' },
  { id: '3', nome: 'Carlos Souza' },
];

const profissionaisList = [
  { id: '1', nome: 'Dr. Pedro', especialidade: 'Médico' },
  { id: '2', nome: 'Dra. Ana', especialidade: 'Dentista' },
  { id: '3', nome: 'Dr. Luiz', especialidade: 'Médico' },
];

export default function Agendar() {
  const [selectedPaciente, setSelectedPaciente] = useState<string>('');
  const [tipoConsulta, setTipoConsulta] = useState<string>('Médica');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedProfissional, setSelectedProfissional] = useState<string>('');
  const [horario, setHorario] = useState<string>(''); // Campo simples para horário
  const router = useRouter();

  const handleConfirmar = () => {
    if (!selectedPaciente || !selectedDate || !selectedProfissional || !horario) {
      Alert.alert('Erro', 'Preencha todos os campos antes de confirmar.');
      return;
    }

    const novoAgendamento = {
      id: Date.now().toString(),
      paciente: pacientesList.find((p) => p.id === selectedPaciente)?.nome || '',
      horario,
      profissional: profissionaisList.find((p) => p.id === selectedProfissional)?.nome || '',
      status: 'pendente',
    };

    // Aqui você pode adicionar lógica para salvar no estado global ou backend
    console.log('Novo agendamento:', novoAgendamento);
    Alert.alert('Sucesso', `Consulta marcada com sucesso para ${novoAgendamento.paciente} em ${selectedDate} às ${horario}`);
    router.back(); // Volta para a tela de Agenda
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Agendar Consulta</Text>

      {/* Seleção de Paciente */}
      <Text style={styles.label}>Paciente:</Text>
      <Picker
        selectedValue={selectedPaciente}
        onValueChange={(itemValue) => setSelectedPaciente(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um paciente" value="" />
        {pacientesList.map((paciente) => (
          <Picker.Item key={paciente.id} label={paciente.nome} value={paciente.id} />
        ))}
      </Picker>

      {/* Tipo de Consulta */}
      <Text style={styles.label}>Tipo de Consulta:</Text>
      <View style={styles.tipoConsultaContainer}>
        <TouchableOpacity
          style={[styles.tipoButton, tipoConsulta === 'Médica' && styles.tipoButtonSelected]}
          onPress={() => setTipoConsulta('Médica')}
        >
          <Text style={styles.tipoButtonText}>Médica</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tipoButton, tipoConsulta === 'Odontológica' && styles.tipoButtonSelected]}
          onPress={() => setTipoConsulta('Odontológica')}
        >
          <Text style={styles.tipoButtonText}>Odontológica</Text>
        </TouchableOpacity>
      </View>

      {/* Calendário */}
      <Text style={styles.label}>Data:</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{ [selectedDate]: { selected: true, selectedColor: '#4A90E2' } }}
        theme={{ selectedDayBackgroundColor: '#4A90E2', todayTextColor: '#4A90E2', arrowColor: '#4A90E2' }}
      />

      {/* Seleção de Profissional */}
      <Text style={styles.label}>Profissional:</Text>
      <Picker
        selectedValue={selectedProfissional}
        onValueChange={(itemValue) => setSelectedProfissional(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um profissional" value="" />
        {profissionaisList
          .filter((prof) => (tipoConsulta === 'Médica' ? prof.especialidade === 'Médico' : prof.especialidade === 'Dentista'))
          .map((profissional) => (
            <Picker.Item key={profissional.id} label={profissional.nome} value={profissional.id} />
          ))}
      </Picker>

      {/* Horário */}
      <Text style={styles.label}>Horário:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: 14:00"
        placeholderTextColor="#9B9B9B"
        value={horario}
        onChangeText={setHorario}
      />

      {/* Botão Confirmar */}
      <TouchableOpacity style={styles.button} onPress={handleConfirmar}>
        <Text style={styles.buttonText}>Confirmar Consulta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A4A4A', marginBottom: 20 },
  label: { fontSize: 16, color: '#4A4A4A', marginBottom: 5 },
  picker: { backgroundColor: '#F2F2F2', borderRadius: 8, marginBottom: 15 },
  tipoConsultaContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  tipoButton: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  tipoButtonSelected: { backgroundColor: '#4A90E2' },
  tipoButtonText: { color: '#4A4A4A', fontSize: 16, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#F2F2F2',
    backgroundColor: '#F2F2F2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
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
});