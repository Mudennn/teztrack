import React from "react";
import { useEffect } from "react";
import { defiFormat } from "../pages/utils";
import kUSD from '../data/kUSD.png'
import plenty from '../data/Plenty.png'
import upsobertez from '../data/upsobertez.png'
import USDtz from '../data/usdtz.png'
import xPlenty from '../data/xPlenty.png'

const WalletTable = ({ wallet, defiBalance, setDefiBalance }) => {
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
        console.log(`Token at account ${wallet} :`, balance);
        setDefiBalance(balance);
      };
      fetchBalance();
    }
  }, [wallet]);

  // const url1 = "ipfs://QmSvrdue8Tt67Kx3b1Z1N4Mf2AN7ABcMgwcZEh4iXczqTu"
  // const url2 = url1.substring(7,53)
  // const url3 = "https://ipfs.io/ipfs/"
  // const result= url3.concat(url2)
  // console.log(result)

  // const png1= "https://upsorber.com/upsorber.png"
  // const png2 = png1.substring(png1.length - 3)
  // console.log(png2)
  

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
                            <p className="font-bold">$2,890.66</p>
                            <p className="text-xs text-gray-500">
                              {defiFormat(defi.balance)}
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

export default WalletTable;
