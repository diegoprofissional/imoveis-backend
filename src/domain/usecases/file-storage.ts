export interface FileStorage {
  upload: (file: any, id: string) => Promise<string>
}
