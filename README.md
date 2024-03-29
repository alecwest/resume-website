# Website

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.18.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Notes:

## OAuth Configuration

There is a workaround in place in `main.ts` to support working in both a local dev environment (with localhost redirects) and production (with my actual website).

## Permissions

Within the `resumewebsite-staging` User Pool, users that are part of the `cognito:groups` group `entry/edit/any` will be able to create, edit, and delete entries. This is essentially an ADMIN group.

User permissions are validated on the backend by the function `resume-data-api-gateway-dynamodb`.
