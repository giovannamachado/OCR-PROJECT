import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

export default function documentList({ documentsUpdated }) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Recupera os documentos do backend sempre que o estado documentsUpdated mudar
    axios.get('http://localhost:3000/documents')
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error('Erro ao carregar os documentos:', error);
      });
  }, [documentsUpdated]);  // Reexecuta sempre que documentsUpdated mudar

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Documentos Enviados
      </Typography>

      {documents.length === 0 ? (
        <Typography variant="body1">Nenhum documento enviado ainda.</Typography>
      ) : (
        <List>
          {documents.map((doc) => (
            <Paper elevation={3} key={doc.id} sx={{ marginBottom: 2, padding: 2 }}>
              <Typography variant="h6">{doc.fileName}</Typography>
              <Typography variant="body2" color="textSecondary">
                Texto Extraído:
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {doc.extractedText}
              </Typography>

              <Typography variant="body2" color="textSecondary">
                Interações:
              </Typography>
              {doc.interactions.length === 0 ? (
                <Typography variant="body2">Nenhuma interação ainda.</Typography>
              ) : (
                <List>
                  {doc.interactions.map((interaction, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`Pergunta: ${interaction.question}`}
                        secondary={`Resposta: ${interaction.response}`}
                      />
                      <Divider />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
}
