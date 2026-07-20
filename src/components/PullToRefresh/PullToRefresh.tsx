import {useEffect, useRef, useState} from 'react';
import {
  useMotionValue,
  useReducedMotion,
  animate,
  type AnimationPlaybackControls,
} from 'motion/react';

const PULL_THRESHOLD = 80;
const MAX_PULL = 150;
const HIDDEN_Y = -72;
const REST_Y = 12;
const CIRCUMFERENCE = 138.2;
const REFRESH_DELAY = 500;

const clamp = (x: number, a: number, b: number) => Math.min(Math.max(x, a), b);

const rubberband = (overshoot: number, dimension: number, constant = 0.55) =>
  (overshoot * dimension * constant) /
  (dimension + constant * Math.abs(overshoot));

type PullState = 'idle' | 'pulling' | 'ready' | 'refreshing';

const PullToRefresh = () => {
  const [state, setState] = useState<PullState>('idle');
  const reduceMotion = useReducedMotion();

  const pull = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  const startY = useRef(0);
  const lastY = useRef(0);
  const lastT = useRef(0);
  const velocity = useRef(0);
  const isPulling = useRef(false);
  const controls = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    const apply = (v: number) => {
      const card = cardRef.current;
      if (card) {
        const t = clamp(v / PULL_THRESHOLD, 0, 1);
        card.style.transform = `translateY(${
          HIDDEN_Y + (REST_Y - HIDDEN_Y) * t
        }px) scale(${0.85 + 0.15 * t})`;
        card.style.opacity = String(clamp(v / 30, 0, 1));
      }
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = String(
          CIRCUMFERENCE * (1 - clamp(v / PULL_THRESHOLD, 0, 1)),
        );
      }
    };

    apply(pull.get());
    const unsub = pull.on('change', apply);

    const stopAnim = () => {
      controls.current?.stop();
      controls.current = null;
    };

    const settle = (to: number, initial: number, onDone?: () => void) => {
      stopAnim();
      const anim = animate(pull, to, {
        type: 'spring',
        bounce: reduceMotion ? 0 : 0.2,
        duration: reduceMotion ? 0.2 : 0.4,
        velocity: reduceMotion ? 0 : initial,
      });
      controls.current = anim;
      if (onDone) anim.then(onDone).catch(() => {});
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY !== 0 || !e.touches[0]) {
        isPulling.current = false;
        return;
      }
      stopAnim();
      isPulling.current = true;
      startY.current = e.touches[0].clientY - pull.get();
      lastY.current = e.touches[0].clientY;
      lastT.current = performance.now();
      velocity.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling.current || !e.touches[0]) return;
      const clientY = e.touches[0].clientY;
      const raw = clientY - startY.current;

      if (raw <= 0 || window.scrollY !== 0) {
        isPulling.current = false;
        pull.set(0);
        setState('idle');
        return;
      }

      if (e.cancelable) e.preventDefault();

      const damped =
        raw <= PULL_THRESHOLD
          ? raw
          : PULL_THRESHOLD +
            rubberband(raw - PULL_THRESHOLD, window.innerHeight);
      pull.set(Math.min(damped, MAX_PULL));

      const now = performance.now();
      const dt = now - lastT.current;
      if (dt > 0) velocity.current = ((clientY - lastY.current) / dt) * 1000;
      lastY.current = clientY;
      lastT.current = now;

      setState(pull.get() >= PULL_THRESHOLD ? 'ready' : 'pulling');
    };

    const handleTouchEnd = () => {
      if (!isPulling.current) return;
      isPulling.current = false;

      if (pull.get() >= PULL_THRESHOLD) {
        setState('refreshing');
        settle(PULL_THRESHOLD, velocity.current);
        setTimeout(() => window.location.reload(), REFRESH_DELAY);
      } else {
        settle(0, velocity.current, () => setState('idle'));
      }
    };

    document.addEventListener('touchstart', handleTouchStart, {passive: true});
    document.addEventListener('touchmove', handleTouchMove, {passive: false});
    document.addEventListener('touchend', handleTouchEnd, {passive: true});
    document.addEventListener('touchcancel', handleTouchEnd, {passive: true});

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchEnd);
      unsub();
      stopAnim();
    };
  }, [pull, reduceMotion]);

  return (
    <div className="ptr-anchor" aria-hidden={state === 'idle'}>
      <div
        className={`pull-to-refresh ${state !== 'idle' ? state : ''}`}
        id="pullToRefresh"
        ref={cardRef}
      >
        <div className="pull-to-refresh-icon-wrapper">
          <svg className="pull-to-refresh-progress" viewBox="0 0 50 50">
            <circle
              ref={circleRef}
              cx="25"
              cy="25"
              r="22"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE}
            />
          </svg>
          <div className="pull-to-refresh-icon" />
        </div>
      </div>
    </div>
  );
};

export default PullToRefresh;
