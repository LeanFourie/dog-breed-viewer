import { Injectable, InternalServerErrorException } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class FavouritesService {
    // #region - Variables (Private)
    private readonly filePath = path.join(
        process.cwd(),
        'apps/backend/src/app/favourites/favourites.json'
    )
    // #endregion

    // #region - Methods (Private)
    /**
     * Saves the favourites list to the favourites.json file.
     * @param favourites The list of favourite image URLs to save.
     */
    private save(favourites: string[]) {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(favourites, null, 2))
        } catch (error) {
            console.error('Error writing favourites file:', error)
            throw new InternalServerErrorException('Could not save favourites')
        }
    }
    // #endregion

    // #region - Methods (Public)
    /**
     * Reads the favourites.json file and returns the list of favourite image URLs.
     * @returns A list of favourite image URLs.
     */
    getAll(): string[] {
        try {
            if (!fs.existsSync(this.filePath)) {
                return []
            }
            const data = fs.readFileSync(this.filePath, 'utf8')
            return JSON.parse(data)
        } catch (error) {
            console.error('Error reading favourites file:', error)
            throw new InternalServerErrorException('Could not read favourites')
        }
    }
    /**
     * Adds an image URL to the favourites list.
     * @param imageUrl The image URL to add.
     * @returns The updated list of favourite image URLs.
     */
    add(imageUrl: string): string[] {
        const favourites = this.getAll()
        if (!favourites.includes(imageUrl)) {
            favourites.push(imageUrl)
            this.save(favourites)
        }
        return favourites
    }
    /**
     * Removes an image URL from the favourites list.
     * @param imageUrl The image URL to remove.
     * @returns The updated list of favourite image URLs.
     */
    remove(imageUrl: string): string[] {
        let favourites = this.getAll()
        favourites = favourites.filter((url) => url !== imageUrl)
        this.save(favourites)
        return favourites
    }
}
