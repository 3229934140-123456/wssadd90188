export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/records/index',
    'pages/mine/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#0EA5E9',
    navigationBarTitleText: '冷链胎压联动',
    navigationBarTextStyle: 'white',
    backgroundColor: '#F0F9FF'
  },
  tabBar: {
    color: '#94A3B8',
    selectedColor: '#0EA5E9',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '车况首页'
      },
      {
        pagePath: 'pages/records/index',
        text: '处置记录'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
