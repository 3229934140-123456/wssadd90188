export interface TirePressure {
  id: string;
  position: 'frontLeft' | 'frontRight' | 'rearLeft' | 'rearRight';
  positionLabel: string;
  pressure: number;
  unit: string;
  status: 'normal' | 'warning' | 'danger';
  warningThreshold: number;
  dangerThreshold: number;
}

export interface ColdMachine {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'standby';
  statusLabel: string;
  targetTemp: number;
  currentTemp: number;
  frequentStartStop: boolean;
  startStopCount: number;
  runHours: number;
}

export interface CargoTemp {
  current: number;
  target: number;
  min: number;
  max: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export interface RouteInfo {
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  eta: string;
  currentLocation: string;
}

export interface VehicleStatus {
  tires: TirePressure[];
  coldMachine: ColdMachine;
  cargoTemp: CargoTemp;
  route: RouteInfo;
  hasLinkageAlert: boolean;
}

export interface AlertStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface DisposalRecord {
  id: string;
  time: string;
  location: string;
  tirePosition: string;
  beforePressure: number;
  afterPressure: number;
  photos: string[];
  contactDispatch: boolean;
  tempBefore: number;
  tempAfter: number;
  notes: string;
  status: 'completed' | 'pending';
}

export interface DriverInfo {
  name: string;
  phone: string;
  license: string;
  vehicleNo: string;
  vehicleType: string;
}
