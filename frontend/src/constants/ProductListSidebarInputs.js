import { productsDatabase } from './for-developing/productsDatabase';

export const checkBoxInput = {
  Brand: Array.from(new Set(Object.values(productsDatabase).map((product) => product.brand)))
    .sort()
    .map((brand) => ({
      label: `${brand} (${
        Object.values(productsDatabase).filter((product) => product.brand === brand).length
      })`,
      value: `filter=brand = '${brand}'`,
      type: 'checkbox'
    })),
  'Release Year': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.releaseYear))
  )
    .sort((a, b) => b - a)
    .map((releaseYear) => ({
      label: `${releaseYear} (${
        Object.values(productsDatabase).filter((product) => product.releaseYear === releaseYear)
          .length
      })`,
      value: `filter=release_year = ${releaseYear}`,
      type: 'checkbox'
    })),
  'Processor Model': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.processorModel))
  )
    .sort()
    .map((processorModel) => ({
      label: `${processorModel} (${
        Object.values(productsDatabase).filter(
          (product) => product.processorModel === processorModel
        ).length
      })`,
      value: `filter=processor_model = '${processorModel}'`,
      type: 'checkbox'
    })),
  'Product Category': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.productCategory))
  ).map((productCategory) => ({
    label: `${productCategory} (${
      Object.values(productsDatabase).filter(
        (product) => product.productCategory === productCategory
      ).length
    })`,
    value: `filter=product_category = '${productCategory}'`,
    type: 'checkbox'
  })),
  Availability: Array.from(
    new Set(
      Object.values(productsDatabase).map((product) => {
        if (product.stockCount > 0) return 'In stock';
        else return 'Out of stock';
      })
    )
  )
    .sort()
    .map((stock) => ({
      label: `${stock} (${
        stock === 'In stock'
          ? Object.values(productsDatabase).filter((product) => product.stockCount > 0).length
          : Object.values(productsDatabase).filter((product) => product.stockCount === 0).length
      })`,
      value: `${stock === 'In stock' ? 'filter=stock_count > 0' : 'filter=stock_count = 0'}`,
      type: 'checkbox'
    })),
  Color: Array.from(new Set(Object.values(productsDatabase).map((product) => product.colorFamily)))
    .sort()
    .map((mainColor) => ({
      label: `${mainColor} (${
        Object.values(productsDatabase).filter((product) => product.colorFamily === mainColor)
          .length
      })`,
      value: `filter=color_family ='${mainColor}'`,
      type: 'checkbox'
    })),
  'Display Resolution': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.screenResolution))
  )
    .sort()
    .map((screenResolution) => ({
      label: `${screenResolution} (${
        Object.values(productsDatabase).filter(
          (product) => product.screenResolution === screenResolution
        ).length
      })`,
      value: `filter=screen_resolution = '${screenResolution}'`,
      type: 'checkbox'
    })),

  'Display Size': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.screenSize))
  )
    .sort()
    .map((screenSize) => ({
      label: `${screenSize.toFixed(1)}'' (${
        Object.values(productsDatabase).filter((product) => product.screenSize === screenSize)
          .length
      })`,
      value: `filter=screen_size between ${screenSize - 0.001} and ${screenSize + 0.001}`,
      type: 'checkbox'
    })),
  'Hard Disk Size': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.storageCapacity))
  )
    .sort((a, b) => a - b)
    .map((storageCapacity) => ({
      label: `${storageCapacity} GB (${
        Object.values(productsDatabase).filter(
          (product) => product.storageCapacity === storageCapacity
        ).length
      })`,
      value: `filter=storage_capacity = ${storageCapacity}`,
      type: 'checkbox'
    })),
  'RAM Capacity': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.systemMemory))
  )
    .sort((a, b) => a - b)
    .map((systemMemory) => ({
      label: `${systemMemory} GB (${
        Object.values(productsDatabase).filter((product) => product.systemMemory === systemMemory)
          .length
      })`,
      value: `filter=system_memory = ${systemMemory}`,
      type: 'checkbox'
    })),
  'Graphics Type': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.graphicsType))
  )
    .sort()
    .map((graphicsType) => ({
      label: `${graphicsType} (${
        Object.values(productsDatabase).filter((product) => product.graphicsType === graphicsType)
          .length
      })`,
      value: `filter=graphics_type = '${graphicsType}'`,
      type: 'checkbox'
    })),
  'Graphics Model': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.graphicsModel))
  )
    .sort()
    .map((graphicsModel) => ({
      label: `${graphicsModel} (${
        Object.values(productsDatabase).filter((product) => product.graphicsModel === graphicsModel)
          .length
      })`,
      value: `filter=graphics_model = '${graphicsModel}'`,
      type: 'checkbox'
    })),
  'Operating System': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.operatingSystem))
  )
    .sort()
    .map((operatingSystem) => ({
      label: `${operatingSystem} (${
        Object.values(productsDatabase).filter(
          (product) => product.operatingSystem === operatingSystem
        ).length
      })`,
      value: `filter=operating_system = '${operatingSystem}'`,
      type: 'checkbox'
    })),
  'Battery Type': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.batteryType))
  )
    .sort()
    .map((batteryType) => ({
      label: `${batteryType} (${
        Object.values(productsDatabase).filter((product) => product.batteryType === batteryType)
          .length
      })`,
      value: `filter=battery_type = '${batteryType}'`,
      type: 'checkbox'
    })),
  'Voice Assistant': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.voiceAssistant))
  )
    .sort()
    .map((voiceAssistant) => ({
      label: `${voiceAssistant} (${
        Object.values(productsDatabase).filter(
          (product) => product.voiceAssistant === voiceAssistant
        ).length
      })`,
      value: `filter=voice_assistant = '${voiceAssistant}'`,
      type: 'checkbox'
    })),
  'Backlit Keyboard': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.backlitKeyboard))
  )
    .sort()
    .map((backlitKeyboard) => ({
      label: `${backlitKeyboard ? 'Yes' : 'No'} (${
        backlitKeyboard
          ? Object.values(productsDatabase).filter((product) => product.backlitKeyboard).length
          : Object.values(productsDatabase).filter((product) => !product.backlitKeyboard).length
      })`,
      value: `filter=backlit_keyboard = ${backlitKeyboard}`,
      type: 'checkbox'
    })),
  'Touch Screen': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.touchScreen))
  )
    .sort()
    .map((touchScreen) => ({
      label: `${touchScreen ? 'Yes' : 'No'} (${
        touchScreen
          ? Object.values(productsDatabase).filter((product) => product.touchScreen).length
          : Object.values(productsDatabase).filter((product) => !product.touchScreen).length
      })`,
      value: `filter=touch_screen = ${touchScreen}`,
      type: 'checkbox'
    }))
};
//price weight Customer Reviews CPU Manufacturer Laptop Display Size

// Laptop Price
// Computer Weight
// CPU Manufacturer
