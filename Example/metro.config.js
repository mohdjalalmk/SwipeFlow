const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const root = path.resolve(__dirname, '..');

// Helper to create a RegExp for excluding specific packages
function createRegExp(pkg) {
  return new RegExp(`^${escape(path.join(root, 'node_modules', pkg))}\\/.*$`);
}

// Helper to map packages to their local paths
function createPkgEntry(pkg) {
  return {
    [pkg]: path.join(__dirname, 'node_modules', pkg),
  };
}

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  watchFolders: [root], // Allow Metro to watch files in the parent directory

  resolver: {
    blacklistRE: exclusionList([
      createRegExp('react-native'),
      createRegExp('react'),
    ]), // Exclude duplicate module resolutions

    extraNodeModules: {
      ...createPkgEntry('react-native'),
      ...createPkgEntry('react'),
    }, // Use local versions of dependencies
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
