# test-contract

Reproduction instructions:
```
// start ganache in terminal 1 (or in background)
// -d is important, so that the private key in test file has ether
$ npx ganache-cli -v -d

// in another terminal
$ npx truffle compile
$ npx jest
