import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class DocumentService {
  private prisma = new PrismaClient();

  async uploadDocument(userId: string, filePath: string): Promise<string> {
   
    const ocrResult = await Tesseract.recognize(filePath, 'eng');
    const extractedText = ocrResult.data.text;

    
    const document = await this.prisma.document.create({
      data: { userId, filePath, extractedText },
    });

    return document.extractedText;
  }

  async getDocuments(userId: string) {
    
    return this.prisma.document.findMany({ where: { userId } });
  }
}
