import { expect } from 'chai';
import { query } from '../../lib/Query';
import { toArray } from '../../lib/reducers/toArray';
import { SpyIterable } from '../helpers/SpyIterable';

describe('Query (cast)', () => {
  describe('When calling toArray', () => {
    it('Should return the array', () => {
      const source = [0, 4, 4, 0, 1];
      const q = query(source);

      expect(q.toArray()).to.deep.equal(source);
    });

    it('Should return the array of transformed items', () => {
      const source = [1, 2, 3];
      const q = query(source);

      expect(q.toArray(e => e * 10)).to.deep.equal([10, 20, 30]);
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      query(source).toArray();

      expect(source.iteratedOnce).to.be.true;
    });
  });

  describe('When calling toMap', () => {
    it('Should throw error', () => {
      const source = [0, 4, 4, 0, 1];
      const q = query(source);

      expect(() => q.toMap(x => x)).to.throw(Error);
    });

    it('Should return map of 3 elements', () => {
      const source = [0, 4, 5];
      const q = query(source).toMap(x => x, x => x);

      expect(toArray(q)).to.deep.equal([[0, 0], [4, 4], [5, 5]]);
    });

    it('Should return map of 4 elements', () => {
      const source = [1, 4, 44, 11];
      const q = query(source).toMap(x => x, x => x % 10);

      expect(toArray(q)).to.deep.equal([[1, 1], [4, 4], [44, 4], [11, 1]]);
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      query(source).toMap(x => x, x => x);

      expect(source.iteratedOnce).to.be.true;
    });
  });

  describe('When calling toSet', () => {
    it('Should return map of 4 elements', () => {
      const source = [0, 4, 5, 1];
      const q = query(source).toSet();

      expect(toArray(q)).to.deep.equal([0, 4, 5, 1]);
    });

    it('Should return map of 2 elements', () => {
      const source = [1, 4, 4, 1];
      const q = query(source).toSet();

      expect(toArray(q)).to.deep.equal([1, 4]);
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      query(source).toSet();

      expect(source.iteratedOnce).to.be.true;
    });
  });

  describe('When calling toGroups', () => {
    it('Should return map of 2 groups', () => {
      const source = [0, 4, 5, 1];
      const q = query(source).toGroups(x => x % 2);

      expect(toArray(q)).to.deep.equal([[0, [0, 4]], [1, [5, 1]]]);
    });

    it('Should return map of 3 groups', () => {
      const source = [
        { val: 1, tag: 'a' },
        { val: 11, tag: 'b' },
        { val: 111, tag: 'a' },
        { val: 1111, tag: 'c' },
      ];
      const q = query(source).toGroups(x => x.tag);

      expect(toArray(q)).to.deep.equal([
        ['a', [{ val: 1, tag: 'a' }, { val: 111, tag: 'a' }]],
        ['b', [{ val: 11, tag: 'b' }]],
        ['c', [{ val: 1111, tag: 'c' }]],
      ]);
    });

    it('Should return map of 4 groups', () => {
      const source = [0, 1, 3, -1, -2];
      const q = query(source).toGroups((_, idx) => idx % 4);

      expect(toArray(q)).to.deep.equal([
        [0, [0, -2]],
        [1, [1]],
        [2, [3]],
        [3, [-1]],
      ]);
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      query(source).toMap(x => x);

      expect(source.iteratedOnce).to.be.true;
    });
  });

  describe('When calling toString', () => {
    it('Should return string of 3 elements', () => {
      const source = [4, 1, 2];
      const q = query(source);

      expect(q.toString()).to.be.equal('4,1,2');
    });

    it('Should return empty string', () => {
      const source = [];
      const q = query(source);

      expect(q.toString()).to.be.equal('');
    });

    it('Should return string of 5 elements', () => {
      const source = [-1, null, 4, 1, 2];
      const q = query(source);

      expect(q.toString()).to.be.equal('-1,,4,1,2');
    });

    it('Should return string of 4 elements', () => {
      const source = [
        { toString: () => 'a' },
        { toString: () => 'aa' },
        { toString: () => 'aaa' },
        { toString: () => 'aaaa' },
      ];
      const q = query(source);

      expect(q.toString()).to.be.equal('a,aa,aaa,aaaa');
    });

    it('Should iterate once', () => {
      const source = new SpyIterable([]);
      query(source).toString();

      expect(source.iteratedOnce).to.be.true;
    });
  });
});
