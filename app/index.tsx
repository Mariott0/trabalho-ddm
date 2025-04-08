import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  const handleLogout = () => {
    console.log('Usuário desconectado');
    router.push('/sign-in'); // Redireciona para a tela de login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clínica Manager</Text>
      <Text style={styles.subtitle}>Gerencie seu consultório com facilidade</Text>

      <Link href="/agenda" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ver Agenda</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/cadastroPaciente" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar Paciente</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/cadastroProfissional" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar Profissional</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/prontuario" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Prontuário</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/dashboard" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Dashboard</Text>
        </TouchableOpacity>
      </Link>

      {/* Botão de Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#9B9B9B',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#E57373', // Vermelho Suave
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});