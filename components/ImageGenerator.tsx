import React, { useState } from 'react';
import { generateProductImage, openApiKeySelection, checkApiKey } from '../services/geminiService';
import { Button } from './Button';
import { ImageSize } from '../types';
import { Wand2, Image as ImageIcon, AlertCircle, Settings } from 'lucide-react';

interface ImageGeneratorProps {
  onImageGenerated: (url: string, prompt: string) => void;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState<boolean>(false);

  // Check for key on mount
  React.useEffect(() => {
    checkApiKey().then(setHasKey);
  }, []);

  const handleConnect = async () => {
    try {
      await openApiKeySelection();
      // Assume success after dialog interaction in real scenario, 
      // strictly following prompt guidance to assume success and not wait/race.
      setHasKey(true);
    } catch (e) {
      console.error(e);
      setError("Failed to open key selection.");
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const imageUrl = await generateProductImage(prompt, size);
      onImageGenerated(imageUrl, prompt);
      setPrompt(''); // clear input on success? Optional.
    } catch (err: any) {
        if (err.message && err.message.includes("API Key not selected")) {
            setHasKey(false);
            setError("Please connect your Google Cloud billing account first.");
        } else {
            setError("Generation failed. Please try again.");
        }
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasKey) {
     return (
        <div className="bg-surface border border-white/5 rounded-2xl p-8 text-center max-w-md mx-auto">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                <Settings size={24} />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-2">Configure Studio</h3>
            <p className="text-secondary text-sm mb-6">
                To generate photorealistic product assets using Gemini 3 Pro, you must connect a billed project.
            </p>
            <Button onClick={handleConnect} className="w-full">
                Select API Key
            </Button>
            <p className="mt-4 text-xs text-secondary">
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-white">
                    View billing documentation
                </a>
            </p>
        </div>
     )
  }

  return (
    <div className="bg-surface border border-white/5 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
        <Wand2 className="text-accent" size={20} />
        <h3 className="text-lg font-semibold text-primary">Asset Studio</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs uppercase tracking-wider text-secondary mb-2">Product Name</label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Matte Black Noise-Cancelling Headphones"
            className="w-full bg-canvas border border-white/10 rounded-lg px-4 py-3 text-primary placeholder-white/20 focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div>
           <label className="block text-xs uppercase tracking-wider text-secondary mb-2">Resolution</label>
           <div className="grid grid-cols-3 gap-3">
              {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        size === s 
                        ? 'bg-white/10 text-white border border-accent' 
                        : 'bg-canvas text-secondary border border-white/5 hover:border-white/20'
                    }`}
                  >
                      {s}
                  </button>
              ))}
           </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/10 p-3 rounded-lg border border-red-900/20">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <Button 
            onClick={handleGenerate} 
            disabled={!prompt} 
            isLoading={isLoading} 
            className="w-full"
        >
          Generate Asset
        </Button>
        
        <p className="text-xs text-secondary text-center pt-2">
            Uses <span className="text-accent">gemini-3-pro-image-preview</span>
        </p>
      </div>
    </div>
  );
};
