import uploandsConfig from '@/config/uploands';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {
  
  public async saveFile(file: string): Promise<string> { 
   await fs.promises.rename( 
    path.resolve(uploandsConfig.tmpFolder, file), 
    path.resolve(uploandsConfig.directory, file),
   );
   return file;
  };

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploandsConfig.directory, file);
    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }; 
    await fs.promises.unlink(filePath);
  };
}; 