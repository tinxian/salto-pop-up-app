export interface EventType {
    id: string
    name: string
    featured: boolean
    organisation: string
    slug: string
    type: EventKind // radio or tv
    channels: ChannelType[]
    description: string
    website: string
    contact: string
    phone: string
    youtube: string
    facebook: string
    instagramL: string
    twitter: string
    logo: string
    thumbnail: string
    poster: string
    artwork: string
}

export interface ChannelType {
    id: string
}

export enum EventKind {
    radio = 'radio',
    tv = 'tv'
}