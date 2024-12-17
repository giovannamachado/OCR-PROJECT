import { Controller, Get, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GptService } from './gpt.service';

const uploadedDocuments = [];

@Controller()
export class AppController {
  constructor(private readonly gptService: GptService) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  handleFileUpload(@UploadedFile() file: Express.Multer.File) {
    console.log('Arquivo recebido:', file);

    const extractedText = 'Texto extraído do boleto. Incluindo dados como valor, vencimento e pagador.';

    const documentInfo = {
      id: uploadedDocuments.length + 1,
      fileName: file.originalname,
      filePath: file.path,
      extractedText,
      interactions: [],
    };
    uploadedDocuments.push(documentInfo);

    return {
      message: 'Upload realizado com sucesso!',
      document: documentInfo,
    };
  }

  @Post('/ask')
  async askQuestion(@Body() body: { question: string; context: string }) {
    const { question, context } = body;

    // Envia a pergunta para a LLM e recebe a resposta
    const response = await this.gptService.askQuestion(question, context);

    return { answer: response };
  }

  @Get('/documents')
  getUploadedDocuments() {
    return uploadedDocuments;
  }
}
