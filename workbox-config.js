module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{json,html,js,css}"
  ],
  "swDest": "build\\sw.js",
  "swSrc":"src/sw.js",
  "injectionPointRegexp": /(const precacheManifest = )\[\](;)/
};

