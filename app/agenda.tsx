import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
import { useRouter } from 'expo-router';

interface Agendamento {
  id: string;
  paciente: string;
  horario: string;
  profissional: string;
  status: string;
}

const initialAgendamentos: { [key: string]: Agendamento[] } = {
  '2025-04-01': [
    { id: '1', paciente: 'João Silva', horario: '14:00', profissional: 'Dr. Pedro', status: 'confirmado' },
    { id: '2', paciente: 'Maria Oliveira', horario: '15:30', profissional: 'Dra. Ana', status: 'pendente' },
  ],
  '2025-04-02': [
    { id: '3', paciente: 'Carlos Souza', horario: '10:00', profissional: 'Dr. Pedro', status: 'confirmado' },
  ],
};

export default function Agenda() {
  const [agendamentos, setAgendamentos] = useState(initialAgendamentos);
  const [selectedDate, setSelectedDate] = useState<string>('2025-04-01');
  const router = useRouter();

  const renderItem = ({ item }: { item: Agendamento }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.paciente}</Text>
      <Text style={styles.itemSubText}>{item.horario} - {item.profissional}</Text>
      <Text style={styles.itemSubText}>Status: {item.status}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => console.log(`Remarcar: ${item.id}`)}>
          <Text style={styles.actionButtonText}>Remarcar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#E57373' }]}
          onPress={() => console.log(`Cancelar: ${item.id}`)}
        >
          <Text style={styles.actionButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#7ED321' }]}
          onPress={() => console.log(`Confirmado: ${item.id}`)}
        >
          <Text style={styles.actionButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleOpenAgendar = () => {
    router.push('/agendar'); // Abre a tela de agendamento
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)} // Removido :Day, tipagem inferida
        markedDates={{ [selectedDate]: { selected: true, selectedColor: '#4A90E2' } }}
        theme={{ selectedDayBackgroundColor: '#4A90E2', todayTextColor: '#4A90E2', arrowColor: '#4A90E2' }}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleOpenAgendar}>
        <Text style={styles.addButtonText}>Agendar</Text>
      </TouchableOpacity>
      <FlatList
        data={agendamentos[selectedDate] || []}
        renderItem={renderItem}
        keyExtractor={(item: Agendamento) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#4A4A4A', marginBottom: 20 },
  list: { flex: 1, marginTop: 10 },
  item: {
    backgroundColor: '#F2F2F2',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemText: { fontSize: 16, fontWeight: '600', color: '#4A4A4A' },
  itemSubText: { fontSize: 14, color: '#9B9B9B' },
  addButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  addButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  actionButton: { backgroundColor: '#4A90E2', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  actionButtonText: { color: '#FFFFFF', fontSize: 14 },
});