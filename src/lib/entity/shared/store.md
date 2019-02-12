The `EntityStore` class holds the references to any number of `Entity` as well as their state.
It can be observed, filtered and sorted and provdies methods to add, update or remove entities.

### Defining an `Entity` type

An entity doesn't not need to implement any interface, but, the store needs to know
how to retrieve an entity's unique key.
For example, let's say we want to define a Book interface with an `id` and `title`.
We could do it like this:

```typescript
export interface Book {
  id: string;
  title: string;
}
```

### Create and populate an entity EntityStore

An entity store can be created with data or the `load` method may be used.

```typescript
const store = new EntityStore<Book>([
  {id: 1, title: 'Book 1'},
  {id: 2, title: 'Book 2'},
], {getKey: (book: Book) => book.id});
```

### Observe raw entities (unfiltered ad unsorted)

The `entities$` property returns an observable of all the entities, unfiltered and unsorted.
It emits a value only when the entities change and ignores any filtering, sorting or state change.

```typescript
const subscribtion = store
  .entities$
  .subscribe((books: Book[]) => {console.log(books.length);})
```

### Observe entities (filtered ad sorted)

The `view.all$()` method returns an observable of all the filtered and sorted entities.
It emits a new value anytime the store is filtered or sorted.

```typescript
const subscribtion = store
  .entities$
  .subscribe((books: Book[]) => {console.log(books.length);})
```

### Observe entities (filtered ad sorted) and any state change

The `stateView.all$()` method returns an observable of all the filtered and sorted entities.
It emits a new value anytime the store is filtered or sorted as well as any time there is
a change in the state.  

```typescript
const subscribtion = store
  .entities$
  .subscribe((records: {entity: Book, state: EntityState}[]) => {console.log(rcords.length);})
```

### Create a custom observable

A custom observable can be created using the store views' `firstBy$()` and `manyBy$()` methods. These method
accept a filtering function.

```typescript
const subscribtionToSelectedBook = store
  .stateView.firstBy$(({entity: Book, state: EntityState}) => {
    return record.state.selected === true;
  })
  .subscribe((record: Book) => {console.log(record));})
```
