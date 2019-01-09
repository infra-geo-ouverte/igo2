The `EntityStore` class holds the references to any number of `Entity` as well as their state.
It can be observed, filtered and sorted and provdes methods to add, update or remove entities.

### Defining an `Entity` type

The `entity` module provides two interfaces `EntityObject` and `EntityClass`. An `Entity` should extend
one or the other. For example, let's say we want to define a Book interface with an `id` and `title`.
We could do it like this:

```typescript
export interface Book extends EntityObject {
  id: string;
  title: string;
}
```

### Create and populate an entity EntityStore

An entity store is always created empty. The method `setEntities` method can be used to do just that.

```typescript
const store = new EntityStore<Book>();
store.setEntities([
  {id: 1, title: 'Book 1'},
  {id: 2, title: 'Book 2'},
]);
```

### Observe raw entities (unfiltered ad unsorted)

The `rawObsersable` accessor returns an observable of all the entities, unfiltered and unsorted.
It emits a value only when the entities change and ignores any filtering, sorting or state change.

```typescript
const subscribtion = store
  .rawObservable
  .subscribe((books: Book[]) => {console.log(books.length);})
```

### Observe entities (filtered ad sorted) and any state change

The `obsersable` accessor returns an observable of all the filtered and sorted entities.
It emits a new value anytime the store is filtered or sorted as well as any time there is
a change in the state.  

```typescript
const subscribtion = store
  .observable
  .subscribe((books: Book[]) => {console.log(books.length);})
```

### Create a custom observable

A custom observable can be created using the methods `observeBy` and `observeFirstBy`. These method
accept a filtering function. This function will receive an `Entity` and it's state and should return
a boolean.

```typescript
const subscribtionToSelectedBook = store
  .observeFirstBy((book: Book, state: {[key: string]: boolean}) => {
    return state.selected === true;
  })
  .subscribe((selectedBook: Book) => {console.log(selectedBook);})
```
