import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GptService {
  private apiKey = 'CHAVE-API';
  private apiUrl = 'https://api.openai.com/v1/chat/completions'; 

  async askQuestion(question: string, context: string): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'Você é um assistente útil.' },
            { role: 'user', content: `Pergunta: ${question}\nConteúdo do boleto: ${context}` },
          ],
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',  
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      return response.data.choices[0].message.content.trim();  
    } catch (error) {
      console.error('Erro ao comunicar com a API da OpenAI:', error.response ? error.response.data : error.message);
      return 'Desculpe, houve um erro ao processar sua solicitação.';
    }
  }
}
