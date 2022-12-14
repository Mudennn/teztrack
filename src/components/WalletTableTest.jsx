import React, { useState } from "react";
import { useEffect } from "react";
import {eighteenFormat, sixFormat, plentyDAO , spicySwap} from "../pages/utils";
import kUSD from '../data/kUSD.png'
import plenty from '../data/Plenty.png'
import upsobertez from '../data/upsobertez.png'
import USDtz from '../data/usdtz.png'
import xPlenty from '../data/xPlenty.png'
import axios from "axios";
// import useAxios from "../hooks/useAxios";
// import { keyBy } from "lodash";





const WalletTableTest = ({ wallet, defiBalance, setDefiBalance }) => {
//   const [price, setPrice] = useState([])
  const [kusd, setKUSD] = useState([])
  const [upsorber, setUpsorber] = useState([])
  const [plentydao, setPlentyDAO] = useState([])
  const [usdc, setUSDC] = useState([])
  const [usdtz, setUSDCtz] = useState([])
  const [usdt, setUSDT] = useState([])



  useEffect(() => {
    if (wallet) {
      const fetchBalance = async () => {
        var requestOptions = {
          method: "GET",
        };
        const baseURL = "https://api.mainnet.tzkt.io/";
        const fetchURL = `${baseURL}v1/tokens/balances?account=${wallet}&token.metadata.artifactUri.null=true`;
        const balance = await fetch(fetchURL, requestOptions).then((data) =>
          data.json()
        );
        
        const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=tezos%2Ckolibri-usd%2Cupsorber%2Cusdtez%2Cplenty-dao%2Ctether%2Cusd-coin&vs_currencies=usd")
        // const convRateTezos = Number(response.data.tezos.usd)
        const convRateKUSD = Number(response.data["kolibri-usd"].usd).toFixed(1)
        const convRateUpsorber = Number(response.data.upsorber.usd).toFixed(8)
        const convRatePlenty = Number(response.data["plenty-dao"].usd)
        const convRateUSDC = Number(response.data["usd-coin"].usd).toFixed(1)
        const convRateUSDtz = Number(response.data.usdtez.usd).toFixed(1)
        const convRateUSDT = Number(response.data.tether.usd).toFixed(1)
        

        console.log(`Token at account ${wallet} :`,balance);
        // console.log(`Conversion Rate Tezos:`, convRateTezos);
        console.log(`Conversion Rate Upsorber:`, convRateUpsorber);
        console.log(`Conversion Rate Price:`, response);

        setDefiBalance(balance);
        // setPrice(response)

        setUpsorber(convRateUpsorber)
        setKUSD(convRateKUSD)
        setPlentyDAO(convRatePlenty)
        setUSDC(convRateUSDC)
        setUSDCtz(convRateUSDtz)
        setUSDT(convRateUSDT)
      };
      fetchBalance();
    }
  }, [wallet]);

 
  

  return (
    <div>
      {defiBalance.length > 1 && (
        <div className="flex flex-col justify-center h-full mt-7">
          <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Defi Balance</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-fixed w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Asset</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-right">Balance</div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-sm divide-y divide-gray-100">
                    {defiBalance.map((defi) => (
                      <tr key={defi.id}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3 rounded-full bg-gray-300">

                              <img
                                className="rounded-full bg-gray-300"
                                src ={`${
                                  defi.token.metadata.thumbnailUri?.substring(defi.token.metadata.thumbnailUri.length-3) === "png"
                                    ? defi.token.metadata.thumbnailUri 
                                    : defi.token.contract.address === "KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV" ? kUSD
                                    : defi.token.contract.address === "KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9" ? USDtz
                                    : defi.token.contract.address === "KT1GBZmSxmnKJXGMdMLbugPfLyUPmuLSMwKS" ? upsobertez
                                    : defi.token.contract.address === "KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b" ? plenty
                                    : defi.token.contract.address === "KT1Rpviewjg82JgjGfAKFneSupjAR1kUhbza" ? xPlenty
                                    : "https://ipfs.io/ipfs/" + (defi.token.metadata.thumbnailUri?.slice(7))  
                                }`}
                                width="40"
                                height="40"
                                alt=""
                              />
                            </div>
                            <div className="font-medium text-gray-800 ml-2 ">
                              <p className="font-bold">
                                {defi.token.metadata.symbol}
                              </p>
                              <p className="text-xs text-gray-500">
                                {defi.token.metadata.name}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-2 whitespace-nowrap">
                          <div className="text-right font-medium text-gray-900">
                            <p className="font-bold">$
                                {/* $2,890.66 */}
                                {defi.token.contract.address === "KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV" ? (eighteenFormat(defi.balance) * kusd) //kUSD
                              : defi.token.contract.address === "KT1UsSfaXyqcjSVPeiD7U1bWgKy3taYN7NWY" ? (sixFormat(defi.balance) * usdc) // USDC.e
                              : defi.token.contract.address === "KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9" ? (sixFormat(defi.balance) * usdtz) // USDtz
                              : defi.token.contract.address === "KT1VNEzpf631BLsdPJjt2ZhgUitR392x6cSi" ? (sixFormat(defi.balance)) //tQPLP
                              : defi.token.contract.address === "KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b" ? ((plentyDAO(defi.balance) * plentydao)) //Plenty DAO
                              : defi.token.contract.address === "KT1Rpviewjg82JgjGfAKFneSupjAR1kUhbza" ? (eighteenFormat(defi.balance)) //xPlenty
                              : defi.token.contract.address === "KT1XnTn74bUtxHfDtBmm2bGZAQfhPbvKWR8o" ? (sixFormat(defi.balance) * usdt) // USDT
                              : defi.token.contract.address === "KT1HbXV1HZrmuwbbiVAyRCkRjMV8xbqjavMU" ? (spicySwap(defi.balance)) // SpicySwap
                              : defi.token.contract.address === "KT1TgmD7kXQzofpuc9VbTRMdZCS2e6JDuTtc" ? (((defi.balance) * upsorber)?.toFixed(2)) // upsober
                              : 0}
                                </p>
                            <p className="text-xs text-gray-500">
                              {defi.token.contract.address === "KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV" ? (eighteenFormat(defi.balance)) //kUSD
                              : defi.token.contract.address === "KT1UsSfaXyqcjSVPeiD7U1bWgKy3taYN7NWY" ? (sixFormat(defi.balance)) // USDC.e
                              : defi.token.contract.address === "KT1LN4LPSqTMS7Sd2CJw4bbDGRkMv2t68Fy9" ? (sixFormat(defi.balance)) // USDtz
                              : defi.token.contract.address === "KT1VNEzpf631BLsdPJjt2ZhgUitR392x6cSi" ? (sixFormat(defi.balance)) //tQPLP
                              : defi.token.contract.address === "KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b" ? (plentyDAO(defi.balance)) //Plenty DAO
                              : defi.token.contract.address === "KT1Rpviewjg82JgjGfAKFneSupjAR1kUhbza" ? (eighteenFormat(defi.balance)) //xPlenty
                              : defi.token.contract.address === "KT1XnTn74bUtxHfDtBmm2bGZAQfhPbvKWR8o" ? (sixFormat(defi.balance)) // USDT
                              : defi.token.contract.address === "KT1HbXV1HZrmuwbbiVAyRCkRjMV8xbqjavMU" ? (spicySwap(defi.balance)) // SpicySwap
                              :(defi.balance)}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletTableTest;
