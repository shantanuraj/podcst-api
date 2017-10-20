/**
 * Podcast parsing utilities
 */

'use strict';

import { parse } from 'url';

/**
 * Extract base link from a url
 */
export const extractBaseLink = (url: string): string | null => {
  const parsed = parse(url);
  if (!parsed) {
    return null;
  }
  const { protocol, host } = parsed;
  return `${protocol}//${host}`;
};

/**
 * Style attribute regex
 */
const STYLE_ATTR_REGEX = /style="[^\"]*"/g;

/**
 * Reformat show notes to strip out custom styles
 */
export const reformatShowNotes = (notes: string) => {
  const reformattedNotes = notes
    .replace(STYLE_ATTR_REGEX, '');

  return reformattedNotes;
}

/**
 * Show notes count comparator
 */
export const showNotesSorter = (a: string, b: string) => (a.length - b.length);
