// Credit to Andre Staltz: https://twitter.com/andrestaltz/status/1021490266014932992?s=11
import { Observable } from "rxjs";

let failTheFirstCall = "";

const aFetchReturningPromise = url =>
  new Promise((resolve, reject) => {
    if (failTheFirstCall === url) {
      resolve(`resolved ${url}`);
    }
    failTheFirstCall = url;
    reject(`rejected ${url}`);
  });

// Bad... would not work because Promise are eager while Observable are lazy
const bad = Observable.from(
  aFetchReturningPromise("http://unable-to-retry.org")
)
  .retry(2)
  .do(() => console.log("the good one"), () => console.log("the bad one"));
bad;

// Good... would work because we tell Observable that he should take it with caution
const good = Observable.defer(() =>
  Observable.from(aFetchReturningPromise("http://retry-friendly.org"))
)
  .retry(2)
  .do(() => console.log("the good two"), () => console.log("the bad two"));
good;
