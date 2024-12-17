import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Res, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as Tesseract from 'tesseract.js'; // Para OCR
import * as fs from 'fs';
import { Response } from 'express';
import { GptService } from './gpt.service';

const uploadedDocuments = []; // Lista de documentos armazenados

@Controller()
export class AppController {
  constructor(private readonly gptService: GptService) {}

  // Rota para upload do arquivo
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Pasta onde os arquivos serão salvos
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Obtém a extensão do arquivo
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async handleFileUpload(@UploadedFile() file: Express.Multer.File) {
    console.log('Arquivo recebido:', file);

    // Realiza a extração do texto com OCR
    const extractedText = await this.extractTextWithOCR(file.path);

    // Cria uma entrada para o documento
    const documentInfo = {
      id: uploadedDocuments.length + 1, // Gerando um ID único
      fileName: file.originalname,
      filePath: file.path,
      extractedText, // Texto extraído do boleto
      interactions: [],
    };

    // Armazena o documento na lista
    uploadedDocuments.push(documentInfo);
    console.log('Documentos armazenados:', uploadedDocuments); // Log para verificar os documentos

    return {
      message: 'Upload realizado com sucesso!',
      document: documentInfo,
    };
  }

  // Função que usa Tesseract.js para extrair texto do arquivo
  private extractTextWithOCR(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      Tesseract.recognize(
        filePath, // Caminho para o arquivo de imagem
        'eng', // Linguagem do OCR
        {
          logger: (m) => console.log(m), // Logger para ver o progresso
        }
      ).then(({ data: { text } }) => {
        console.log('Texto extraído:', text);
        resolve(text); // Retorna o texto extraído
      }).catch((error) => {
        console.error('Erro ao processar OCR:', error);
        reject('Erro ao processar OCR');
      });
    });
  }

  // Rota para download do conteúdo extraído
  @Get('/download-text/:documentId')
  downloadTextFile(@Res() res: Response, @Param('documentId') documentId: number) {
    const document = uploadedDocuments.find(doc => doc.id === documentId);
    if (!document) {
      return res.status(404).send('Documento não encontrado.');
    }

    const fileName = `documento_${document.id}.txt`;
    const filePath = `./uploads/${fileName}`;

    // Cria um arquivo de texto com o conteúdo extraído
    fs.writeFileSync(filePath, `Conteúdo Extraído do Boleto:\n\n${document.extractedText}`);

    // Envia o arquivo para o usuário fazer o download
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Erro ao fazer download do arquivo:', err);
      }
      fs.unlinkSync(filePath); // Remove o arquivo após o download
    });
  }

  // Rota para fazer perguntas utilizando o LLM (GPT)
  @Post('/ask')
  async askQuestion(@Body() body: { question: string; context: string; apiKey: string }) {
    const { question, context, apiKey } = body;

    const response = await this.gptService.askQuestion(question, context, apiKey);

    // Armazena a interação com a resposta do LLM
    const document = uploadedDocuments.find(doc => doc.extractedText === context);
    if (document) {
      document.interactions.push({ question, response });
    }

    return { answer: response };
  }

  // Rota para listar os documentos carregados
  @Get('/documents')
  getUploadedDocuments() {
    return uploadedDocuments;
  }
}
