// File: src/components/SplicingTool.js
import React, { useState } from 'react';
import axios from 'axios';

const SplicingTool = () => {
  const [spliceType, setSpliceType] = useState('fusion');
  const [fiberType, setFiberType] = useState('single-mode');
  const [spliceLength, setSpliceLength] = useState(0);
  const [loss, setLoss] = useState(null);

  const calculateLoss = async () => {
    try {
      const response = await axios.post('/api/splicing/calculate-loss', { spliceType, fiberType, spliceLength });
      setLoss(response.data.loss);
    } catch (error) {
      alert('Error calculating loss');
    }
  };

  return (
    <div>
      <h2>Fiber Splicing Tool</h2>
      <label>
        Splice Type:
        <select value={spliceType} onChange={(e) => setSpliceType(e.target.value)}>
          <option value="fusion">Fusion</option>
          <option value="mechanical">Mechanical</option>
        </select>
      </label>
      <label>
        Fiber Type:
        <select value={fiberType} onChange={(e) => setFiberType(e.target.value)}>
          <option value="single-mode">Single-mode</option>
          <option value="multi-mode">Multi-mode</option>
        </select>
      </label>
      <label>
        Splice Length:
        <input type="number" value={spliceLength} onChange={(e) => setSpliceLength(e.target.value)} />
      </label>
      <button onClick={calculateLoss}>Calculate Loss</button>
      {loss !== null && <p>Calculated Loss: {loss} dB</p>}
    </div>
  );
};

export default SplicingTool;
