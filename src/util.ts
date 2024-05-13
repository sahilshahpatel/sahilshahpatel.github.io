import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';

/***********************************/
/* Astro Assets imports            */
/***********************************/
const assetsManifest = {
    "projects": {
        folder: "/src/assets/images/projects",
        images: import.meta.glob<{ default: ImageMetadata }>("/src/assets/images/projects/*.{jpg,jpeg,png,gif,webp}"),
    },
    "abroad": {
        folder: "/src/assets/images/abroad",
        images: import.meta.glob<{ default: ImageMetadata }>("/src/assets/images/abroad/*.{jpg,jpeg,png,gif,webp}"),
    },
    "jobs": {
        folder: "/src/assets/images/logos",
        images: import.meta.glob<{default: ImageMetadata }>("/src/assets/images/logos/*.{jpg,jpeg,png,gif,webp}"),
    },
    "collections": {
        folder: "/src/assets/images/collections",
        images: import.meta.glob<{default: ImageMetadata }>("/src/assets/images/collections/*.{jpg,jpeg,png,gif,webp}"),
    }
}

export async function getImage(collection: keyof typeof assetsManifest, basename: string) {
    const manifest = assetsManifest[collection];
    const path = `${manifest.folder}/${basename}`;
    const imgFunc = manifest.images[path];
    if (!imgFunc) throw Error(`Unable to find image at ${path}`);
    const img = await imgFunc();
    return img.default;
}


/***********************************/
/* Sorting functions               */
/***********************************/
interface OrderedCollectionItem {
    data: { order: number }
};
export function orderSort<T extends OrderedCollectionItem>(list: T[]) {
    return list.sort((a, b) => b.data.order - a.data.order)
}

interface DatedCollectionItem {
    data: { date: Date }
}
export function dateSort<T extends DatedCollectionItem>(list: T[]) {
    return list.sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
}


/***********************************/
/* Review item thumbnail functions */
/***********************************/

export async function getReviewItemThumbnail(item: CollectionEntry<"reviews">["data"]): Promise<string> {
    // TODO: Implement functions for all cases
    switch (item.type){
        case "book":        return getImgFromIsbn(item.isbn!);
        case "video game":  return getImgFromSteamAppId(item.steamAppId!);
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