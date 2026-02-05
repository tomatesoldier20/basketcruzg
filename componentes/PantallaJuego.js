import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import JugadorCard from './JugadorCard';

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

const PantallaJuego = ({ equipoLocal, equipoVisitante, onVolver, onFinJuego }) => {
  const [puntosJugadoresLocal, setPuntosJugadoresLocal] = useState({});
  const [puntosJugadoresVisitante, setPuntosJugadoresVisitante] = useState({});
  const [puntosLocal, setPuntosLocal] = useState(0);
  const [puntosVisitante, setPuntosVisitante] = useState(0);

  useEffect(() => {
    const puntosLocalTotales = Object.values(puntosJugadoresLocal).reduce((sum, pts) => sum + pts, 0);
    setPuntosLocal(puntosLocalTotales);
  }, [puntosJugadoresLocal]);

  useEffect(() => {
    const puntosVisitanteTotales = Object.values(puntosJugadoresVisitante).reduce((sum, pts) => sum + pts, 0);
    setPuntosVisitante(puntosVisitanteTotales);
  }, [puntosJugadoresVisitante]);

  const handlePuntosJugadorLocal = (jugador, puntos) => {
    setPuntosJugadoresLocal(prev => ({
      ...prev,
      [jugador]: (prev[jugador] || 0) + puntos
    }));
  };

  const handlePuntosJugadorVisitante = (jugador, puntos) => {
    setPuntosJugadoresVisitante(prev => ({
      ...prev,
      [jugador]: (prev[jugador] || 0) + puntos
    }));
  };

  const handleReiniciar = () => {
    setPuntosJugadoresLocal({});
    setPuntosJugadoresVisitante({});
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
        <View style={styles.botonesAccionContainer}>
          <TouchableOpacity style={styles.botonReiniciar} onPress={handleReiniciar}>
            <Text style={styles.botonReiniciarText}>Reiniciar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonFinJuego} onPress={() => onFinJuego(puntosLocal, puntosVisitante, { local: puntosJugadoresLocal, visitante: puntosJugadoresVisitante })}>
            <Text style={styles.botonFinJuegoText}>Fin del Juego</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.equiposContainer}>
          <View style={styles.equipoJugadoresContainer}>
            <Text style={styles.nombreEquipo}>{equipoLocal.nombre}</Text>
            <ScrollView style={styles.jugadoresScroll} showsVerticalScrollIndicator={false}>
              {equipoLocal.jugadores.map((jugador, index) => (
                <JugadorCard
                  key={index}
                  nombre={jugador}
                  puntos={puntosJugadoresLocal[jugador] || 0}
                  onAgregarPuntos={(puntos) => handlePuntosJugadorLocal(jugador, puntos)}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.equipoJugadoresContainer}>
            <Text style={styles.nombreEquipo}>{equipoVisitante.nombre}</Text>
            <ScrollView style={styles.jugadoresScroll} showsVerticalScrollIndicator={false}>
              {equipoVisitante.jugadores.map((jugador, index) => (
                <JugadorCard
                  key={index}
                  nombre={jugador}
                  puntos={puntosJugadoresVisitante[jugador] || 0}
                  onAgregarPuntos={(puntos) => handlePuntosJugadorVisitante(jugador, puntos)}
                />
              ))}
            </ScrollView>
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
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  marcador: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
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
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  nombreMarcador: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
    textAlign: 'center',
  },
  puntos: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  vsContainer: {
    paddingHorizontal: 20,
  },
  vs: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  controlesContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  equipoJugadoresContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  equiposContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  nombreEquipo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  jugadoresScroll: {
    flex: 1,
  },

  botonesAccionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10,
    marginBottom: 10,
  },
  botonReiniciar: {
    backgroundColor: '#6c757d',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
    flex: 1,
  },
  botonReiniciarText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  botonFinJuego: {
    backgroundColor: '#dc3545',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
    flex: 1,
  },
  botonFinJuegoText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default PantallaJuego;