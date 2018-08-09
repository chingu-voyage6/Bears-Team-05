const palettes = [
  [ null,      '#FF0D72', '#0DC2FF', '#0DFF72',
    '#F538FF', '#FF8E0D', '#FFE138', '#3877FF' ],
  [ null,      '#727540', '#8d934b', '#c9d39e',
    '#4a879a', '#6ba9c2', '#a1b089', '#3f4e31' ],
  [ null,      '#3d86a7', '#f7dbb3', '#c08c5c',
    '#275469', '#efe7d4', '#f8d581', '#98bad3' ],
  [ null,      '#5aa3ce', '#5e624b', '#44587d',
    '#67a216', '#8e8161', '#d1e8ee', '#907cd1' ],
  [ null,      '#d1e8ee', '#753208', '#e9740a',
    '#af7b4c', '#b74900', '#799297', '#f49f20' ],
  [ null,      '#aa580c', '#427ea2', '#e18c0f',
    '#e76f8b', '#c1c9dc', '#f2b13a', '#c4194f' ],
];

/**
 * Returns a custom color palette
*/
const getPalette = (index) => {
  return palettes[index];
};

export default getPalette;
