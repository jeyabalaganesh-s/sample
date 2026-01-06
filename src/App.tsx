import { useState } from "react";

// App.tsx

// Result type
interface DigiGoldResult {
  eligibleAmount: string;
  bestAmount: string;
  baseGramRaw: string;
  roundedGram: string;
  baseMg: number;
  bonusMg: number;
  totalMg: number;
}

export default function App() {
  // State
  const [goldPrice, setGoldPrice] = useState<number>(12725);
  const [bonusMg, setBonusMg] = useState<number>(1);
  const [result, setResult] = useState<DigiGoldResult | null>(null);

  /*
   DIGIGOLD RULE (MINIMAL TRANSACTION – BEST PRICE)
   -------------------------------------------------
   Goal:
   - Find the MINIMUM possible transaction amount
   - Such that bonus is applied
   - And DigiGold rounding gives the MAX gold benefit per transaction

   Rules:
   1. Bonus eligibility threshold = GoldPrice / 100
   2. Base gold = Amount / GoldPrice (in grams)
   3. DigiGold rounds base gold to 3 decimals (grams)
      - standard rounding (4th decimal >= 5 -> round up)
   4. Bonus = fixed mg, applied only if eligible
   5. BEST amount = smallest amount >= eligibility
      that increases rounded base gold (mg jump)
  */

  // DigiGold rounding: 3 decimals (milligram precision)
  const digiRound = (grams: number): number => Number(grams.toFixed(3));

  const calculateBestAmount = () => {
    const eligibleAmount = goldPrice / 100;

    // Base rounded gold at eligibility (reference)
    const baseAtEligibility = digiRound(eligibleAmount / goldPrice) * 1000;

    let best: DigiGoldResult | null = null;

    // Scan forward in small steps to find FIRST rounding jump
    for (let amt = eligibleAmount; amt <= eligibleAmount * 2; amt += 0.01) {
      const baseGramRaw = amt / goldPrice;
      const roundedGram = digiRound(baseGramRaw);
      const roundedBaseMg = roundedGram * 1000;

      const bonus = amt >= eligibleAmount ? bonusMg : 0;
      const totalMg = roundedBaseMg + bonus;

      if (roundedBaseMg > baseAtEligibility) {
        best = {
          eligibleAmount: eligibleAmount.toFixed(2),
          bestAmount: amt.toFixed(2),
          baseGramRaw: baseGramRaw.toFixed(6),
          roundedGram: roundedGram.toFixed(3),
          baseMg: roundedBaseMg,
          bonusMg: bonus,
          totalMg,
        };
        break; // minimal amount found
      }
    }

    setResult(best);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-orange-100">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            DigiGold Investment Optimizer
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Find the minimum transaction amount that maximizes gold + bonus
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-5 border border-orange-100">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Gold Price per Gram (₹)
            </label>
            <input
              type="number"
              value={goldPrice}
              onChange={(e) => setGoldPrice(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Bonus per Transaction (mg)
            </label>
            <input
              type="number"
              value={bonusMg}
              onChange={(e) => setBonusMg(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
            />
          </div>

          <button
            onClick={calculateBestAmount}
            className="w-full mt-3 rounded-xl bg-orange-600 px-4 py-3 text-white font-semibold shadow hover:bg-orange-700 active:scale-[0.98] transition"
          >
            Find Minimal Best Amount
          </button>
        </div>

        {/* Result Card */}
        {result && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-6 border border-green-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Minimal Best Transaction
            </h2>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500">Eligibility Threshold</p>
                <p className="font-semibold text-gray-900">
                  ₹{result.eligibleAmount}
                </p>
              </div>

              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-gray-500">Best Amount</p>
                <p className="font-semibold text-orange-700">
                  ₹{result.bestAmount}
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500">Base Gold (raw)</p>
                <p className="font-medium text-gray-900">
                  {result.baseGramRaw} g
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500">Rounded Gold</p>
                <p className="font-medium text-gray-900">
                  {result.roundedGram} g
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-500">Bonus Gold</p>
                <p className="font-medium text-gray-900">
                  {result.bonusMg} mg
                </p>
              </div>

              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-gray-500">Total Gold Credited</p>
                <p className="text-xl font-bold text-green-700">
                  {result.totalMg} mg
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
