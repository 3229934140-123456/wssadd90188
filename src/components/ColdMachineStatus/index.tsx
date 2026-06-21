import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import { ColdMachine } from '@/types';
import styles from './index.module.scss';

interface ColdMachineStatusProps {
  coldMachine: ColdMachine;
}

const ColdMachineStatus: React.FC<ColdMachineStatusProps> = ({ coldMachine }) => {
  const { name, status, statusLabel, startStopCount, runHours, frequentStartStop } = coldMachine;

  return (
    <View className={styles.coldMachineCard}>
      <Text className={styles.cardTitle}>冷机状态</Text>
      <View className={styles.statusSection}>
        <View className={classnames(styles.statusIndicator, styles[status])} />
        <Text className={styles.statusText}>{statusLabel}</Text>
        <Text className={styles.machineName}>{name}</Text>
      </View>
      <View className={styles.infoGrid}>
        <View className={styles.infoItem}>
          <View className={styles.infoValue}>
          <Text>{startStopCount}</Text>
          </View>
          <Text className={styles.infoLabel}>启停次数</Text>
        </View>
        <View className={styles.infoItem}>
          <View className={styles.infoValue}>
          <Text>{runHours}h</Text>
          </View>
          <Text className={styles.infoLabel}>运行时长</Text>
        </View>
        <View className={styles.infoItem}>
          <View className={styles.infoValue}>
          <Text>{Math.round((runHours / (startStopCount || 1)) * 60)}min</Text>
          </View>
          <Text className={styles.infoLabel}>平均间隔</Text>
        </View>
      </View>
      {frequentStartStop && (
        <View className={styles.frequentAlert}>
          <View className={styles.alertIcon}>
            <Text>!</Text>
          </View>
          <Text className={styles.alertText}>冷机频繁启停，请注意检查</Text>
        </View>
      )}
    </View>
  );
};

export default ColdMachineStatus;
