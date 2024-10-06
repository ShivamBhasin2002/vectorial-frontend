import { CHAT_AGENT_API_ENDPOINT } from '@constants/restConstants';
import { RestApiClient } from './restClient';

interface Conversation {
  role: string;
  content: string;
}

interface ChatRequest {
  conversations: Conversation[];
}

interface ChatResponse {
  response: string;
}

export class ChatAgentAccessor {
  private client: RestApiClient;

  constructor() {
    this.client = new RestApiClient(CHAT_AGENT_API_ENDPOINT);
  }

  async getRagResponse(conversations: Conversation[]): Promise<ChatResponse> {
    try {
      const chatRequest: ChatRequest = { conversations };
      
      return await this.client.post<ChatResponse>('/rag/', chatRequest, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get RAG response: ${error.message}`);
      } else {
        throw new Error('Failed to get RAG response: Unknown error');
      }
    }
  }
}