import React from 'react';
import { View, Text } from '@tarojs/components';
import classnames from 'classnames';
import { DisposalRecord } from '@/types';
import styles from './index.module.scss';

interface RecordCardProps {
  record: DisposalRecord;
}

const RecordCard: React.FC<RecordCardProps> = ({ record }) => {
  const {
    time,
    location,
    tirePosition,
    beforePressure,
    afterPressure,
    contactDispatch,
    tempBefore,
    tempAfter,
    notes,
    status
  } = record;

  const pressureDiff = (afterPressure - beforePressure).toFixed(1);
  const tempDiff = (tempAfter - tempBefore).toFixed(1);

  return (
    <View className={styles.recordCard}>
      <View className={styles.recordHeader}>
        <Text className={styles.recordTime}>{time}</Text>
        <View className={classnames(styles.recordStatus, styles[status])}>
          <Text>{status === 'completed' ? '已完成' : '待处理'}</Text>
        </View>
      </View>
      <View className={styles.recordBody}>
        <View className={styles.recordRow}>
          <Text className={styles.recordLabel}>位置</Text>
          <Text className={styles.recordValue}>{location}</Text>
        </View>
        <View className={styles.recordRow}>
          <Text className={styles.recordLabel}>轮位</Text>
          <Text className={styles.recordValue}>{tirePosition}</Text>
        </View>
        <View className={styles.pressureSection}>
          <View className={styles.pressureItem}>
            <Text className={styles.pressureValue}>{beforePressure}bar</Text>
            <Text className={styles.pressureLabel}>补气前</Text>
          </View>
          <Text className={styles.pressureArrow}>→</Text>
          <View className={styles.pressureItem}>
            <Text className={styles.pressureValue}>{afterPressure}bar</Text>
            <Text className={styles.pressureLabel}>补气后</Text>
          </View>
        </View>
        <View className={styles.tempDiff}>
          <Text>温度变化：{tempBefore}°C → {tempAfter}°C</Text>
        </View>
        <View className={styles.recordRow}>
          <Text className={styles.recordLabel}>调度</Text>
          <View className={classnames(styles.dispatchBadge, !contactDispatch && styles.no)}>
            <Text>{contactDispatch ? '已联系' : '未联系'}</Text>
          </View>
        </View>
        {notes && (
          <View className={styles.recordNotes}>
            <Text>{notes}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default RecordCard;
