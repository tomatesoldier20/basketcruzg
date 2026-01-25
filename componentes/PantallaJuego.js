import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';

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

const PantallaJuego = ({ equipoLocal, equipoVisitante, onVolver }) => {
  const [puntosLocal, setPuntosLocal] = useState(0);
  const [puntosVisitante, setPuntosVisitante] = useState(0);

  const handlePuntosLocal = (puntos) => {
    setPuntosLocal(prev => prev + puntos);
  };

  const handlePuntosVisitante = (puntos) => {
    setPuntosVisitante(prev => prev + puntos);
  };

  const handleReiniciar = () => {
    setPuntosLocal(0);
    setPuntosVisitante(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.botonVolver} onPress={onVolver}>
        <Text style={styles.botonVolverText}>← Volver</Text>
      </TouchableOpacity>

      <View style={styles.marcadorContainer}>
        <Text style={styles.titulo}>PARTIDO EN CURSO</Text>
        
        <View style={styles.marcador}>
          <View style={styles.equipoMarcador}>
            <Image 
              source={imageMap[equipoLocal.imagen] || require('../imagenes/chicago_bulls.png')} 
              style={styles.logoMarcador}
              resizeMode="contain" 
            />
            <Text style={styles.nombreMarcador}>{equipoLocal.nombre}</Text>
            <Text style={styles.puntos}>{puntosLocal}</Text>
          </View>
          
          <View style={styles.vsContainer}>
            <Text style={styles.vs}>VS</Text>
          </View>
          
          <View style={styles.equipoMarcador}>
            <Image 
              source={imageMap[equipoVisitante.imagen] || require('../imagenes/chicago_bulls.png')} 
              style={styles.logoMarcador}
              resizeMode="contain" 
            />
            <Text style={styles.nombreMarcador}>{equipoVisitante.nombre}</Text>
            <Text style={styles.puntos}>{puntosVisitante}</Text>
          </View>
        </View>
      </View>

      <View style={styles.controlesContainer}>
        <View style={styles.equipoControles}>
          <Text style={styles.nombreEquipo}>{equipoLocal.nombre}</Text>
          <View style={styles.botonesPuntos}>
            <TouchableOpacity style={[styles.botonPunto, styles.boton1]} onPress={() => handlePuntosLocal(1)}>
              <Text style={styles.botonPuntoText}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botonPunto, styles.boton2]} onPress={() => handlePuntosLocal(2)}>
              <Text style={styles.botonPuntoText}>+2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botonPunto, styles.boton3]} onPress={() => handlePuntosLocal(3)}>
              <Text style={styles.botonPuntoText}>+3</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.botonReiniciar} onPress={handleReiniciar}>
          <Text style={styles.botonReiniciarText}>Reiniciar</Text>
        </TouchableOpacity>

        <View style={styles.equipoControles}>
          <Text style={styles.nombreEquipo}>{equipoVisitante.nombre}</Text>
          <View style={styles.botonesPuntos}>
            <TouchableOpacity style={[styles.botonPunto, styles.boton1]} onPress={() => handlePuntosVisitante(1)}>
              <Text style={styles.botonPuntoText}>+1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botonPunto, styles.boton2]} onPress={() => handlePuntosVisitante(2)}>
              <Text style={styles.botonPuntoText}>+2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botonPunto, styles.boton3]} onPress={() => handlePuntosVisitante(3)}>
              <Text style={styles.botonPuntoText}>+3</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  botonVolver: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  botonVolverText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  marcadorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  marcador: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  equipoMarcador: {
    alignItems: 'center',
    flex: 1,
  },
  logoMarcador: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  nombreMarcador: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  puntos: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  vsContainer: {
    paddingHorizontal: 20,
  },
  vs: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  controlesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  equipoControles: {
    alignItems: 'center',
    marginVertical: 10,
  },
  nombreEquipo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  botonesPuntos: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  botonPunto: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    minWidth: 60,
    alignItems: 'center',
  },
  boton1: {
    backgroundColor: '#28a745',
  },
  boton2: {
    backgroundColor: '#ffc107',
  },
  boton3: {
    backgroundColor: '#dc3545',
  },
  botonPuntoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonReiniciar: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  botonReiniciarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PantallaJuego;