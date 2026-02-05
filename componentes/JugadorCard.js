import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const JugadorCard = ({ nombre, puntos, onAgregarPuntos }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.nombreJugador}>{nombre}</Text>
        <Text style={styles.puntosJugador}>{puntos} pts</Text>
      </View>
      <View style={styles.botonesContainer}>
        <TouchableOpacity 
          style={[styles.botonPunto, styles.boton2]} 
          onPress={() => onAgregarPuntos(2)}
        >
          <Text style={styles.botonPuntoText}>+2</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.botonPunto, styles.boton3]} 
          onPress={() => onAgregarPuntos(3)}
        >
          <Text style={styles.botonPuntoText}>+3</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    marginVertical: 2,
    marginHorizontal: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  nombreJugador: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 1,
  },
  puntosJugador: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  botonesContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  botonPunto: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    minWidth: 30,
    alignItems: 'center',
  },
  boton2: {
    backgroundColor: '#ffc107',
  },
  boton3: {
    backgroundColor: '#dc3545',
  },
  botonPuntoText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default JugadorCard;