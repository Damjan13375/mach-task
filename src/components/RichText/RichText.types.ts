export type RichTextNode = {
    nodeType: string;
    content?: RichTextNode[];
    value?: string;
    marks?: { type: string }[];
    data?: { uri?: string };
  };