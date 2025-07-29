import { useEffect, useState } from "react";
import {
  getCoinstLists,
  getSpecificCoinHistory,
} from "./../api_service/coins_apis";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

const CryptoList = () => {
  const [coinsData, setCoinsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("marketCap");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    let intervalId;

    const fetchCoins = async () => {
      try {
        const data = await getCoinstLists();
        setCoinsData(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };
    fetchCoins();
    intervalId = setInterval(fetchCoins, 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const filteredCoins = coinsData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCoins = [...filteredCoins].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (sortOrder === "asc") return valA > valB ? 1 : -1;
    return valA < valB ? 1 : -1;
  });

  const chartData = selectedCoin && {
    labels: ["Price (USD)", "Market Cap", "24h Change %"],
    datasets: [
      {
        label: selectedCoin.name,
        data: [
          selectedCoin.price,
          selectedCoin.marketCap,
          selectedCoin.change24h,
        ],
        backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
      },
    ],
  };

  const handlerForCoinIdHistory = async (coinId) => {
    const data = await getSpecificCoinHistory(coinId);
    setSelectedCoin(data);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Top Cryptocurrencies</h2>

      {/* 🔎 Search & 📊 Sort */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or symbol..."
          className="border px-3 py-2 rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}
        >
          <option value="marketCap">Market Cap</option>
          <option value="price">Price</option>
          <option value="change24h">24h Change</option>
        </select>

        <button
          className="border px-3 py-2 rounded"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          {sortOrder === "asc" ? "⬆️ Asc" : "⬇️ Desc"}
        </button>
      </div>

      {/* 🥧 Chart */}
      {selectedCoin ? (
        <div className="mb-6 flex justify-center">
          <div style={{ width: "300px", height: "300px" }}>
            <Pie data={chartData} options={options} />
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 text-gray-600 text-center p-6 rounded-lg shadow-md mb-6">
          📊 Please select a cryptocurrency from the table to view its chart
          details
        </div>
      )}

      {/* 📋 Table */}
      <div style={{ height: "500px", overflowY: "auto" }}>
        <table className="bg-white shadow-md rounded-md relative w-full">
          <thead className="bg-gray-100 sticky top-0 left-0">
            <tr>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Symbol</th>
              <th className="text-left px-6 py-3">Price</th>
              <th className="text-left px-6 py-3">24h Change</th>
              <th className="text-left px-6 py-3">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {sortedCoins?.length > 0 ? (
              sortedCoins.map((coin) => (
                <tr
                  key={coin._id}
                  className="border-t cursor-pointer hover:bg-gray-50"
                  onClick={() => handlerForCoinIdHistory(coin._id)}
                >
                  <td className="px-6 py-3">{coin.name}</td>
                  <td className="px-6 py-3 uppercase">{coin.symbol}</td>
                  <td className="px-6 py-3">${coin.price.toLocaleString()}</td>
                  <td
                    className={`px-6 py-3 font-medium ${
                      coin.change24h >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {coin.change24h.toFixed(2)}%
                  </td>
                  <td className="px-6 py-3">
                    ${coin.marketCap.toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-lg py-4">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;
