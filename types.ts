export interface Product {
  id: string;
  name: string;
  description: string;
  category: 'Phones' | 'Computing' | 'Photography' | 'Audio' | 'Gaming';
  images: string[];
  specs: Record<string, string>;
  startPrice: number;
  currentPrice: number;
  reservePrice: number;
  endsAt: Date;
  status: 'active' | 'sold' | 'pending';
  bidders: number;
}

export type ImageSize = '1K' | '2K' | '4K';

export interface ImageGenerationRequest {
  prompt: string;
  size: ImageSize;
}
