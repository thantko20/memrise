import { Controller, Get } from '@nestjs/common';
import { contract } from '@server/contract';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';

@Controller()
export class TestController {
  @TsRestHandler(contract.hello.sayHello)
  sayHello() {
    return tsRestHandler(contract.hello.sayHello, async () => {
      return {
        status: 200,
        body: {
          message: 'hello',
        },
      };
    });
  }
}
