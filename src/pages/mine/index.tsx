import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import styles from './index.module.scss';

const MinePage: React.FC = () => {
  const { driverInfo, records } = useAppContext();

  const handleMenuItem = (item: string) => {
    Taro.showToast({
      title: `${item}功能开发中`,
      icon: 'none'
    });
  };

  const completedRecords = records.filter(r => r.status === 'completed').length;
  const contactRecords = records.filter(r => r.contactDispatch).length;

  return (
    <View className={styles.minePage}>
      <View className={styles.headerSection}>
        <View className={styles.driverInfo}>
          <View className={styles.avatar}>
            <Text>{driverInfo.name.charAt(0)}</Text>
          </View>
          <View className={styles.driverDetail}>
            <Text className={styles.driverName}>{driverInfo.name}</Text>
            <Text className={styles.driverMeta}>
              驾照 {driverInfo.license} · {driverInfo.phone}
            </Text>
          </View>
        </View>
      </View>

      <View className={styles.vehicleCard}>
        <Text className={styles.vehicleTitle}>车辆信息</Text>
        <View className={styles.vehicleInfo}>
          <View className={styles.vehicleItem}>
            <Text className={styles.vehicleValue}>{driverInfo.vehicleNo}</Text>
            <Text className={styles.vehicleLabel}>车牌号</Text>
          </View>
          <View className={styles.vehicleItem}>
            <Text className={styles.vehicleValue}>{driverInfo.vehicleType}</Text>
            <Text className={styles.vehicleLabel}>车型</Text>
          </View>
        </View>
      </View>

      <View className={styles.statsSection}>
        <Text className={styles.statsTitle}>运输统计</Text>
        <View className={styles.statsGrid}>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{completedRecords}</Text>
            <Text className={styles.statLabel}>处置记录</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>{contactRecords}</Text>
            <Text className={styles.statLabel}>联系调度</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.statValue}>6.5h</Text>
            <Text className={styles.statLabel}>今日运行</Text>
          </View>
        </View>
      </View>

      <View className={styles.menuSection}>
        <Text className={styles.menuTitle}>设置</Text>
        <View
          className={styles.menuItem}
          onClick={() => handleMenuItem('提醒设置')}
        >
          <View className={styles.menuIcon}>
            <Text>🔔</Text>
          </View>
          <Text className={styles.menuText}>提醒设置</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
        <View
          className={styles.menuItem}
          onClick={() => handleMenuItem('胎压阈值')}
        >
          <View className={styles.menuIcon}>
            <Text>⚙️</Text>
          </View>
          <Text className={styles.menuText}>胎压阈值设置</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
        <View
          className={styles.menuItem}
          onClick={() => handleMenuItem('帮助中心')}
        >
          <View className={styles.menuIcon}>
            <Text>❓</Text>
          </View>
          <Text className={styles.menuText}>帮助中心</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
        <View
          className={styles.menuItem}
          onClick={() => handleMenuItem('关于我们')}
        >
          <View className={styles.menuIcon}>
            <Text>ℹ️</Text>
          </View>
          <Text className={styles.menuText}>关于我们</Text>
          <Text className={styles.menuArrow}>›</Text>
        </View>
      </View>
    </View>
  );
};

export default MinePage;
