/*
 * Local replacement for the `idiom.js` npm package (v1.0.1, MIT,
 * Fabio Soares <fabioars@live.com>, https://github.com/fabioars/idiom.js).
 *
 * Vendored rather than installed because the published package declares
 * `babel-preset-env@^1.7.0` as a *runtime* dependency, which drags the
 * deprecated Babel 6 toolchain -- and ~20 critical advisories with it,
 * including the babel-traverse arbitrary-code-execution one -- into the
 * install tree. The package's own entry point is pre-compiled, so Babel is
 * never invoked at runtime; the dependency is purely an upstream packaging
 * mistake with no fix available.
 *
 * The public API is unchanged.
 */

const idiom = (languages) => {
  if (!languages.default) {
    throw new Error('[idiom.js] You need to set a default language');
  }

  return (currentLang = 'default') => ({
    get currentLanguage() {
      return !languages[currentLang] ? 'default' : currentLang;
    },

    get languages() {
      return Object.keys(languages);
    },

    extends(lib, name = this.currentLanguage) {
      /* eslint-disable-next-line no-param-reassign */
      languages[name] = languages[name] ? {
        ...languages[name], ...lib,
      } : {
        ...lib,
      };
    },

    text(key) {
      const lib = languages[this.currentLanguage];

      if (!lib[key]) {
        throw new Error(`[idiom.js] Any match for key: '${key}'.`);
      }

      return lib[key];
    },
  });
};

export default idiom;
