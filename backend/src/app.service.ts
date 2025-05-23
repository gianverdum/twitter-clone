import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';

type AppInfo = {
  name: string;
  version: string;
  description: string;
};

@Injectable()
export class AppService {
  private readonly appInfo: AppInfo;
  constructor() {
    const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
    this.appInfo = {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
    }
  }
  getAppInfo(): AppInfo {
    return this.appInfo;
  }
}
