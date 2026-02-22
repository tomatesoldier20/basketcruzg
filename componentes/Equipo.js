import React from 'react';
import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';
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
  return (
    <View style={styles.container}>
      <Image source={imageMap[imagen] || require('../imagenes/chicago_bulls.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.nombreEquipo}>{nombre}</Text>
      <View style={styles.botonesContainer}>
        <BotonFlecha direccion="<<" onPress={onAnterior} />
        <BotonFlecha direccion=">>" onPress={onSiguiente} />
      </View>
      <View style={styles.quintetoContainer}>
        <Text style={styles.quintetoTitulo}>Plantilla</Text>
        {jugadores && jugadores.slice(0, 5).map((jugador, index) => (
          <View key={index} style={styles.jugadorItem}>
            <Text style={styles.jugadorText}>{jugador}</Text>
          </View>
        ))}
      </View>
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
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxWidth: 140,
  },
  logo: {
    width: 60,
    height: 60,
  },
  nombreEquipo: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    backgroundColor: '#f0f8ff',
  },
  botonesContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  quintetoContainer: {
    marginTop: 10,
    width: '100%',
  },
  quintetoTitulo: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  jugadorItem: {
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  jugadorText: {
    fontSize: 10,
    color: '#333',
    textAlign: 'center',
  },
});

export default Equipo;