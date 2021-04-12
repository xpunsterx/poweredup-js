export default {
  bleState: null,
  connectState: false,
  peripheral: null,
  service: null,
  characteristic: null,
  modes: [
    {
      id: 0,
      title: 'Manual',
      isActive: true
    },
    {
      id: 1,
      title: 'Programmable',
      isActive: true
    }
  ],
  ports: [
    {
      id: 0,
      name: 'A',
      isActive: true,
      value: 0
    },
    {
      id: 1,
      name: 'B',
      isActive: false,
      value: 0
    }
  ],
  timeLine: [],
  player: {
    isRepeat: false,
    isPlay: false,
    stepIndex: 0
  }
};
