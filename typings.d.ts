/**
 * iTunes typings
 */
declare namespace iTunes {
  interface Response {
    results: Podcast[];
  }
  interface Podcast {
    /**
     * Podcast author name
     */
    artistName: string;
    /**
     * Podcast cover art 100x100 size
     */
    artworkUrl100: string;
    /**
     * Podcast cover art 600x600 size
     */
    artworkUrl600: string;
    /**
     * Censored Podcast name
     */
    collectionCensoredName: string;
    /**
     * Explicit status
     */
    collectionExplicitness: 'explicit' | 'cleaned' | 'notExplicit';
    /**
     * Podcast ID
     */
    collectionId: number;
    /**
     * Podcast name
     */
    collectionName: string;
    /**
     * iTunes URL
     */
    collectionViewUrl: string;
    /**
     * RSS feed url
     */
    feedUrl: string;
    /**
     * Podcast categories list numeric string ids
     */
    genreIds: string[];
    /**
     * Podcast categories list
     */
    genres: string[];
    /**
     * Entity type must always be `podcast`
     */
    kind: 'podcast';
    /**
     * Primary category
     */
    primaryGenreName: string;
    /**
     * ISO Release date
     */
    releaseDate: string;
    /**
     * Episodes count
     */
    trackCount: number;
  }
}