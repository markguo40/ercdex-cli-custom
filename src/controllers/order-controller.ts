import { Body, Post, Route, Tags } from 'tsoa';
import { IFillReceipt, IOrder } from '../internal-aqueduct-types';
import { ServerError } from '../server-error';
import { CancelOrderService } from '../services/orders/cancel-order-service';
import { CreateOrderService, ICreateOrderArgs } from '../services/orders/create-order-service';
import { FillOrdersService, IFillOrdersParams } from '../services/orders/fill-orders-service';

@Route('order')
export class OrderController {
  /**
   * Create a new order
   */
  @Post('create')
  @Tags('Order')
  public async CreateOrder(@Body() params: ICreateOrderArgs): Promise<IOrder> {
    try {
      const order = await new CreateOrderService().create(params);
      return order;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  /**
   * Cancel an existing order
   */
  @Post('cancel/{orderHash}')
  @Tags('Order')
  public async CancelOrder(orderHash: string) {
    try {
      const successMsg = await new CancelOrderService().cancel({
        orderHash
      });
      return successMsg;
    } catch (err) {
      throw new ServerError(err.message);
    }
  }

  @Post('fill')
  @Tags('Order')
  public async FillOrder(@Body() request: IFillOrdersParams): Promise<IFillReceipt> {
    try {
      return await new FillOrdersService().fillOrders(request);
    } catch (err) {
      throw new ServerError(err.message);
    }
  }
}
