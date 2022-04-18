interface Payment {
  orderId: number;
  id: number;
  status: string;
  update_time: string;
  email_address: string;
  payer: { [key: string]: string };
}

export default Payment;
