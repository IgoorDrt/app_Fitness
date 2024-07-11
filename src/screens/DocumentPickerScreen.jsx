import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
 
const DocumentPickerScreen = () => {
  const [selectedDocument, setSelectedDocument] = useState(null);
 
  const handleSelectDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });
 
    if (result.type === 'success') {
      setSelectedDocument(result);
    }
  };
 
  return (
<View>
<Text>Selecione um documento:</Text>
<Button title="Selecionar documento" onPress={handleSelectDocument} />
      {selectedDocument && (
<View>
<Text>Nome do documento: {selectedDocument.name}</Text>
<Text>Tipo do documento: {selectedDocument.type}</Text>
</View>
      )}
</View>
  );
};
 
export default DocumentPickerScreen;