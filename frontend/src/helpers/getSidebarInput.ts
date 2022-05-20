import ProductType from '../models/ProductType';

const getSidebarInput = (database: ProductType[]) => {
  return {
    Brand: Array.from(new Set(Object.values(database).map((product) => product.brand)))
      .sort()
      .map((brand) => ({
        label: `${brand} (${
          Object.values(database).filter((product) => product.brand === brand).length
        })`,
        value: `filter=brand = '${brand}'`,
        type: 'checkbox',
        accordionOpen: true
      })),
    'Customer Reviews': [5, 4, 3, 2, 1].map((rating) => ({
      label: `${rating} stars (${
        Object.values(database).filter(
          (product) => product.rating >= rating - 0.501 && product.rating <= rating + 0.501
        ).length
      })`,
      value:
        Object.values(database).filter(
          (product) => product.rating >= rating - 0.501 && product.rating < rating + 0.501
        ).length > 0
          ? `filter=rating between ${rating - 0.501} and ${rating + 0.499}`
          : '',
      type: 'checkbox',
      accordionOpen: true
    })),
    Price: [
      [0, 300],
      [300, 500],
      [500, 700],
      [700, 900],
      [900, 10000]
    ].map((priceRange) => ({
      label: `${
        priceRange[0] === 0
          ? `Under ${priceRange[1]}`
          : priceRange[1] === 10000
          ? `${priceRange[0]} & Above`
          : `${priceRange[0]} to ${priceRange[1]}`
      } (${
        Object.values(database).filter(
          (product) => product.price >= priceRange[0] && product.price < priceRange[1]
        ).length
      })`,
      value: `filter=price between ${priceRange[0]} and ${priceRange[1] + 0.001}`,
      type: 'checkbox',
      accordionOpen: true
    })),
    'Release Year': Array.from(
      new Set(Object.values(database).map((product) => product.releaseYear))
    )
      .sort((a, b) => b - a)
      .map((releaseYear) => ({
        label: `${releaseYear} (${
          Object.values(database).filter((product) => product.releaseYear === releaseYear).length
        })`,
        value: `filter=release_year = ${releaseYear}`,
        type: 'checkbox'
      })),
    'CPU Manufacturer': Array.from(
      new Set(Object.values(database).map((product) => product.processorBrand))
    )
      .sort()
      .map((processorBrand) => ({
        label: `${processorBrand} (${
          Object.values(database).filter((product) => product.processorBrand === processorBrand)
            .length
        })`,
        value: `filter=processor_brand = '${processorBrand}'`,
        type: 'checkbox'
      })),
    'Operating System': Array.from(
      new Set(Object.values(database).map((product) => product.operatingSystem))
    )
      .sort()
      .map((operatingSystem) => ({
        label: `${operatingSystem} (${
          Object.values(database).filter((product) => product.operatingSystem === operatingSystem)
            .length
        })`,
        value: `filter=operating_system = '${operatingSystem}'`,
        type: 'checkbox'
      })),
    Color: Array.from(new Set(Object.values(database).map((product) => product.colorFamily)))
      .sort()
      .map((mainColor) => ({
        label: `${mainColor} (${
          Object.values(database).filter((product) => product.colorFamily === mainColor).length
        })`,
        value: `filter=color_family ='${mainColor}'`,
        type: 'checkbox'
      })),
    'Display Size': Array.from(
      new Set(Object.values(database).map((product) => product.screenSize))
    )
      .sort()
      .map((screenSize) => ({
        label: `${screenSize?.toFixed(1)}'' (${
          Object.values(database).filter((product) => product.screenSize === screenSize).length
        })`,
        value: `filter=screen_size between ${screenSize - 0.001} and ${screenSize + 0.001}`,
        type: 'checkbox'
      })),
    'Display Type': Array.from(
      new Set(Object.values(database).map((product) => product.displayType))
    )
      .sort()
      .map((displayType) => ({
        label: `${displayType} (${
          Object.values(database).filter((product) => product.displayType === displayType).length
        })`,
        value: `filter=display_type = '${displayType}'`,
        type: 'checkbox'
      })),
    'CPU Model': Array.from(
      new Set(Object.values(database).map((product) => product.processorModel))
    )
      .sort()
      .map((processorModel) => ({
        label: `${processorModel} (${
          Object.values(database).filter((product) => product.processorModel === processorModel)
            .length
        })`,
        value: `filter=processor_model = '${processorModel}'`,
        type: 'checkbox'
      })),
    'Display Resolution': Array.from(
      new Set(Object.values(database).map((product) => product.screenResolution))
    )
      .sort()
      .map((screenResolution) => ({
        label: `${screenResolution} (${
          Object.values(database).filter((product) => product.screenResolution === screenResolution)
            .length
        })`,
        value: `filter=screen_resolution = '${screenResolution}'`,
        type: 'checkbox'
      })),
    'RAM Capacity': Array.from(
      new Set(Object.values(database).map((product) => product.systemMemory))
    )
      .sort((a, b) => a - b)
      .map((systemMemory) => ({
        label: `${systemMemory} GB (${
          Object.values(database).filter((product) => product.systemMemory === systemMemory).length
        })`,
        value: `filter=system_memory = ${systemMemory}`,
        type: 'checkbox'
      })),
    'Hard Disk Size': Array.from(
      new Set(Object.values(database).map((product) => product.storageCapacity))
    )
      .sort((a, b) => a - b)
      .map((storageCapacity) => ({
        label: `${storageCapacity} GB (${
          Object.values(database).filter((product) => product.storageCapacity === storageCapacity)
            .length
        })`,
        value: `filter=storage_capacity = ${storageCapacity}`,
        type: 'checkbox'
      })),

    'Hard Disk Type': Array.from(
      new Set(Object.values(database).map((product) => product.storageType))
    )
      .sort((a, b) => a.localeCompare(b))
      .map((storageType) => ({
        label: `${storageType} (${
          Object.values(database).filter((product) => product.storageType === storageType).length
        })`,
        value: `filter=storage_type = '${storageType}'`,
        type: 'checkbox'
      })),
    'GPU Manufacturer': Array.from(
      new Set(Object.values(database).map((product) => product.graphicsBrand))
    )
      .sort()
      .map((graphicsBrand) => ({
        label: `${graphicsBrand} (${
          Object.values(database).filter((product) => product.graphicsBrand === graphicsBrand)
            .length
        })`,
        value: `filter=graphics_brand = '${graphicsBrand}'`,
        type: 'checkbox'
      })),
    'Graphics Type': Array.from(
      new Set(Object.values(database).map((product) => product.graphicsType))
    )
      .sort()
      .map((graphicsType) => ({
        label: `${graphicsType} (${
          Object.values(database).filter((product) => product.graphicsType === graphicsType).length
        })`,
        value: `filter=graphics_type = '${graphicsType}'`,
        type: 'checkbox'
      })),
    'Graphics Model': Array.from(
      new Set(Object.values(database).map((product) => product.graphicsModel))
    )
      .sort()
      .map((graphicsModel) => ({
        label: `${graphicsModel} (${
          Object.values(database).filter((product) => product.graphicsModel === graphicsModel)
            .length
        })`,
        value: `filter=graphics_model = '${graphicsModel}'`,
        type: 'checkbox'
      })),
    Weight: [
      [0, 3],
      [3, 4],
      [4, 5],
      [5, 100]
    ]
      .sort()
      .map((weightRange) => ({
        label: `${
          weightRange[0] === 0
            ? `Up to ${weightRange[1]} Pounds`
            : weightRange[1] === 100
            ? `${weightRange[0]} Pounds & Above`
            : `${weightRange[0]} to ${weightRange[1]} Pounds`
        } (${
          Object.values(database).filter(
            (product) => product.weight >= weightRange[0] && product.weight < weightRange[1]
          ).length
        })`,
        value: `filter=weight between ${weightRange[0] - 0.001} and ${weightRange[1] - 0.001}`,
        type: 'checkbox'
      })),
    'Battery Type': Array.from(
      new Set(Object.values(database).map((product) => product.batteryType))
    )
      .sort()
      .map((batteryType) => ({
        label: `${batteryType} (${
          Object.values(database).filter((product) => product.batteryType === batteryType).length
        })`,
        value: `filter=battery_type = '${batteryType}'`,
        type: 'checkbox'
      })),
    'Voice Assistant': Array.from(
      new Set(Object.values(database).map((product) => product.voiceAssistant))
    )
      .sort()
      .map((voiceAssistant) => ({
        label: `${voiceAssistant} (${
          Object.values(database).filter((product) => product.voiceAssistant === voiceAssistant)
            .length
        })`,
        value: `filter=voice_assistant = '${voiceAssistant}'`,
        type: 'checkbox'
      })),
    'Backlit Keyboard': Array.from(
      new Set(Object.values(database).map((product) => product.backlitKeyboard))
    )
      .sort()
      .map((backlitKeyboard) => ({
        label: `${backlitKeyboard ? 'Yes' : 'No'} (${
          backlitKeyboard
            ? Object.values(database).filter((product) => product.backlitKeyboard).length
            : Object.values(database).filter((product) => !product.backlitKeyboard).length
        })`,
        value: `filter=backlit_keyboard = ${backlitKeyboard}`,
        type: 'checkbox'
      })),
    'Touch Screen': Array.from(
      new Set(Object.values(database).map((product) => product.touchScreen))
    )
      .sort()
      .map((touchScreen) => ({
        label: `${touchScreen ? 'Yes' : 'No'} (${
          touchScreen
            ? Object.values(database).filter((product) => product.touchScreen).length
            : Object.values(database).filter((product) => !product.touchScreen).length
        })`,
        value: `filter=touch_screen = ${touchScreen}`,
        type: 'checkbox'
      })),
    Availability: Array.from(
      new Set(
        Object.values(database).map((product) => {
          if (product.stockCount > 0) return 'In stock';
          else return 'Out of stock';
        })
      )
    )
      .sort()
      .map((stock) => ({
        label: `${stock} (${
          stock === 'In stock'
            ? Object.values(database).filter((product) => product.stockCount > 0).length
            : Object.values(database).filter((product) => product.stockCount === 0).length
        })`,
        value: `${stock === 'In stock' ? 'filter=stock_count > 0' : 'filter=stock_count = 0'}`,
        type: 'checkbox'
      }))
  };
};

export default getSidebarInput;
