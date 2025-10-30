import { useState } from "react";
import "./App.css";

interface LabelData {
  productCode: string;
  mfgDate: string;
  expDate: string;
  price: string;
}

function App() {
  const [labelData, setLabelData] = useState<LabelData>({
    productCode: "NP2510-01",
    mfgDate: "20/09/25",
    expDate: "20/03/26",
    price: "399/-",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLabelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreview = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    // Create pairs of rows
    const rowPairs = [];
    for (let i = 0; i < 4; i++) {
      // 4 pairs to make 8 rows total
      const twoRows = [];
      for (let j = 0; j < 2; j++) {
        // 2 rows in each pair
        const row = [];
        for (let k = 0; k < 5; k++) {
          // 5 labels in each row
          row.push(labelData);
        }
        twoRows.push(row);
      }
      rowPairs.push(twoRows);
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Labels Preview</title>
          <style>
            .grid-container {
              max-width: 210mm;
              margin: 0 auto;
            }
            .grid-section {
              display: grid;
              grid-template-columns: repeat(5, 1fr);
              gap: 10px;
              margin-bottom: 5px;
            }
            .grid-section-4 { margin-bottom: 40px; }
            .grid-section-1 { margin-bottom: 40px; }
            .grid-section-2 { margin-bottom: 40px; }
            .grid-section-3 { margin-bottom: 40px; }
            .label {
              border: 1px solid #000;
              padding: 10px;
              text-align: center;
              border-radius: 8px;
              margin-bottom:10px;
            }
            .label p {
              margin: 5px 0;
              font-size: 14px;         
            }
            @media print {
              body { margin: 0; }
              .grid-section { gap: 0; }
              .label { border: none; }
            }
          </style>
        </head>
        <body>
          <div class="grid-container">
            ${rowPairs
              .map(
                (pair, index) => `
              <div class="grid-section grid-section-${index + 1}">
                ${pair
                  .flat()
                  .map(
                    (label) => `
                  <div class="label">
                    <p>${label.productCode}</p>
                    <p>${label.mfgDate}</p>
                    <p>${label.expDate}</p>
                    <p>${label.price}</p>
                  </div>
                `
                  )
                  .join("")}
              </div>
            `
              )
              .join("")}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="container">
      <h1 className="text-[50px]">PVRao's Nutritional mix</h1>
      <h2 className="text-[25px]">Label Generator</h2>
      <div className="input-group">
        <div>
          <label>Product Code:</label>
          <input
            type="text"
            name="productCode"
            value={labelData.productCode}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Manufacturing Date:</label>
          <input
            type="text"
            name="mfgDate"
            value={labelData.mfgDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Expiry Date:</label>
          <input
            type="text"
            name="expDate"
            value={labelData.expDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={labelData.price}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button onClick={handlePreview}>Preview</button>
    </div>
  );
}

export default App;
