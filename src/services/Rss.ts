export interface RssItem {
    content: string
    date: Date
    title: string
    url: string
}

export interface RssLinkType {
    url: string
}

export interface RssResponse {
    items: RssItem[]
}