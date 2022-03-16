# Nahmii Bridge

The Nahmii bridge is an UX/UI to bridge tokens between Nahmii L2 networks and supported base layer networks. Do note that having an Ethereum provider, like MetaMask (extension or mobile app), available in your browser is required to run this dApp.

## Developing

Once you've cloned this repository and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

This app uses the [adapter-static](https://github.com/sveltejs/kit/tree/master/packages/adapter-static) sveltekit adapter. For more details on sveltekit adapters see: [adapters](https://kit.svelte.dev/docs#adapters). To build this project as a static web app:

```bash
npm run build
```

> You can preview the statically built app with `npm run preview`.

## Deploying

The app is hosted through AWS. New commits on the main branch will trigger a rebuild of the container images in our ECR repository. (See the [workflow](https://github.com/nahmii-community/bridge/blob/bf4c0b5736be77e34e7d7ee0c41b76fa3b4c7d25/.github/workflows/aws-ecr.yaml) file for more details)

To update the live running bridge instance:
- Retrieve the commit hash of the bridge build you want to use.
- Update the `newTag` of the `kustomization.yaml` to the commit hash you want to use in the [Nahmii/GitOps](https://github.com/nahmii/gitops) repository.
- Create a new pull request with your changes. The updated tag should be picked up automatically.

## Contributing

To contribute, clone this repository and create a new feature branch.
Once the new feature is implemented, create a new pull request with a description of the added changes.

## Issues

Feel free to open a feature request or report a bug through the issues page!