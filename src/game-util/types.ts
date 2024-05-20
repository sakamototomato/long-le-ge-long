export const colorType = {
    1: { background: '#FFB7DD' },
    2: { background: '#FFCCCC' },
    3: { background: '#FFC8B4' },
    4: { background: '#FFDDAA' },
    5: { background: '#FFEE99' },
    6: { background: '#FFFFBB' },
    7: { background: '#EEFFBB' },
    8: { background: '#CCFF99' },
    9: { background: '#99FF99' },
    10: { background: '#BBFFEE' },
    11: { background: '#AAFFEE' },
    12: { background: '#99FFFF' },
    13: { background: '#CCEEFF' },
    14: { background: '#CCDDFF' }
};
export const contentType = {
    1: '🥕',
    2: '✂️',
    3: '🥦',
    4: '🥛',
    5: '🌊',
    6: '🧤',
    7: '🧵',
    8: '🌱',
    9: '🔨',
    10: '🌽',
    11: '🌾',
    12: '🐑',
    13: '🪵',
    14: '🔥'
};

export type CardItemValue = keyof typeof contentType
