import SpecificationType from './SpecificationType';

interface SpecificationsData {
  getBy: (column: string, value: string | number, role?: RolesType) => Promise<SpecificationType>;
  create: (productId: number, data: SpecificationType) => Promise<SpecificationType>;
  update: (
    specificationId: number,
    updatedSpecification: SpecificationType
  ) => Promise<SpecificationType>;
  remove: (specificationData: SpecificationType) => Promise<any>;
}
export default SpecificationsData;
