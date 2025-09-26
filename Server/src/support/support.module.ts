// src/modules/support/support.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupportService } from './support.service';
import { SupportController } from './support.controller';
import { SupportTicket } from './entities/support-ticket.entity';
import { SupportTicketResponse } from './entities/support-ticket-response.entity';
import { UsersModule } from '../users/users.module';
import { EmailModule } from '../../common/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupportTicket, SupportTicketResponse]),
    forwardRef(() => UsersModule),
    EmailModule,
  ],
  controllers: [SupportController],
  providers: [SupportService],
  exports: [SupportService, TypeOrmModule],
})
export class SupportModule {}