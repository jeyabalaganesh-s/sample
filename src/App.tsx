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
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">DigiGold Investment Optimizer</h1>

      <div className="grid grid-cols-1 gap-4">
        <label className="text-sm">Gold Price per Gram (₹)</label>
        <input
          type="number"
          value={goldPrice}
          onChange={(e) => setGoldPrice(Number(e.target.value))}
          className="border p-2 rounded"
        />

        <label className="text-sm">Bonus per Transaction (mg)</label>
        <input
          type="number"
          value={bonusMg}
          onChange={(e) => setBonusMg(Number(e.target.value))}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={calculateBestAmount}
        className="bg-orange-600 text-white px-4 py-2 rounded"
      >
        Find Minimal Best Amount
      </button>

      {result && (
        <div className="bg-gray-50 border rounded p-4 space-y-2">
          <h2 className="font-semibold text-lg">Minimal Best Transaction</h2>
          <p><b>Bonus Eligibility Threshold:</b> ₹{result.eligibleAmount}</p>
          <p><b>Best Minimal Amount to Invest:</b> ₹{result.bestAmount}</p>
          <p>Base Gold (raw): {result.baseGramRaw} g</p>
          <p>Rounded Gold (3-decimal): {result.roundedGram} g</p>
          <p>Bonus Gold: {result.bonusMg} mg</p>
          <p className="font-semibold"><b>Total Gold Credited:</b> {result.totalMg} mg</p>
        </div>
      )}
    </div>
  );
}
