export interface LinkData {
    href: string
    text: string
}

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

export interface ReviewData {
    title: string
    slug: string
    updated: Date
    type: "book" | "movie" | "video game" | "board game" | "short story"
    tier: "S" | "A" | "B" | "C" | "D" | "F"
    tierModifier?: "+" | "-"
    tierAsterisk?: "nostalgia"
    tags: ("fantasy" | "sci-fi" | "realistic fiction")[]

    // Identifiers
    isbn?: string             // for books (see https://stackoverflow.com/questions/14422528/how-to-get-book-cover-from-isbn-using-google-book-api)
    tmdbId?: string           // for movies (TMDB: https://www.themoviedb.org/)
    steamAppId?: string       // for Steam video games (https://www.steamgriddb.com/api/v2)
    boardGameGeeksId?: string // for board games (https://boardgamegeek.com/thread/1647993/api-there-way-get-more-images-game-thing)

    // Other metadata
    author?: string
    series?: string
}