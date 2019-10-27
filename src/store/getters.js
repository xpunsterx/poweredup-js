import Buffer from  'buffer';

export default {
  characteristicMessage: () => {
    return (id, value) => {
      let data = Buffer.Buffer.from([0x81, id, 0x11, 0x60, 0x00, value, 0x00, 0x00]);
      let message = Buffer.Buffer.concat([Buffer.Buffer.alloc(2), data]);
      message[0] = message.length;

      return message;
    };
  },
  portById: (state) => {
    return (id) => {
      return state.ports.find((item) => {
        return item.id === id;
      });
    };
  },
  stepIndexById: (state) => {
    return (id) => {
      return state.timeLine.findIndex((item) => {
        return item.id === id;
      });
    };
  }
};
