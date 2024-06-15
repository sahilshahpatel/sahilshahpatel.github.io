import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { imageMetadata } from 'astro/assets/utils';

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
    "reviews": {
        folder: "/src/assets/images/reviews",
        images: import.meta.glob<{default: ImageMetadata}>("/src/assets/images/reviews/*.{jpg,jpeg,png,gif,webp}"),
    },
    "collections": {
        folder: "/src/assets/images/collections",
        images: import.meta.glob<{default: ImageMetadata }>("/src/assets/images/collections/*.{jpg,jpeg,png,gif,webp}"),
    }
}

export async function getImage(collection: keyof typeof assetsManifest, basename: string, findExtension: boolean = false) {
    const manifest = assetsManifest[collection];
    let path = `${manifest.folder}/${basename}`;

    if (findExtension) {
        Object.keys(manifest.images).forEach(key => {
            if (key.startsWith(path)) {
                path = key;
            }
        })
    }

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
    return list.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
