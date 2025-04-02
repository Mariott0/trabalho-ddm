import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function Layout() {
  return (
    <PaperProvider>
      <Stack
        initialRouteName="(auth)/sign-in" // Ajustado para o caminho correto
        screenOptions={{
          headerStyle: { backgroundColor: '#4A90E2' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="(auth)/sign-in" options={{ title: 'Login', headerShown: false }} />
        <Stack.Screen name="(auth)/sign-up" options={{ title: 'Cadastro' }} />
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="agenda" options={{ title: 'Agenda' }} />
        <Stack.Screen name="cadastroPaciente" options={{ title: 'Cadastrar Paciente' }} />
        <Stack.Screen name="cadastroProfissional" options={{ title: 'Cadastrar Profissional' }} />
        <Stack.Screen name="prontuario" options={{ title: 'Prontuário' }} />
      </Stack>
    </PaperProvider>
  );
}