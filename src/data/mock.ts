import { VehicleStatus, DisposalRecord, DriverInfo, AlertStep } from '@/types';

export const mockVehicleStatus: VehicleStatus = {
  tires: [
    {
      id: 't1',
      position: 'frontLeft',
      positionLabel: '左前轮',
      pressure: 8.2,
      unit: 'bar',
      status: 'normal',
      warningThreshold: 7.5,
      dangerThreshold: 7.0
    },
    {
      id: 't2',
      position: 'frontRight',
      positionLabel: '右前轮',
      pressure: 8.1,
      unit: 'bar',
      status: 'normal',
      warningThreshold: 7.5,
      dangerThreshold: 7.0
    },
    {
      id: 't3',
      position: 'rearLeft',
      positionLabel: '左后轮',
      pressure: 7.2,
      unit: 'bar',
      status: 'danger',
      warningThreshold: 7.5,
      dangerThreshold: 7.0
    },
    {
      id: 't4',
      position: 'rearRight',
      positionLabel: '右后轮',
      pressure: 7.8,
      unit: 'bar',
      status: 'warning',
      warningThreshold: 7.5,
      dangerThreshold: 7.0
    }
  ],
  coldMachine: {
    id: 'cm1',
    name: '冷机A-001',
    status: 'running',
    statusLabel: '运行中',
    targetTemp: -18,
    currentTemp: -15.5,
    frequentStartStop: true,
    startStopCount: 12,
    runHours: 6.5
  },
  cargoTemp: {
    current: -15.5,
    target: -18,
    min: -20,
    max: -12,
    unit: '°C',
    trend: 'up'
  },
  route: {
    origin: '上海冷链中心',
    destination: '北京通州冷库',
    distance: 1260,
    duration: '14小时30分',
    eta: '次日06:30',
    currentLocation: 'G2京沪高速 徐州段'
  },
  hasLinkageAlert: true
};

export const mockAlertSteps: AlertStep[] = [
  {
    id: 1,
    title: '先减速靠边',
    description: '开启双闪，缓慢减速，在安全区域停车',
    completed: false
  },
  {
    id: 2,
    title: '检查轮胎',
    description: '下车检查异常轮胎，确认漏气情况，必要时更换备胎',
    completed: false
  },
  {
    id: 3,
    title: '观察温度回落',
    description: '启动车辆后观察10分钟，确认货厢温度是否回落至正常范围',
    completed: false
  }
];

export const mockDisposalRecords: DisposalRecord[] = [
  {
    id: 'r1',
    time: '2026-06-21 23:45',
    location: 'G2京沪高速 徐州段',
    tirePosition: '左后轮',
    beforePressure: 7.1,
    afterPressure: 8.0,
    photos: [],
    contactDispatch: true,
    tempBefore: -15.2,
    tempAfter: -17.8,
    notes: '发现轮胎扎钉，已补胎并补气至8.0bar，联系调度说明情况',
    status: 'completed'
  },
  {
    id: 'r2',
    time: '2026-06-20 15:20',
    location: 'S32申嘉湖高速 嘉兴段',
    tirePosition: '右前轮',
    beforePressure: 7.3,
    afterPressure: 8.1,
    photos: [],
    contactDispatch: false,
    tempBefore: -16.0,
    tempAfter: -18.2,
    notes: '常规补气，温度正常',
    status: 'completed'
  },
  {
    id: 'r3',
    time: '2026-06-19 08:10',
    location: 'G15沈海高速 南通段',
    tirePosition: '右后轮',
    beforePressure: 7.4,
    afterPressure: 7.9,
    photos: [],
    contactDispatch: false,
    tempBefore: -17.5,
    tempAfter: -18.0,
    notes: '服务区补气，无异常',
    status: 'completed'
  },
  {
    id: 'r4',
    time: '2026-06-18 22:30',
    location: 'G42沪蓉高速 常州段',
    tirePosition: '左前轮',
    beforePressure: 7.0,
    afterPressure: 8.2,
    photos: [],
    contactDispatch: true,
    tempBefore: -14.8,
    tempAfter: -17.5,
    notes: '胎压异常偏低，冷机频繁启动，已补气并报备调度',
    status: 'completed'
  },
  {
    id: 'r5',
    time: '2026-06-17 11:00',
    location: 'G60沪昆高速 杭州段',
    tirePosition: '左后轮',
    beforePressure: 7.6,
    afterPressure: 8.0,
    photos: [],
    contactDispatch: false,
    tempBefore: -18.0,
    tempAfter: -18.1,
    notes: '例行检查，补气至标准值',
    status: 'completed'
  }
];

export const mockDriverInfo: DriverInfo = {
  name: '张师傅',
  phone: '138****8888',
  license: 'A2',
  vehicleNo: '沪A·D8526',
  vehicleType: '9.6米冷藏车'
};
