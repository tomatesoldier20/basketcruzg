import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BotonEmpezar = () => {
  return (
    <TouchableOpacity style={styles.boton}>
      <Text style={styles.texto}>Empezar partido</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  texto: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BotonEmpezar;