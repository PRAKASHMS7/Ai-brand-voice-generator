import type { OpenRouterRequestPayload, OpenRouterResponse } from '../types/api';
import { MODELS_CONFIG, OPENROUTER_MODEL_IDS } from '../config/models';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const REQUEST_TIMEOUT_MS = 60000; // 60 seconds

export class OpenRouterInvalidKeyError extends Error {
  constructor(message = 'Unauthorized: The provided OpenRouter API Key is invalid. Please verify it in your `.env` file.') {
    super(message);
    this.name = 'OpenRouterInvalidKeyError';
  }
}

export class OpenRouterModelUnavailableError extends Error {
  constructor(modelName: string, message = `Model Unavailable: No available endpoint for selected model "${modelName}". Suggest selecting another model.`) {
    super(message);
    this.name = 'OpenRouterModelUnavailableError';
  }
}

export class OpenRouterRateLimitError extends Error {
  constructor(message = 'Rate Limit: Too many requests sent. Please wait a moment and try again.') {
    super(message);
    this.name = 'OpenRouterRateLimitError';
  }
}

export class OpenRouterTimeoutError extends Error {
  constructor(message = 'Request Timeout: OpenRouter took longer than 60 seconds to fulfill the request. Please try again or select a faster model.') {
    super(message);
    this.name = 'OpenRouterTimeoutError';
  }
}

export class OpenRouterNetworkError extends Error {
  constructor(message = 'Network Connection Error: Failed to reach OpenRouter. Please check your internet connection or firewall rules.') {
    super(message);
    this.name = 'OpenRouterNetworkError';
  }
}

export class OpenRouterService {
  private static getModelName(modelId: string): string {
    const modelConfig = MODELS_CONFIG.find(m => OPENROUTER_MODEL_IDS[m.id] === modelId);
    return modelConfig ? modelConfig.name : modelId;
  }

  /**
   * Dispatches a brand voice prompt to the specified OpenRouter model.
   * If the model is unavailable, it automatically falls back to the next available configured model.
   */
  static async generateBrandVoice(selectedModelId: string, prompt: string): Promise<string> {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey || apiKey === 'YOUR_API_KEY' || apiKey.trim() === '') {
      throw new Error(
        'Missing OpenRouter API Key. Please create a `.env` file at your project root containing VITE_OPENROUTER_API_KEY=your_key_here.'
      );
    }

    // Determine fallback list based on config.
    const configuredModelIds = MODELS_CONFIG.map(m => OPENROUTER_MODEL_IDS[m.id]);

    let startIndex = configuredModelIds.indexOf(selectedModelId);
    if (startIndex === -1) {
      configuredModelIds.unshift(selectedModelId);
      startIndex = 0;
    }

    const queue: string[] = [];
    for (let i = 0; i < configuredModelIds.length; i++) {
      const idx = (startIndex + i) % configuredModelIds.length;
      queue.push(configuredModelIds[idx]);
    }

    for (const currentModelId of queue) {
      try {
        const result = await this.attemptRequest(apiKey, currentModelId, prompt);
        
        if (currentModelId !== selectedModelId) {
          const selectedModelName = this.getModelName(selectedModelId);
          const actualModelName = this.getModelName(currentModelId);
          return `[NOTICE: The selected model "${selectedModelName}" was unavailable. Suggest selecting another model in the sidebar. Automatically fell back to "${actualModelName}" to generate the response below.]\n\n==================================================\n\n${result}`;
        }
        
        return result;
      } catch (error: any) {
        if (error instanceof OpenRouterModelUnavailableError) {
          // If there are other models to try in the fallback queue, continue
          if (queue.indexOf(currentModelId) < queue.length - 1) {
            console.warn(`Model ${currentModelId} is unavailable. Falling back...`);
            continue;
          }
        }
        // Rethrow network, key, limit, timeout, or final unavailable error immediately
        throw error;
      }
    }

    const selectedModelName = this.getModelName(selectedModelId);
    throw new OpenRouterModelUnavailableError(
      selectedModelName,
      `Model Unavailable: Selected model "${selectedModelName}" and all fallback models were unavailable. Suggest selecting another model.`
    );
  }

  private static async attemptRequest(apiKey: string, modelId: string, prompt: string): Promise<string> {
    const payload: OpenRouterRequestPayload = {
      model: modelId,
      messages: [
        {
          role: 'system',
          content: 'You are an elite brand consulting strategist. Build comprehensive brand style guides.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
    };

    if (import.meta.env.DEV) {
      console.log('=== [OpenRouter API Request] ===');
      console.log(`Target Model ID: ${modelId}`);
      console.log(`Payload Prompt: \n${prompt}`);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin || 'http://localhost:5173',
          'X-Title': 'Brand Voice Generator',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const modelName = this.getModelName(modelId);

      if (!response.ok) {
        let errorMessage = `HTTP error! Status: ${response.status}`;
        try {
          const errData = await response.json();
          if (errData?.error?.message) {
            errorMessage = errData.error.message;
          }
        } catch {
          // JSON parsing failed
        }

        if (response.status === 401) {
          throw new OpenRouterInvalidKeyError();
        } else if (response.status === 429) {
          throw new OpenRouterRateLimitError();
        } else if (
          response.status === 404 ||
          response.status === 400 ||
          errorMessage.toLowerCase().includes('no endpoints') ||
          errorMessage.toLowerCase().includes('not a valid model id') ||
          errorMessage.toLowerCase().includes('model not found')
        ) {
          throw new OpenRouterModelUnavailableError(modelName);
        } else {
          throw new Error(`OpenRouter Service Error: ${errorMessage}`);
        }
      }

      const data: OpenRouterResponse = await response.json();

      if (data.error) {
        const msg = data.error.message || '';
        if (
          msg.toLowerCase().includes('no endpoints') ||
          msg.toLowerCase().includes('not a valid model id') ||
          msg.toLowerCase().includes('model not found')
        ) {
          throw new OpenRouterModelUnavailableError(modelName);
        }
        throw new Error(`OpenRouter API Failure: ${msg}`);
      }

      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        throw new Error('Completion Error: The model responded with empty content. Please try another model.');
      }

      if (import.meta.env.DEV) {
        console.log('=== [OpenRouter API Response] ===');
      }

      return content;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new OpenRouterTimeoutError();
      }

      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new OpenRouterNetworkError();
      }

      if (
        error instanceof OpenRouterInvalidKeyError ||
        error instanceof OpenRouterModelUnavailableError ||
        error instanceof OpenRouterRateLimitError ||
        error instanceof OpenRouterTimeoutError ||
        error instanceof OpenRouterNetworkError
      ) {
        throw error;
      }

      throw error;
    }
  }
}
