import React from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../../Utils/size';
import { colors } from '../../Utils/colors';
import { RoundedButton } from '../../Components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      {!!focusHistory.length && (
        <>
          <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
            <Text style={styles.title}>Things we've focused on:</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
          </SafeAreaView>
          <View style={styles.container}>
            <RoundedButton size={75} title={'clear'} onPress={onClear} />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 0 ? 'green' : 'red',
    fontSize: fontSizes.md,
    paddingLeft: spacing.xxl + 5,
    paddingRight: spacing.xxl + 20,
  }),
  title: {
    fontSize: fontSizes.md,
    color: colors.white,
    marginTop: spacing.xxl,
    marginLeft: spacing.xxl + 15,
    marginRight: spacing.xxl + 35,
  },
  container: {
    paddingTop: spacing.xxxl,
    paddingLeft: spacing.xxxl + 10,
  },
});
