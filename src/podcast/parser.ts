/**
 * Helpers
 */

'use strict';

import {
  parse as parseURL,
  resolve,
} from 'url';

import {
  Parser,
} from 'xml2js';

import {
  extractBaseLink,
  reformatShowNotes,
} from './utils';

/**
 * Read itunes file prop
 */
const readFile = (file) => ({
  ...file,
  length: parseInt(file.length, 10),
});

/**
 * Read data from json
 */
const readDate = (ctx): number | null => {
  const data = ctx.pubDate || ctx.lastBuildDate;
  return data ? +(new Date(data[0])) : null;
};

/**
 * Read summary from json
 */
const readSummary = (ctx): string | null => {
  const data = ctx['itunes:summary'] || ctx['itunes:subtitle'];
  return Array.isArray(data) ? data[0].trim() : null;
};

/**
 * Read description from json
 */
const readDescription = (ctx): string => {
  return (
    (Array.isArray(ctx.description) && (ctx.description[0] || '').trim()) ||
    readSummary(ctx) ||
    ''
  );
}

/**
 * Map of index position to number of miliseconds
 */
const indexToSecondsMap = {
  0: 1,
  1: 60,
  2: 60 * 60,
};

/**
 * Read duration from json
 */
const readDuration = (ctx: object): number | null => {
  const _data = ctx['itunes:duration'];
  if (!_data) {
    return null;
  }
  const data = _data[0];
  if (data.indexOf(':') === -1) {
    return parseInt(data, 10);
  }
  const vals = data.split(':').map(e => parseInt(e, 10)).reverse();
  return vals.reduce((acc, val, i) => acc + (val * indexToSecondsMap[i]), 0);
};

/**
 * Read explicit status from json
 */
const readExplicit = (ctx: object): boolean => {
  const data = ctx['itunes:explicit'];
  if (!Array.isArray(data)) {
    return false;
  }
  switch(data[0]) {
    case "no":
    case "clean":
      return false;
    case "yes":
      return true;
    default:
      return false;
  }
};

/**
 * Read episode artwork if present
 */
const readEpisodeArtwork = (ctx: object): string | null => {
  try {
    const url = ctx['media:content'][0]['$'].url;
    const type: string | null = (
      ctx['media:content'][0] &&
      ctx['media:content'][0]['$'] &&
      ctx['media:content'][0]['$'].type
    ) || null;

    if (type && type.includes('image')) {
      return url;
    } else {
      return null;
    }
  } catch(err) {
    return null;
  }
}

/**
 * Read keywords from json
 */
const readKeywords = (ctx: object): string[] => {
  const data = ctx['itunes:keywords'];
  if (!Array.isArray(data)) {
    return [];
  }
  return data[0].split(',').map(e => e.trim());
};

/**
 * Read show notes
 */
const readShowNotes = (ctx: object): string => {
  const description = (Array.isArray(ctx['description']) && ctx['description'][0]) || '';
  const contentEncoded = (Array.isArray(ctx['content:encoded']) && ctx['content:encoded'][0]) || '';
  const summary = readSummary(ctx) || '';
  return reformatShowNotes(description || contentEncoded || summary).trim();
};

/**
 * Read cover
 */
const readCover = (ctx, baseLink?: string | null): string | null => {
  try {
    const data = ctx['itunes:image'];
    const link = data[0]['$']['href'];
    if (baseLink && parseURL(link).host === null) {
      return resolve(baseLink, link);
    }
    return link;
  } catch (err) {
    return null;
  }
};

/**
 * Read link
 */
const readLink = (ctx): string | null => {
  const link = Array. isArray(ctx.link) ? ctx.link[0] as string : null;
  return link || ctx['guid'][0]['_'];
}

/**
 * Adapt episode json to formatted one
 */
const adaptEpisode = (item, fallbackCover: string, fallbackAuthor: string): App.Episode | null => {
  if (!item['enclosure']) {
    return null;
  }

  const link = readLink(item);

  return ({
    title: item.title[0] as string,
    summary: readSummary(item),
    published: readDate(item),
    cover: readCover(item, link) || fallbackCover,
    explicit: readExplicit(item),
    duration: readDuration(item),
    link,
    file: readFile(item['enclosure'][0]['$']),
    author: (Array.isArray(item['itunes:author']) ? item['itunes:author'][0] as string : null) || fallbackAuthor,
    episodeArt: readEpisodeArtwork(item),
    showNotes: readShowNotes(item),
  });
}

/**
 * Helper funciton to parse xml to json via promises
 */
export const xmlToJSON = (xml: string) => {
  return new Promise((resolve, reject) => {
    const { parseString } = new Parser();
    parseString(xml, (err, res) => err ? reject(err) : resolve(res));
  });
}

/**
 * Adapt json to better format
 */
export const adaptJSON = (json): App.EpisodeListing | null => {
  try {
    const channel = json.rss.channel[0];
    const cover = readCover(channel) as string;
    const author = channel['itunes:author'][0];
    return {
      title: channel.title[0].trim(),
      link: channel.link[0],
      published: readDate(channel),
      description: readDescription(channel),
      author: author,
      cover: cover,
      keywords: readKeywords(channel),
      explicit: readExplicit(channel),
      episodes: channel['item']
        .map(e => adaptEpisode(e, cover, author))
        .filter(e => e !== null),
    };
  } catch(err) {
    console.log(err);
    return null;
  }
}

/**
 * Adapt xml to cleaned up json
 */
export const adaptFeed = async (xml: string) => xmlToJSON(xml).then(adaptJSON);
