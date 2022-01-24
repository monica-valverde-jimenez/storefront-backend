import { CategoryStore } from '../category';

const store = new CategoryStore();

describe('Category Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.index).toBeDefined();
  });

  it('create method should add a new category', async () => {
    const result = await store.create({
      name: 'Category test'
    });
    console.log(result);
    expect(result).toEqual({
      id: 1,
      name: 'Category test'
    });
  });

  it('index method should return a list of categories', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'Category test'
      }
    ]);
  });

  it('show method should return the correct category', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      name: 'Category test'
    });
  });

  it('delete method should remove the category', async () => {
    store.delete('1');
    const result = await store.index();

    expect(result).toEqual([]);
  });
});
