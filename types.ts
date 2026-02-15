
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
  };
}

export interface AIResponse {
  text: string;
  sources: GroundingChunk[];
}

export enum SectionType {
  PROCESS = 'process',
  PHILOSOPHY = 'philosophy',
  DIGITAL = 'digital',
  MAPS = 'maps'
}
