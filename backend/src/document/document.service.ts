import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as Tesseract from 'tesseract.js'; // Biblioteca OCR

@Injectable()
export class DocumentService {
  getDocuments(userId: any) {
    throw new Error('Method not implemented.');
  }
  private prisma = new PrismaClient(); 

  async uploadDocument(userId: string, filePath: string): Promise<string> {
    try {
      
      const ocrResult = await Tesseract.recognize(filePath, 'eng', {
        logger: (m) => console.log(m), 
      });

      const extractedText = ocrResult.data.text; 

     
      await this.prisma.document.create({
        data: {
          userId,
          filePath,
          extractedText,
        },
      });

      return extractedText; 
    } catch (error) {
      console.error('Erro no uploadDocument:', error);
      throw new Error('Falha ao processar o documento.');
    }
  }
}
