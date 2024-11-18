import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, TextInput, Modal, Button } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { PlaceContext } from '../controller/taskController';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { tasks, addTask } = useContext(PlaceContext);
  const [markedDates, setMarkedDates] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: new Date(),
    time: new Date(),
    imageUri: null,
  });
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const marks = {};
    tasks.forEach((task) => {
      marks[task.date] = { marked: true, dotColor: '#007BFF' };
    });
    setMarkedDates(marks);
  }, [tasks]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleAddTask = () => {
    addTask(newTask);
    setNewTask({ title: '', description: '', date: new Date(), time: new Date(), imageUri: null });
    closeModal();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewTask({ ...newTask, imageUri: result.uri });
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setNewTask({ ...newTask, time: selectedTime });
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setNewTask({ ...newTask, date: selectedDate });
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        current={selectedDate}
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: { selected: true, selectedColor: '#007BFF' },
        }}
        monthFormat={'MMMM yyyy'}
        onMonthChange={(month) => console.log('Mes cambiado:', month)}
        enableSwipeMonths={true}
        firstDay={1}
        theme={{
          todayTextColor: '#007BFF',
          arrowColor: '#007BFF',
          selectedDayBackgroundColor: '#007BFF',
          selectedDayTextColor: '#F1F3F5',
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          textDayHeaderFontSize: 14,
          textDayFontSize: 16,
        }}
      />

      <View style={styles.remindersContainer}>
        <Text style={styles.remindersTitle}>Recordatorios</Text>
        <FlatList
          data={tasks.filter((task) => task.date === selectedDate)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reminderItem}>
              <MaterialIcons name="circle" size={10} color="#1f292d" style={styles.bulletIcon} />
              <View style={styles.reminderContent}>
                <Text style={styles.reminderText}>{item.title}</Text>
                <Text style={styles.reminderTime}>{item.time}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Ionicons name="add" size={36} color="#f1f3f5" />
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Añadir Tarea</Text>
            <TextInput
              style={styles.input}
              placeholder="Añadir título"
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
            />
            <View style={styles.dateTimeContainer}>
              <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
                <Ionicons name="calendar-outline" size={24} color="#a3b1c6" />
                <Text style={styles.dateTimeText}>
                  {newTask.date.toLocaleDateString('es-ES')}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={newTask.date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}

              <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
                <Ionicons name="time-outline" size={24} color="#a3b1c6" />
                <Text style={styles.dateTimeText}>
                  {newTask.time.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={newTask.time}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Añadir descripción"
              value={newTask.description}
              onChangeText={(text) => setNewTask({ ...newTask, description: text })}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              <Ionicons name="camera-outline" size={24} color="#a3b1c6" />
              <Text style={styles.imagePickerText} >Adjuntar imagen</Text>
            </TouchableOpacity>
            <Button title="Guardar" onPress={handleAddTask} color="#28a745" />
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={24} color="#a3b1c6" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f3f5',
  },
  remindersContainer: {
    padding: 16,
    flex: 1,
    
  },
  remindersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletIcon: {
    marginRight: 8,
  },
  reminderContent: {
    flexDirection: 'column',
  },
  reminderText: {
    fontSize: 16,
    fontWeight: '500',
  },
  reminderTime: {
    fontSize: 14,
    color: '#a3b1c6',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#80BDFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    
  },
  timeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateTimeText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePickerText: {
    marginLeft: 10,
    fontSize: 16,
    color:"#1f292d",
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default CalendarScreen;
