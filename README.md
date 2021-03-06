#Site Healthcheck

A small CLI-tool for maintaining a healthy website.

The idea is to run different checks on your website and generate a report.

Your site's sitemap.xml is the base of all reports.

##How to install

Clone the repo

```
$ git clone git@github.com:telemark/utils-site-healthcheck.git
```

cd into the directory

```
$ cd utils-site-healthcheck
```

Install the dependencies

```
$ npm install
```

##Usage

Open your terminal and cd to the directory were this app is located.

Run this command with your settings

```
$ node index.js <url-to-sitemap> --report=<report>
```

<url-to-sitemap> needs to be complete with http:// and everything

Optionally pass in filename for report (defaults to report.csv)

```
$ node index.js <url-to-sitemap> --report=<report> --filename=<filename>
```

##Reports

Collection of reports

###Freshness
```
--report=Fresh
```

Generates a report with location of page and the number of days since it's last update.

###Health
```
--report=Health
```

Generates a report with location of page, it's status code and loadtime in milliseconds.

###Links
```
--report=Links
```

Generates a report with location of pages and links on that page.

###Dead links
```
--report=Deadlinks
```

Generates a report with location of page, the url with error and it's status code.

###HTML
```
--report=Html
```

Checks each page against the validator at [html5.validator.nu](http://html5.validator.nu).
Generates a report with location of page and either "Valid" or "Errors".

###WCAG
```
--report=Wcag
```

In order to use this report you must supply a Web Service ID from achecker.
You can register for free at [http://achecker.ca/](http://achecker.ca/)

The report will return location of page and number of error from validation towards WCAG 2.0 Level AA.

###Pagespeed
```
--report=Pagespeed
```

In order to use this report you must supply a valid APIKey from Google. You can obtain one form the cloud console [https://cloud.google.com/console](https://cloud.google.com/console)
You'll need to turn on the PageSpeed Insights API

The report will return location of page and the PageSpeed-score from Google.

###Metadata
```
--report=Meta
```

Collects title, meta description and meta keywords from every page.
The report returns a row with url for page, title, keywords and description i separate columns.

##Dependencies

These are the external modules used in this app.

###cheerio
Tiny, fast, and elegant implementation of core jQuery designed specifically for the server.
[npm](https://www.npmjs.org/package/cheerio) [GitHub](https://github.com/MatthewMueller/cheerio)

###html-validator
Validates html using validator.nu
[npm](https://www.npmjs.org/package/html-validator) [GitHub](https://github.com/zrrrzzt/html-validator)

###gpagespeed
Analyze a webpage with Google PageSpeed
[npm](https://www.npmjs.org/package/gpagespeed) [GitHub](https://github.com/zrrrzzt/gpagespeed)

###minimist
parse argument options
[npm](https://www.npmjs.org/package/minimist) [GitHub](https://github.com/substack/minimist)

###pagelt
Measure loadtime for a webpage
[npm](https://www.npmjs.org/package/pagelt) [GitHub](https://github.com/zrrrzzt/pagelt)

###request
Simplified HTTP request client.
[npm](https://www.npmjs.org/package/request) [GitHub](https://github.com/mikeal/request)

###valid-url
URI validation functions
[npm](https://www.npmjs.org/package/valid-url) [GitHub](https://github.com/ogt/valid-url)

###wcag-validator
Checks web accessibility for a webpage using achecker.ca
[npm](https://www.npmjs.org/package/wcag-validator) [GitHub](https://github.com/zrrrzzt/wcag-validator)

###xml2js
Simple XML to JavaScript object converter.
[npm](https://www.npmjs.org/package/xml2js) [GitHub](https://github.com/Leonidas-from-XIV/node-xml2js)
