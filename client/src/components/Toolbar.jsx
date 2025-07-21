import React from 'react';

const Toolbar = ({ color, setColor, stroke, setStroke, clearCanvas }) => {
  return (
    <div style={styles.toolbar}>
      <label style={styles.label}>Color:</label>
      <select
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={styles.select}
      >
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>

      <label style={styles.label}>Stroke:</label>
      <input
        type="range"
        min="1"
        max="10"
        value={stroke}
        onChange={(e) => setStroke(parseInt(e.target.value))}
        style={styles.slider}
      />

      <button onClick={clearCanvas} style={styles.button}>
        Clear Canvas
      </button>
    </div>
  );
};

const styles = {
  toolbar: {
    textAlign: 'center',
    marginBottom: '10px',
    padding: '10px',
    background: '#f9f9f9',
    borderRadius: '8px',
  },
  label: {
    marginLeft: '10px',
    marginRight: '5px',
    fontWeight: '500',
  },
  select: {
    padding: '4px 8px',
    borderRadius: '4px',
    marginRight: '20px',
  },
  slider: {
    verticalAlign: 'middle',
    marginRight: '20px',
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Toolbar;
