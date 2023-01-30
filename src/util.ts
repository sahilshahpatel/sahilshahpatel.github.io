import { MDXInstance } from "astro";

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