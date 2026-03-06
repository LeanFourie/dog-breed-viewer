import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { FavouritesModule } from './favourites/favourites.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        FavouritesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
