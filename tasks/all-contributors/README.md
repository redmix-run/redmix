# All-Contributors

In general, this is a two-part process:

1. Update the `.all-contributorsrc` file with new contributors
2. Update README.md#Contributors with changes

### Step 1: Check for new contributors and add to `*rc` files

> **NOTE:**
> Do not add [bot] accounts to the files.
>
>   ==BOTS==
> - dependabot[bot]
> - renovate[bot]
> - codesee-architecture-diagrams[bot]

```js
cd tasks/all-contributors
yarn all-contributors check

// For each contributor listed in output, repeat the following:

yarn all-contributors add <contributor> code
```

### Step 2: Update the content in README.md#Contributors

```bash
yarn all-contributors generate
```
