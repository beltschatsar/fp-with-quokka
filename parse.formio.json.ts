import * as fs from 'fs';

const stringBuffer: string = fs.readFileSync('./formio.json', { encoding: 'utf8'});
const content = JSON.parse(stringBuffer);

const activityFields = content.resources.activity.components.map((c) => c.key);
activityFields;