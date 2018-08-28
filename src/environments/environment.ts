// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiAvaliacoesUrl: 'http://localhost:9090/avaliacao',
  apiEntregasUrl: 'http://localhost:9090/entrega',
  apiVendasUrl: 'http://localhost:9090/vendas',
  apiOAuthUrl: 'http://localhost:9090/oauth',
  
};
