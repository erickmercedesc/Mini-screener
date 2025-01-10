import axios from 'axios';

export class Kline {
    closePrice: number;

    constructor(data: any) {
        this.closePrice = data[4];
    }
}

export class KlinesGroup {
    klines: Kline[] = [];

    constructor(data: any) {
        this.klines = data.map((kline: any) => new Kline(kline));
    }

    get last() {
        return this.getDayClosePrice(0);
    }

    getDayClosePrice(day: number) {
        try {
            return this.klines[this.klines.length - day - 1].closePrice;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    getPerformance(day: number) {
        const closeDa = this.last;
        const closeDn = this.getDayClosePrice(day);
        return closeDa/closeDn;
    }

    getRelativeScore() {
        const closeDa = this.last;
        const perfTicker63   = closeDa/this.getDayClosePrice(63)
        const perfTicker126  = closeDa/this.getDayClosePrice(126)
        const perfTicker189  = closeDa/this.getDayClosePrice(189)
        const perfTicker252  = closeDa/this.getDayClosePrice(252)
        return (0.4 * perfTicker63) + (0.2 * perfTicker126) + (0.2 * perfTicker189) + (0.2 * perfTicker252)
    }

}

export default class Pair {
    static getKlines = async(symbol: string) => {
        const response = await axios.get(`https://api.binance.com/api/v1/klines?symbol=${symbol.toUpperCase()}&interval=1d`)
        return new KlinesGroup(response.data);
    }
}