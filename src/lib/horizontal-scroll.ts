// Lets mouse users scroll the horizontal rows (news, podcasts, VODs, sponsors).
// Those rows hide their scrollbar, so a mouse wheel (vertical only) and a mouse
// without a scrollbar to grab could not move them. Trackpad, touch and keyboard
// already work and are left untouched.
//
// Opt in with the `data-horizontal-scroll` attribute on the overflow container.

const DRAG_THRESHOLD = 5;
const LINE_HEIGHT = 16;

function canScroll(el: HTMLElement, delta: number) {
  const max = el.scrollWidth - el.clientWidth;
  if (max <= 0) return false;
  return delta < 0 ? el.scrollLeft > 0 : el.scrollLeft < max - 1;
}

function setup(el: HTMLElement) {
  // Mouse wheel: turn vertical wheel movement into horizontal scrolling,
  // but let the page scroll once the row reaches its start or end.
  el.addEventListener(
    "wheel",
    (event) => {
      if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
        return;
      }
      const delta =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? event.deltaY * LINE_HEIGHT
          : event.deltaY;
      if (!canScroll(el, delta)) return;
      event.preventDefault();
      el.scrollLeft += delta;
    },
    { passive: false },
  );

  // Click and drag with a mouse. A real drag must not open the card under it.
  let startX = 0;
  let startScroll = 0;
  let pointerId: number | null = null;
  let dragged = false;

  el.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    if (el.scrollWidth <= el.clientWidth) return;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScroll = el.scrollLeft;
    dragged = false;
  });

  el.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pointerId) return;
    const dx = event.clientX - startX;
    if (!dragged && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!dragged) {
      dragged = true;
      el.setPointerCapture(event.pointerId);
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    }
    el.scrollLeft = startScroll - dx;
  });

  const end = (event: PointerEvent) => {
    if (event.pointerId !== pointerId) return;
    pointerId = null;
    el.style.cursor = "";
    el.style.userSelect = "";
    if (el.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
  };
  el.addEventListener("pointerup", end);
  el.addEventListener("pointercancel", end);

  el.addEventListener(
    "click",
    (event) => {
      if (!dragged) return;
      dragged = false;
      event.preventDefault();
      event.stopPropagation();
    },
    { capture: true },
  );

  // Links and images are natively draggable, which would steal the gesture.
  el.addEventListener("dragstart", (event) => event.preventDefault());
}

document
  .querySelectorAll<HTMLElement>("[data-horizontal-scroll]")
  .forEach(setup);
