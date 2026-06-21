import React from 'react';
import { View, Text } from '@tarojs/components';
import { RouteInfo as RouteInfoType } from '@/types';
import styles from './index.module.scss';

interface RouteInfoProps {
  route: RouteInfoType;
}

const RouteInfo: React.FC<RouteInfoProps> = ({ route }) => {
  const { origin, destination, distance, duration, eta, currentLocation } = route;

  return (
    <View className={styles.routeCard}>
      <Text className={styles.cardTitle}>运输路线</Text>
      <View className={styles.routeLine}>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <View className={styles.routePoint} />
          <View className={styles.routeConnector} />
          <View className={`${styles.routePoint} ${styles.end}`} />
        </View>
        <View className={styles.routeLocations}>
          <View style={{ marginBottom: 20 + 'rpx' }}>
            <Text className={styles.locationText}>{origin}</Text>
          </View>
          <View>
            <Text className={styles.locationText}>{destination}</Text>
          </View>
        </View>
      </View>
      <View className={styles.routeDetails}>
        <View className={styles.detailItem}>
          <View className={styles.detailValue}>
          <Text>{distance}km</Text>
          </View>
          <Text className={styles.detailLabel}>总里程</Text>
        </View>
        <View className={styles.detailItem}>
          <View className={styles.detailValue}>
          <Text>{duration}</Text>
          </View>
          <Text className={styles.detailLabel}>预计时长</Text>
        </View>
        <View className={styles.detailItem}>
          <View className={styles.detailValue}>
          <Text>{eta}</Text>
          </View>
          <Text className={styles.detailLabel}>预计到达</Text>
        </View>
      </View>
      <View className={styles.currentLocation}>
        <View className={styles.locationDot} />
        <Text className={styles.locationTextSm}>当前位置：{currentLocation}</Text>
      </View>
    </View>
  );
};

export default RouteInfo;
