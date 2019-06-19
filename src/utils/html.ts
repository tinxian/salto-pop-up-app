const selectHtmlTagsRegex = /<[^>]*>/g

export function removeHtmlTagsFromString(content: string) {
    return content.replace(selectHtmlTagsRegex, '')
}