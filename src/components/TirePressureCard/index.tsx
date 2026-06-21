import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import { TirePressure } from '@/types';
import { getStatusText } from '@/utils';
import styles from './index.module.scss';

interface TirePressureCardProps {
  tire: TirePressure;
}

const TirePressureCard: React.FC<TirePressureCardProps> = ({ tire }) => {
  const { positionLabel, pressure, unit, status } = tire;
  const statusText = getStatusText(status);

  return (
    <View className={classnames(styles.tireCard, styles[status])}>
      <View className={styles.tireHeader}>
        <Text className={styles.positionLabel}>{positionLabel}</Text>
        <View className={classnames(styles.statusBadge, styles[status])}>
          <Text>{statusText}</Text>
        </View>
      </View>
      <View className={classnames(styles.pressureValue, styles[status])}>
        {pressure.toFixed(1)}
        <Text className={styles.unit}>{unit}</Text>
      </View>
      {status === 'danger' ? (
        <View className={styles.dangerTip}>
          <Text>可能导致油耗升高、制冷负荷增加</Text>
        </View>
      ) : status === 'warning' ? (
        <View className={styles.warningTip}>
          <Text>请注意观察，建议下次休息时补气</Text>
        </View>
      ) : (
        <View className={styles.warningTip}>
          <Text>胎压正常，继续保持</Text>
        </View>
      )}
    </View>
  );
};

export default TirePressureCard;
