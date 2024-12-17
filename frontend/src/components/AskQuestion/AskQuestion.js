import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, CircularProgress, Box, Typography, LinearProgress, Divider } from '@mui/material';

export default function AskQuestion({ onDocumentsUpdate }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [context, setContext] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [documentId, setDocumentId] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setUploadStatus('');
    setUploadProgress(0);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setUploadProgress(progress);
        }
      });

      setContext(response.data.document.extractedText); // Exibe o texto extraído
      setUploadStatus('success');
      setDocumentId(response.data.document.id);
      onDocumentsUpdate();
    } catch (error) {
      setUploadStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!apiKey || !question) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/ask', {
        question,
        context,
        apiKey,
      });

      setAnswer(response.data.answer);
    } catch (error) {
      setAnswer('Desculpe, houve um erro ao processar sua pergunta.');
    } finally {
      setLoading(false);
    }
  };

  const downloadDocumentText = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/download-text/${documentId}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `documento_${documentId}.txt`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Erro ao fazer download do documento:', error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Faça perguntas sobre o Boleto
      </Typography>

      <TextField
        label="Chave da API da OpenAI"
        variant="outlined"
        fullWidth
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

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

        {loading && (
          <Box sx={{ marginTop: 2 }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
          </Box>
        )}
      </Box>

      {context && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6">Conteúdo Extraído:</Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {context}
          </Typography>
        </Box>
      )}

      {uploadStatus === 'success' && (
        <Typography variant="body1" color="success.main" sx={{ marginTop: 2 }}>
          Documento carregado com sucesso!
        </Typography>
      )}
      {uploadStatus === 'error' && (
        <Typography variant="body1" color="error.main" sx={{ marginTop: 2 }}>
          Houve um erro ao carregar o documento.
        </Typography>
      )}

      <Box component="form" onSubmit={handleQuestionSubmit} sx={{ marginTop: 4 }}>
        <TextField
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
          variant="outlined"
          label="Digite sua pergunta"
          disabled={loading || !context}
        />
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={loading || !context}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Perguntar'}
        </Button>
      </Box>

      {answer && (
        <Box sx={{ marginTop: 4 }}>
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="h6">Resposta:</Typography>
          <Typography variant="body1">{answer}</Typography>
        </Box>
      )}

      {documentId && (
        <Button
          variant="contained"
          color="primary"
          onClick={downloadDocumentText}
          sx={{ marginTop: 4 }}
        >
          Baixar Conteúdo Extraído
        </Button>
      )}
    </Box>
  );
}
