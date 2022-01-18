export interface Coin {
  changePercent24Hr: string,
  explorer: string,
  id: string,
  marketCapUsd: string,
  maxSupply: string,
  name: string,
  priceUsd: string,
  rank: string,
  supply: string,
  symbol: string,
  volumeUsd24Hr: string,
  vwap24Hr: string,
}
export interface HistoryItem {
  priceUsd: string,
  time: number,
  circulatingSupply: string,
  date: string,
}

export interface ChartLineOptions {
  chart: {
    id: string,
    xaxis: {
      categories: [number | string][]
    }
  }
}

export interface Market {
  baseId: string,
  baseSymbol: string,
  exchangeId: string,
  priceUsd: string,
  quoteId: string,
  quoteSymbol: string,
  volumePercent: any,
  volumeUsd24Hr: any,
}

export interface ChartLineSeries {
  name: string,
  data: [string][],
}

export interface ChartLine {
  options: {
    chart: {
      id: string
    },
    xaxis: {
      categories: Array<number>
    },
  },
  series: [{
    name: string,
    data: Array<number>
  }]
}
