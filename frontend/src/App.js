import React, { useState } from 'react';
import AskQuestion from './components/AskQuestion/AskQuestion';
import DocumentList from './components/DocumentsList/documentsList';
import { Drawer, Box, CssBaseline, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false); // Controla o estado do Drawer
  const [documentsUpdated, setDocumentsUpdated] = useState(false); // Controla se os documentos foram atualizados após o upload

  // Função para abrir/fechar o Drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Função para atualizar a lista de documentos após o upload
  const handleDocumentsUpdate = () => {
    setDocumentsUpdated(!documentsUpdated); // Força a atualização da lista de documentos
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Consultar Boletos
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Lateral esquerda (Drawer) */}
      <Drawer
        sx={{
          width: 300, // Largura da barra lateral
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
            padding: 2,
            backgroundColor: '#f5f5f5',
          },
        }}
        variant="persistent"
        anchor="left"  
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: 2 }}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DocumentList documentsUpdated={documentsUpdated} />
      </Drawer>

      {/* Conteúdo principal (AskQuestion) */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#e0f7fa',
          padding: 3,
          marginTop: 8, // Para deixar espaço abaixo do AppBar
          width: '100%',
        }}
      >
        <AskQuestion onDocumentsUpdate={handleDocumentsUpdate} />
      </Box>
    </Box>
  );
}

export default App;
