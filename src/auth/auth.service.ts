import { Injectable } from '@nestjs/common';
import { SingleSignOnToken } from './entities/single-sign-on-token.entity';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';

// https://dev.to/bwanicur/oauth2-authorization-grant-flow-for-single-page-apps-53oc

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(SingleSignOnToken)
    private readonly singleSignOnTokenRepository: Repository<SingleSignOnToken>,
  ) {}

  async createToken(data: any): Promise<SingleSignOnToken> {
    const token: SingleSignOnToken = {
      id: uuid.v4(),
      data: JSON.stringify(data),
    };

    await this.singleSignOnTokenRepository.save(token);

    return token;
  }

  async consumeToken(id: string): Promise<SingleSignOnToken> {
    const token = this.singleSignOnTokenRepository.findOneOrFail(id);
    await this.singleSignOnTokenRepository.delete(id);

    return token;
  }
}
