import { MDXInstance } from "astro";
import { ReviewData } from "./types";

export function getFilename(filepath: string): string {
    return filepath.split('\\').pop().split('/').pop();
}

export function getSlug(filepath: string): string {
    const name = getFilename(filepath);
    return name.substring(0, name.indexOf('.'));
}

interface Ordered { order: number; }
export function orderSort(list: MDXInstance<Ordered>[]){
    return list.sort((a, b) => b.frontmatter.order - a.frontmatter.order)
}

interface Dated { date: Date; }
export function dateSort(list: MDXInstance<Dated>[]) {
    return list.sort((a, b) => (new Date(a.frontmatter.date) - new Date(b.frontmatter.date)))
}


/***********************************/
/* Review item thumbnail functions */
/***********************************/

export async function getReviewItemThumbnail(item: ReviewData): Promise<string> {
    // TODO: Implement functions for all cases
    switch (item.type){
        case "book":        return getImgFromIsbn(item.isbn);
        case "video game":  return getImgFromSteamAppId(item.steamAppId);
        default:
            console.log(`WARNING: Unable to get thumbnail for media type ${item.type} (for ${item.title})`)
            return "";
    }
}

async function getImgFromIsbn(isbn: string): Promise<string> {
    const googleBooksUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
    const _response = await fetch(googleBooksUrl)
    const response = await _response.json()

    if (response.items.length != 1) {
        throw Error("Google Books isbn queries should only return one result!")
    }
    if (response.items[0].volumeInfo.imageLinks == undefined){
        throw Error("Google Books query returned no images!")
    }

    return response.items[0].volumeInfo.imageLinks.thumbnail;
}

function getImgFromSteamAppId(id: string): string {
    // TODO: This is a hack which may not work for all games
    return `https://steamcdn-a.akamaihd.net/steam/apps/${id}/library_600x900_2x.jpg`
}