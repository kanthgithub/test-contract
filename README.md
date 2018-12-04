# test-contract

Reproduction instructions:
```
$ yarn
```
start ganache in terminal 1 (or in background)
`-d` is important, so that the private key in test file has ether
```
$ node ./node_modules/.bin/ganache-cli -v -d
```

In another terminal:
```
$ node ./node_modules/.bin/truffle compile
$ node ./node_modules/.bin/jest
```
