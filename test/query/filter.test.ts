import { expect } from 'chai';
import { numbers as numberGenerator } from '../helpers/generators';
import { SpyIterable } from '../helpers/SpyIterable';
import itiriri from '../../lib';

describe('Query (filter)', () => {
  describe('When calling filter', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable(numberGenerator());
      itiriri(source).filter(x => true);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return array of 3 elements', () => {
      const source = [0, -4, 4, 30, -10, 10];
      const q = itiriri(source).filter(x => x <= 0);

      expect(q.toArray()).to.be.deep.equal([0, -4, -10]);
    });

    it('Should return array of 1 element', () => {
      const source = [0, -4, 4, 30, -10, 10];
      const q = itiriri(source).filter((elem, idx) => idx === 0);

      expect(q.toArray()).to.be.deep.equal([0]);
    });

    it('Should return array of 1 object', () => {
      const source = [
        { val: 10, tag: 'a' },
        { val: 20, tag: 'b' },
        { val: -10, tag: 'c' },
      ];
      const q = itiriri(source).filter(x => x.tag === 'a');

      expect(q.toArray()).to.be.deep.equal([{ val: 10, tag: 'a' }]);
    });
  });

  describe('When calling skip', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable(numberGenerator());
      itiriri(source).skip(1000);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return 5 elements', () => {
      const source = numberGenerator();
      const q = itiriri(source).skip(2).take(5);

      expect(q.toArray()).to.be.deep.equal([2, 3, 4, 5, 6]);
    });
  });

  describe('When calling slice', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable(numberGenerator());
      itiriri(source).slice(100, 2000);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return 3 elements', () => {
      const source = numberGenerator(1, 2);
      const q = itiriri(source).slice(4, 6);

      expect(q.toArray()).to.be.deep.equal([9, 11]);
    });

    it('Should return empty source', () => {
      const source = numberGenerator(10, 2);
      const q = itiriri(source).slice(7, 6);

      expect(q.toArray()).to.be.deep.equal([]);
    });

    it('Should return no elements', () => {
      const source = numberGenerator(10, 2);
      const q = itiriri(source).slice(0, 0);

      expect(q.toArray()).to.be.deep.equal([]);
    });
  });

  describe('When calling splice', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable(numberGenerator());
      itiriri(source).splice(100, 200, 0, 1, 2, 3, 4);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return 5 elemens', () => {
      const source = [1, 2, 3, 4, 5, 6, 7];
      const q = itiriri(source).splice(1, 5, -1, -2, -3);

      expect(q.toArray()).to.be.deep.equal([1, -1, -2, -3, 7]);
    });

    it('Should return 3 elemens', () => {
      const source = [1, 2, 3, 4, 5, 6, 7];
      const q = itiriri(source).splice(0, 7, -1, -2, -3);

      expect(q.toArray()).to.be.deep.equal([-1, -2, -3]);
    });
  });

  describe('When calling takeWhile', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable(numberGenerator());
      itiriri(source).takeWhile(() => true);

      expect(source.wasIterated).to.be.false;
    });

    it('Should return all elements', () => {
      const source = [1, 2, 3, 4, 5];
      const q = itiriri(source).takeWhile(() => true);

      expect(q.toArray()).to.be.deep.equal([1, 2, 3, 4, 5]);
    });

    it('Should return no elements', () => {
      const source = [1, 2, 3, 4, 5];
      const q = itiriri(source).takeWhile(() => false);

      expect(q.toArray()).to.be.deep.equal([]);
    });

    it('Should return first elements that satisfy condition', () => {
      const source = [2, 4, 6, 7, 8, 3, 10];
      const q = itiriri(source).takeWhile(e => e % 2 === 0);

      expect(q.toArray()).to.be.deep.equal([2, 4, 6]);
    });
  });

  describe('When calling skipWhile', () => {
    it('Should be a deferred method', () => {
      const source = new SpyIterable(numberGenerator());
      itiriri(source).skipWhile(() => true);

      expect(source.wasIterated).to.be.false;
    });

    it('Should skip all elements', () => {
      const source = [1, 2, 3, 4, 5];
      const q = itiriri(source).skipWhile(() => true);

      expect(q.toArray()).to.be.deep.equal([]);
    });

    it('Should return all elements', () => {
      const source = [1, 2, 3, 4, 5];
      const q = itiriri(source).skipWhile(() => false);

      expect(q.toArray()).to.be.deep.equal([1, 2, 3, 4, 5]);
    });

    it('Should skip first elements that satisfy condition', () => {
      const source = [2, 4, 6, 7, 8, 3, 10];
      const q = itiriri(source).skipWhile(e => e % 2 === 0);

      expect(q.toArray()).to.be.deep.equal([7, 8, 3, 10]);
    });
  });
});
