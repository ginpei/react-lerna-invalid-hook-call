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
