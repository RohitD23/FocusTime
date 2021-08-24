import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Focus } from './src/Features/focus/Focus';
import { colors } from './src/Utils/colors';
import { spacing } from './src/Utils/size';
import { Timer } from './src/Features/Timer/Timer';
import { FocusHistory } from './src/Features/focus/FocusHistory';

const STATUSES = {
  CANCELLED: 0,
  COMPELETE: 1,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const SaveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const LoadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    LoadFocusHistory()
  }, []);

  useEffect(() => {
    SaveFocusHistory()
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Text>
          <Timer
            focusSubject={focusSubject}
            onTimerEnd={() => {
              addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPELETE);
              setFocusSubject(null);
            }}
            clearSubject={() => {
              addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELLED);
              setFocusSubject(null);
            }}
          />
        </Text>
      ) : (
        <Text>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
