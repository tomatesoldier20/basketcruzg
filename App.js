import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Equipo from './componentes/Equipo';
import VS from './componentes/VS';
import BotonEmpezar from './componentes/BotonEmpezar';
import PantallaJuego from './componentes/PantallaJuego';
import equiposData from './equipos.json';

export default function App() {
  const [indiceLocal, setIndiceLocal] = useState(0);
  const [indiceVisitante, setIndiceVisitante] = useState(1);
  const [equipos, setEquipos] = useState([]);
  const [pantallaActual, setPantallaActual] = useState('seleccion');

  useEffect(() => {
    setEquipos(equiposData);
  }, []);

  const handleSiguienteLocal = () => {
    let nuevoIndice = (indiceLocal + 1) % equipos.length;
    if (nuevoIndice === indiceVisitante) {
      nuevoIndice = (nuevoIndice + 1) % equipos.length;
    }
    setIndiceLocal(nuevoIndice);
  };

  const handleAnteriorLocal = () => {
    let nuevoIndice = indiceLocal - 1 < 0 ? equipos.length - 1 : indiceLocal - 1;
    if (nuevoIndice === indiceVisitante) {
      nuevoIndice = nuevoIndice - 1 < 0 ? equipos.length - 1 : nuevoIndice - 1;
    }
    setIndiceLocal(nuevoIndice);
  };

  const handleSiguienteVisitante = () => {
    let nuevoIndice = (indiceVisitante + 1) % equipos.length;
    if (nuevoIndice === indiceLocal) {
      nuevoIndice = (nuevoIndice + 1) % equipos.length;
    }
    setIndiceVisitante(nuevoIndice);
  };

  const handleAnteriorVisitante = () => {
    let nuevoIndice = indiceVisitante - 1 < 0 ? equipos.length - 1 : indiceVisitante - 1;
    if (nuevoIndice === indiceLocal) {
      nuevoIndice = nuevoIndice - 1 < 0 ? equipos.length - 1 : nuevoIndice - 1;
    }
    setIndiceVisitante(nuevoIndice);
  };

  const handleEmpezarPartido = () => {
    setPantallaActual('juego');
  };

  const handleVolver = () => {
    setPantallaActual('seleccion');
  };

  if (pantallaActual === 'juego') {
    return (
      <PantallaJuego
        equipoLocal={equipos[indiceLocal]}
        equipoVisitante={equipos[indiceVisitante]}
        onVolver={handleVolver}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.matchContainer}>
        <View style={styles.equiposContainer}>
          <Equipo 
            nombre={equipos[indiceLocal]?.nombre} 
            imagen={equipos[indiceLocal]?.imagen} 
            jugadores={equipos[indiceLocal]?.jugadores}
            onSiguiente={handleSiguienteLocal}
            onAnterior={handleAnteriorLocal}
          />
          <VS />
          <Equipo 
            nombre={equipos[indiceVisitante]?.nombre} 
            imagen={equipos[indiceVisitante]?.imagen} 
            jugadores={equipos[indiceVisitante]?.jugadores}
            onSiguiente={handleSiguienteVisitante}
            onAnterior={handleAnteriorVisitante}
          />
        </View>
        
        <BotonEmpezar onPress={handleEmpezarPartido} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  matchContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  equiposContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});