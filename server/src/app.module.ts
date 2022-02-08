import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContactModule } from './contact/contact.module';
import { ProductModule } from './product/product.module';
import { MulterModule } from '@nestjs/platform-express';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [MulterModule.register({
    dest: './images',
  }),
  AuthModule, UsersModule, TypeOrmModule.forRoot(), ContactModule, ProductModule, AddressModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
