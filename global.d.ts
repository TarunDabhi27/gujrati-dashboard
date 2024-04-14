declare module '*.scss';
declare module '*.png';
declare module '*.WAV';
declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  const Schema: DocumentNode;

  export = Schema;
}

declare type GlobalFetch = WindowOrWorkerGlobalScope;
