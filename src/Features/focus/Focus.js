import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../Components/RoundedButton';
import {spacing, fontSizes} from '../../Utils/size'
import {colors} from '../../Utils/colors'

export const Focus = ({ addSubject }) => {
  const [tempSubject, setTempSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onSubmitEditing={({ nativeEvent }) => {
              setTempSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            title="+"
            size={50}
            onPress={() => {
              addSubject(tempSubject);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    paddingTop: spacing.xxxl,
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    justifyContent: 'center'
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg - 2,
  },
  inputContainer: {
    paddingTop: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: spacing.lg,
  },
});
