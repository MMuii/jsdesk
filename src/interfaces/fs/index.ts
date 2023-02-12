export type Path = string[];

export interface FileSystem {
  '/': Directory;
}

export interface Directory {
  files: { [key: string]: Directory };
  type: string;
  updatedAt: string;
}
