'use strict';

const request = require('sync-request');
const cheerio = require('cheerio');

module.exports = url => {
  const response = request('GET', url);

  try {
    const body = response.getBody();
  } catch (err) {
    console.error(err);

    return null;
  }

  const $ = cheerio.load(response.getBody());
  const title = $('head title').text();

  const meta = { 'title': title };
  $('head meta').each((index, node) => {
    let key = $(node).attr('property') ? $(node).attr('property') : $(node).attr('name') ? $(node).attr('name') : null;
    let value = $(node).attr('content');

    if (key) {
      meta[key] = value;
    }
  });

  return meta;
};