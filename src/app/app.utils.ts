import { ConfigService, version } from '@igo2/core/config';

export function getAppVersion(configService: ConfigService): string {
  return (
    configService.getConfig('version.app') ||
    configService.getConfig('version.lib') ||
    version.lib
  );
}
