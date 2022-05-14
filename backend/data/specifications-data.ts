import db from './pool.js';
import rolesEnum from '../constants/roles.enum.js';
import SpecificationType from '../models/SpecificationType.js';
import RolesType from '../models/RolesType.js';

const getBy = async (column: string, value: string | number, role: RolesType = 'basic') => {
  const sql = `
    SELECT 
      product_id as productId,
      specification_id as specificationId,
      screen_size as screenSize,
      screen_resolution as screenResolution,
      display_type as displayType,
      touch_screen as touchScreen,
      processor_brand as processorBrand,
      processor_model as processorModel,
      processor_model_number as processorModelNumber,
      storage_type as storageType,
      storage_capacity as storageCapacity,
      system_memory as systemMemory,
      graphics_type as graphicsType,
      graphics_brand as graphicsBrand,
      graphics_model as graphicsModel,
      operating_system as operatingSystem,
      voice_assistant as voiceAssistant,
      battery_type as batteryType,
      backlit_keyboard as backlitKeyboard
    FROM specifications 
    WHERE ${column} = ? ${role === rolesEnum.basic ? ' AND is_deleted = 0' : ''};
  `;

  const result = await db.query(sql, [value]);
  return result[0];
};

const create = async (productId: number, data: SpecificationType) => {
  const sql = `
    INSERT INTO specifications (
      product_id,
      screen_size,
      screen_resolution,
      display_type,
      touch_screen,
      processor_brand,
      processor_model,
      processor_model_number,
      storage_type,
      storage_capacity,
      system_memory,
      graphics_type,
      graphics_brand,
      graphics_model,
      operating_system,
      voice_assistant,
      battery_type,
      backlit_keyboard
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const result = await db.query(sql, [
    +productId,
    data.screenSize,
    data.screenResolution,
    data.displayType,
    data.touchScreen,
    data.processorBrand,
    data.processorModel,
    data.processorModelNumber,
    data.storageType,
    data.storageCapacity,
    data.systemMemory,
    data.graphicsType,
    data.graphicsBrand,
    data.graphicsModel,
    data.operatingSystem,
    data.voiceAssistant,
    data.batteryType,
    data.backlitKeyboard
  ]);

  return getBy('specification_id', result.insertId, 'admin');
};

const update = async (specificationId: number, updatedSpecification: SpecificationType) => {
  console.log(updatedSpecification, 'updatedSpecificationb');
  console.log(+specificationId, 'specificationId');
  const sql = `
        UPDATE specifications
        SET
          screen_size = ?,
          screen_resolution = ?,
          display_type = ?,
          touch_screen = ?,
          processor_brand = ?,
          processor_model = ?,
          processor_model_number = ?,
          storage_type = ?,
          storage_capacity = ?,
          system_memory = ?,
          graphics_type = ?,
          graphics_brand = ?,
          graphics_model = ?,
          operating_system = ?,
          voice_assistant = ?,
          battery_type = ?,
          backlit_keyboard = ?
        WHERE specification_id = ?
    `;

  await db.query(sql, [
    +updatedSpecification.screenSize,
    updatedSpecification.screenResolution,
    updatedSpecification.displayType,
    +updatedSpecification.touchScreen,
    updatedSpecification.processorBrand,
    updatedSpecification.processorModel,
    updatedSpecification.processorModelNumber,
    updatedSpecification.storageType,
    +updatedSpecification.storageCapacity,
    +updatedSpecification.systemMemory,
    updatedSpecification.graphicsType,
    updatedSpecification.graphicsBrand,
    updatedSpecification.graphicsModel,
    updatedSpecification.operatingSystem,
    updatedSpecification.voiceAssistant,
    updatedSpecification.batteryType,
    +updatedSpecification.backlitKeyboard,
    +specificationId
  ]);

  return getBy('specification_id', +specificationId, 'admin');
};

const remove = async (specificationData: SpecificationType) => {
  const sql = `
        UPDATE specifications 
        SET is_deleted = true
        WHERE specification_id = ?
    `;

  return db.query(sql, [specificationData.specificationId]);
};

export default {
  getBy,
  create,
  update,
  remove
};
