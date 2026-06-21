import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { VehicleStatus, DisposalRecord, DriverInfo, AlertStep } from '@/types';
import { mockVehicleStatus, mockDisposalRecords, mockDriverInfo, mockAlertSteps } from '@/data/mock';

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatus>(mockVehicleStatus);
  const [records, setRecords] = useState<DisposalRecord[]>(mockDisposalRecords);
  const [driverInfo] = useState<DriverInfo>(mockDriverInfo);
  const [alertSteps, setAlertSteps] = useState<AlertStep[]>(mockAlertSteps);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(true);

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
    setRecords(prev => [newRecord, ...prev]);
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
        updateTirePressure
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
