import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignUp() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [errors, setErrors] = useState({ nome: '', email: '', senha: '' });

  const handleSignUp = () => {
    let valid = true;
    const newErrors = { nome: '', email: '', senha: '' };

    if (!nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
      valid = false;
    }
    if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'E-mail inválido';
      valid = false;
    }
    if (senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log('Usuário cadastrado:', { nome, email, senha });
      router.push('/sign-in'); // Redireciona para login após cadastro
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Junte-se à Clínica Manager</Text>
      </View>

      <View style={styles.formContainer}>
        {/* Campo Nome */}
        <TextInput
          label="Nome"
          mode="outlined"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          left={<TextInput.Icon icon={() => <Ionicons name="person-outline" size={20} color="#4A90E2" />} />}
          error={!!errors.nome}
          outlineColor="#F2F2F2"
          activeOutlineColor="#4A90E2"
        />
        {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}

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
          error={!!errors.email}
          outlineColor="#F2F2F2"
          activeOutlineColor="#4A90E2"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        {/* Campo Senha */}
        <TextInput
          label="Senha"
          mode="outlined"
          secureTextEntry={secureText}
          value={senha}
          onChangeText={setSenha}
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
          error={!!errors.senha}
          outlineColor="#F2F2F2"
          activeOutlineColor="#4A90E2"
        />
        {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}

        {/* Botão Criar Conta */}
        <Button
          mode="contained"
          onPress={handleSignUp}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Criar Conta
        </Button>

        {/* Link para Login */}
        <TouchableOpacity onPress={() => router.push('/sign-in')}>
          <Text style={styles.loginText}>
            Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2', // Azul Suave como fundo do cabeçalho
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 5,
  },
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
    backgroundColor: '#F2F2F2', // Cinza Claro como fundo do input
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4A90E2', // Azul Suave para o botão
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  loginText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#9B9B9B', // Cinza Médio para texto secundário
  },
  loginLink: {
    color: '#4A90E2', // Azul Suave para o link
    fontWeight: 'bold',
  },
  errorText: {
    color: '#E57373', // Vermelho Suave para erros
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 5,
  },
});