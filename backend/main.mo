import Array "mo:base/Array";
import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Nat "mo:base/Nat";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Float "mo:base/Float";
import Text "mo:base/Text";

actor StockHolding {
    // Stable variables to persist data across upgrades
    stable var stockEntriesStable : [(Text, Nat)] = [];
    stable var priceEntriesStable : [(Text, Float)] = [];

    // HashMaps to store stock holdings and prices
    var stockHoldings = HashMap.HashMap<Text, Nat>(10, Text.equal, Text.hash);
    var stockPrices = HashMap.HashMap<Text, Float>(10, Text.equal, Text.hash);

    // Add or update a stock in the portfolio
    public func addStock(symbol: Text, quantity: Nat) : async () {
        stockHoldings.put(symbol, quantity);
    };

    // Remove a stock from the portfolio
    public func removeStock(symbol: Text) : async () {
        stockHoldings.delete(symbol);
    };

    // Update the quantity of a stock
    public func updateStockQuantity(symbol: Text, quantity: Nat) : async () {
        stockHoldings.put(symbol, quantity);
    };

    // Get the current portfolio
    public query func getPortfolio() : async [(Text, Nat)] {
        Iter.toArray(stockHoldings.entries())
    };

    // Update the price of a stock
    public func updateStockPrice(symbol: Text, price: Float) : async () {
        stockPrices.put(symbol, price);
    };

    // Calculate and return the total portfolio value
    public query func getPortfolioValue() : async Float {
        var totalValue : Float = 0;
        for ((symbol, quantity) in stockHoldings.entries()) {
            switch (stockPrices.get(symbol)) {
                case (null) { /* Price not available, skip */ };
                case (?price) {
                    totalValue += Float.fromInt(quantity) * price;
                };
            };
        };
        totalValue
    };

    // System functions for upgrades
    system func preupgrade() {
        stockEntriesStable := Iter.toArray(stockHoldings.entries());
        priceEntriesStable := Iter.toArray(stockPrices.entries());
    };

    system func postupgrade() {
        stockHoldings := HashMap.fromIter<Text, Nat>(stockEntriesStable.vals(), 10, Text.equal, Text.hash);
        stockPrices := HashMap.fromIter<Text, Float>(priceEntriesStable.vals(), 10, Text.equal, Text.hash);
    };
}