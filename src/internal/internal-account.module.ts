import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InternalAccountService } from 'src/internal/internal-account.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [InternalAccountService],
  exports: [InternalAccountService],
})
export class InternalAccountModule {}
