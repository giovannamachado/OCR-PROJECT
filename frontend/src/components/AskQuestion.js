import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Paper, Box, CircularProgress } from '@mui/material';
import './AskQuestion.css';  // Importe o CSS para personalizar o estilo

export default function AskQuestion() {
  const [file, setFile] = useState(null);  // Para armazenar o arquivo
  const [question, setQuestion] = useState('');  // Para armazenar a pergunta
  const [answer, setAnswer] = useState('');  // Para armazenar a resposta
  const [context, setContext] = useState('');  // O texto extraído do boleto
  const [loading, setLoading] = useState(false); // Para mostrar o loader durante a requisição

  // Função para enviar o arquivo
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);  // Ativa o loader enquanto espera a resposta

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Armazena o conteúdo extraído do boleto
      setContext(response.data.extractedText);
      console.log('Conteúdo extraído:', response.data.extractedText);

    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    } finally {
      setLoading(false);  // Desativa o loader
    }
  };

  // Função para enviar a pergunta
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Ativa o loader enquanto espera a resposta

    try {
      const response = await axios.post('http://localhost:3000/ask', {
        question,
        context,  // Envia o conteúdo extraído do boleto junto com a pergunta
      });

      setAnswer(response.data.answer);  // Exibe a resposta gerada pela LLM
    } catch (error) {
      console.error('Erro ao enviar a pergunta:', error);
      setAnswer('Desculpe, houve um erro ao processar sua pergunta.');
    } finally {
      setLoading(false);  // Desativa o loader
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Consulta de Boleto
        </Typography>

        {/* Formulário de Upload */}
        <Box component="form" onSubmit={handleUpload} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            fullWidth
            variant="outlined"
            label="Selecione o Boleto"
            inputProps={{ accept: '.pdf,.jpg,.png,.jpeg' }}
            disabled={loading}
          />
          <Button variant="contained" color="primary" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar Boleto'}
          </Button>
        </Box>

        {/* Exibir conteúdo extraído */}
        {context && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6">Conteúdo Extraído:</Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {context}
            </Typography>
          </Box>
        )}

        {/* Formulário para Perguntar sobre o Boleto */}
        {context && (
          <Box component="form" onSubmit={handleQuestionSubmit} sx={{ marginTop: 4 }}>
            <TextField
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              fullWidth
              variant="outlined"
              label="Digite sua pergunta"
              disabled={loading}
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              sx={{ marginTop: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Perguntar'}
            </Button>
          </Box>
        )}

        {/* Exibir a resposta gerada pela LLM */}
        {answer && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6">Resposta:</Typography>
            <Typography variant="body1">{answer}</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
