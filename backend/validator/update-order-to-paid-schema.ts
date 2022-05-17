export default {
  id: (value: number) => typeof value === 'string',
  status: (value: string) => typeof value === 'string',
  update_time: (value: string) => typeof value === 'string',
  payer: (value: { [key: string]: string | {} }) =>
    Object.values(value).every((item) => typeof item === 'string' || 'object')
};
