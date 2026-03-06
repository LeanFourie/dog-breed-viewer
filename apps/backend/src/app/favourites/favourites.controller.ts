import { Controller, Get, Post, Delete, Body } from '@nestjs/common'
import { FavouritesService } from './favourites.service'

@Controller('favourites')
export class FavouritesController {
    constructor(private readonly favouritesService: FavouritesService) {}

    @Get()
    getAll() {
        return this.favouritesService.getAll()
    }

    @Post()
    add(@Body('imageUrl') imageUrl: string) {
        return this.favouritesService.add(imageUrl)
    }

    @Delete()
    remove(@Body('imageUrl') imageUrl: string) {
        return this.favouritesService.remove(imageUrl)
    }
}
