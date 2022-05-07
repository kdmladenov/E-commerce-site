import EndpointType from '../EndpointType';
// import FormInputDataType from '../FormInputDataType';

interface SidebarProps {
  endpoint: EndpointType;
  setEndpoint: Dispatch<SetStateAction<EndpointType>>;
  resourceName:string;
  // inputMap: {
  //   [key: string]: { label: string; value: string; type: string; accordionOpen?: boolean }[];
  // };
  defaultEndpoint: EndpointType;
}
export default SidebarProps;
