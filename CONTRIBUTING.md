# Contributing to Angular Liquid Glass

Thanks for contributing.

## Workflow

1. Fork the repository.
2. Create a branch from `main`.
3. Make a focused change with clear commits.
4. Run local validation before opening a pull request.
5. Open a PR against `main`.

## Branch Naming

Use this pattern:

```txt
<type>/<short-description>
```

Examples:

- `feat/add-liquid-glass-modal`
- `fix/card-filter-cleanup`
- `docs/readme-installation`
- `chore/update-ci-node-version`

Preferred branch types:

- `feat`
- `fix`
- `docs`
- `test`
- `refactor`
- `build`
- `ci`
- `chore`

## Commits

This repository uses Conventional Commits.

Format:

```txt
<type>(<scope>): <subject>
```

Examples:

- `feat(card): add projected content example`
- `fix(filter): avoid duplicate svg cleanup`
- `docs(readme): update installation section`
- `ci(release): publish npm package with provenance`

Rules:

- Keep the subject imperative and concise.
- Use lowercase in the subject unless a proper noun requires otherwise.
- Use `!` or a `BREAKING CHANGE:` footer for breaking changes.

## Local Validation

Install dependencies:

```bash
npm install
```

Run the full validation flow:

```bash
npm run lint
npm run test
npm run build
```

Useful commands:

```bash
npm run format
npm run pack:lib
npm run release:check
```

## Pull Requests

- Keep PRs small and easy to review.
- Update docs when the public API or usage changes.
- Add or update tests when behavior changes.
- Link the related issue when one exists.

## Release Process

Releases are automated from Git tags that match `v*.*.*`.

Suggested flow:

1. Ensure `main` is green.
2. Update `projects/angular-liquid-glass/package.json` version if needed.
3. Update `CHANGELOG.md`.
4. Create and push a tag:

```bash
git tag v0.1.0
git push origin v0.1.0
```

The release workflow will:

- install dependencies
- run lint, tests, and build
- publish `dist/angular-liquid-glass` to npm
- create a GitHub Release

## Branch Protection

Recommended GitHub protection for `main`:

- require pull requests before merging
- require the CI workflow to pass
- restrict direct pushes
- require linear history if your team prefers rebasing

## Code of Conduct

By participating, you agree to follow `CODE_OF_CONDUCT.md`.
