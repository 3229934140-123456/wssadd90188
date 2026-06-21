import React from 'react';
import { View, Text } from '@tarojs/components';
import { CargoTemp } from '@/types';
import { getTempTrendText } from '@/utils';
import styles from './index.module.scss';

interface TempDisplayProps {
  cargoTemp: CargoTemp;
}

const TempDisplay: React.FC<TempDisplayProps> = ({ cargoTemp }) => {
  const { current, target, min, max, unit, trend } = cargoTemp;

  const rangePercent = ((current - min) / (max - min)) * 100;
  const trendText = getTempTrendText(trend);

  return (
    <View className={styles.tempCard}>
      <Text className={styles.cardTitle}>货厢温度</Text>
      <View className={styles.tempMain}>
        <Text className={styles.tempValue}>{current.toFixed(1)}</Text>
        <Text className={styles.tempUnit}>{unit}</Text>
        <View className={styles.tempTrend}>
          <Text>{trendText}</Text>
        </View>
      </View>
      <View className={styles.tempInfo}>
        <View className={styles.tempInfoItem}>
          <Text className={styles.tempInfoLabel}>目标温度</Text>
          <Text className={styles.tempInfoValue}>{target}{unit}</Text>
        </View>
        <View className={styles.tempInfoItem}>
          <Text className={styles.tempInfoLabel}>最低</Text>
          <Text className={styles.tempInfoValue}>{min}{unit}</Text>
        </View>
        <View className={styles.tempInfoItem}>
          <Text className={styles.tempInfoLabel}>最高</Text>
          <Text className={styles.tempInfoValue}>{max}{unit}</Text>
        </View>
      </View>
      <View className={styles.tempRange}>
        <View className={styles.rangeBar}>
          <View
            className={styles.rangeFill}
            style={{ width: `${Math.min(Math.max(rangePercent, 0), 100)}%` }}
          />
        </View>
        <View className={styles.rangeLabels}>
          <Text>{min}{unit}</Text>
          <Text>{max}{unit}</Text>
        </View>
      </View>
    </View>
  );
};

export default TempDisplay;
