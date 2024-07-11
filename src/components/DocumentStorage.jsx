import * as FileSystem from 'expo-file-system';
 
const DocumentStorage = {
  async saveDocument(document) {
    const fileUri = FileSystem.documentDirectory + document.name;
    await FileSystem.writeAsStringAsync(fileUri, document.uri);
  },
 
  async getDocuments() {
    const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    return files.filter((file) => file.endsWith('.pdf') || file.endsWith('.docx'));
  },
};
 
export default DocumentStorage;