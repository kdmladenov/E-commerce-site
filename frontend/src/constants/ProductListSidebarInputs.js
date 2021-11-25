import { productsDatabase } from './for-developing/productsDatabase';

export const checkBoxInput = {
  Brand: Array.from(new Set(Object.values(productsDatabase).map((product) => product.brand)))
    .sort()
    .map((brand) => ({
      label: `${brand} (${
        Object.values(productsDatabase).filter((product) => product.brand === brand).length
      })`,
      value: `searchOr=brand = '${brand}'`,
      type: 'checkbox',
      searchType: 'searchOr'
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
      value: `searchOr=release_year = ${releaseYear}`,
      type: 'checkbox',
      searchType: 'searchOr'
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
      value: `searchOr=processor_model = '${processorModel}'`,
      type: 'checkbox',
      searchType: 'searchOr'
    })),
  'Product Category': Array.from(
    new Set(Object.values(productsDatabase).map((product) => product.productCategory))
  ).map((productCategory) => ({
    label: `${productCategory} (${
      Object.values(productsDatabase).filter(
        (product) => product.productCategory === productCategory
      ).length
    })`,
    value: `searchAnd= product_category = '${productCategory}'`,
    type: 'checkbox',
    searchType: 'searchAnd'
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
      value: `${
        stock === 'In stock' ? 'searchAnd= stock_count > 0' : 'searchAnd= stock_count = 0'
      }`,
      type: 'checkbox',
      searchType: 'searchAnd'
    })),
  Color: Array.from(new Set(Object.values(productsDatabase).map((product) => product.colorFamily)))
    .sort()
    .map((mainColor) => ({
      label: `${mainColor} (${
        Object.values(productsDatabase).filter((product) => product.colorFamily === mainColor)
          .length
      })`,
      value: `searchOr= color_family ='${mainColor}'`,
      type: 'checkbox',
      searchType: 'searchOr'
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
      value: `searchOr= screen_resolution = '${screenResolution}'`,
      type: 'checkbox',
      searchType: 'searchOr'
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
      value: `searchOr= screen_size between ${screenSize - 0.001} and ${screenSize + 0.001}`,
      type: 'checkbox',
      searchType: 'searchOr'
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
      value: `searchOr= storage_capacity = ${storageCapacity}`,
      type: 'checkbox',
      searchType: 'searchOr'
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
      value: `searchOr= system_memory = ${systemMemory}`,
      type: 'checkbox',
      searchType: 'searchOr'
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
      value: `searchOr= graphics_type = '${graphicsType}'`,
      type: 'checkbox',
      searchType: 'searchOr'
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
      value: `searchOr= graphics_model = '${graphicsModel}'`,
      type: 'checkbox',
      searchType: 'searchOr'
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
      value: `searchOr= operating_system = '${operatingSystem}'`,
      type: 'checkbox',
      searchType: 'searchOr'
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
      value: `searchOr= battery_type = '${batteryType}'`,
      type: 'checkbox',
      searchType: 'searchOr'
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
      value: `searchOr= voice_assistant = '${voiceAssistant}'`,
      type: 'checkbox',
      searchType: 'searchOr'
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
      value: `searchAnd= backlit_keyboard = ${backlitKeyboard}`,
      type: 'checkbox',
      searchType: 'searchAnd'
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
      value: `searchAnd= touch_screen = ${touchScreen}`,
      type: 'checkbox',
      searchType: 'searchAnd'
    }))
};
//price weight Customer Reviews CPU Manufacturer Laptop Display Size

// Laptop Price
// Computer Weight
// CPU Manufacturer

