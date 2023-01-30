// Interface for an Abroad item's frontmatter
export interface AbroadData {
    order: number
    what: string
    where: string
    when: string
    img: string
    imgPos?: string
}

export interface JobData {
    order: number
    company: string
    logo: string
    position: string
    timeframe: string
    summary: string
}

export interface ProjectLinks {
    demo?: string
    github?: string
    report?: string
}

export interface ProjectData {
    order: number
    title: string
    category: string
    img: string
    imgPos?: string
    gif?: string
    links: ProjectLinks
    description: string
}