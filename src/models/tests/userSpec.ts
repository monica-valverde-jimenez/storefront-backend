// @ts-nocheck
import { UserStore } from '../user';

const store = new UserStore();

describe('User Model', () => {
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

  it('create method should add a new user', async () => {
    const result = await store.create({
      firstName: 'Firstname test',
      lastName: 'Lastname test',
      username: 'usernameTest',
      password: 'test123'
    });
    expect(result.first_name).toEqual('Firstname test');
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result[0].username).toEqual('usernameTest');
  });

  it('show method should return the correct user', async () => {
    const result = await store.show('1');
    expect(result.username).toEqual('usernameTest');
  });

  it('authenticated method should return the correct user', async () => {
    const result = await store.authenticate('usernameTest', 'test123');
    expect(result.username).toEqual('usernameTest');
  });

  it('delete method should remove the user', async () => {
    const result = await store.delete(1);
    expect(result).toEqual({ id: 1 });
  });
});
