function helloWorld(personNames: string[]): string {
  if (!personNames) {
    return ``;
  }
  return `hello ${personNames}`;
}

const greets = helloWorld(['steve', 'dan']);
greets;

// const noGreets = helloWorld(null);
// noGreets;