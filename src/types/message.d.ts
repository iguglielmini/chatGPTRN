export interface Message {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name?: string;
  };
}

export interface ImageGenerationResponse {
  data: { url: string }[];
}
