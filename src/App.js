import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coinlist from "./pages/Coinlist";
import CryptoDetail from "./pages/CryptoDetail";
import Sidebar2 from "./components/Sidebar2";
import Navbar2 from "./components/Navbar2";
import Profile2 from "./pages/Profile2";
import NFT from "./pages/NFT";
// import Test from '../trash/Test';
// import Profile3 from './pages/Profile3';

function App() {
  const [wallet, setWallet] = useState("");
  const [nativeBalance, setNativeBalance] = useState(0);
  const [defiBalance, setDefiBalance] = useState([]);

  return (
    <div className="bg-[#e5dcf8]">
      <BrowserRouter>
        <Navbar2 wallet={wallet} setWallet={setWallet} />
        <div className="flex ">
          <Sidebar2 />

          <Routes>
            <Route
              path="/home"
              element={
                <Profile2
                  wallet={wallet}
                  setWallet={setWallet}
                  nativeBalance={nativeBalance}
                  setNativeBalance={setNativeBalance}
                  defiBalance={defiBalance}
                  setDefiBalance={setDefiBalance}
                />
              }
            />
            <Route
              path="/"
              element={
                <Profile2
                  wallet={wallet}
                  setWallet={setWallet}
                  nativeBalance={nativeBalance}
                  setNativeBalance={setNativeBalance}
                  defiBalance={defiBalance}
                  setDefiBalance={setDefiBalance}
                />
              }
            />
            {/* <Route path='/profile' element={<Profile />}/> */}
            <Route path="/coinlist" element={<Coinlist />} />
            <Route path="/coin/:id" element={<CryptoDetail />} />
            {/* <Route path="/test" element={<Test />} /> */}
            {/* <Route path="/profile3" element={<Profile3 />} /> */}
            <Route path="/nft/:id" element={<NFT wallet={wallet} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
