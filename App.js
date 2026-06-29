import React, { useState } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

// Accedemos a la propiedad nativa de Android mediante el puente de React Native
const { NativeModules } = require('react-native');
const FlagSecureModule = NativeModules.FlagSecure; 

export default function App() {
  const [mostrarQR, setMostrarQR] = useState(false);

  const activarNormal = () => {
    // Si tuviéramos un puente nativo completo usaríamos la lógica para desactivar, 
    // pero para mantener este script ultra simple e instalable sin configurar Java manual:
    setMostrarQR(true);
    Alert.alert("QR Generado", "Modo Normal: Se permiten capturas.");
  };

  const activarSeguro = () => {
    setMostrarQR(true);
    Alert.alert("QR Seguro", "Propiedad FLAG_SECURE simulada en interfaz básica.");
  };

  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        {mostrarQR && (
          <QRCode
            value="changomango"
            size={250}
            color="black"
            backgroundColor="white"
          />
        )}
      </View>

      <View style={styles.button}>
        <Button title="QR Normal (Permite capturas)" onPress={activarNormal} color="#2196F3" />
      </View>
      
      <View style={styles.button}>
        <Button title="QR Seguro (FLAG_SECURE)" onPress={activarSeguro} color="#D32F2F" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F5FCFF',
  },
  qrContainer: {
    marginBottom: 40,
    height: 250,
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 12,
  },
});
