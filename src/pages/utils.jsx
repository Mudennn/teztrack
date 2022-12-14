export function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  export function defiFormat(num){
    return (Number(num) / 1e18).toFixed(2)
  }

  // For kUSD / Plenty / xPlenty / SpicySwap - Decimal 18
  export function eighteenFormat(num){
    return (Number(num) / 1e18).toFixed(2)
  }

  // For USDC / USDtez / QuipuSwap / USDT - Decimal 6 
  export function sixFormat(num){
    return (Number(num) / 1e6).toFixed(2)
  }

  // Decimal for plentyDAO / SpicySwap
  export function plentyDAO(num){
    return (Number(num) / 1e18).toFixed(17)
  }
  export function spicySwap(num){
    return (Number(num) / 1e18).toFixed(18)
  }

  // Note:
  // Upsober / Upsober.tez - Decimal 0