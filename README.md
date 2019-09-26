# @tsfun

Functional Programming in TypeScript without class methods.

## Packages

All packages are published to [@tsfun](https://www.npmjs.com/org/tsfun) organization.

## API References

Go to [the GitHub page](https://tsfun.github.com/tsfun).

## Development

### System Requirements

* Node.js ≥ 10.16.3
* Package Manager: [pnpm](https://pnpm.js.org/)
* Git

### Scripts

#### Build

```sh
pnpm run build
```

#### Clean

```sh
pnpm run clean
```

#### Test

##### Test Everything

```sh
pnpm test
```

##### Test Changed Files Only

```sh
pnpm test -- --onlyChanged
```

##### Test A Single File

```sh
pnpm test path/to/test/file.test.ts
```

or

```sh
pnpm test filename.test.ts
```

##### Update Jest Snapshot

```sh
pnpm test -- -u
```

#### Start Node.js REPL

This starts a Node.js REPL where you can import every module inside `packages/` folder.

```sh
pnpm run repl
```

## License

[MIT](https://git.io/JeGij) © [Hoàng Văn Khải](https://github.com/KSXGitHub)
