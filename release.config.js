/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: [{ name: 'master' }, { name: 'next', prerelease: 'next' }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/github',
      {
        assets: [{ path: 'dist/igo2', label: 'Distribution files' }]
      }
    ][
      ('@semantic-release/exec',
      {
        prepareCmd: [
          'npm pkg set version=$VERSION',
          'node --import tsx scripts/src/update-version.mts ${nextRelease.version}',
          'npm run build.prod'
        ].join(' && ')
      })
    ],
    [
      '@semantic-release/git',
      { assets: ['src/**/*', 'package.json', 'package-lock.json'] }
    ]
  ]
};
