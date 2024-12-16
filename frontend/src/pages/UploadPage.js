import React, { useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Por favor, selecione um arquivo.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setMessage('');
      setProgress(0);

      const response = await axios.post('http://localhost:3000/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
        },
      });

      setMessage('Upload realizado com sucesso!');
      setExtractedText(response.data.text); // Supondo que o backend retorna o texto extraído em `data.text`
    } catch (error) {
      setMessage('Erro ao fazer upload.');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Upload de Documentos</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Enviar</button>

      {progress > 0 && <p>Progresso: {progress}%</p>}
      {message && <p>{message}</p>}

      {extractedText && (
        <div>
          <h2>Texto Extraído:</h2>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
}
