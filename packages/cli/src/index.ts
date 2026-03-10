import { Command } from 'commander';
import { registerInstall } from './commands/install.js';
import { registerList } from './commands/list.js';
import { registerDoctor } from './commands/doctor.js';
import { registerInit } from './commands/init.js';
import { registerPublish } from './commands/publish.js';
import { registerUpdate } from './commands/update.js';
import { registerUninstall } from './commands/uninstall.js';
import { registerVerify } from './commands/verify.js';
import { registerLogin } from './commands/login.js';
import { registerLicense } from './commands/license.js';
import { registerUse } from './commands/use.js';

const program = new Command();

program
  .name('claudeflows')
  .version('0.1.3')
  .description('Claude Flows \u2014 install and manage agentic workflows');

registerInstall(program);
registerList(program);
registerDoctor(program);
registerInit(program);
registerPublish(program);
registerUpdate(program);
registerUninstall(program);
registerVerify(program);
registerLogin(program);
registerLicense(program);
registerUse(program);

program.parse(process.argv);
