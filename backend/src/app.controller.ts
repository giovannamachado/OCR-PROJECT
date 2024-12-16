import { Controller, Get, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GptService } from './gpt.service';  // Importando o GptService

@Controller()
export class AppController {
  constructor(private readonly gptService: GptService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

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
  handleFileUpload(@UploadedFile() file: Express.Multer.File) {
    console.log('Arquivo recebido:', file);

    // Aqui, você pode integrar uma lógica de OCR para extrair o conteúdo do boleto
    // Simulando o conteúdo extraído para o exemplo
    const extractedText = 'Exemplo de conteúdo extraído do boleto. Incluindo dados como valor, vencimento e pagador.';
    
    return {
      message: 'Upload realizado com sucesso!',
      filePath: file.path, // Caminho do arquivo salvo
      fileName: file.filename,
      extractedText,  // Retorna o conteúdo extraído do boleto
    };
  }

  // Rota para fazer perguntas
  @Post('/ask')
  async askQuestion(@Body() body: { question: string, context: string }) {
    const { question, context } = body;
    
    // Chama o serviço GPT-4 para responder a pergunta com base no contexto do boleto
    const response = await this.gptService.askQuestion(question, context);
    
    return { answer: response };
  }
}
