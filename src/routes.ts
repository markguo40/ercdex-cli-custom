/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { WalletController } from './controllers/wallet-controller';

const models: TsoaRoute.Models = {
};

export function RegisterRoutes(app: any) {
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
