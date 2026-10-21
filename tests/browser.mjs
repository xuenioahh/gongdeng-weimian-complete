import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
try{
  await require('./browser-literary-final.cjs').main();
  await require('./browser-shen-zhang-romance.cjs').main();
  await require('./browser-low-consorts.cjs').main();
  const regression=await require('./browser-regression.cjs').main();
  if(regression.failures?.length)process.exitCode=1;
}catch(error){console.error(error);process.exitCode=1;}
