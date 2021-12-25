# react-lerna-invalid-hook-call

# Try

Set up:

```console
$ npm ci
$ npx lerna bootstrap
```

Run:

```console
$ npm start
```

# Error

> Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
> 1. You might have mismatching versions of React and the renderer (such as React DOM)
> 2. You might be breaking the Rules of Hooks
> 3. You might have more than one copy of React in the same app
> See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.

# Reason

The hook uses a different React instance than the caller app.

- The hook uses `packages/shared/node_packages/react/`
- The app uses `packages/app/node_packages/react/`

# Solve

Move React from `dependencies` to `peerDependencies`, and bootstrap again.

```diff
- "dependencies": {
+ "peerDependencies": {
    "@types/react": "^17.0.34",
    "react": "^17.0.2"
  },
```

# Tried for Next.js

Replace `@a/app` with a Next.js app.

```console
$ rm -rf packages/app/
$ npm init next-app packages/app
```

There is an open issue.

- [Module not found: Can't resolve 'react' when importing local library with React as peerDependency · Issue #20266 · vercel/next.js](https://github.com/vercel/next.js/issues/20266)

## `peerDependencies`

```diff
- "dependencies": {
+ "peerDependencies": {
    "@types/react": "^17.0.34",
    "react": "^17.0.2"
  },
```

> ```
> Module not found: Can't resolve 'react'
> > 1 | const { useState } = require('react');
>     |                   ^
>   2 | 
>   3 | module.exports.useRandom = () => {
>   4 |   const [number] = useState(Math.random());
> ```

## File path

```console
$ cd packages/app
$ npm install ../shared
```

> ```
> Module not found: Can't resolve '@a/shared'
>   2 | import Image from 'next/image'
>   3 | import styles from '../styles/Home.module.css'
> > 4 | import { useRandom } from '@a/shared';
>   5 | 
>   6 | export default function Home() {
>   7 |   const number = useRandom();
> ```

## `npm link`

```console
$ cd packages/shared
$ npm link
$ cd ../app
$ npm link --only=production @a/shared
```

> ```
> Module not found: Can't resolve 'react'
> ```

## Set `baseUrl`

- [Comment by @matamatanot](https://github.com/vercel/next.js/issues/20266#issuecomment-748375569)
- [improves baseUrl resolution in typescript monorepos by jeantil · Pull Request #13542 · vercel/next.js](https://github.com/vercel/next.js/pull/13542/files#diff-738f132ea5ea7014901c0a03052025589f4a912b25a2f470151523408fae2a3d)

> ```
> Module not found: Can't resolve 'react'
> ```