# Contributing

1. [Fork it](https://help.github.com/articles/fork-a-repo/)
2. Install dependencies (`yarn install`)
3. Create your feature branch (`git checkout -b feature/my-feature`)
4. Commit your changes (`git commit -am 'Added some feature'`)
5. Test your changes (`yarn test`)
6. Push to the branch (`git push origin feature/my-feature`)
7. [Create new Pull Request](https://help.github.com/articles/creating-a-pull-request/)

## Testing

We use [Jest](https://github.com/facebook/jest) to write tests. Run our test suite with this command:

```
yarn test
```

## Code Style

We use [Prettier](https://prettier.io/) and tslint to maintain code style and best practices.
Please make sure your PR adheres to the guides by running:

```
yarn format
```

and

```
yarn lint
```
