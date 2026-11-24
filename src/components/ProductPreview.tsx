import { useEffect, useRef, useState, type DragEvent, type MouseEvent } from 'react';
import {
  AlertTriangle,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  Download,
  ListChecks,
  Loader2,
  Megaphone,
  QrCode,
  RotateCcw,
  Upload,
  X,
} from 'lucide-react';

type Lang = 'en' | 'zh-cn';
type ScreenId = 'participant' | 'console' | 'review' | 'pickup';
type ReviewKey = 'new' | 'rev' | 'sample';
type SubmitPhase = 'idle' | 'parsing' | 'done';

interface ReviewDiff {
  title: string;
  durLabel: string;
  durFrom: string;
  durTo: string;
  massLabel: string;
  massVal: string;
}

interface ReviewItem {
  key: ReviewKey;
  file: string;
  meta: string;
  ago: string;
  c1: string;
  c2: string;
  c3: string;
  kind: string;
  who: string;
  avc: string;
  av: string;
  user: string;
  at: string;
  no: string;
  dur: string;
  grams: string;
  fil: string;
  reason: string;
  warning?: string;
  diff?: ReviewDiff;
}

function PrinterMark({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="14" height="14" rx="2" />
      <path d="M4 7.2L7.6 3.6A2 2 0 0 1 9 3h10a2 2 0 0 1 2 2v10a2 2 0 0 1-.6 1.4L17 19.8M16.6 7.4L20.4 3.6" />
      <path d="M4 11.5h12M6.5 18.6h7" />
      <rect x="8.5" y="9.5" width="3" height="3.5" rx=".8" fill="currentColor" stroke="none" />
      <path d="M9.25 13h1.5l-.75 1.2z" fill="currentColor" stroke="currentColor" strokeWidth=".8" />
      <rect x="8" y="15.5" width="4" height="2.3" rx=".5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function NozzleIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" style={{ color }}>
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M10.9164 5.82088H12.0367L7.64981 9.2456C7.44976 9.40141 7.09128 9.40141 6.8911 9.24576L2.50397 5.82088H3.62426C3.98018 5.82088 4.31912 5.71807 4.57859 5.5339C4.83782 5.34992 5.04004 5.06443 5.04004 4.71475V1.51789C5.04004 1.48567 5.05793 1.42397 5.15334 1.35625C5.24849 1.28872 5.39869 1.23529 5.58083 1.23529H8.95983C9.14201 1.23529 9.29216 1.28872 9.38736 1.35625C9.48273 1.42397 9.50067 1.48567 9.50067 1.51789V4.71475C9.50067 5.06443 9.70288 5.34992 9.96206 5.5339C10.2216 5.71807 10.5605 5.82088 10.9164 5.82088Z" />
        <g strokeMiterlimit="10" strokeLinecap="round">
          <path d="M3.32841 7.9104C3.13862 7.99786 2.99969 8.10204 2.99969 8.25752C2.99969 8.73805 4.33995 8.73805 4.33995 9.21718C4.33995 9.69771 2.99969 9.69771 2.99969 10.1768C2.99969 10.6573 4.33995 10.6573 4.33995 11.1378C4.33995 11.6183 2.99969 11.6183 2.99969 12.0988" />
          <path d="M7.55533 10.7654C7.77252 10.8584 7.94078 10.9682 7.94078 11.1376C7.94078 11.6181 6.60052 11.6181 6.60052 12.0986" />
          <path d="M10.4064 8.53925C10.782 8.76563 11.5412 8.85589 11.5412 9.21701C11.5412 9.69746 10.2009 9.69746 10.2009 10.1766C10.2009 10.6571 11.5412 10.6571 11.5412 11.1376C11.5412 11.6181 10.2009 11.6181 10.2009 12.0986" />
        </g>
      </g>
    </svg>
  );
}

function BedIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" style={{ color }}>
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <g strokeMiterlimit="10" strokeLinecap="round">
          <path d="M4.15221 1.75C4.15221 2.45497 2.72754 2.45497 2.72754 3.15854C2.72754 3.86351 4.15221 3.86351 4.15221 4.56847C4.15221 5.27344 2.72754 5.27344 2.72754 5.97841C2.72754 6.68338 4.15221 6.68338 4.15221 7.38834C4.15221 8.09331 2.72754 8.09331 2.72754 8.7983" />
          <path d="M7.98034 1.75C7.98034 2.45497 6.55566 2.45497 6.55566 3.15854C6.55566 3.86351 7.98034 3.86351 7.98034 4.56847C7.98034 5.27344 6.55566 5.27344 6.55566 5.97841C6.55566 6.68338 7.98034 6.68338 7.98034 7.38834C7.98034 8.09331 6.55566 8.09331 6.55566 8.7983" />
          <path d="M11.8098 1.75C11.8098 2.45497 10.3851 2.45497 10.3851 3.15854C10.3851 3.86351 11.8098 3.86351 11.8098 4.56847C11.8098 5.27344 10.3851 5.27344 10.3851 5.97841C10.3851 6.68338 11.8098 6.68338 11.8098 7.38834C11.8098 8.09331 10.3851 8.09331 10.3851 8.7983" />
        </g>
        <path d="M3.0107 10.5923H11.7442C12.1988 10.5923 12.5674 10.9609 12.5674 11.4155C12.5674 11.8702 12.1988 12.2387 11.7442 12.2387H3.0107C2.55606 12.2387 2.1875 11.8702 2.1875 11.4155C2.1875 10.9609 2.55606 10.5923 3.0107 10.5923Z" />
      </g>
    </svg>
  );
}

function ChamberIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" style={{ color }}>
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M2.79049 1.3125H12.485C12.749 1.3125 12.963 1.5265 12.963 1.79049V12.3186C12.963 12.5826 12.749 12.7966 12.485 12.7966H2.79049C2.5265 12.7966 2.3125 12.5826 2.3125 12.3186V1.79049C2.3125 1.5265 2.5265 1.3125 2.79049 1.3125Z" />
        <path d="M4.77719 3.70337H10.4974C10.7614 3.70337 10.9754 3.91737 10.9754 4.18136V5.14115C10.9754 5.40514 10.7614 5.61915 10.4974 5.61915H4.77719C4.5132 5.61915 4.29919 5.40514 4.29919 5.14115V4.18136C4.29919 3.91737 4.5132 3.70337 4.77719 3.70337Z" />
      </g>
    </svg>
  );
}

function IsometricPlateThumb({ c1, c2, c3 }: { c1: string; c2: string; c3: string }) {
  return (
    <svg viewBox="0 0 88 88" className="h-full w-full" aria-hidden="true">
      <path d="M44 62 L84 44 L44 26 L4 44 Z" fill="var(--pr-line)" />
      <g transform="translate(34 40) scale(2)">
        <path d="M0 0 L10 -4 L20 0 L10 4 Z" fill={c1} />
        <path d="M0 0 L10 4 L10 12 L0 8 Z" fill={c2} />
        <path d="M20 0 L10 4 L10 12 L20 8 Z" fill={c3} />
      </g>
    </svg>
  );
}

function PickupQrSvg() {
  return (
    <svg viewBox="-2 -2 25 25" width="168" height="168" aria-label="Pickup QR Code" role="img" className="block">
      <path
        d="M10.3 0H10.7a0.3 0.3 0 0 1 0.3 0.3V1H10V0.3a0.3 0.3 0 0 1 0.3 -0.3ZM12.3 0H12.7a0.3 0.3 0 0 1 0.3 0.3V0.7a0.3 0.3 0 0 1 -0.3 0.3H12.3a0.3 0.3 0 0 1 -0.3 -0.3V0.3a0.3 0.3 0 0 1 0.3 -0.3ZM8.3 1H8.7a0.3 0.3 0 0 1 0.3 0.3V1.7a0.3 0.3 0 0 1 -0.3 0.3H8.3a0.3 0.3 0 0 1 -0.3 -0.3V1.3a0.3 0.3 0 0 1 0.3 -0.3ZM10 1H11V1.7a0.3 0.3 0 0 1 -0.3 0.3H10.3a0.3 0.3 0 0 1 -0.3 -0.3V1ZM9.3 2H9.7a0.3 0.3 0 0 1 0.3 0.3V3H9V2.3a0.3 0.3 0 0 1 0.3 -0.3ZM8.3 3H9V4H8V3.3a0.3 0.3 0 0 1 0.3 -0.3ZM9 3H10V4H9V3ZM10 3H10.7a0.3 0.3 0 0 1 0.3 0.3V4H10V3ZM12.3 3H12.7a0.3 0.3 0 0 1 0.3 0.3V4H12V3.3a0.3 0.3 0 0 1 0.3 -0.3ZM8 4H9V5H8.3a0.3 0.3 0 0 1 -0.3 -0.3V4ZM9 4H10V5H9V4ZM10 4H11V5H10V4ZM11 4H12V5H11V4ZM12 4H13V5H12V4ZM9 5H10V6H9.3a0.3 0.3 0 0 1 -0.3 -0.3V5ZM10 5H11V6H10V5ZM12 5H13V6H12V5ZM8.3 6H8.7a0.3 0.3 0 0 1 0.3 0.3V7H8V6.3a0.3 0.3 0 0 1 0.3 -0.3ZM10 6H11V6.7a0.3 0.3 0 0 1 -0.3 0.3H10.3a0.3 0.3 0 0 1 -0.3 -0.3V6ZM12 6H13V7H12V6ZM8 7H9V8H8V7ZM11.3 7H12V8H11V7.3a0.3 0.3 0 0 1 0.3 -0.3ZM12 7H13V8H12V7ZM1.3 8H1.7a0.3 0.3 0 0 1 0.3 0.3V9H1V8.3a0.3 0.3 0 0 1 0.3 -0.3ZM3.3 8H4V9H3V8.3a0.3 0.3 0 0 1 0.3 -0.3ZM4 8H5V9H4V8ZM5 8H6V9H5V8ZM6 8H6.7a0.3 0.3 0 0 1 0.3 0.3V8.7a0.3 0.3 0 0 1 -0.3 0.3H6V8ZM8 8H9V9H8V8ZM9 8H9.7a0.3 0.3 0 0 1 0.3 0.3V9H9V8ZM11 8H12V9H11V8ZM12 8H13V9H12V8ZM13 8H14V9H13V8ZM14 8H14.7a0.3 0.3 0 0 1 0.3 0.3V9H14V8ZM16.3 8H17V9H16.3a0.3 0.3 0 0 1 -0.3 -0.3V8.3a0.3 0.3 0 0 1 0.3 -0.3ZM17 8H17.7a0.3 0.3 0 0 1 0.3 0.3V8.7a0.3 0.3 0 0 1 -0.3 0.3H17V8ZM19.3 8H19.7a0.3 0.3 0 0 1 0.3 0.3V8.7a0.3 0.3 0 0 1 -0.3 0.3H19.3a0.3 0.3 0 0 1 -0.3 -0.3V8.3a0.3 0.3 0 0 1 0.3 -0.3ZM1 9H2V10H1.3a0.3 0.3 0 0 1 -0.3 -0.3V9ZM2 9H3V10H2V9ZM3 9H4V10H3V9ZM4 9H5V10H4V9ZM8 9H9V10H8V9ZM9 9H10V10H9V9ZM11 9H12V10H11V9ZM13 9H14V10H13.3a0.3 0.3 0 0 1 -0.3 -0.3V9ZM14 9H15V10H14V9ZM15 9H15.7a0.3 0.3 0 0 1 0.3 0.3V10H15V9ZM18.3 9H18.7a0.3 0.3 0 0 1 0.3 0.3V10H18V9.3a0.3 0.3 0 0 1 0.3 -0.3ZM20.3 9H20.7a0.3 0.3 0 0 1 0.3 0.3V10H20V9.3a0.3 0.3 0 0 1 0.3 -0.3ZM0.3 10H0.7a0.3 0.3 0 0 1 0.3 0.3V10.7a0.3 0.3 0 0 1 -0.3 0.3H0.3a0.3 0.3 0 0 1 -0.3 -0.3V10.3a0.3 0.3 0 0 1 0.3 -0.3ZM3 10H4V11H3V10ZM4 10H5V11H4V10ZM5 10H6V11H5V10ZM6 10H7V11H6V10ZM7 10H8V11H7V10ZM8 10H9V11H8V10ZM9 10H10V10.7a0.3 0.3 0 0 1 -0.3 0.3H9V10ZM11 10H12V11H11V10ZM15 10H16V11H15V10ZM17.3 10H18V11H17V10.3a0.3 0.3 0 0 1 0.3 -0.3ZM18 10H19V10.7a0.3 0.3 0 0 1 -0.3 0.3H18V10ZM20 10H21V10.7a0.3 0.3 0 0 1 -0.3 0.3H20.3a0.3 0.3 0 0 1 -0.3 -0.3V10ZM3 11H4V12H3V11ZM5 11H6V11.7a0.3 0.3 0 0 1 -0.3 0.3H5.3a0.3 0.3 0 0 1 -0.3 -0.3V11ZM7 11H8V12H7V11ZM11 11H12V11.7a0.3 0.3 0 0 1 -0.3 0.3H11.3a0.3 0.3 0 0 1 -0.3 -0.3V11ZM13.3 11H14V12H13V11.3a0.3 0.3 0 0 1 0.3 -0.3ZM14 11H15V12H14V11ZM15 11H16V12H15V11ZM17 11H18V12H17V11ZM1.3 12H2V13H1.3a0.3 0.3 0 0 1 -0.3 -0.3V12.3a0.3 0.3 0 0 1 0.3 -0.3ZM2 12H3V13H2V12ZM3 12H4V12.7a0.3 0.3 0 0 1 -0.3 0.3H3V12ZM6.3 12H7V13H6.3a0.3 0.3 0 0 1 -0.3 -0.3V12.3a0.3 0.3 0 0 1 0.3 -0.3ZM7 12H8V13H7V12ZM8 12H8.7a0.3 0.3 0 0 1 0.3 0.3V13H8V12ZM10.3 12H10.7a0.3 0.3 0 0 1 0.3 0.3V12.7a0.3 0.3 0 0 1 -0.3 0.3H10.3a0.3 0.3 0 0 1 -0.3 -0.3V12.3a0.3 0.3 0 0 1 0.3 -0.3ZM13 12H14V13H13.3a0.3 0.3 0 0 1 -0.3 -0.3V12ZM14 12H15V13H14V12ZM15 12H16V12.7a0.3 0.3 0 0 1 -0.3 0.3H15V12ZM17 12H18V13H17V12ZM19.3 12H19.7a0.3 0.3 0 0 1 0.3 0.3V13H19V12.3a0.3 0.3 0 0 1 0.3 -0.3ZM8 13H9V14H8.3a0.3 0.3 0 0 1 -0.3 -0.3V13ZM9 13H9.7a0.3 0.3 0 0 1 0.3 0.3V13.7a0.3 0.3 0 0 1 -0.3 0.3H9V13ZM17 13H18V13.7a0.3 0.3 0 0 1 -0.3 0.3H17.3a0.3 0.3 0 0 1 -0.3 -0.3V13ZM19 13H20V14H19.3a0.3 0.3 0 0 1 -0.3 -0.3V13ZM20 13H20.7a0.3 0.3 0 0 1 0.3 0.3V14H20V13ZM11.3 14H12V15H11.3a0.3 0.3 0 0 1 -0.3 -0.3V14.3a0.3 0.3 0 0 1 0.3 -0.3ZM12 14H12.7a0.3 0.3 0 0 1 0.3 0.3V15H12V14ZM16.3 14H16.7a0.3 0.3 0 0 1 0.3 0.3V14.7a0.3 0.3 0 0 1 -0.3 0.3H16.3a0.3 0.3 0 0 1 -0.3 -0.3V14.3a0.3 0.3 0 0 1 0.3 -0.3ZM18.3 14H18.7a0.3 0.3 0 0 1 0.3 0.3V14.7a0.3 0.3 0 0 1 -0.3 0.3H18.3a0.3 0.3 0 0 1 -0.3 -0.3V14.3a0.3 0.3 0 0 1 0.3 -0.3ZM20 14H21V14.7a0.3 0.3 0 0 1 -0.3 0.3H20.3a0.3 0.3 0 0 1 -0.3 -0.3V14ZM8.3 15H8.7a0.3 0.3 0 0 1 0.3 0.3V16H8V15.3a0.3 0.3 0 0 1 0.3 -0.3ZM10.3 15H10.7a0.3 0.3 0 0 1 0.3 0.3V16H10V15.3a0.3 0.3 0 0 1 0.3 -0.3ZM12 15H13V15.7a0.3 0.3 0 0 1 -0.3 0.3H12.3a0.3 0.3 0 0 1 -0.3 -0.3V15ZM15.3 15H15.7a0.3 0.3 0 0 1 0.3 0.3V15.7a0.3 0.3 0 0 1 -0.3 0.3H15.3a0.3 0.3 0 0 1 -0.3 -0.3V15.3a0.3 0.3 0 0 1 0.3 -0.3ZM17.3 15H17.7a0.3 0.3 0 0 1 0.3 0.3V16H17V15.3a0.3 0.3 0 0 1 0.3 -0.3ZM8 16H9V17H8V16ZM10 16H11V17H10V16ZM14.3 16H14.7a0.3 0.3 0 0 1 0.3 0.3V16.7a0.3 0.3 0 0 1 -0.3 0.3H14.3a0.3 0.3 0 0 1 -0.3 -0.3V16.3a0.3 0.3 0 0 1 0.3 -0.3ZM17 16H18V17H17V16ZM19.3 16H20V17H19.3a0.3 0.3 0 0 1 -0.3 -0.3V16.3a0.3 0.3 0 0 1 0.3 -0.3ZM20 16H20.7a0.3 0.3 0 0 1 0.3 0.3V16.7a0.3 0.3 0 0 1 -0.3 0.3H20V16ZM8 17H9V17.7a0.3 0.3 0 0 1 -0.3 0.3H8.3a0.3 0.3 0 0 1 -0.3 -0.3V17ZM10 17H11V18H10V17ZM11 17H12V18H11V17ZM12 17H12.7a0.3 0.3 0 0 1 0.3 0.3V17.7a0.3 0.3 0 0 1 -0.3 0.3H12V17ZM15.3 17H15.7a0.3 0.3 0 0 1 0.3 0.3V18H15V17.3a0.3 0.3 0 0 1 0.3 -0.3ZM17 17H18V18H17V17ZM18 17H18.7a0.3 0.3 0 0 1 0.3 0.3V17.7a0.3 0.3 0 0 1 -0.3 0.3H18V17ZM9.3 18H10V19H9.3a0.3 0.3 0 0 1 -0.3 -0.3V18.3a0.3 0.3 0 0 1 0.3 -0.3ZM10 18H11V18.7a0.3 0.3 0 0 1 -0.3 0.3H10V18ZM13.3 18H14V19H13V18.3a0.3 0.3 0 0 1 0.3 -0.3ZM14 18H15V19H14V18ZM15 18H16V18.7a0.3 0.3 0 0 1 -0.3 0.3H15V18ZM17 18H18V19H17V18ZM19.3 18H20V19H19V18.3a0.3 0.3 0 0 1 0.3 -0.3ZM20 18H20.7a0.3 0.3 0 0 1 0.3 0.3V18.7a0.3 0.3 0 0 1 -0.3 0.3H20V18ZM8.3 19H8.7a0.3 0.3 0 0 1 0.3 0.3V19.7a0.3 0.3 0 0 1 -0.3 0.3H8.3a0.3 0.3 0 0 1 -0.3 -0.3V19.3a0.3 0.3 0 0 1 0.3 -0.3ZM13 19H14V20H13V19ZM14 19H15V19.7a0.3 0.3 0 0 1 -0.3 0.3H14V19ZM17 19H18V19.7a0.3 0.3 0 0 1 -0.3 0.3H17.3a0.3 0.3 0 0 1 -0.3 -0.3V19ZM19 19H20V20H19V19ZM11.3 20H11.7a0.3 0.3 0 0 1 0.3 0.3V20.7a0.3 0.3 0 0 1 -0.3 0.3H11.3a0.3 0.3 0 0 1 -0.3 -0.3V20.3a0.3 0.3 0 0 1 0.3 -0.3ZM13 20H14V20.7a0.3 0.3 0 0 1 -0.3 0.3H13.3a0.3 0.3 0 0 1 -0.3 -0.3V20ZM16.3 20H16.7a0.3 0.3 0 0 1 0.3 0.3V20.7a0.3 0.3 0 0 1 -0.3 0.3H16.3a0.3 0.3 0 0 1 -0.3 -0.3V20.3a0.3 0.3 0 0 1 0.3 -0.3ZM19 20H20V20.7a0.3 0.3 0 0 1 -0.3 0.3H19.3a0.3 0.3 0 0 1 -0.3 -0.3V20ZM1.6 0H5.4a1.6 1.6 0 0 1 1.6 1.6V5.4a1.6 1.6 0 0 1 -1.6 1.6H1.6a1.6 1.6 0 0 1 -1.6 -1.6V1.6a1.6 1.6 0 0 1 1.6 -1.6ZM1.9 1H5.1a0.9 0.9 0 0 1 0.9 0.9V5.1a0.9 0.9 0 0 1 -0.9 0.9H1.9a0.9 0.9 0 0 1 -0.9 -0.9V1.9a0.9 0.9 0 0 1 0.9 -0.9ZM2.8 2H4.2a0.8 0.8 0 0 1 0.8 0.8V4.2a0.8 0.8 0 0 1 -0.8 0.8H2.8a0.8 0.8 0 0 1 -0.8 -0.8V2.8a0.8 0.8 0 0 1 0.8 -0.8ZM15.6 0H19.4a1.6 1.6 0 0 1 1.6 1.6V5.4a1.6 1.6 0 0 1 -1.6 1.6H15.6a1.6 1.6 0 0 1 -1.6 -1.6V1.6a1.6 1.6 0 0 1 1.6 -1.6ZM15.9 1H19.1a0.9 0.9 0 0 1 0.9 0.9V5.1a0.9 0.9 0 0 1 -0.9 0.9H15.9a0.9 0.9 0 0 1 -0.9 -0.9V1.9a0.9 0.9 0 0 1 0.9 -0.9ZM16.8 2H18.2a0.8 0.8 0 0 1 0.8 0.8V4.2a0.8 0.8 0 0 1 -0.8 0.8H16.8a0.8 0.8 0 0 1 -0.8 -0.8V2.8a0.8 0.8 0 0 1 0.8 -0.8ZM1.6 14H5.4a1.6 1.6 0 0 1 1.6 1.6V19.4a1.6 1.6 0 0 1 -1.6 1.6H1.6a1.6 1.6 0 0 1 -1.6 -1.6V15.6a1.6 1.6 0 0 1 1.6 -1.6ZM1.9 15H5.1a0.9 0.9 0 0 1 0.9 0.9V19.1a0.9 0.9 0 0 1 -0.9 0.9H1.9a0.9 0.9 0 0 1 -0.9 -0.9V15.9a0.9 0.9 0 0 1 0.9 -0.9ZM2.8 16H4.2a0.8 0.8 0 0 1 0.8 0.8V18.2a0.8 0.8 0 0 1 -0.8 0.8H2.8a0.8 0.8 0 0 1 -0.8 -0.8V16.8a0.8 0.8 0 0 1 0.8 -0.8Z"
        fill="#171717"
        fillRule="evenodd"
      />
    </svg>
  );
}

interface PrinterCardData {
  id: string;
  model: string;
  label: string;
  tone: 'busy' | 'wait' | 'ok';
  shot: string;
  temps: { kind: 'nozzle' | 'bed' | 'chamber'; val: string; target: string; color: string }[];
  ams: { slots: string[]; err?: boolean }[];
  owner?: string;
  avatar?: string;
  avBg?: string;
  file?: string;
  hero: string;
  heroSmall: string;
  pct?: number;
  context: string;
  alert?: string;
}

const SCREEN_DATA = {
  en: {
    screens: [
      { id: 'participant' as ScreenId, label: 'Overview', ctx: 'User Portal' },
      { id: 'console' as ScreenId, label: 'Console', ctx: 'Operator Console' },
      { id: 'review' as ScreenId, label: 'Review', ctx: 'Review Queue' },
      { id: 'pickup' as ScreenId, label: 'Pickup', ctx: 'Pickup Pass' },
    ],
    resetLabel: 'Reset demo',
    overviewTitle: 'Overview',
    announcement:
      'Pickup desk has moved to Service Counter B. New submissions close at 22:00; queued orders keep printing overnight. Collect remaining parts from 09:00 tomorrow with your pickup code.',
    announcementMeta: 'Posted 11/16 18:30',
    myOrder: {
      title: 'My Orders',
      status: 'Ready for Pickup',
      collectedStatus: 'Collected',
      no: '#0039',
      name: 'Enclosure Snap Clip',
      detail: 'Stored at A-2-3',
      collectedDetail: 'Verified at Counter B',
      more: '1 printing · 1 queued',
      hint: 'View pickup pass',
    },
    site: {
      title: 'Site',
      idleUnit: 'idle',
      queuedUnit: 'queued',
      wait: 'Est. wait 1–2h',
    },
    submitCard: {
      title: 'Submit File',
      sub: 'Click for sample .gcode.3mf or drop file',
      defaultFile: 'servo_bracket.gcode.3mf',
      parsingTitle: 'Parsing .gcode.3mf…',
      parsingSub: 'Worker checking metadata & G-code',
      doneTitle: 'Submitted to queue',
      doneMeta: 'PLA Blue · 0.4 mm · 42m · 18 g',
      goReview: 'Inspect in Review →',
      submittedToast: (file: string) => `Worker validated ${file} — queued for review`,
    },
    printersHeading: 'Printers',
    printersCount: '3',
    consoleActions: {
      reloadBtn: 'Reload',
      clearBedBtn: 'Confirm Clear',
      reloadedToast: 'H2D-01 filament reloaded — print resumed',
      bedClearedToast: 'X2D-02 bed confirmed clear — printer released to pool',
      resumedLabel: 'Printing',
      resumedHeroSmall: 'remaining',
    },
    consoleTop: {
      todoPrefix: 'To-do · ',
      todoMore: '2 more items',
      todos: [
        { id: 'H2D-01', text: 'AMS A2 filament runout', time: '8m', tone: 'alert' as const },
        { id: 'X2D-02', text: 'Awaiting bed clear', time: '35m', tone: 'wait' as const },
        { id: '#0027', text: 'Pickup waiting > 24h', time: '1d', tone: 'idle' as const },
      ],
      reviewTitle: 'Pending Review',
      ordersUnit: 'orders',
      reviewSub: 'Oldest waiting 18m',
      reviewSubEmpty: 'Queue caught up',
      reviewFoot: '1 revision included',
    },
    printers: [
      {
        id: 'X2D-01',
        model: 'Bambu Lab X2D',
        label: 'Printing',
        tone: 'busy',
        shot: '14:32:05',
        temps: [
          { kind: 'nozzle', val: '220', target: ' / 220°C', color: 'var(--pr-heat)' },
          { kind: 'bed', val: '60', target: ' / 60°C', color: 'var(--pr-heat)' },
          { kind: 'chamber', val: '38', target: ' / 40°C', color: 'var(--pr-heat)' },
        ],
        ams: [
          { slots: ['#F2F2F2', '#1F6FEB', '#E5484D', '#2B2B2B'] },
          { slots: ['#F5A524', '#3DD68C', '', '#8B5CF6'] },
        ],
        owner: 'Yifan Chen',
        avatar: 'Y',
        avBg: '#0ea5e9',
        file: 'arm_bearing.gcode.3mf',
        hero: '1h 04m',
        heroSmall: 'remaining',
        pct: 62,
        context: 'Layer 133 / 215 · ETA 15:42',
      },
      {
        id: 'H2D-01',
        model: 'Bambu Lab H2D',
        label: 'Paused',
        tone: 'wait',
        shot: '14:32:01',
        temps: [
          { kind: 'nozzle', val: '200', target: ' / 220°C', color: 'var(--pr-heat)' },
          { kind: 'bed', val: '55', target: ' / 55°C', color: 'var(--pr-heat)' },
          { kind: 'chamber', val: '36', target: ' / —', color: 'var(--pr-muted)' },
        ],
        ams: [{ slots: ['#2B2B2B', '#3DD68C', '#FFFFFF', '#FFD60A'], err: true }],
        owner: 'Le Zhao',
        avatar: 'L',
        avBg: '#8b5cf6',
        file: 'gearbox_shell.gcode.3mf',
        hero: '1h 40m',
        heroSmall: 'remaining · paused',
        pct: 37,
        context: 'Layer 64 / 180',
        alert: 'AMS A2 runout — awaiting operator reload',
      },
      {
        id: 'P1S-05',
        model: 'Bambu Lab P1S',
        label: 'Idle',
        tone: 'ok',
        shot: '14:31:57',
        temps: [
          { kind: 'nozzle', val: '27', target: ' / —', color: 'var(--pr-muted)' },
          { kind: 'bed', val: '26', target: ' / —', color: 'var(--pr-muted)' },
          { kind: 'chamber', val: '25', target: ' / —', color: 'var(--pr-muted)' },
        ],
        ams: [{ slots: ['#F2F2F2', '#2B2B2B', '#E5484D', ''] }],
        hero: 'Available',
        heroSmall: '',
        context: '0.4 mm nozzle · PLA / PETG',
      },
    ] satisfies PrinterCardData[],
    review: {
      title: 'Review',
      pendingSuffix: 'pending review',
      download: 'Download',
      fileSection: 'File',
      plateLabel: 'Plate 1',
      plateTotal: ' · 1 plate total',
      machineKey: 'Printer',
      machineVal: 'Bambu Lab X2D · 0.4 mm nozzle',
      plateKey: 'Build Plate',
      plateVal: 'Textured PEI Plate',
      estKey: 'Estimate',
      infoSection: 'Submission Info',
      reasonKey: 'Purpose',
      colorKey: 'Color Pref.',
      colorVal: 'Similar match OK',
      reject: 'Reject',
      approve: 'Approve',
      emptyTitle: 'Review queue is clear',
      emptySub: 'All pending submissions in this sandbox have been processed.',
      submitSampleBtn: 'Try sample submission',
      approvedToast: (no: string) => `Approved ${no} — dispatched to print queue`,
      rejectedToast: (no: string) => `Rejected ${no} — returned for revision`,
      downloadToast: 'Demo sandbox: .gcode.3mf download simulated',
      list: [
        {
          key: 'new',
          file: 'gimbal_base.gcode.3mf',
          meta: 'Yifan Chen · New',
          ago: '18m ago',
          c1: '#3B82F6',
          c2: '#2563EB',
          c3: '#1D4ED8',
          kind: 'New',
          who: 'Yifan Chen',
          avc: 'Y',
          av: '#f43f5e',
          user: 'chenyifan',
          at: '14:02',
          no: '#0044',
          dur: '1h 48m',
          grams: '36 g',
          fil: 'PLA Blue · Left Nozzle',
          reason: 'Gimbal mount replacement part',
          warning: 'Metadata vs G-code mismatch: filament 36 g / 41 g',
        },
        {
          key: 'rev',
          file: 'gearbox_shell_v2.gcode.3mf',
          meta: 'Le Zhao · Revision v2',
          ago: '9m ago',
          c1: '#F59E0B',
          c2: '#D97706',
          c3: '#B45309',
          kind: 'Revision · v2',
          who: 'Le Zhao',
          avc: 'L',
          av: '#14b8a6',
          user: 'zhaole',
          at: '14:11',
          no: '#0031',
          dur: '1h 48m',
          grams: '36 g',
          fil: 'PETG Orange · Left Nozzle',
          reason: 'Reinforced snap tabs on gearbox housing',
          diff: {
            title: 'Diff vs v1',
            durLabel: 'Est. Time',
            durFrom: '1h 20m',
            durTo: '1h 48m (+28m)',
            massLabel: 'Filament',
            massVal: '29 g → 36 g',
          },
        },
      ] as ReviewItem[],
    },
    sampleReview: {
      key: 'sample',
      file: 'servo_bracket.gcode.3mf',
      meta: 'You (Demo) · Validated',
      ago: 'Just now',
      c1: '#10B981',
      c2: '#059669',
      c3: '#047857',
      kind: 'New · Validated',
      who: 'You (Demo)',
      avc: 'D',
      av: '#2563eb',
      user: 'demo-user',
      at: 'Just now',
      no: '#0045',
      dur: '42m',
      grams: '18 g',
      fil: 'PLA Blue · Left Nozzle',
      reason: 'Interactive homepage sandbox sample print',
    } satisfies ReviewItem,
    pickup: {
      title: 'Enclosure Snap Clip',
      shelf: 'Stored at A-2-3',
      expires: 'Expires in 9m 42s',
      copiedText: 'Copied to clipboard',
      simulateBtn: 'Simulate Desk Pickup',
      undoBtn: 'Restore Ready State',
      verifiedBadge: 'Collected',
      verifiedMeta: 'Verified and handed over at Counter B',
      verifiedToast: 'Order #0039 verified and marked collected',
    },
  },
  'zh-cn': {
    screens: [
      { id: 'participant' as ScreenId, label: '用户端概况', ctx: '用户端工作区' },
      { id: 'console' as ScreenId, label: '控制台概况', ctx: '管理控制台' },
      { id: 'review' as ScreenId, label: '人工审核', ctx: '审核队列' },
      { id: 'pickup' as ScreenId, label: '凭码取件', ctx: '取件核销凭证' },
    ],
    resetLabel: '重置演示',
    overviewTitle: '概况',
    announcement:
      '取件处已移至 B 区服务台。22:00 起停止接收新订单，已排队的订单照常打印。未取走的零件明早 9:00 起在 B 区服务台领取，请携带取件码。',
    announcementMeta: '11/16 18:30 发布',
    myOrder: {
      title: '我的订单',
      status: '可取件',
      collectedStatus: '已取件',
      no: '#0039',
      name: '外壳卡扣',
      detail: '存放于 A-2-3',
      collectedDetail: '已在 B 区服务台核销',
      more: '另有 1 打印中 · 1 排队中',
      hint: '点击查看取件码',
    },
    site: {
      title: '现场',
      idleUnit: '台空闲',
      queuedUnit: '单排队',
      wait: '预计等待 1–2 小时',
    },
    submitCard: {
      title: '提交文件',
      sub: '点击试传示例 .gcode.3mf 或拖入文件',
      defaultFile: '舵机支架.gcode.3mf',
      parsingTitle: '正在解析 .gcode.3mf…',
      parsingSub: 'Worker 校验切片结构、喷嘴与耗材元数据',
      doneTitle: '已提交至审核队列',
      doneMeta: 'PLA 蓝 · 0.4 mm · 42m · 18 g',
      goReview: '前往审核队列 →',
      submittedToast: (file: string) => `Worker 已完成 ${file} 解析校验并入审核队列`,
    },
    printersHeading: '打印机',
    printersCount: '3',
    consoleActions: {
      reloadBtn: '补料恢复',
      clearBedBtn: '确认清床',
      reloadedToast: 'H2D-01 已补料，恢复打印',
      bedClearedToast: 'X2D-02 已确认清床，设备已释放回空闲池',
      resumedLabel: '打印中',
      resumedHeroSmall: '剩余',
    },
    consoleTop: {
      todoPrefix: '待办 · ',
      todoMore: '另有 2 项',
      todos: [
        { id: 'H2D-01', text: 'AMS A2 断料', time: '8 分钟', tone: 'alert' as const },
        { id: 'X2D-02', text: '待清板', time: '35 分钟', tone: 'wait' as const },
        { id: '#0027', text: '待取件超过 24 小时', time: '1 天', tone: 'idle' as const },
      ],
      reviewTitle: '待审核',
      ordersUnit: '单',
      reviewSub: '最早一单已等 18 分钟',
      reviewSubEmpty: '当前审核队列已清空',
      reviewFoot: '其中 1 单为修改',
    },
    printers: [
      {
        id: 'X2D-01',
        model: 'Bambu Lab X2D',
        label: '打印中',
        tone: 'busy',
        shot: '14:32:05',
        temps: [
          { kind: 'nozzle', val: '220', target: ' / 220°C', color: 'var(--pr-heat)' },
          { kind: 'bed', val: '60', target: ' / 60°C', color: 'var(--pr-heat)' },
          { kind: 'chamber', val: '38', target: ' / 40°C', color: 'var(--pr-heat)' },
        ],
        ams: [
          { slots: ['#F2F2F2', '#1F6FEB', '#E5484D', '#2B2B2B'] },
          { slots: ['#F5A524', '#3DD68C', '', '#8B5CF6'] },
        ],
        owner: '陈一帆',
        avatar: '帆',
        avBg: '#0ea5e9',
        file: '机械臂轴承座.gcode.3mf',
        hero: '1h 04m',
        heroSmall: '剩余',
        pct: 62,
        context: '第 133 / 215 层 · 15:42 完成',
      },
      {
        id: 'H2D-01',
        model: 'Bambu Lab H2D',
        label: '暂停中',
        tone: 'wait',
        shot: '14:32:01',
        temps: [
          { kind: 'nozzle', val: '200', target: ' / 220°C', color: 'var(--pr-heat)' },
          { kind: 'bed', val: '55', target: ' / 55°C', color: 'var(--pr-heat)' },
          { kind: 'chamber', val: '36', target: ' / —', color: 'var(--pr-muted)' },
        ],
        ams: [{ slots: ['#2B2B2B', '#3DD68C', '#FFFFFF', '#FFD60A'], err: true }],
        owner: '赵乐',
        avatar: '乐',
        avBg: '#8b5cf6',
        file: '齿轮箱外壳.gcode.3mf',
        hero: '1h 40m',
        heroSmall: '剩余 · 已暂停',
        pct: 37,
        context: '第 64 / 180 层',
        alert: 'AMS A2 断料，等待现场人员补料',
      },
      {
        id: 'P1S-05',
        model: 'Bambu Lab P1S',
        label: '空闲',
        tone: 'ok',
        shot: '14:31:57',
        temps: [
          { kind: 'nozzle', val: '27', target: ' / —', color: 'var(--pr-muted)' },
          { kind: 'bed', val: '26', target: ' / —', color: 'var(--pr-muted)' },
          { kind: 'chamber', val: '25', target: ' / —', color: 'var(--pr-muted)' },
        ],
        ams: [{ slots: ['#F2F2F2', '#2B2B2B', '#E5484D', ''] }],
        hero: '可用',
        heroSmall: '',
        context: '0.4 喷嘴 · PLA / PETG',
      },
    ] satisfies PrinterCardData[],
    review: {
      title: '审核',
      pendingSuffix: '单待审核',
      download: '下载文件',
      fileSection: '文件',
      plateLabel: '第 1 盘',
      plateTotal: ' · 共 1 盘',
      machineKey: '机型',
      machineVal: 'Bambu Lab X2D · 0.4 mm 喷嘴',
      plateKey: '打印板',
      plateVal: '纹理 PEI 板',
      estKey: '预计',
      infoSection: '申请信息',
      reasonKey: '打印原因',
      colorKey: '颜色要求',
      colorVal: '相近即可',
      reject: '驳回',
      approve: '通过',
      emptyTitle: '待审核队列已清空',
      emptySub: '当前所有待审核订单均已处理完成。',
      submitSampleBtn: '试传示例文件',
      approvedToast: (no: string) => `已通过 ${no}，已加入调度队列`,
      rejectedToast: (no: string) => `已驳回 ${no}，已退回等待修改`,
      downloadToast: '演示沙盒：已模拟触发 .gcode.3mf 下载',
      list: [
        {
          key: 'new',
          file: '云台底座.gcode.3mf',
          meta: '陈一帆 · 新提交',
          ago: '18 分钟前',
          c1: '#3B82F6',
          c2: '#2563EB',
          c3: '#1D4ED8',
          kind: '新提交',
          who: '陈一帆',
          avc: '帆',
          av: '#f43f5e',
          user: 'chenyifan',
          at: '14:02',
          no: '#0044',
          dur: '1h 48m',
          grams: '36 g',
          fil: 'PLA 蓝 · 左喷嘴',
          reason: '云台底座，替换断裂件',
          warning: '元数据与 G-code 不一致：耗材用量 36 g / 41 g',
        },
        {
          key: 'rev',
          file: '齿轮箱外壳_v2.gcode.3mf',
          meta: '赵乐 · 修改 · 第 2 版',
          ago: '9 分钟前',
          c1: '#F59E0B',
          c2: '#D97706',
          c3: '#B45309',
          kind: '修改 · 第 2 版',
          who: '赵乐',
          avc: '乐',
          av: '#14b8a6',
          user: 'zhaole',
          at: '14:11',
          no: '#0031',
          dur: '1h 48m',
          grams: '36 g',
          fil: 'PETG 橙 · 左喷嘴',
          reason: '齿轮箱外壳，加厚了卡扣',
          diff: {
            title: '与上一版对比',
            durLabel: '预计时长',
            durFrom: '1h 20m',
            durTo: '1h 48m（+28m）',
            massLabel: '耗材用量',
            massVal: '29 g → 36 g',
          },
        },
      ] as ReviewItem[],
    },
    sampleReview: {
      key: 'sample',
      file: '舵机支架.gcode.3mf',
      meta: '当前访客 · 校验通过',
      ago: '刚刚',
      c1: '#10B981',
      c2: '#059669',
      c3: '#047857',
      kind: '新提交 · 校验通过',
      who: '当前访客（演示）',
      avc: '访',
      av: '#2563eb',
      user: 'demo-user',
      at: '刚刚',
      no: '#0045',
      dur: '42m',
      grams: '18 g',
      fil: 'PLA 蓝 · 左喷嘴',
      reason: '首页交互沙盒示例提交',
    } satisfies ReviewItem,
    pickup: {
      title: '外壳卡扣',
      shelf: '存放于 A-2-3',
      expires: '9 分 42 秒后失效',
      copiedText: '已复制取件码',
      simulateBtn: '模拟现场核销取件',
      undoBtn: '恢复待取件状态',
      verifiedBadge: '已核销取件',
      verifiedMeta: '已在 B 区服务台完成核销',
      verifiedToast: '订单 #0039 已核销交付',
    },
  },
};

function PrinterGrid({
  printers,
  onResolveAlert,
  resolveLabel,
}: {
  printers: PrinterCardData[];
  onResolveAlert?: (printerId: string) => void;
  resolveLabel?: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {printers.map((p) => {
        const tone = {
          busy: { t: 'var(--pr-busy-t)', s: 'var(--pr-busy-s)', d: 'var(--pr-busy-d)' },
          wait: { t: 'var(--pr-wait-t)', s: 'var(--pr-wait-s)', d: 'var(--pr-wait-d)' },
          ok: { t: 'var(--pr-ok-t)', s: 'var(--pr-ok-s)', d: 'var(--pr-ok-d)' },
        }[p.tone];

        const heroColor =
          p.tone === 'wait'
            ? 'var(--pr-wait-t)'
            : p.tone === 'ok'
              ? 'var(--pr-ok-t)'
              : 'var(--pr-fg)';

        return (
          <article
            key={p.id}
            className="pr-demo-card flex flex-col overflow-hidden rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] text-left"
          >
            <div className="flex flex-1 flex-col gap-3.5 p-4">
              {/* Top row: id + model + status chip */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-semibold text-[var(--pr-fg)]">{p.id}</span>
                <span className="min-w-0 flex-1 truncate text-xs text-[var(--pr-muted)]">
                  {p.model}
                </span>
                <span
                  className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold"
                  style={{ background: tone.s, color: tone.t }}
                >
                  <i
                    className={`h-2 w-2 rounded-full ${p.tone === 'busy' ? 'pr-breathe' : ''}`}
                    style={{ background: tone.d }}
                  />
                  {p.label}
                </span>
              </div>

              {/* Middle row: camera + temps + AMS capsules */}
              <div className="grid grid-cols-[minmax(0,1fr)_86px_54px] items-center gap-3">
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-xl"
                  style={{ background: 'linear-gradient(180deg, #404040, #0a0a0a)' }}
                >
                  <div
                    className="absolute -bottom-[34%] -left-[10%] -right-[10%] h-[70%] rounded-full bg-[#262626]"
                    style={{ boxShadow: 'inset 0 3px 0 rgba(255,255,255,.25)' }}
                  />
                  <div
                    className="absolute bottom-[24%] right-[18%] h-[16%] w-[28%] -skew-x-12 rounded-[3px]"
                    style={{ background: 'linear-gradient(180deg, #f5f5f5, #a3a3a3)' }}
                  />
                  <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-1.5 font-mono text-[10px] leading-[18px] text-[#fafafa]">
                    {p.shot}
                  </span>
                </div>

                {/* Temps */}
                <dl
                  className="grid grid-cols-[auto_1fr] items-center gap-x-1.5 gap-y-2 text-[11px] leading-[14px]"
                  style={{ opacity: p.tone === 'ok' ? 0.5 : 1 }}
                >
                  {p.temps.map((m) => (
                    <div key={m.kind} className="contents">
                      <dt className="flex items-center">
                        {m.kind === 'nozzle' && <NozzleIcon color={m.color} />}
                        {m.kind === 'bed' && <BedIcon color={m.color} />}
                        {m.kind === 'chamber' && <ChamberIcon color={m.color} />}
                      </dt>
                      <dd className="truncate text-[var(--pr-fg)]">
                        {m.val}
                        <span className="text-[var(--pr-faint)]">{m.target}</span>
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* AMS Capsules */}
                <div className="flex flex-col justify-center gap-1.5">
                  {p.ams.map((unit, uIdx) => (
                    <div
                      key={`${p.id}-ams-${uIdx}`}
                      className="relative flex h-[24px] w-[48px] items-start justify-center gap-[3px] overflow-hidden rounded-[6px] bg-[var(--pr-sub)] pt-[4px]"
                      style={{
                        border: unit.err
                          ? '1.5px solid var(--pr-alert-d)'
                          : '1px solid var(--pr-line2)',
                      }}
                    >
                      <i className="absolute inset-x-0 bottom-0 h-[6px] bg-[var(--pr-line)]" />
                      {unit.slots.map((hex, sIdx) => (
                        <i
                          key={`${p.id}-s-${uIdx}-${sIdx}`}
                          className="relative block h-[13px] w-[5.5px] rounded-[2.5px]"
                          style={{
                            background: hex || 'transparent',
                            border: hex
                              ? '1px solid rgba(115,115,115,0.35)'
                              : '1px dashed var(--pr-faint)',
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom job block */}
              <div className="mt-auto flex flex-col gap-1.5">
                {p.owner && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <span
                      className="grid h-5 w-5 shrink-0 place-items-center rounded-full text-[10px] font-semibold text-white"
                      style={{ background: p.avBg }}
                    >
                      {p.avatar}
                    </span>
                    <span className="shrink-0 font-medium text-[var(--pr-fg)]">{p.owner}</span>
                    <span className="min-w-0 flex-1 truncate text-[var(--pr-muted)]">{p.file}</span>
                  </div>
                )}

                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold tracking-tight" style={{ color: heroColor }}>
                    {p.hero}
                  </span>
                  <span className="flex-1 truncate text-xs text-[var(--pr-muted)]">
                    {p.heroSmall}
                  </span>
                  {p.pct !== undefined && (
                    <span className="text-xs font-semibold text-[var(--pr-fg)]">{p.pct}%</span>
                  )}
                </div>

                {p.pct !== undefined && (
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--pr-track)]">
                    <div
                      className="h-full rounded-full transition-[width] duration-500 ease-out"
                      style={{ width: `${p.pct}%`, background: tone.d }}
                    />
                  </div>
                )}

                <span className="text-xs text-[var(--pr-muted)]">{p.context}</span>
              </div>
            </div>

            {p.alert && (
              onResolveAlert ? (
                <button
                  type="button"
                  onClick={() => onResolveAlert(p.id)}
                  className="flex w-full cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-left text-xs font-semibold transition-opacity hover:opacity-85"
                  style={{ background: 'var(--pr-alert-s)', color: 'var(--pr-alert-t)' }}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{p.alert}</span>
                  </span>
                  {resolveLabel && (
                    <span className="shrink-0 rounded-full bg-[var(--pr-card)] px-2 py-0.5 text-[11px] font-semibold text-[var(--pr-fg)]">
                      {resolveLabel}
                    </span>
                  )}
                </button>
              ) : (
                <div
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold"
                  style={{ background: 'var(--pr-alert-s)', color: 'var(--pr-alert-t)' }}
                >
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{p.alert}</span>
                </div>
              )
            )}
          </article>
        );
      })}
    </div>
  );
}

export default function ProductPreview({ lang }: { lang: Lang }) {
  const [screen, setScreen] = useState<ScreenId>('participant');
  const [reviewKey, setReviewKey] = useState<ReviewKey>('new');
  const [copied, setCopied] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>('idle');
  const [submittedFileName, setSubmittedFileName] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [h2dReloaded, setH2dReloaded] = useState(false);
  const [x2dCleared, setX2dCleared] = useState(false);
  const [reviewDecisions, setReviewDecisions] = useState<Record<string, 'approved' | 'rejected'>>({});
  const [pickupVerified, setPickupVerified] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [passTilt, setPassTilt] = useState({ rx: 0, ry: 0, px: 50, py: 50, active: false });

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const parseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      if (parseTimerRef.current) clearTimeout(parseTimerRef.current);
    };
  }, []);

  const t = SCREEN_DATA[lang];
  const activeScreen = t.screens.find((s) => s.id === screen) ?? t.screens[0];

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2600);
  };

  const allReviewItems: ReviewItem[] =
    submitPhase === 'done'
      ? [
          {
            ...t.sampleReview,
            file: submittedFileName || t.submitCard.defaultFile,
          },
          ...t.review.list,
        ]
      : t.review.list;

  const pendingReviewItems = allReviewItems.filter((item) => !reviewDecisions[item.key]);
  const activeReview =
    pendingReviewItems.find((r) => r.key === reviewKey) ?? pendingReviewItems[0] ?? null;

  const approvedCount = Object.values(reviewDecisions).filter((v) => v === 'approved').length;
  const liveIdleCount = 2 + (x2dCleared ? 1 : 0);
  const liveQueuedCount = 14 + approvedCount;

  const livePrinters: PrinterCardData[] = t.printers.map((p) => {
    if (p.id === 'H2D-01' && h2dReloaded) {
      return {
        ...p,
        label: t.consoleActions.resumedLabel,
        tone: 'busy',
        heroSmall: t.consoleActions.resumedHeroSmall,
        temps: p.temps.map((m) => (m.kind === 'nozzle' ? { ...m, val: '220' } : m)),
        ams: p.ams.map((u) => ({ ...u, err: false })),
        alert: undefined,
      };
    }
    return p;
  });

  const liveTodos = t.consoleTop.todos.filter((td) => {
    if (td.id === 'H2D-01' && h2dReloaded) return false;
    if (td.id === 'X2D-02' && x2dCleared) return false;
    return true;
  });
  const liveTodoCount = liveTodos.length + 2;

  const isDirty =
    announcementDismissed ||
    submitPhase !== 'idle' ||
    h2dReloaded ||
    x2dCleared ||
    Object.keys(reviewDecisions).length > 0 ||
    pickupVerified;

  const handleReset = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    if (parseTimerRef.current) clearTimeout(parseTimerRef.current);
    setAnnouncementDismissed(false);
    setSubmitPhase('idle');
    setSubmittedFileName(null);
    setIsDragOver(false);
    setH2dReloaded(false);
    setX2dCleared(false);
    setReviewDecisions({});
    setPickupVerified(false);
    setReviewKey('new');
    setCopied(false);
    setToast(null);
    setPassTilt({ rx: 0, ry: 0, px: 50, py: 50, active: false });
  };

  const handleStartSubmit = (customFileName?: string, switchToSampleReview = false) => {
    if (submitPhase === 'parsing') return;
    const nextFile = customFileName?.trim() || t.submitCard.defaultFile;
    setSubmittedFileName(nextFile);
    setSubmitPhase('parsing');
    if (parseTimerRef.current) clearTimeout(parseTimerRef.current);
    parseTimerRef.current = setTimeout(() => {
      setSubmitPhase('done');
      setReviewDecisions((prev) => {
        if (!prev.sample) return prev;
        const copy = { ...prev };
        delete copy.sample;
        return copy;
      });
      if (switchToSampleReview) {
        setReviewKey('sample');
      }
      showToast(t.submitCard.submittedToast(nextFile));
    }, 800);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    handleStartSubmit(file?.name);
  };

  const handleReloadH2D = () => {
    if (h2dReloaded) return;
    setH2dReloaded(true);
    showToast(t.consoleActions.reloadedToast);
  };

  const handleClearX2D = () => {
    if (x2dCleared) return;
    setX2dCleared(true);
    showToast(t.consoleActions.bedClearedToast);
  };

  const handleReviewDecision = (decision: 'approved' | 'rejected') => {
    if (!activeReview) return;
    const targetNo = activeReview.no;
    const remaining = pendingReviewItems.filter((item) => item.key !== activeReview.key);
    setReviewDecisions((prev) => ({ ...prev, [activeReview.key]: decision }));
    if (remaining.length > 0) {
      setReviewKey(remaining[0].key);
    }
    showToast(
      decision === 'approved'
        ? t.review.approvedToast(targetNo)
        : t.review.rejectedToast(targetNo)
    );
  };

  const handleTogglePickup = () => {
    const next = !pickupVerified;
    setPickupVerified(next);
    if (next) {
      showToast(t.pickup.verifiedToast);
    }
  };

  const handlePassMove = (e: MouseEvent<HTMLDivElement>) => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    setPassTilt({
      rx: (0.5 - y) * 10,
      ry: (x - 0.5) * 10,
      px: x * 100,
      py: y * 100,
      active: true,
    });
  };

  const handlePassLeave = () => {
    setPassTilt({ rx: 0, ry: 0, px: 50, py: 50, active: false });
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText('K7Q4-M9XR');
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="mt-10 w-full tabular-nums">
      {/* Segmented Switcher */}
      <div className="mb-4 flex flex-wrap items-center justify-center">
        <div className="pr-noscrollbar inline-flex max-w-full gap-0.5 overflow-x-auto rounded-full border sm:gap-1 border-[var(--pr-line)] bg-[var(--pr-sub)] p-1">
          {t.screens.map((s) => {
            const active = screen === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setScreen(s.id);
                  setPassTilt({ rx: 0, ry: 0, px: 50, py: 50, active: false });
                }}
                className={`cursor-pointer whitespace-nowrap rounded-full px-2.5 py-1.5 text-xs font-semibold transition-colors sm:px-3.5 ${
                  active
                    ? 'bg-[var(--pr-ink)] text-[var(--pr-ink-fg)]'
                    : 'bg-transparent text-[var(--pr-muted)] hover:text-[var(--pr-fg)]'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Precision Outer Bezel + Faithful Workspace Frame (flat 0 deg for readability) */}
      <div className="pr-demo-bezel rounded-[22px] p-2">
        <div className="overflow-hidden rounded-[14px] border border-[var(--pr-line)] bg-[var(--pr-page)] text-left">
          {/* Window Chrome */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--pr-line)] bg-[var(--pr-card)] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-md bg-[var(--pr-ink)] text-[var(--pr-ink-fg)]">
                <PrinterMark size={12} />
              </span>
              <span className="text-xs font-semibold text-[var(--pr-fg)]">PlateRelay</span>
            </div>

            {toast ? (
              <span
                key={toast}
                className="pr-panel-in inline-flex items-center gap-1.5 rounded-full border border-[var(--pr-line)] bg-[var(--pr-sub)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--pr-fg)]"
              >
                <i className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--pr-ok-d)' }} />
                <span>{toast}</span>
              </span>
            ) : (
              <span className="text-xs font-medium text-[var(--pr-muted)]">
                {activeScreen.label}
              </span>
            )}

            <div className="flex items-center gap-2">
              {isDirty && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-[var(--pr-line)] bg-[var(--pr-card)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--pr-fg2)] transition-colors hover:border-[var(--pr-line2)] hover:text-[var(--pr-fg)]"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>{t.resetLabel}</span>
                </button>
              )}
              <span className="rounded-full bg-[var(--pr-sub)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--pr-muted)]">
                {activeScreen.ctx}
              </span>
            </div>
          </div>

          {/* Fixed-height Stage to eliminate vertical jumping on tab switch */}
          <div key={screen} className="min-h-[540px] pr-panel-in">
            {/* Screen 1: Participant Overview (DesktopMain) */}
            {screen === 'participant' && (
              <div className="flex flex-col gap-5 p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold tracking-tight text-[var(--pr-fg)]">
                    {t.overviewTitle}
                  </h3>
                  <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--pr-line)] bg-[var(--pr-card)] text-[var(--pr-fg)]">
                    <Bell className="h-4 w-4" />
                    <i
                      className="absolute right-2 top-2 h-2 w-2 rounded-full"
                      style={{ background: 'var(--pr-alert-d)' }}
                    />
                  </span>
                </div>

                {/* Announcement Card */}
                {!announcementDismissed && (
                  <div className="pr-demo-card flex items-start gap-3 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-4">
                    <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--pr-fg)]" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium leading-relaxed text-[var(--pr-fg)]">
                        {t.announcement}
                      </p>
                      <span className="mt-0.5 block text-[11px] text-[var(--pr-faint)]">
                        {t.announcementMeta}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAnnouncementDismissed(true)}
                      aria-label="Dismiss announcement"
                      className="grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-full text-[var(--pr-muted)] transition-colors hover:bg-[var(--pr-sub)] hover:text-[var(--pr-fg)]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Top 3 Summary Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => setScreen('pickup')}
                    className="pr-demo-card group flex w-full cursor-pointer flex-col justify-between gap-2 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-4 text-left"
                  >
                    <div className="flex w-full items-center justify-between text-sm font-semibold text-[var(--pr-fg)]">
                      <span>{t.myOrder.title}</span>
                      <ChevronRight className="h-4 w-4 text-[var(--pr-faint)] transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                    <div>
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-semibold"
                        style={{ color: pickupVerified ? 'var(--pr-muted)' : 'var(--pr-ok-t)' }}
                      >
                        <i
                          className="h-2 w-2 rounded-full"
                          style={{ background: pickupVerified ? 'var(--pr-idle-d)' : 'var(--pr-ok-d)' }}
                        />
                        {pickupVerified ? t.myOrder.collectedStatus : t.myOrder.status}
                      </span>
                      <div className="mt-0.5 text-xl font-bold tracking-tight text-[var(--pr-fg)]">
                        {t.myOrder.no}
                      </div>
                      <div className="text-xs text-[var(--pr-fg2)]">{t.myOrder.name}</div>
                      <div className="text-xs text-[var(--pr-muted)]">
                        {pickupVerified ? t.myOrder.collectedDetail : t.myOrder.detail}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[var(--pr-faint)]">
                      <span>{t.myOrder.more}</span>
                      <span className="font-medium text-[var(--pr-muted)]">{t.myOrder.hint}</span>
                    </div>
                  </button>

                  <div className="pr-demo-card flex flex-col gap-3 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-4">
                    <div className="text-sm font-semibold text-[var(--pr-fg)]">{t.site.title}</div>
                    <div className="flex flex-col gap-2.5 text-[13px] font-medium text-[var(--pr-fg2)]">
                      <span className="flex items-center gap-2">
                        <PrinterMark size={15} />
                        {liveIdleCount} {t.site.idleUnit}
                      </span>
                      <span className="flex items-center gap-2">
                        <ListChecks className="h-4 w-4 text-[var(--pr-muted)]" />
                        {liveQueuedCount} {t.site.queuedUnit}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[var(--pr-muted)]" />
                        {t.site.wait}
                      </span>
                    </div>
                  </div>

                  {/* Interactive Dropzone: Click for sample .gcode.3mf or drop file */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragOver(true);
                    }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                    className={`pr-demo-dropzone group flex min-h-[146px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-4 text-center ${
                      isDragOver
                        ? 'border-[var(--pr-fg)] bg-[var(--pr-card)]'
                        : 'border-[var(--pr-faint)]'
                    }`}
                  >
                    {submitPhase === 'idle' && (
                      <button
                        type="button"
                        onClick={() => handleStartSubmit()}
                        className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-center"
                      >
                        <Upload className="h-5 w-5 text-[var(--pr-muted)] transition-transform duration-200 group-hover:-translate-y-0.5" />
                        <span className="text-sm font-semibold text-[var(--pr-fg)]">
                          {t.submitCard.title}
                        </span>
                        <span className="text-xs text-[var(--pr-muted)]">{t.submitCard.sub}</span>
                      </button>
                    )}

                    {submitPhase === 'parsing' && (
                      <div className="pr-panel-in flex w-full flex-col items-center justify-center gap-2">
                        <Loader2
                          className="h-5 w-5 animate-spin"
                          style={{ color: 'var(--pr-busy-t)' }}
                        />
                        <span className="text-sm font-semibold text-[var(--pr-fg)]">
                          {t.submitCard.parsingTitle}
                        </span>
                        <span className="text-xs text-[var(--pr-muted)]">
                          {t.submitCard.parsingSub}
                        </span>
                      </div>
                    )}

                    {submitPhase === 'done' && (
                      <div className="pr-panel-in flex w-full flex-col items-center justify-center gap-1.5">
                        <CheckCircle2 className="h-5 w-5" style={{ color: 'var(--pr-ok-t)' }} />
                        <span className="max-w-full truncate font-mono text-xs font-semibold text-[var(--pr-fg)]">
                          {submittedFileName}
                        </span>
                        <span className="text-[11px] text-[var(--pr-muted)]">
                          {t.submitCard.doneMeta}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setScreen('review');
                            setReviewKey('sample');
                          }}
                          className="mt-1 inline-flex cursor-pointer items-center rounded-full bg-[var(--pr-ink)] px-3 py-1 text-[11px] font-semibold text-[var(--pr-ink-fg)] transition-opacity hover:opacity-90"
                        >
                          {t.submitCard.goReview}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Printer Fleet Section (Read-only on User Portal) */}
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-baseline justify-between px-1">
                    <span className="text-sm font-semibold text-[var(--pr-muted)]">
                      {t.printersHeading}
                    </span>
                    <span className="text-xs text-[var(--pr-faint)]">{t.printersCount}</span>
                  </div>
                  <PrinterGrid printers={livePrinters} />
                </div>
              </div>
            )}

            {/* Screen 2: Operator Console Overview (ConsoleOverview) */}
            {screen === 'console' && (
              <div className="flex flex-col gap-5 p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold tracking-tight text-[var(--pr-fg)]">
                      {t.overviewTitle}
                    </h3>
                    <span className="rounded-full border border-[var(--pr-line)] bg-[var(--pr-card)] px-2.5 py-0.5 text-xs font-semibold text-[var(--pr-muted)]">
                      {lang === 'zh-cn' ? '控制台' : 'Console'}
                    </span>
                  </div>
                  <span className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--pr-line)] bg-[var(--pr-card)] text-[var(--pr-fg)]">
                    <Bell className="h-4 w-4" />
                    <i
                      className="absolute right-2 top-2 h-2 w-2 rounded-full"
                      style={{ background: 'var(--pr-alert-d)' }}
                    />
                  </span>
                </div>

                {/* Console Top Row: To-do (1.5fr) | Pending Review (1fr) | Site (1fr) */}
                <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr]">
                  <div className="pr-demo-card flex flex-col justify-between gap-3 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-4">
                    <div className="flex items-center justify-between text-sm font-semibold text-[var(--pr-fg)]">
                      <span>
                        {t.consoleTop.todoPrefix}
                        {liveTodoCount}
                      </span>
                      <ChevronRight className="h-4 w-4 text-[var(--pr-muted)]" />
                    </div>
                    <ul className="flex flex-col gap-2">
                      {liveTodos.map((td) => {
                        const dotColor =
                          td.tone === 'alert'
                            ? 'var(--pr-alert-d)'
                            : td.tone === 'wait'
                              ? 'var(--pr-wait-d)'
                              : 'var(--pr-idle-d)';
                        const actionLabel =
                          td.id === 'H2D-01'
                            ? t.consoleActions.reloadBtn
                            : td.id === 'X2D-02'
                              ? t.consoleActions.clearBedBtn
                              : null;
                        return (
                          <li key={td.id} className="flex items-center gap-2 text-[13px]">
                            <i
                              className="h-2 w-2 shrink-0 rounded-full"
                              style={{ background: dotColor }}
                            />
                            <span className="shrink-0 font-mono text-xs font-semibold text-[var(--pr-fg)]">
                              {td.id}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-[var(--pr-fg2)]">
                              {td.text}
                            </span>
                            {actionLabel ? (
                              <button
                                type="button"
                                onClick={td.id === 'H2D-01' ? handleReloadH2D : handleClearX2D}
                                className="shrink-0 cursor-pointer rounded-full border border-[var(--pr-line)] bg-[var(--pr-sub)] px-2 py-0.5 text-[11px] font-semibold text-[var(--pr-fg)] transition-colors hover:border-[var(--pr-line2)]"
                              >
                                {actionLabel}
                              </button>
                            ) : (
                              <span className="shrink-0 text-xs text-[var(--pr-muted)]">
                                {td.time}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                    <span className="text-xs text-[var(--pr-faint)]">{t.consoleTop.todoMore}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setScreen('review')}
                    className="pr-demo-card group flex w-full cursor-pointer flex-col justify-between gap-2 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-4 text-left"
                  >
                    <div className="flex w-full items-center justify-between text-sm font-semibold text-[var(--pr-fg)]">
                      <span>{t.consoleTop.reviewTitle}</span>
                      <ChevronRight className="h-4 w-4 text-[var(--pr-muted)] transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold tracking-tight text-[var(--pr-fg)]">
                        {pendingReviewItems.length} {t.consoleTop.ordersUnit}
                      </div>
                      <div className="mt-1 text-xs text-[var(--pr-muted)]">
                        {pendingReviewItems.length > 0
                          ? t.consoleTop.reviewSub
                          : t.consoleTop.reviewSubEmpty}
                      </div>
                    </div>
                    <span className="text-xs text-[var(--pr-faint)]">
                      {t.consoleTop.reviewFoot}
                    </span>
                  </button>

                  <div className="pr-demo-card flex flex-col gap-3 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-4">
                    <div className="text-sm font-semibold text-[var(--pr-fg)]">{t.site.title}</div>
                    <div className="flex flex-col gap-2.5 text-[13px] font-medium text-[var(--pr-fg2)]">
                      <span className="flex items-center gap-2">
                        <PrinterMark size={15} />
                        {liveIdleCount} {t.site.idleUnit}
                      </span>
                      <span className="flex items-center gap-2">
                        <ListChecks className="h-4 w-4 text-[var(--pr-muted)]" />
                        {liveQueuedCount} {t.site.queuedUnit}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[var(--pr-muted)]" />
                        {t.site.wait}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-baseline justify-between px-1">
                    <span className="text-sm font-semibold text-[var(--pr-muted)]">
                      {t.printersHeading}
                    </span>
                    <span className="text-xs text-[var(--pr-faint)]">9</span>
                  </div>
                  <PrinterGrid
                    printers={livePrinters}
                    resolveLabel={t.consoleActions.reloadBtn}
                    onResolveAlert={(id) => {
                      if (id === 'H2D-01') handleReloadH2D();
                    }}
                  />
                </div>
              </div>
            )}

            {/* Screen 3: Interactive Review Queue (ConsoleReview) */}
            {screen === 'review' && (
              <div className="flex flex-col gap-5 p-5 sm:p-7">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-2xl font-bold tracking-tight text-[var(--pr-fg)]">
                    {t.review.title}
                  </h3>
                  <span className="text-sm text-[var(--pr-muted)]">
                    {pendingReviewItems.length} {t.review.pendingSuffix}
                  </span>
                </div>

                {activeReview ? (
                  <div className="grid gap-4 lg:grid-cols-[310px_1fr]">
                    {/* Left Master List */}
                    <div className="flex flex-col gap-2">
                      {pendingReviewItems.map((item) => {
                        const selected = item.key === activeReview.key;
                        return (
                          <button
                            key={item.key}
                            type="button"
                            onClick={() => setReviewKey(item.key)}
                            className={`flex cursor-pointer gap-3 rounded-[14px] p-3 text-left transition-all hover:-translate-y-[1px] ${
                              selected
                                ? 'bg-[var(--pr-card)]'
                                : 'bg-transparent hover:bg-[var(--pr-card)]/60'
                            }`}
                            style={{
                              boxShadow: selected ? 'inset 0 0 0 1.5px var(--pr-fg)' : 'none',
                            }}
                          >
                            <div className="h-12 w-12 shrink-0 rounded-[10px] bg-[var(--pr-sub)]">
                              <IsometricPlateThumb c1={item.c1} c2={item.c2} c3={item.c3} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-semibold text-[var(--pr-fg)]">
                                {item.file}
                              </div>
                              <div className="text-xs text-[var(--pr-fg2)]">{item.meta}</div>
                              <div className="text-xs text-[var(--pr-muted)]">{item.ago}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Inspection Panel */}
                    <div
                      key={activeReview.key}
                      className="pr-panel-in flex flex-col overflow-hidden rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)]"
                    >
                      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                        <div>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h4 className="text-lg font-bold text-[var(--pr-fg)]">
                              {activeReview.file}
                            </h4>
                            <span className="rounded-full bg-[var(--pr-sub)] px-2.5 py-0.5 text-xs font-semibold text-[var(--pr-fg2)]">
                              {activeReview.kind}
                            </span>
                          </div>
                          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[var(--pr-muted)]">
                            <span
                              className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-semibold text-white"
                              style={{ background: activeReview.av }}
                            >
                              {activeReview.avc}
                            </span>
                            <span className="font-medium text-[var(--pr-fg)]">
                              {activeReview.who}
                            </span>
                            <span>
                              {activeReview.user} · {activeReview.at} ·{' '}
                              <span className="font-mono">{activeReview.no}</span>
                            </span>
                          </div>
                        </div>

                        {activeReview.warning && (
                          <div
                            className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-medium"
                            style={{ background: 'var(--pr-wait-s)', color: 'var(--pr-wait-t)' }}
                          >
                            <AlertTriangle className="h-4 w-4 shrink-0" />
                            <span>{activeReview.warning}</span>
                          </div>
                        )}

                        {activeReview.diff && (
                          <div className="flex flex-col gap-2">
                            <div className="text-xs font-semibold text-[var(--pr-muted)]">
                              {activeReview.diff.title}
                            </div>
                            <dl className="grid grid-cols-[88px_1fr] gap-x-4 gap-y-1.5 text-[13px]">
                              <dt className="text-[var(--pr-muted)]">
                                {activeReview.diff.durLabel}
                              </dt>
                              <dd className="text-[var(--pr-fg)]">
                                {activeReview.diff.durFrom} → <b>{activeReview.diff.durTo}</b>
                              </dd>
                              <dt className="text-[var(--pr-muted)]">
                                {activeReview.diff.massLabel}
                              </dt>
                              <dd className="text-[var(--pr-fg)]">{activeReview.diff.massVal}</dd>
                            </dl>
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[var(--pr-muted)]">
                              {t.review.fileSection}
                            </span>
                            <button
                              type="button"
                              onClick={() => showToast(t.review.downloadToast)}
                              className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-full bg-[var(--pr-sub)] px-3 text-xs font-medium text-[var(--pr-fg)] transition-opacity hover:opacity-80"
                            >
                              <Download className="h-3.5 w-3.5" />
                              {t.review.download}
                            </button>
                          </div>

                          <div className="pr-demo-card flex flex-col gap-3 rounded-[14px] border border-[var(--pr-line)] p-4 sm:flex-row">
                            <div className="h-20 w-20 shrink-0 rounded-[10px] bg-[var(--pr-sub)]">
                              <IsometricPlateThumb
                                c1={activeReview.c1}
                                c2={activeReview.c2}
                                c3={activeReview.c3}
                              />
                            </div>
                            <div className="flex flex-1 flex-col gap-2">
                              <div className="text-[13px] font-semibold text-[var(--pr-fg)]">
                                {t.review.plateLabel}
                                <span className="font-normal text-[var(--pr-muted)]">
                                  {t.review.plateTotal}
                                </span>
                              </div>
                              <dl className="grid grid-cols-[80px_1fr] gap-x-3 gap-y-1 text-xs">
                                <dt className="text-[var(--pr-muted)]">{t.review.machineKey}</dt>
                                <dd className="text-[var(--pr-fg)]">{t.review.machineVal}</dd>
                                <dt className="text-[var(--pr-muted)]">{t.review.plateKey}</dt>
                                <dd className="text-[var(--pr-fg)]">{t.review.plateVal}</dd>
                                <dt className="text-[var(--pr-muted)]">{t.review.estKey}</dt>
                                <dd className="text-[var(--pr-fg)]">
                                  {activeReview.dur} · {activeReview.grams}
                                </dd>
                              </dl>
                              <div>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--pr-sub)] px-2.5 py-1 text-xs text-[var(--pr-fg)]">
                                  <i
                                    className="h-2.5 w-2.5 rounded-full"
                                    style={{ background: activeReview.c1 }}
                                  />
                                  {activeReview.fil}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <span className="text-xs font-semibold text-[var(--pr-muted)]">
                            {t.review.infoSection}
                          </span>
                          <dl className="grid grid-cols-[80px_1fr] gap-x-3 gap-y-1 text-xs">
                            <dt className="text-[var(--pr-muted)]">{t.review.reasonKey}</dt>
                            <dd className="text-[var(--pr-fg)]">{activeReview.reason}</dd>
                            <dt className="text-[var(--pr-muted)]">{t.review.colorKey}</dt>
                            <dd className="text-[var(--pr-fg)]">{t.review.colorVal}</dd>
                          </dl>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 border-t border-[var(--pr-line)] px-5 py-3">
                        <button
                          type="button"
                          onClick={() => handleReviewDecision('rejected')}
                          className="inline-flex h-9 cursor-pointer items-center rounded-full bg-[var(--pr-sub)] px-5 text-xs font-semibold text-[var(--pr-fg)] transition-opacity hover:opacity-80"
                        >
                          {t.review.reject}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReviewDecision('approved')}
                          className="inline-flex h-9 cursor-pointer items-center rounded-full bg-[var(--pr-ink)] px-5 text-xs font-semibold text-[var(--pr-ink-fg)] transition-opacity hover:opacity-90"
                        >
                          {t.review.approve}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pr-panel-in flex min-h-[400px] flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-8 text-center">
                    <CheckCircle2 className="h-8 w-8" style={{ color: 'var(--pr-ok-t)' }} />
                    <h4 className="text-base font-bold text-[var(--pr-fg)]">{t.review.emptyTitle}</h4>
                    <p className="max-w-sm text-xs leading-relaxed text-[var(--pr-muted)]">
                      {t.review.emptySub}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
                      {submitPhase === 'idle' && (
                        <button
                          type="button"
                          onClick={() => handleStartSubmit(undefined, true)}
                          className="inline-flex h-9 cursor-pointer items-center rounded-full bg-[var(--pr-ink)] px-4 text-xs font-semibold text-[var(--pr-ink-fg)] transition-opacity hover:opacity-90"
                        >
                          {t.review.submitSampleBtn}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-[var(--pr-line)] bg-[var(--pr-sub)] px-4 text-xs font-semibold text-[var(--pr-fg)] transition-opacity hover:opacity-85"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        {t.resetLabel}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Screen 4: Pickup Code Modal (DesktopPickup) */}
            {screen === 'pickup' && (
              <div className="relative grid min-h-[540px] place-items-center bg-[var(--pr-page)] p-6 sm:p-10">
                <div className="pointer-events-none absolute inset-0 bg-black/30" />

                <div
                  onMouseMove={handlePassMove}
                  onMouseLeave={handlePassLeave}
                  style={{
                    transform: `perspective(900px) translateY(${passTilt.active ? '-2px' : '0px'}) rotateX(${passTilt.rx.toFixed(2)}deg) rotateY(${passTilt.ry.toFixed(2)}deg)`,
                    boxShadow: passTilt.active
                      ? '0 28px 60px rgba(0, 0, 0, 0.28)'
                      : '0 20px 50px rgba(0, 0, 0, 0.22)',
                    transition: passTilt.active
                      ? 'transform 90ms ease-out, box-shadow 200ms ease'
                      : 'transform 360ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 260ms ease',
                    willChange: 'transform',
                  }}
                  className="relative z-10 flex w-full max-w-[360px] flex-col items-center gap-4 overflow-hidden rounded-[20px] border border-[var(--pr-line)] bg-[var(--pr-card)] px-7 py-7 text-center"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-200"
                    style={{
                      opacity: passTilt.active ? 1 : 0,
                      background: `radial-gradient(280px circle at ${passTilt.px.toFixed(1)}% ${passTilt.py.toFixed(1)}%, var(--pr-pass-sheen), transparent 65%)`,
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1.5 text-base font-bold text-[var(--pr-fg)]">
                      <QrCode className="h-4 w-4 text-[var(--pr-muted)]" />
                      <span>{t.pickup.title}</span>
                      {pickupVerified && (
                        <span
                          className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                          style={{ background: 'var(--pr-ok-s)', color: 'var(--pr-ok-t)' }}
                        >
                          {t.pickup.verifiedBadge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[var(--pr-muted)]">{t.pickup.shelf}</span>
                  </div>

                  {/* QR always on white surface for scannability */}
                  <div className="relative z-10 rounded-2xl border border-[#e5e5e5] bg-white p-3.5">
                    <div className={pickupVerified ? 'opacity-30 transition-opacity' : ''}>
                      <PickupQrSvg />
                    </div>
                    {pickupVerified && (
                      <div className="pr-panel-in absolute inset-0 grid place-items-center">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
                          style={{ background: 'var(--pr-ok-s)', color: 'var(--pr-ok-t)' }}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {t.pickup.verifiedBadge}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="relative z-10 inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-[14px] bg-[var(--pr-sub)] px-4 text-[var(--pr-fg)] transition-opacity hover:opacity-85"
                  >
                    <span className="font-mono text-2xl font-semibold tracking-[3px]">
                      K7Q4-M9XR
                    </span>
                    {copied ? (
                      <Check className="h-4 w-4" style={{ color: 'var(--pr-ok-t)' }} />
                    ) : (
                      <Copy className="h-4 w-4 text-[var(--pr-muted)]" />
                    )}
                  </button>

                  <div className="relative z-10 flex items-center gap-1.5 text-xs text-[var(--pr-muted)]">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      {copied
                        ? t.pickup.copiedText
                        : pickupVerified
                          ? t.pickup.verifiedMeta
                          : t.pickup.expires}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleTogglePickup}
                    className="relative z-10 inline-flex h-8 cursor-pointer items-center rounded-full border border-[var(--pr-line)] bg-[var(--pr-sub)] px-3.5 text-[11px] font-semibold text-[var(--pr-fg)] transition-colors hover:border-[var(--pr-line2)]"
                  >
                    {pickupVerified ? t.pickup.undoBtn : t.pickup.simulateBtn}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
