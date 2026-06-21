import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Input, Textarea, Button, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import { useAppContext } from '@/store/AppContext';
import RecordCard from '@/components/RecordCard';
import { formatTime } from '@/utils';
import styles from './index.module.scss';

const TIRES = ['左前轮', '右前轮', '左后轮', '右后轮'];
const MIN_PRESSURE = 5.0;
const MAX_PRESSURE = 12.0;

const RecordsPage: React.FC = () => {
  const { records, addRecord, vehicleStatus } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [selectedTire, setSelectedTire] = useState('左后轮');
  const [beforePressure, setBeforePressure] = useState('');
  const [afterPressure, setAfterPressure] = useState('');
  const [contactDispatch, setContactDispatch] = useState(false);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  const handleRefresh = useCallback(() => {
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  }, []);

  const openForm = () => {
    const dangerTire = vehicleStatus.tires.find(t => t.status === 'danger');
    const warningTire = vehicleStatus.tires.find(t => t.status === 'warning');
    if (dangerTire) {
      setSelectedTire(dangerTire.positionLabel);
      setBeforePressure(dangerTire.pressure.toString());
    } else if (warningTire) {
      setSelectedTire(warningTire.positionLabel);
      setBeforePressure(warningTire.pressure.toString());
    } else {
      setBeforePressure('');
    }
    setAfterPressure('');
    setContactDispatch(false);
    setNotes('');
    setPhotos([]);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const chooseImage = () => {
    Taro.chooseImage({
      count: 3 - photos.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setPhotos([...photos, ...res.tempFilePaths]);
      }
    });
  };

  const validateAndSubmit = (): boolean => {
    if (!beforePressure || beforePressure.trim() === '') {
      Taro.showToast({
        title: '请填写补气前胎压',
        icon: 'none'
      });
      return false;
    }

    if (!afterPressure || afterPressure.trim() === '') {
      Taro.showToast({
        title: '请填写补气后胎压',
        icon: 'none'
      });
      return false;
    }

    const beforeVal = parseFloat(beforePressure);
    const afterVal = parseFloat(afterPressure);

    if (isNaN(beforeVal)) {
      Taro.showToast({
        title: '补气前胎压必须是数字',
        icon: 'none'
      });
      return false;
    }

    if (isNaN(afterVal)) {
      Taro.showToast({
        title: '补气后胎压必须是数字',
        icon: 'none'
      });
      return false;
    }

    if (beforeVal < MIN_PRESSURE || beforeVal > MAX_PRESSURE) {
      Taro.showToast({
        title: `补气前胎压应在${MIN_PRESSURE}-${MAX_PRESSURE}bar之间`,
        icon: 'none'
      });
      return false;
    }

    if (afterVal < MIN_PRESSURE || afterVal > MAX_PRESSURE) {
      Taro.showToast({
        title: `补气后胎压应在${MIN_PRESSURE}-${MAX_PRESSURE}bar之间`,
        icon: 'none'
      });
      return false;
    }

    if (afterVal <= beforeVal) {
      Taro.showToast({
        title: '补气后胎压应高于补气前',
        icon: 'none'
      });
      return false;
    }

    return true;
  };

  const submitRecord = () => {
    if (!validateAndSubmit()) {
      return;
    }

    const beforeVal = parseFloat(beforePressure);
    const afterVal = parseFloat(afterPressure);

    const recordData = {
      time: formatTime(new Date()),
      location: vehicleStatus.route.currentLocation,
      tirePosition: selectedTire,
      beforePressure: beforeVal,
      afterPressure: afterVal,
      photos: [...photos],
      contactDispatch,
      tempBefore: vehicleStatus.cargoTemp.current,
      tempAfter: vehicleStatus.cargoTemp.current,
      notes: notes.trim()
    };

    addRecord(recordData);

    Taro.showToast({
      title: '记录已保存',
      icon: 'success'
    });

    closeForm();
  };

  const sortedRecords = [...records].sort((a, b) => {
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });

  return (
    <View className={styles.recordsPage}>
      <View className={styles.pageHeader}>
        <View>
          <Text className={styles.headerTitle}>处置记录</Text>
          <Text className={styles.headerCount}>共 {sortedRecords.length} 条记录</Text>
        </View>
      </View>

      <ScrollView
        className={styles.recordsList}
        scrollY
        refresherEnabled
        onRefresherRefresh={handleRefresh}
      >
        {sortedRecords.length === 0 ? (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>📋</Text>
            <Text className={styles.emptyText}>暂无处置记录</Text>
          </View>
        ) : (
          sortedRecords.map(record => (
            <RecordCard key={record.id} record={record} />
          ))
        )}
      </ScrollView>

      <View className={styles.addBtn} onClick={openForm}>
        <Text className={styles.addBtnIcon}>+</Text>
      </View>

      {showForm && (
        <View className={styles.formModal}>
          <View className={styles.formContent}>
            <View className={styles.formHeader}>
              <Text className={styles.formTitle}>新增处置记录</Text>
              <View className={styles.closeBtn} onClick={closeForm}>
                <Text>×</Text>
              </View>
            </View>

            <ScrollView className={styles.formBody} scrollY>
              <View className={styles.summaryInfo}>
                <Text className={styles.summaryText}>
                  当前位置：{vehicleStatus.route.currentLocation}{'\n'}
                  当前温度：{vehicleStatus.cargoTemp.current}°C
                </Text>
              </View>

              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>异常轮位</Text>
                <View className={styles.tireSelector}>
                  {TIRES.map(tire => (
                    <View
                      key={tire}
                      className={classnames(styles.tireOption, selectedTire === tire && styles.selected)}
                      onClick={() => setSelectedTire(tire)}
                    >
                      <Text>{tire}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>胎压数值（bar）</Text>
                <View className={styles.pressureInputs}>
                  <View className={styles.pressureInputWrap}>
                    <Input
                      className={styles.formInput}
                      type="digit"
                      value={beforePressure}
                      onInput={(e) => setBeforePressure(e.detail.value)}
                      placeholder="补气前"
                    />
                  </View>
                  <View className={styles.pressureInputWrap}>
                    <Input
                      className={styles.formInput}
                      type="digit"
                      value={afterPressure}
                      onInput={(e) => setAfterPressure(e.detail.value)}
                      placeholder="补气后"
                    />
                  </View>
                </View>
              </View>

              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>照片上传（最多3张）</Text>
                <View className={styles.photoUpload}>
                  {photos.map((photo, index) => (
                    <View key={index} className={styles.photoItem}>
                      <Image className={styles.photoImg} src={photo} mode="aspectFill" />
                    </View>
                  ))}
                  {photos.length < 3 && (
                    <View className={styles.photoAdd} onClick={chooseImage}>
                      <Text className={styles.photoAddIcon}>+</Text>
                      <Text>拍照/相册</Text>
                    </View>
                  )}
                </View>
              </View>

              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>联系调度</Text>
                <View className={styles.switchWrap}>
                  <Text className={styles.switchLabel}>
                    {contactDispatch ? '已联系调度' : '未联系调度'}
                  </Text>
                  <View
                    className={classnames(styles.switchBtn, contactDispatch && styles.on)}
                    onClick={() => setContactDispatch(!contactDispatch)}
                  >
                    <View className={styles.switchDot} />
                  </View>
                </View>
              </View>

              <View className={styles.formGroup}>
                <Text className={styles.formLabel}>备注说明</Text>
                <Textarea
                  className={styles.formTextarea}
                  value={notes}
                  onInput={(e) => setNotes(e.detail.value)}
                  placeholder="请输入处置详情和备注..."
                  maxlength={200}
                />
              </View>
            </ScrollView>

            <View className={styles.formFooter}>
              <Button className={styles.cancelBtn} onClick={closeForm}>
                取消
              </Button>
              <Button className={styles.submitBtn} onClick={submitRecord}>
                保存记录
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default RecordsPage;
