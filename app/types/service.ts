export interface IService {
  id: string;
  clientName: string;
  userCode: string;
  description: string;
  deliveryDate: Date;
  isFinished: boolean;
  workerName: string;
  ownerId: string;
  budget: {
    id: string;
    status: string;
    price: number;
  };
}

export interface IUpdateService {
  description: string;
  deliveryDate: string;
}
