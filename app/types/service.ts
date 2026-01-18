export interface IService {
  id: string;
  clientName: string;
  userCode: string;
  description: string;
  deliveryDate: Date;
  isFinished: boolean;
  workerName: string;
  budget: {
    id: string;
    status: string;
    price: number;
  };
}
