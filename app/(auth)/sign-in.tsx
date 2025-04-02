import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState<string>(''); // Campo de email
  const [password, setPassword] = useState<string>(''); // Campo de senha
  const [secureText, setSecureText] = useState<boolean>(true); // Controle de visibilidade da senha

  const handleDirectEntry = () => {
    console.log('Entrada direta sem login', { email, password }); // Mostra os valores digitados no console
    router.push('/'); // Redireciona para a tela inicial sem validação
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Acesse sua conta</Text>
      </View>
      <View style={styles.formContainer}>
        {/* Campo E-mail */}
        <TextInput
          label="E-mail"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          left={<TextInput.Icon icon={() => <Ionicons name="mail-outline" size={20} color="#4A90E2" />} />}
          outlineColor="#F2F2F2"
          activeOutlineColor="#4A90E2"
        />
        {/* Campo Senha */}
        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          right={
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                  <Ionicons
                    name={secureText ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#4A90E2"
                  />
                </TouchableOpacity>
              )}
            />
          }
          left={<TextInput.Icon icon={() => <Ionicons name="lock-closed-outline" size={20} color="#4A90E2" />} />}
          outlineColor="#F2F2F2"
          activeOutlineColor="#4A90E2"
        />
        {/* Botão Entrar */}
        <Button
          mode="contained"
          onPress={handleDirectEntry}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Entrar
        </Button>
        <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
          <Text style={styles.loginText}>
            Não tem conta? <Text style={styles.loginLink}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4A90E2' },
  header: { alignItems: 'center', paddingTop: 60, paddingBottom: 20 },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: { fontSize: 18, color: '#FFFFFF', marginTop: 5 },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingTop: 40,
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#F2F2F2',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4A90E2',
    borderRadius: 25,
  },
  buttonContent: { paddingVertical: 8 },
  buttonLabel: { fontSize: 18, fontWeight: '600' },
  loginText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#9B9B9B' },
  loginLink: { color: '#4A90E2', fontWeight: 'bold' },
});