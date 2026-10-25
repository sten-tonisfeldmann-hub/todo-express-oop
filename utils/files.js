import fs from 'fs/promises';

class FileManager {

    async writeFile(filename, data) {
        try {
            data = JSON.stringify(data, null, 2);
            await fs.writeFile(filename, data);
        } catch (error) {
            console.log(`Error writing to file ${filename}:`, error);
        }
    }

    async readFile(filename) {
        try {
            const fileContent = await fs.readFile(filename, 'utf-8');
            const fileData = JSON.parse(fileContent);
            return fileData;
        } catch (error) {
            console.error(`Error reading from file ${filename}:`, error);
            return null;
        }
    }
}

export const FileManager = new FileManager();