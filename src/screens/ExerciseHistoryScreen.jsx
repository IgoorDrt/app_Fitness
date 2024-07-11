import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
 
const ExerciseHistoryScreen = () => {
  const [exerciseHistory, setExerciseHistory] = useState('');
  const [fileContent, setFileContent] = useState('');
 
  const handleSaveExercise = async () => {
    const fileUri = FileSystem.documentDirectory + 'exercise_history.txt';
    await FileSystem.writeAsStringAsync(fileUri, exerciseHistory);
    alert('Histórico de exercícios salvo com sucesso!');
  };
 
  const handleReadExerciseHistory = async () => {
    const fileUri = FileSystem.documentDirectory + 'exercise_history.txt';
    const content = await FileSystem.readAsStringAsync(fileUri);
    setFileContent(content);
  };
 
  return (
<View>
<Text>Histórico de exercícios:</Text>
<TextInput
        multiline={true}
        value={exerciseHistory}
        onChangeText={(text) => setExerciseHistory(text)}
        placeholder="Digite o histórico de exercícios"
      />
<Button title="Salvar histórico de exercícios" onPress={handleSaveExercise} />
<Button title="Ler histórico de exercícios" onPress={handleReadExerciseHistory} />
<Text>{fileContent}</Text>
</View>
  );
};
 
export default ExerciseHistoryScreen;