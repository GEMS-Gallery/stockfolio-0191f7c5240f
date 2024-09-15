import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'addStock' : ActorMethod<[string, bigint], undefined>,
  'getPortfolio' : ActorMethod<[], Array<[string, bigint]>>,
  'getPortfolioValue' : ActorMethod<[], number>,
  'removeStock' : ActorMethod<[string], undefined>,
  'updateStockPrice' : ActorMethod<[string, number], undefined>,
  'updateStockQuantity' : ActorMethod<[string, bigint], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
