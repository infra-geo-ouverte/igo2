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
        assets: [
          {
            path: 'dist/igo2/igo2-dist.zip',
            label: 'Distributions files'
          }
        ]
      }
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: [
          'npm pkg set version=${nextRelease.version}',
          'node --import tsx scripts/src/update-version.mts ${nextRelease.version}',
          'npm run build.prod',
          'zip -qq -r dist/igo2/igo2-dist.zip * -i dist/igo2/*'
        ].join(' && ')
      }
    ],
    [
      '@semantic-release/git',
      { assets: ['src/**/*', 'package.json', 'package-lock.json'] }
    ]
  ]
};
