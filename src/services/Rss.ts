export interface RssItem {
    authors: any[]
    categories: any[]
    content?: string
    description?: string
    enclosures: any[]
    id: string
    itunes: any
    links: string[]
    published: Date
    title: string

}

export interface rssResponse {
    items: RssItem[]
}