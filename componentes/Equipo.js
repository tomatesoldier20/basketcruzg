import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import BotonFlecha from './BotonFlecha';

const imageMap = {
  './imagenes/chicago_bulls.png': require('../imagenes/chicago_bulls.png'),
  './imagenes/los_angeles_lakers.png': require('../imagenes/los_angeles_lakers.png'),
  './imagenes/Atlanta_Hawks_logo.png': require('../imagenes/Atlanta_Hawks_logo.png'),
  './imagenes/Indiana_Pacers_logo.png': require('../imagenes/Indiana_Pacers_logo.png'),
  './imagenes/detroy_pistons.png': require('../imagenes/detroy_pistons.png'),
  './imagenes/New_York_Knicks_logo.svg.png': require('../imagenes/New_York_Knicks_logo.svg.png'),
  './imagenes/Houston-Rockets-Logo.png': require('../imagenes/Houston-Rockets-Logo.png'),
  './imagenes/utah_jazz.png': require('../imagenes/utah_jazz.png'),
  './imagenes/Orlando_Magic_logo.png': require('../imagenes/Orlando_Magic_logo.png'),
  './imagenes/Seattle_SuperSonics_logo.png': require('../imagenes/Seattle_SuperSonics_logo.png'),
};

const Equipo = ({ nombre, imagen, onSiguiente, onAnterior, jugadores }) => {
  const [mostrarPlantilla, setMostrarPlantilla] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={imageMap[imagen] || require('../imagenes/chicago_bulls.png')} style={styles.logo} resizeMode="contain" />
      <TouchableOpacity onPress={() => setMostrarPlantilla(true)}>
        <Text style={styles.nombreEquipo}>{nombre}</Text>
      </TouchableOpacity>
      <View style={styles.botonesContainer}>
        <BotonFlecha direccion="<<" onPress={onAnterior} />
        <BotonFlecha direccion=">>" onPress={onSiguiente} />
      </View>

      <Modal
        visible={mostrarPlantilla}
        animationType="slide"
        onRequestClose={() => setMostrarPlantilla(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Plantilla - {nombre}</Text>
            <TouchableOpacity onPress={() => setMostrarPlantilla(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.jugadoresContainer}>
            {jugadores && jugadores.map((jugador, index) => (
              <View key={index} style={styles.jugadorItem}>
                <Text style={styles.jugadorText}>{jugador}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    margin: 5,
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxWidth: 140,
  },
  logo: {
    width: 90,
    height: 90,
  },
  nombreEquipo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f0f8ff',
  },
  botonesContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  jugadoresContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  jugadorItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fafafa',
  },
  jugadorText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Equipo;