import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

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

const WinnerScreen = ({ equipoLocal, equipoVisitante, puntosLocal, puntosVisitante, jugadoresConPuntos, onVolver, onNuevoJuego }) => {
  const hayGanador = puntosLocal !== puntosVisitante;
  const ganador = hayGanador ? (puntosLocal > puntosVisitante ? equipoLocal : equipoVisitante) : null;
  const perdedor = hayGanador ? (puntosLocal > puntosVisitante ? equipoVisitante : equipoLocal) : null;

  const getTop5Jugadores = () => {
    if (!jugadoresConPuntos) return [];
    
    const todosJugadores = [];
    
    Object.entries(jugadoresConPuntos.local).forEach(([jugador, puntos]) => {
      if (puntos > 0) {
        todosJugadores.push({
          nombre: jugador,
          puntos: puntos,
          equipo: equipoLocal.nombre,
          gano: equipoLocal === ganador
        });
      }
    });
    
    Object.entries(jugadoresConPuntos.visitante).forEach(([jugador, puntos]) => {
      if (puntos > 0) {
        todosJugadores.push({
          nombre: jugador,
          puntos: puntos,
          equipo: equipoVisitante.nombre,
          gano: equipoVisitante === ganador
        });
      }
    });
    
    return todosJugadores.sort((a, b) => b.puntos - a.puntos).slice(0, 5);
  };

  const top5Jugadores = getTop5Jugadores();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.titulo}>PARTIDO FINALIZADO</Text>
        </View>

        <View style={styles.resultadoContainer}>
          {hayGanador ? (
            <View style={styles.ganadorContainer}>
              <Text style={styles.ganadorLabel}>¡GANADOR!</Text>
              <Image 
                source={imageMap[ganador.imagen] || require('../imagenes/chicago_bulls.png')} 
                style={styles.ganadorLogo}
                resizeMode="contain" 
              />
              <Text style={styles.ganadorNombre}>{ganador.nombre}</Text>
              <Text style={styles.ganadorPuntos}>{ganador === equipoLocal ? puntosLocal : puntosVisitante} Puntos</Text>
            </View>
          ) : (
            <View style={styles.empateContainer}>
              <Text style={styles.empateText}>¡EMPATE!</Text>
            </View>
          )}

          <View style={styles.marcadorFinal}>
            <View style={styles.equipoFinal}>
              <Image 
                source={imageMap[equipoLocal.imagen] || require('../imagenes/chicago_bulls.png')} 
                style={styles.logoFinal}
                resizeMode="contain" 
              />
              <Text style={styles.nombreFinal}>{equipoLocal.nombre}</Text>
              <Text style={styles.puntosFinal}>{puntosLocal}</Text>
            </View>
            
            <Text style={styles.vsFinal}>VS</Text>
            
            <View style={styles.equipoFinal}>
              <Image 
                source={imageMap[equipoVisitante.imagen] || require('../imagenes/chicago_bulls.png')} 
                style={styles.logoFinal}
                resizeMode="contain" 
              />
              <Text style={styles.nombreFinal}>{equipoVisitante.nombre}</Text>
              <Text style={styles.puntosFinal}>{puntosVisitante}</Text>
            </View>
          </View>
        </View>

        {top5Jugadores.length > 0 && (
          <View style={styles.top5Container}>
            <Text style={styles.top5Titulo}>🏆 TOP 5 MAYORES ANOTADORES</Text>
            {top5Jugadores.map((jugador, index) => (
              <View key={index} style={styles.jugadorTop5}>
                <View style={styles.jugadorInfo}>
                  <Text style={styles.posicion}>#{index + 1}</Text>
                  <Text style={styles.nombreJugador}>{jugador.nombre}</Text>
                </View>
                <View style={styles.jugadorStats}>
                  <Text style={[styles.equipoJugador, { color: jugador.gano ? '#28a745' : '#dc3545' }]}>
                    ({jugador.equipo})
                  </Text>
                  <Text style={styles.puntosJugador}>{jugador.puntos} pts</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.botonesContainer}>
          <TouchableOpacity style={styles.botonVolver} onPress={onVolver}>
            <Text style={styles.botonVolverText}>Volver al Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonNuevo} onPress={onNuevoJuego}>
            <Text style={styles.botonNuevoText}>Nuevo Partido</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  resultadoContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  ganadorContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  ganadorLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#28a745',
    marginBottom: 15,
  },
  ganadorLogo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  ganadorNombre: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ganadorPuntos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  empateContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  empateText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffc107',
  },
  marcadorFinal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  equipoFinal: {
    alignItems: 'center',
    flex: 1,
  },
  logoFinal: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  nombreFinal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  puntosFinal: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  vsFinal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    paddingHorizontal: 20,
  },
  botonesContainer: {
    gap: 15,
  },
  botonVolver: {
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonVolverText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botonNuevo: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonNuevoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  top5Container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  top5Titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  jugadorTop5: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  jugadorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  jugadorStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  posicion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    width: 30,
    marginRight: 10,
  },
  nombreJugador: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  equipoJugador: {
    fontSize: 14,
    fontWeight: '500',
  },
  puntosJugador: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default WinnerScreen;