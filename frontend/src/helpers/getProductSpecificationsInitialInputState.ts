import ProductType from '../models/ProductType';

const getProductSpecificationsInitialInputState = (database: ProductType[]) => {
  return {
    screenSize: {
      formElement: 'select',
      label: 'Screen size',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.screenSize)
            .map((item) => +item?.screenSize)
        )!
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue.toFixed(1)}''`,
          value: `${itemValue}`
        })),
      placeholder: 'Screen size ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    screenResolution: {
      formElement: 'select',
      label: 'Screen resolution',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.screenResolution)
            .map((item) => item.screenResolution)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Screen resolution ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    displayType: {
      formElement: 'select',
      label: 'Display type',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.displayType)
            .map((item) => item.displayType)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Display type ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    processorBrand: {
      formElement: 'select',
      label: 'Processor brand',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.processorBrand)
            .map((item) => item.processorBrand)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Processor brand ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    processorModel: {
      formElement: 'select',
      label: 'Processor model',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.processorModel)
            .map((item) => item.processorModel)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Processor model ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    processorModelNumber: {
      formElement: 'select',
      label: 'Processor number',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.processorModelNumber)
            .map((item) => item.processorModelNumber)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Processor model number...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    storageType: {
      formElement: 'select',
      label: 'Storage type',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.storageType)
            .map((item) => item.storageType)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Storage type ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    storageCapacity: {
      formElement: 'select',
      label: 'Storage capacity',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.storageCapacity)
            .map((item) => item.storageCapacity)
        )
      )
        .sort((a, b) => a - b)
        .map((itemValue) => ({
          label: `${itemValue} GB`,
          value: `${itemValue}`
        })),
      placeholder: 'Storage capacity ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    systemMemory: {
      formElement: 'select',
      label: 'System memory',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.systemMemory)
            .map((item) => item.systemMemory)
        )
      )
        .sort((a, b) => a - b)
        .map((itemValue) => ({
          label: `${itemValue} GB`,
          value: `${itemValue}`
        })),
      placeholder: 'System memory ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    operatingSystem: {
      formElement: 'select',
      label: 'Operating system',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.operatingSystem)
            .map((item) => item.operatingSystem)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Operating system ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    graphicsType: {
      formElement: 'select',
      label: 'Graphics type',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.graphicsType)
            .map((item) => item.graphicsType)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Graphics type ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    graphicsBrand: {
      formElement: 'select',
      label: 'Graphics brand',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.graphicsBrand)
            .map((item) => item.graphicsBrand)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Graphics brand ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    graphicsModel: {
      formElement: 'select',
      label: 'Graphics model',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.graphicsModel)
            .map((item) => item.graphicsModel)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Graphics model ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    voiceAssistant: {
      formElement: 'select',
      label: 'Voice Assistant',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.voiceAssistant)
            .map((item) => item.voiceAssistant)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Voice Assistant ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    batteryType: {
      formElement: 'select',
      label: 'Battery type',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.batteryType)
            .map((item) => item.batteryType)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue}`,
          value: `${itemValue}`
        })),
      placeholder: 'Battery type ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    touchScreen: {
      formElement: 'select',
      label: 'Touch screen',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.touchScreen)
            .map((item) => item.touchScreen)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue === 1 ? 'true' : 'false'}`,
          value: `${itemValue}`
        })),
      placeholder: 'Touch screen ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    },
    backlitKeyboard: {
      formElement: 'select',
      label: 'Backlit keyboard',
      options: Array.from(
        new Set(
          Object.values(database)
            .filter((item) => item.backlitKeyboard)
            .map((item) => item.backlitKeyboard)
        )
      )
        .sort()
        .map((itemValue) => ({
          label: `${itemValue === 1 ? 'true' : 'false'}`,
          value: `${itemValue}`
        })),
      placeholder: 'Backlit keyboard ...',
      value: '',
      validations: {
        required: true
      },
      valid: true,
      touched: false
    }
  };
};

export default getProductSpecificationsInitialInputState;
