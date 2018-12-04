import TestContractArtifact from '../build/contracts/TestContract.json';
import { ethers, ContractFactory } from 'ethers';
import * as chai from "chai";

function assertRevert(promise, pattern) {
    let revertFound;
    let messageMatch;
    promise.then(() => {
        chai.assert.fail('Expected revert not received');
    }).catch((error) => {
        revertFound = error.message.search('revert') >= 0;
        chai.assert(revertFound, `Revert not found. ${error}`);

        messageMatch = error.message.search(pattern) >= 0;
        chai.assert(messageMatch,`Pattern not found in revert reason. Expected Pattern = ${pattern}; Reason Given = ${error.message}`);
    });
}

const privateKeyWithEth = "0x4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d";
const ganacheProvider = new ethers.providers.JsonRpcProvider(`http://127.0.0.1:8545`);
const wallet = new ethers.Wallet(privateKeyWithEth, ganacheProvider);

const FOO = '0xf000000000000000000000000000000000000000000000000000000000000000';

jest.setTimeout(20000);
let testContract;

const DEPOSIT_AMOUNT = 255; // 

const SIG = {
  message: FOO, // definitely not signed by the right account
  v: '0x1b',
  r: FOO,
  s: FOO,
};

describe('TestContract', () => {
  beforeAll(async () => {
    testContract = await ContractFactory.fromSolidity(TestContractArtifact, wallet).deploy();
  });

  it("reverts for no reason", async () => {
    await testContract.deposit(DEPOSIT_AMOUNT, { value: DEPOSIT_AMOUNT });
    assertRevert(testContract.revertForNoReason(SIG.message, SIG.v, SIG.r, SIG.s), "No reason");
    await testContract.deposit(DEPOSIT_AMOUNT, { value: DEPOSIT_AMOUNT });
  });
});