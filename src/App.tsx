import React, { useState } from "react";
import CardForm from "./components/CardForm";
import CardCarousel from "./components/CardCarousel";
import { CardType } from "./features/cards/cardTypes";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">Card Management</nav>

      <div className="p-4 flex flex-col md:flex-row gap-4">
        {/* Left side: Transactions */}
        <aside className="w-full md:w-1/3 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Today's Transactions</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Ordered Food</span>
              <span className="text-red-500">- $150.00</span>
            </li>
            <li className="flex justify-between">
              <span>Ticket Refund</span>
              <span className="text-green-500">+ $50.00</span>
            </li>
            <li className="flex justify-between">
              <span>Interest Credited</span>
              <span className="text-green-500">+ $100.00</span>
            </li>
            <li className="flex justify-between">
              <span>Electricity Bill</span>
              <span className="text-red-500">- $130.00</span>
            </li>
          </ul>
        </aside>

        {/* Right side: Cards */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-end">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Card
            </button>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Credit Cards</h2>
            <CardCarousel cardType={CardType.Credit} />
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Debit Cards</h2>
            <CardCarousel cardType={CardType.Debit} />
          </div>
        </div>
      </div>

      {showForm && <CardForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default App;
