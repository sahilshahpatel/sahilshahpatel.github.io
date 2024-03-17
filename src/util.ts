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



/***********************************/
/* Review item thumbnail functions */
/***********************************/

export async function getReviewItemThumbnail(item: ReviewData): Promise<string> {
    // TODO: This function should check which type of media this is and call the
    // correct helper
    if (item.isbn == undefined) return "";
    return getImgFromIsbn(item.isbn);
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