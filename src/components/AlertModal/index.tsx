import React from 'react';
import { View, Text, Button } from '@tarojs/components';
import classnames from 'classnames';
import Taro from '@tarojs/taro';
import { AlertStep } from '@/types';
import styles from './index.module.scss';

interface AlertModalProps {
  visible: boolean;
  steps: AlertStep[];
  onStepClick: (stepId: number) => void;
  onClose: () => void;
  onGoRecord: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  steps,
  onStepClick,
  onClose,
  onGoRecord
}) => {
  if (!visible) return null;

  const completedCount = steps.filter(s => s.completed).length;
  const allCompleted = completedCount === steps.length;

  const handleGoRecord = () => {
    if (!allCompleted) {
      Taro.showToast({
        title: '请先完成所有步骤',
        icon: 'none'
      });
      return;
    }
    onGoRecord();
  };

  return (
    <View className={styles.modalOverlay}>
      <View className={styles.modalContent}>
        <View className={styles.modalHeader}>
          <Text className={styles.headerTitle}>联动提醒</Text>
          <Text className={styles.headerDesc}>
            胎压异常 + 冷机频繁启停，请注意处置
          </Text>
        </View>
        <View className={styles.modalBody}>
          <View className={styles.alertReason}>
          <Text className={styles.reasonTitle}>联动原因</Text>
          <View className={styles.reasonList}>
            <Text>• 左后轮胎压异常偏低</Text>
            <Text>• 冷机启停频繁（12次/小时）</Text>
            <Text>• 可能导致油耗升高、制冷负荷增加</Text>
          </View>
        </View>
        <Text className={styles.stepsTitle}>处置步骤（{completedCount}/{steps.length}）</Text>
        {steps.map(step => (
          <View
            key={step.id}
            className={styles.stepItem}
            onClick={() => onStepClick(step.id)}
          >
            <View
              className={classnames(styles.stepNumber, step.completed && styles.completed)}
            >
              <Text>{step.completed ? '✓' : step.id}</Text>
            </View>
            <View className={styles.stepContent}>
              <Text
                className={classnames(styles.stepTitle, step.completed && styles.completed)}
              >
                {step.title}
              </Text>
              <Text
                className={classnames(styles.stepDesc, step.completed && styles.completed)}
              >
                {step.description}
              </Text>
            </View>
            <View
              className={classnames(styles.stepCheck, step.completed && styles.checked)}
            >
              {step.completed && (
                <Text className={styles.checkIcon}>✓</Text>
              )}
            </View>
          </View>
        ))}
      </View>
      <View className={styles.modalFooter}>
        <Button className={styles.btnSecondary} onClick={onClose}>
          稍后处理
        </Button>
        <Button className={styles.btnPrimary} onClick={handleGoRecord}>
          {allCompleted ? '去记录' : '完成处置'}
        </Button>
      </View>
    </View>
  );
};

export default AlertModal;
