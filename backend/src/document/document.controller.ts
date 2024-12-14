import { Controller, Post, UseInterceptors, UploadedFile, Get, Req, Headers, UnauthorizedException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async upload(
    @UploadedFile() file,
    @Req() req,
    @Headers('Authorization') authHeader: string, 
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('No token provided'); 
    }

    const token = authHeader.replace('Bearer ', ''); 
    console.log('Token recebido:', token);

    
    if (token !== 'meu-token-valido') {
      throw new UnauthorizedException('Invalid token');
    }

    const userId = req.user?.id || 'default-user-id'; 
    const extractedText = await this.documentService.uploadDocument(userId, file.path);
    return { message: 'File uploaded successfully', extractedText };
  }

  
  @Get()
  async listDocuments(
    @Req() req,
    @Headers('Authorization') authHeader: string, 
  ) {
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token recebido:', token);

    if (token !== 'meu-token-valido') {
      throw new UnauthorizedException('Invalid token');
    }

    const userId = req.user?.id || 'default-user-id';
    return this.documentService.getDocuments(userId);
  }
}
