import readline from 'readline';
import { generateDurationsAsMarkdownList } from './duration.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

(async () => {
  const beginning = await ask('Enter beginning duration: ');
  const ending = await ask('Enter ending duration: ');
  const interval = await ask('Enter interval duration: ');
  rl.close();
  try {
    const result = generateDurationsAsMarkdownList(beginning, ending, interval);
    console.log('Generated durations:', result);
  } catch (err) {
    console.error('Error:', err.message);
  }
})();