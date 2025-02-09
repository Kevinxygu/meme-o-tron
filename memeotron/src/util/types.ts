export type Meme = {
  imageName: string;
  filePath: string;
  tags: string[];
  expression: string[];
  distinctFeatures: string[];
  distinctBody: string[];
  matchingWeight: {
    tags: number;
    expression: number;
    distinctFeatures: number;
    distinctBody: number;
  };
};
