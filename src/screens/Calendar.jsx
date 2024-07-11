import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import * as Calendar from 'expo-calendar';
import * as DocumentPicker from 'expo-document-picker';
 
const CalendarScreen = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [document, setDocument] = useState(null);
 
  const createCalendar = async () => {
    const calendars = await Calendar.getCalendarsAsync();
    if (calendars.length > 0) {
      return calendars[0].id;
    }
    const newCalendar = await Calendar.createCalendarAsync({
      title: 'My Calendar',
      color: 'blue',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: calendars[0].source.id,
      source: calendars[0].source,
      name: 'My Calendar',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });
    return newCalendar;
  };
 
  const addEvent = async () => {
    const calendarId = await createCalendar();
    await Calendar.createEventAsync(calendarId, {
      title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      notes: description,
    });
    Alert.alert('Evento criado com sucesso!');
  };
 
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      setDocument(result);
    }
  };
 
  return (
<SafeAreaView style={{ flex: 1 }}>
<ScrollView contentContainerStyle={styles.container}>
<Text>Título:</Text>
<TextInput style={styles.input} value={title} onChangeText={setTitle} />
<Text>Data de Início:</Text>
<TextInput style={styles.input} value={startDate} onChangeText={setStartDate} />
<Text>Data de Fim:</Text>
<TextInput style={styles.input} value={endDate} onChangeText={setEndDate} />
<Text>Descrição:</Text>
<TextInput style={styles.input} value={description} onChangeText={setDescription} />
<Button title="Adicionar Evento" onPress={addEvent} />
<View style={styles.divider} />
<Button title="Selecionar Documento" onPress={pickDocument} />
        {document && (
<Text style={styles.documentText}>
            Documento selecionado: {document.name}
</Text>
        )}
</ScrollView>
</SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  divider: {
    height: 20,
  },
  documentText: {
    marginTop: 10,
    fontSize: 16,
    color: 'green',
  },
});
 
export default CalendarScreen;