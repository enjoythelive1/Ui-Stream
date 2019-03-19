import chai from 'chai';
import chaiJestDiff from 'chai-jest-diff';
import sinonChai from 'sinon-chai';

chai.use(chaiJestDiff());
chai.use(sinonChai);

