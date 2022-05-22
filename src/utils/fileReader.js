import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readFile = (filename) => readFileSync(path.resolve(__dirname, '../..', '__fixtures__', filename), 'utf-8');

export default readFile;
