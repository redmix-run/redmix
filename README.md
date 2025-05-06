<p align="center">
  <img src="https://avatars2.githubusercontent.com/u/197462962?v=4" width="200" />
  <h1 align="center">Redmix</h1>
</p>

## About

Redmix is a TypeScript Web App Framework that gives you all the tools you need
to build web applications quickly and efficiently.

Redmix is a fork of the [RedwoodJS](https://redwoodjs.com/) framework with the
goal of taking it into the modern web development era with a smooth transition
for existing RedwoodJS applications.

Redmix would obviously not be where it is today without the vision and heroic
efforts of the RedwoodJS founders, maintainers and community.

## Migrating from RedwoodJS to Redmix

Search and replace all instances of `"@redwoodjs/(.*)": "\d+\.\d+\.\d+"`
with `"@redmix/$1": "0.0.3"` (or whatever the latest version of Redmix is when
you run this) in all three `package.json` files. Run `yarn install` to update
your lock file.

Search and replace all instances of `@redwoodjs` in all files with `@redmix`.
Pay attention to `yarn.lock`. If anything changed in there you probably have to
do some manual editing. Also find all mentions of
`storybook-framework-redwoodjs-vite` and replace with
`storybook-framework-redmix-vite`

Redmix doesn't have the equivalent of Redwood Studio yet. So Studio will not
work for now. Let me know if that's something you use and need.

Delete all files and folders inside `.redwood/` except `README.md`

## Roadmap

### Cleanup

These are things I want to remove to make the surface area of things I need to
maintain smaller. Notice that UI libraries you already have setup will continue
to work. Just new projects won't have the setup support for them. Auth and
deploy providers are more difficult. I'll leave those in longer. Let me know
what you use so I know what to keep and what to remove!

- [ ] Mantine and Chakra-UI setup
- [ ] Redwood Record
- [ ] Telemetry
- [ ] Auth providers I don't know of anyone using
- [ ] Deploy providers I don't know of anyone using
- [x] Old docs versions
- [ ] Old codemods
- [ ] The structure package (internal legacy package)

### Future Proofing

- [ ] Make all packages ESM only where possible and ESM+CJS where needed to
      keep compatibility with existing RW apps. Packages still to convert:
  - [ ] `@redmix/cli` (in progress, see
        [#23](https://github.com/redmix-run/redmix/pull/23),
        [#26](https://github.com/redmix-run/redmix/pull/26),
        [#34](https://github.com/redmix-run/redmix/pull/34),
        [#40](https://github.com/redmix-run/redmix/pull/40), etc)
  - [ ] `@redmix/fastify-web`
  - [ ] `@redmix/api-server`
  - [ ] `@redmix/api`
  - [ ] etc. Full list: https://github.com/redmix-run/redmix/issues/19
- [ ] Future major version: Make all packages ESM only
- [ ] Future major version: Make new Redmix apps ESM only
- [ ] Future major version: Make it possible to switch existing Redmix apps to
      ESM
- [ ] Enable strict mode for new Redmix TypeScript apps.
- [ ] Upgrade to Node 24
- [ ] Setup dependabot/renovate to automatically merge PRs that pass all checks

### Package Updates

- [ ] Update packages we use to their latest versions. Notable examples:
  - [ ] `react`
  - [ ] `prisma`
  - [ ] `apollo`
  - [ ] `vite`
  - [ ] `fastify`

### Docs

- [ ] Mirror the RedwoodJS docs to make sure they don't get deleted
- [ ] Document where Redmix diverges from RedwoodJS. (Future major version.)

### New Features

- [ ] Better support for file uploads
- [ ] dbAuth version with OAuth support
- [ ] Whatever I need to make it easier to work with the OpenAI API/SDK and
      other AI tools
- [ ] Your feature request here! Let me know what you need!

## Documentation

The best documentation for Redmix is actually still the
[RedwoodJS documentation](https://redwoodjs.com/docs). The first version of
Redmix will be fully compatible with RedwoodJS v8.6 and there will be no
specific documentation written for Redmix for now.

The only thing you'll have to adjust are the package names and replace every
`@redwoodjs` package with a `@redmix` package of the same name.

## The Redmix Team

<table>
  <tr>
    <td align="center" valign="top" width="25%"><a href="https://tobbe.dev"><img src="https://avatars0.githubusercontent.com/u/30793?v=4" width="100px;" alt=""/><br /><sub><b>Tobbe Lundberg</b></sub></a></td>
    <td align="center" valign="top" width="25%"><img src="https://placehold.co/400x400?text=You?" width="100px;" alt="You?"/></td>
    <td align="center" valign="top" width="25%"><img src="https://placehold.co/400x400?text=You?" width="100px;" alt="You?"/></td>
    <td align="center" valign="top" width="25%"><img src="https://placehold.co/400x400?text=You?" width="100px;" alt="You?"/></td>
  </tr>
</table>

## Sponsors

<table>
  <tr>
    <td align="center" valign="center" width="20%"><a href="https://twodots.net"><img src="https://github.com/user-attachments/assets/a98ae112-9f66-4c0a-a450-fa410725b230" width="100px;" alt="TwoDots"/></a></td>
    <td align="center" valign="center" width="20%"><img src="https://placehold.co/400x400?text=Your\nCompany?" width="100px;" alt=""/></td>
    <td align="center" valign="center" width="20%"><img src="https://placehold.co/400x400?text=Your\nCompany?" width="100px;" alt=""/></td>
    <td align="center" valign="center" width="20%"><img src="https://placehold.co/400x400?text=Your\nCompany?" width="100px;" alt=""/></td>
    <td align="center" valign="center" width="20%"><img src="https://placehold.co/400x400?text=Your\nCompany?" width="100px;" alt=""/></td>
  </tr>
</table>
