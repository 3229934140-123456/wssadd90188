import React, { useCallback } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useAppContext } from '@/store/AppContext';
import TirePressureCard from '@/components/TirePressureCard';
import ColdMachineStatus from '@/components/ColdMachineStatus';
import TempDisplay from '@/components/TempDisplay';
import RouteInfo from '@/components/RouteInfo';
import AlertModal from '@/components/AlertModal';
import styles from './index.module.scss';

const HomePage: React.FC = () => {
  const {
    vehicleStatus,
    driverInfo,
    alertSteps,
    showAlertModal,
    setShowAlertModal,
    toggleAlertStep,
    dismissAlertTemporarily,
    hasLinkageCondition
  } = useAppContext();

  const { tires, coldMachine, cargoTemp, route } = vehicleStatus;

  const handleRefresh = useCallback(() => {
    Taro.showToast({
      title: '数据已更新',
      icon: 'success'
    });
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  }, []);

  const handleViewAlert = () => {
    setShowAlertModal(true);
  };

  const handleCloseAlert = () => {
    dismissAlertTemporarily();
  };

  const handleGoRecord = () => {
    setShowAlertModal(false);
    Taro.switchTab({
      url: '/pages/records/index'
    });
  };

  return (
    <ScrollView
      className={styles.homePage}
      scrollY
      refresherEnabled
      onRefresherRefresh={handleRefresh}
    >
      <View className={styles.pageHeader}>
        <View className={styles.vehicleInfo}>
          <Text className={styles.vehicleNo}>{driverInfo.vehicleNo}</Text>
          <Text className={styles.vehicleType}>{driverInfo.vehicleType} · {driverInfo.name}</Text>
        </View>
      </View>

      {hasLinkageCondition && (
        <View className={styles.alertBanner} onClick={handleViewAlert}>
          <View className={styles.alertIcon}>
            <Text>!</Text>
          </View>
          <View className={styles.alertContent}>
            <Text className={styles.alertTitle}>联动提醒</Text>
            <Text className={styles.alertDesc}>胎压异常 + 冷机频繁启停，点击查看处置方案</Text>
          </View>
          <View className={styles.alertBtn}>
            <Text>查看</Text>
          </View>
        </View>
      )}

      <View className={styles.section}>
        <Text className={styles.sectionTitle}>轮胎胎压</Text>
        <View className={styles.tiresGrid}>
          {tires.map(tire => (
            <TirePressureCard key={tire.id} tire={tire} />
          ))}
        </View>
      </View>

      <View className={styles.section}>
        <TempDisplay cargoTemp={cargoTemp} />
      </View>

      <View className={styles.section}>
        <ColdMachineStatus coldMachine={coldMachine} />
      </View>

      <View className={styles.section}>
        <RouteInfo route={route} />
      </View>

      <AlertModal
        visible={showAlertModal}
        steps={alertSteps}
        onStepClick={toggleAlertStep}
        onClose={handleCloseAlert}
        onGoRecord={handleGoRecord}
      />
    </ScrollView>
  );
};

export default HomePage;
