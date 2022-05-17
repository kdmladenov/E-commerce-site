import { specification as SPECIFICATION } from '../constants/constants.js';

export default {
  screenSize: (value: number) =>
    typeof value === 'number' &&
    value >= SPECIFICATION.MIN_SCREEN_SIZE &&
    value <= SPECIFICATION.MAX_SCREEN_SIZE,
  screenResolution: (value: string) =>
    typeof value === 'string' &&
    value.length >= SPECIFICATION.MIN_SCREEN_RESOLUTION_LENGTH &&
    value.length <= SPECIFICATION.MAX_SCREEN_RESOLUTION_LENGTH,
  displayType: (value: string) =>
    typeof value === 'string' &&
    value.length >= SPECIFICATION.MIN_DISPLAY_TYPE_LENGTH &&
    value.length <= SPECIFICATION.MAX_DISPLAY_TYPE_LENGTH,
  touchScreen: (value: boolean) => typeof value === 'boolean',
  processorBrand: (value: string) =>
    typeof value === 'string' && SPECIFICATION.PROCESSOR_BRANDS.includes(value),
  processorModel: (value: string) =>
    typeof value === 'string' &&
    value.length >= SPECIFICATION.MIN_PROCESSOR_MODEL_LENGTH &&
    value.length <= SPECIFICATION.MAX_PROCESSOR_MODEL_LENGTH,
  processorModelNumber: (value: string) =>
    typeof value === 'string' &&
    value.length >= SPECIFICATION.MIN_PROCESSOR_MODEL_NUMBER_LENGTH &&
    value.length <= SPECIFICATION.MAX_PROCESSOR_MODEL_NUMBER_LENGTH,
  storageType: (value: string) =>
    typeof value === 'string' && SPECIFICATION.STORAGE_TYPES.includes(value),
  storageCapacity: (value: number) =>
    typeof value === 'number' &&
    value >= SPECIFICATION.MIN_STORAGE_CAPACITY &&
    value <= SPECIFICATION.MAX_STORAGE_CAPACITY,
  systemMemory: (value: number) =>
    typeof value === 'number' &&
    value >= SPECIFICATION.MIN_SYSTEM_MEMORY &&
    value <= SPECIFICATION.MAX_SYSTEM_MEMORY,
  graphicsType: (value: string) =>
    typeof value === 'string' && SPECIFICATION.GRAPHICS_TYPES.includes(value),
  graphicsBrand: (value: string) =>
    typeof value === 'string' && SPECIFICATION.GRAPHICS_BRANDS.includes(value),
  graphicsModel: (value: number) =>
    typeof value === 'number' &&
    value >= SPECIFICATION.MIN_GRAPHICS_MODEL_LENGTH &&
    value <= SPECIFICATION.MAX_GRAPHICS_MODEL_LENGTH,
  operatingSystem: (value: string) =>
    typeof value === 'string' && SPECIFICATION.OPERATING_SYSTEMS.includes(value),
  voiceAssistant: (value: string) =>
    typeof value === 'string' && SPECIFICATION.VOICE_ASSISTANTS.includes(value),
  batteryType: (value: string) =>
    typeof value === 'string' && SPECIFICATION.BATTERY_TYPES.includes(value),
  backlitKeyboard: (value: boolean) => typeof value === 'boolean'
};
