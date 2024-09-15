export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addStock' : IDL.Func([IDL.Text, IDL.Nat], [], []),
    'getPortfolio' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'getPortfolioValue' : IDL.Func([], [IDL.Float64], ['query']),
    'removeStock' : IDL.Func([IDL.Text], [], []),
    'updateStockPrice' : IDL.Func([IDL.Text, IDL.Float64], [], []),
    'updateStockQuantity' : IDL.Func([IDL.Text, IDL.Nat], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
