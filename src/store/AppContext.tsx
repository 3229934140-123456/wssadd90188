import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import Taro from '@tarojs/taro';
import { VehicleStatus, DisposalRecord, DriverInfo, AlertStep } from '@/types';
import { mockVehicleStatus, mockDriverInfo, mockAlertSteps } from '@/data/mock';

const STORAGE_KEY_RECORDS = 'cold_chain_disposal_records';
const STORAGE_KEY_ALERT_DISMISSED = 'cold_chain_alert_dismissed';
const STORAGE_KEY_ALERT_DISMISSED_TIME = 'cold_chain_alert_dismissed_time';

interface AppContextType {
  vehicleStatus: VehicleStatus;
  records: DisposalRecord[];
  driverInfo: DriverInfo;
  alertSteps: AlertStep[];
  showAlertModal: boolean;
  setShowAlertModal: (show: boolean) => void;
  toggleAlertStep: (stepId: number) => void;
  addRecord: (record: Omit<DisposalRecord, 'id' | 'status'>) => void;
  updateTirePressure: (tireId: string, pressure: number) => void;
  dismissAlertTemporarily: () => void;
  checkAndShowLinkageAlert: () => void;
  hasLinkageCondition: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const loadRecordsFromStorage = (): DisposalRecord[] => {
  try {
    const data = Taro.getStorageSync(STORAGE_KEY_RECORDS);
    if (data && Array.isArray(data)) {
      return data;
    }
  } catch (e) {
    console.error('[Storage] loadRecords error:', e);
  }
  return [];
};

const saveRecordsToStorage = (records: DisposalRecord[]) => {
  try {
    Taro.setStorageSync(STORAGE_KEY_RECORDS, records);
  } catch (e) {
    console.error('[Storage] saveRecords error:', e);
  }
};

const isAlertDismissed = (): boolean => {
  try {
    const dismissed = Taro.getStorageSync(STORAGE_KEY_ALERT_DISMISSED);
    const dismissedTime = Taro.getStorageSync(STORAGE_KEY_ALERT_DISMISSED_TIME);
    if (dismissed && dismissedTime) {
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;
      if (now - dismissedTime < oneHour) {
        return true;
      }
    }
  } catch (e) {
    console.error('[Storage] isAlertDismissed error:', e);
  }
  return false;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatus>(mockVehicleStatus);
  const [records, setRecords] = useState<DisposalRecord[]>(() => loadRecordsFromStorage());
  const [driverInfo] = useState<DriverInfo>(mockDriverInfo);
  const [alertSteps, setAlertSteps] = useState<AlertStep[]>(mockAlertSteps);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

  const abnormalTires = vehicleStatus.tires.filter(t => t.status === 'danger' || t.status === 'warning');
  const hasLowPressure = abnormalTires.length > 0;
  const hasFrequentStartStop = vehicleStatus.coldMachine.frequentStartStop;
  const hasLinkageCondition = hasLowPressure && hasFrequentStartStop;

  const checkAndShowLinkageAlert = useCallback(() => {
    if (hasLinkageCondition && !isAlertDismissed()) {
      setShowAlertModal(true);
    }
  }, [hasLinkageCondition]);

  useEffect(() => {
    saveRecordsToStorage(records);
  }, [records]);

  useEffect(() => {
    const timer = setTimeout(() => {
      checkAndShowLinkageAlert();
    }, 500);
    return () => clearTimeout(timer);
  }, [checkAndShowLinkageAlert]);

  const dismissAlertTemporarily = useCallback(() => {
    try {
      Taro.setStorageSync(STORAGE_KEY_ALERT_DISMISSED, true);
      Taro.setStorageSync(STORAGE_KEY_ALERT_DISMISSED_TIME, Date.now());
    } catch (e) {
      console.error('[Storage] dismissAlert error:', e);
    }
    setShowAlertModal(false);
  }, []);

  const toggleAlertStep = useCallback((stepId: number) => {
    setAlertSteps(prev =>
      prev.map(step =>
        step.id === stepId ? { ...step, completed: !step.completed } : step
      )
    );
  }, []);

  const addRecord = useCallback((recordData: Omit<DisposalRecord, 'id' | 'status'>) => {
    const newRecord: DisposalRecord = {
      ...recordData,
      id: `r${Date.now()}`,
      status: 'completed'
    };
    setRecords(prev => {
      const updated = [newRecord, ...prev];
      saveRecordsToStorage(updated);
      return updated;
    });
  }, []);

  const updateTirePressure = useCallback((tireId: string, pressure: number) => {
    setVehicleStatus(prev => ({
      ...prev,
      tires: prev.tires.map(tire => {
        if (tire.id === tireId) {
          let status: 'normal' | 'warning' | 'danger' = 'normal';
          if (pressure < tire.dangerThreshold) {
            status = 'danger';
          } else if (pressure < tire.warningThreshold) {
            status = 'warning';
          }
          return { ...tire, pressure, status };
        }
        return tire;
      })
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        vehicleStatus,
        records,
        driverInfo,
        alertSteps,
        showAlertModal,
        setShowAlertModal,
        toggleAlertStep,
        addRecord,
        updateTirePressure,
        dismissAlertTemporarily,
        checkAndShowLinkageAlert,
        hasLinkageCondition
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
