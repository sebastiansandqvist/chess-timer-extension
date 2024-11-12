console.log('test');

const waitForElements = async () => {
  return new Promise<{ clockA: Element; clockB: Element; board: Element }>((resolve) => {
    const interval = setInterval(() => {
      const clockA = document.querySelector('.player-top .clock-time-monospace');
      const clockB = document.querySelector('.player-bottom .clock-time-monospace');
      const board = document.querySelector('wc-chess-board');
      console.log({ clockA, clockB, board });
      if (clockA && clockB && board) {
        clearInterval(interval);
        resolve({ clockA, clockB, board });
      }
    }, 500);
  });
};

function makeOverlay() {
  const overlay = document.createElement('div');
  Object.assign(overlay.style, {
    color: 'white',
    textShadow: `0 0 3px black, 0 0 2px black, 0 0 1px black, -2px -2px 0 rgba(0, 0, 0, 0.1), -1px -1px 0 rgba(0, 0, 0, 0.1), 0px 0px 0 rgba(0, 0, 0, 0.1), 1px 1px 0 rgba(0, 0, 0, 0.1), 2px 2px 0 rgba(0, 0, 0, 0.1), 2px -2px 0 rgba(0, 0, 0, 0.1), -2px 2px 0 rgba(0, 0, 0, 0.1), 2px 0px 0 rgba(0, 0, 0, 0.1), 0px 2px 0 rgba(0, 0, 0, 0.1), 1px 1px 2px rgba(0, 0, 0, 0.1)`,
    display: 'grid',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'fixed',
    zIndex: '1000',
    pointerEvents: 'none',
    fontFamily: 'monospace',
    fontWeight: '500',
    textAlign: 'center',
    opacity: '0.8',
  });
  const timerA = document.createElement('span');
  const timerB = document.createElement('span');
  const separator = document.createElement('span');
  separator.textContent = ' - ';
  overlay.appendChild(timerA);
  overlay.appendChild(separator);
  overlay.appendChild(timerB);
  return { overlay, timerA, timerB };
}

function updateClocks({
  overlay,
  timeA,
  timeB,
  timerA,
  timerB,
  board,
}: {
  overlay: HTMLDivElement;
  timerA: HTMLSpanElement;
  timerB: HTMLSpanElement;
  timeA: string;
  timeB: string;
  board: Element;
}) {
  const { top, left, height, width } = board.getBoundingClientRect();
  Object.assign(overlay.style, {
    top: `${top}px`,
    left: `${left}px`,
    height: `${height}px`,
    width: `${width}px`,
    fontSize: `${width / 10}px`,
  });

  // times will be formatted `10:01` or `0:10.1` if running low
  timerA.textContent = timeA;
  if (timeA.includes('.')) {
    timerA.style.color = '#fb7185';
  }

  timerB.textContent = timeB;
  if (timeB.includes('.')) {
    timerB.style.color = '#fb7185';
  }
}

async function main() {
  const { clockA, clockB, board } = await waitForElements();
  const { overlay, timerA, timerB } = makeOverlay();
  document.body.appendChild(overlay);

  const observer = new MutationObserver(() => {
    const timeA = clockA.textContent ?? '';
    const timeB = clockB.textContent ?? '';
    console.log({ timeA, timeB });
    updateClocks({ overlay, timeA, timeB, timerA, timerB, board });
  });

  observer.observe(clockA, { childList: true });
  observer.observe(clockB, { childList: true });
}

main();
