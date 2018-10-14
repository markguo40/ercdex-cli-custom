/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { AllowanceController } from './controllers/allowance-controller';
import { OrderController } from './controllers/order-controller';
import { WalletController } from './controllers/wallet-controller';

const models: TsoaRoute.Models = {
  "IOrder": {
    "properties": {
      "id": { "dataType": "double", "required": true },
      "dateCreated": { "dataType": "datetime", "required": true },
      "dateUpdated": { "dataType": "datetime", "required": true },
      "dateClosed": { "dataType": "datetime" },
      "exchangeAddress": { "dataType": "string", "required": true },
      "expirationTimeSeconds": { "dataType": "string", "required": true },
      "feeRecipientAddress": { "dataType": "string", "required": true },
      "makerAddress": { "dataType": "string", "required": true },
      "makerFee": { "dataType": "string", "required": true },
      "makerAssetAddress": { "dataType": "string", "required": true },
      "makerAssetData": { "dataType": "string", "required": true },
      "takerAssetData": { "dataType": "string", "required": true },
      "makerAssetAmount": { "dataType": "string", "required": true },
      "salt": { "dataType": "string", "required": true },
      "signature": { "dataType": "string", "required": true },
      "takerAddress": { "dataType": "string", "required": true },
      "takerFee": { "dataType": "string", "required": true },
      "takerAssetAddress": { "dataType": "string", "required": true },
      "takerAssetAmount": { "dataType": "string", "required": true },
      "remainingFillableTakerAmount": { "dataType": "string", "required": true },
      "remainingFillableMakerAmount": { "dataType": "string", "required": true },
      "orderHash": { "dataType": "string", "required": true },
      "accountId": { "dataType": "double" },
      "state": { "dataType": "double", "required": true },
      "price": { "dataType": "string", "required": true },
      "senderAddress": { "dataType": "string", "required": true },
      "system": { "dataType": "boolean", "required": true },
    },
  },
  "ICreateOrderArgs": {
    "properties": {
      "baseSymbol": { "dataType": "string", "required": true },
      "quoteSymbol": { "dataType": "string", "required": true },
      "side": { "dataType": "enum", "enums": ["buy", "sell"], "required": true },
      "quantity": { "dataType": "string", "required": true },
      "price": { "dataType": "string", "required": true },
      "expirationTimestamp": { "dataType": "string", "required": true },
    },
  },
  "IFillReceiptLog": {
    "properties": {
      "id": { "dataType": "double", "required": true },
      "dateCreated": { "dataType": "datetime", "required": true },
      "dateUpdated": { "dataType": "datetime", "required": true },
      "orderId": { "dataType": "double", "required": true },
      "receiptId": { "dataType": "double", "required": true },
      "takerAmount": { "dataType": "string", "required": true },
      "makerAddress": { "dataType": "string", "required": true },
      "isFeeOrder": { "dataType": "boolean", "required": true },
    },
  },
  "IFillReceipt": {
    "properties": {
      "id": { "dataType": "double", "required": true },
      "dateCreated": { "dataType": "datetime", "required": true },
      "dateUpdated": { "dataType": "datetime", "required": true },
      "txHash": { "dataType": "string", "required": true },
      "taker": { "dataType": "string", "required": true },
      "status": { "dataType": "string", "required": true },
      "side": { "dataType": "string", "required": true },
      "takerAmount": { "dataType": "string", "required": true },
      "makerAmount": { "dataType": "string", "required": true },
      "price": { "dataType": "string", "required": true },
      "baseAssetAddress": { "dataType": "string", "required": true },
      "baseSymbol": { "dataType": "string", "required": true },
      "quoteSymbol": { "dataType": "string", "required": true },
      "quoteAssetAddress": { "dataType": "string", "required": true },
      "feeAmount": { "dataType": "string", "required": true },
      "feeAssetAddress": { "dataType": "string", "required": true },
      "logs": { "dataType": "array", "array": { "ref": "IFillReceiptLog" }, "required": true },
    },
  },
  "IFillOrdersParams": {
    "properties": {
      "data": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
    },
  },
};

export function RegisterRoutes(app: any) {
  app.get('/api/wallet/allowances',
    function(request: any, response: any, next: any) {
      const args = {
        tokenAddress: { "in": "query", "name": "tokenAddress", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new AllowanceController();


      const promise = controller.GetAllowance.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/api/wallet/allowances/unlimited',
    function(request: any, response: any, next: any) {
      const args = {
        tokenAddress: { "in": "query", "name": "tokenAddress", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new AllowanceController();


      const promise = controller.SetUnlimitedAllowance.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/api/wallet/allowances/remove',
    function(request: any, response: any, next: any) {
      const args = {
        tokenAddress: { "in": "query", "name": "tokenAddress", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new AllowanceController();


      const promise = controller.RemoveAllowance.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/api/wallet/allowances/set',
    function(request: any, response: any, next: any) {
      const args = {
        tokenAddress: { "in": "query", "name": "tokenAddress", "required": true, "dataType": "string" },
        value: { "in": "query", "name": "value", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new AllowanceController();


      const promise = controller.SetAllowance.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/api/order/create',
    function(request: any, response: any, next: any) {
      const args = {
        params: { "in": "body", "name": "params", "required": true, "ref": "ICreateOrderArgs" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new OrderController();


      const promise = controller.CreateOrder.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/api/order/cancel/:orderHash',
    function(request: any, response: any, next: any) {
      const args = {
        orderHash: { "in": "path", "name": "orderHash", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new OrderController();


      const promise = controller.CancelOrder.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/api/order/fill',
    function(request: any, response: any, next: any) {
      const args = {
        request: { "in": "body", "name": "request", "required": true, "ref": "IFillOrdersParams" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new OrderController();


      const promise = controller.FillOrder.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/wallet/account',
    function(request: any, response: any, next: any) {
      const args = {
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new WalletController();


      const promise = controller.GetAccount.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/wallet/balance',
    function(request: any, response: any, next: any) {
      const args = {
        tokenAddress: { "in": "query", "name": "tokenAddress", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new WalletController();


      const promise = controller.GetBalance.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/api/wallet/wrap_ether',
    function(request: any, response: any, next: any) {
      const args = {
        amount: { "in": "query", "name": "amount", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new WalletController();


      const promise = controller.WrapEther.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/api/wallet/unwrap_ether',
    function(request: any, response: any, next: any) {
      const args = {
        amount: { "in": "query", "name": "amount", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new WalletController();


      const promise = controller.UnwrapEther.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });

  app.post('/api/wallet/sendtoken',
    function(request: any, response: any, next: any) {
      const args = {
        tokenAddress: { "in": "query", "name": "tokenAddress", "required": true, "dataType": "string" },
        amount: { "in": "query", "name": "amount", "required": true, "dataType": "string" },
        to: { "in": "query", "name": "to", "required": true, "dataType": "string" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new WalletController();


      const promise = controller.SendToken.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });

  app.get('/api/wallet/ether_balance',
    function(request: any, response: any, next: any) {
      const args = {
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new WalletController();


      const promise = controller.GetEtherBalance.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });


  function isController(object: any): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode;
        if (isController(controllerObj)) {
          const headers = controllerObj.getHeaders();
          Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
          });

          statusCode = controllerObj.getStatus();
        }

        if (data || data === false) { // === false allows boolean result
          response.status(statusCode || 200).json(data);
        } else {
          response.status(statusCode || 204).end();
        }
      })
      .catch((error: any) => next(error));
  }

  function getValidatedArgs(args: any, request: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
        case 'path':
          return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
        case 'header':
          return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
        case 'body':
          return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
        case 'body-prop':
          return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
      }
    });
    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }
    return values;
  }
}
