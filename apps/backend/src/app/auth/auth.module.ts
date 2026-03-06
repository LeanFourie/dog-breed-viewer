import { Module } from '@nestjs/common'
import { AuthController } from './aut.controller'

@Module({
    controllers: [AuthController],
    providers: [],
})
export class AuthModule {}
