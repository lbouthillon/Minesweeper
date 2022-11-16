import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CellGrid from './cell/CellGrid';
import MessageComponent from './utils/popupMessage/MessageComponent';

export default function App() {
  const [endMessage, setEndMessage] = useState("");
  const [reset, setReset] = useState(1);

  useEffect(() => {
    setEndMessage("");
  }, [reset])
  return (
    <View style={styles.container}>
      
      <Text>Minesweeper</Text>
      <CellGrid nbRows={10} nbCols={10} nbMines={10} endMessage={endMessage} setEndMessage={setEndMessage} reset={reset} endReset={() => setReset(0)}/>
      <MessageComponent visible={endMessage ? true : false} message={endMessage} onClick={() => setReset(1)}/>
      <StatusBar style="auto" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
