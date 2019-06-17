export interface RssItem {
    authors: any[]
    categories: any[]
    content?: string
    description?: string
    enclosures: any[]
    id: string
    itunes: any
    links: RssLinkType[]
    published: Date
    title: string

}

export interface RssLinkType {
    url: string
}

export interface RssResponse {
    items: RssItem[]
}