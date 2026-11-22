import { useState } from 'react';
import {
  AlertTriangle,
  Bell,
  Boxes,
  Check,
  CheckSquare,
  ChevronRight,
  ClipboardCheck,
  Clock,
  Copy,
  Database,
  Download,
  FileText,
  History,
  LayoutGrid,
  ListChecks,
  Megaphone,
  Package,
  QrCode,
  ScanLine,
  Server,
  Settings,
  Upload,
  User,
  Users,
  X,
} from 'lucide-react';

type Lang = 'en' | 'zh-cn';
type ScreenId = 'participant' | 'console' | 'review' | 'pickup';
type ReviewKey = 'new' | 'rev';

function PrinterMark({ size = 18 }: { size?: number }) {
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
  breathe?: boolean;
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
      { id: 'participant' as ScreenId, label: 'Participant Overview' },
      { id: 'console' as ScreenId, label: 'Operator Console' },
      { id: 'review' as ScreenId, label: 'Review Queue' },
      { id: 'pickup' as ScreenId, label: 'Pickup Code' },
    ],
    overviewTitle: 'Overview',
    announcement:
      'Pickup desk has moved to Service Counter B. New submissions close at 22:00; queued orders keep printing overnight. Collect remaining parts from 09:00 tomorrow with your pickup code.',
    announcementMeta: 'Posted 11/16 18:30',
    myOrder: {
      title: 'My Orders',
      status: 'Ready for Pickup',
      no: '#0039',
      name: 'Enclosure Snap Clip',
      detail: 'Stored at A-2-3',
      more: '1 printing · 1 queued',
    },
    site: {
      title: 'Site',
      idle: '2 idle',
      queued: '14 queued',
      wait: 'Est. wait 1–2h',
    },
    submitCard: {
      title: 'Submit File',
      sub: 'Drop .gcode.3mf or browse',
    },
    printersHeading: 'Printers',
    printersCount: '11',
    viewAll: 'View all 11 printers',
    participantNav: {
      items: ['Overview', 'Submit', 'My Orders', 'Profile'],
      user: 'Yifan Chen',
      role: 'chenyifan',
    },
    consoleNav: {
      badge: 'Console',
      top: ['Overview', 'To-do'],
      siteLabel: 'Site',
      site: ['Review', 'Orders', 'Printers', 'Pickup'],
      opsLabel: 'Operations',
      ops: ['Filament', 'Forms', 'Notices', 'Users'],
      sysLabel: 'System',
      sys: ['daemon', 'Audit Log', 'Settings'],
      user: 'Eng. Wang',
      role: 'Admin',
    },
    consoleTop: {
      todoTitle: 'To-do · 5',
      todoMore: '2 more items',
      todos: [
        { id: 'H2D-01', text: 'AMS A2 filament runout', time: '8m', tone: 'alert' as const },
        { id: 'X2D-02', text: 'Awaiting bed clear', time: '35m', tone: 'wait' as const },
        { id: '#0027', text: 'Pickup waiting > 24h', time: '1d', tone: 'idle' as const },
      ],
      reviewTitle: 'Pending Review',
      reviewCount: '3 orders',
      reviewSub: 'Oldest waiting 18m',
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
          { kind: 'nozzle', val: '220', target: '/220°', color: 'var(--pr-heat)' },
          { kind: 'bed', val: '60', target: '/60°', color: 'var(--pr-heat)' },
          { kind: 'chamber', val: '38', target: '/40°', color: 'var(--pr-heat)' },
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
          { kind: 'nozzle', val: '200', target: '/220°', color: 'var(--pr-heat)' },
          { kind: 'bed', val: '55', target: '/55°', color: 'var(--pr-heat)' },
          { kind: 'chamber', val: '36', target: '/—', color: 'var(--pr-muted)' },
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
          { kind: 'nozzle', val: '27', target: '/—', color: 'var(--pr-muted)' },
          { kind: 'bed', val: '26', target: '/—', color: 'var(--pr-muted)' },
          { kind: 'chamber', val: '25', target: '/—', color: 'var(--pr-muted)' },
        ],
        ams: [{ slots: ['#F2F2F2', '#2B2B2B', '#E5484D', ''] }],
        hero: 'Available',
        heroSmall: '',
        context: '0.4 mm nozzle · PLA / PETG',
      },
    ] satisfies PrinterCardData[],
    review: {
      title: 'Review',
      sub: '3 pending review',
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
      list: [
        {
          key: 'new' as ReviewKey,
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
          key: 'rev' as ReviewKey,
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
      ],
    },
    pickup: {
      title: 'Enclosure Snap Clip',
      shelf: 'Stored at A-2-3',
      expires: 'Expires in 9m 42s',
      copiedText: 'Copied',
    },
  },
  'zh-cn': {
    screens: [
      { id: 'participant' as ScreenId, label: '选手端概况' },
      { id: 'console' as ScreenId, label: '控制台概况' },
      { id: 'review' as ScreenId, label: '人工审核' },
      { id: 'pickup' as ScreenId, label: '凭码取件' },
    ],
    overviewTitle: '概况',
    announcement:
      '取件处已移至 B 区服务台。22:00 起停止接收新订单，已排队的订单照常打印。未取走的零件明早 9:00 起在 B 区服务台领取，请携带取件码。',
    announcementMeta: '11/16 18:30 发布',
    myOrder: {
      title: '我的订单',
      status: '可取件',
      no: '#0039',
      name: '外壳卡扣',
      detail: '存放于 A-2-3',
      more: '另有 1 打印中 · 1 排队中',
    },
    site: {
      title: '现场',
      idle: '2 台空闲',
      queued: '14 单排队',
      wait: '预计等待 1–2 小时',
    },
    submitCard: {
      title: '提交文件',
      sub: '拖入 .gcode.3mf 或点击选择',
    },
    printersHeading: '打印机',
    printersCount: '11',
    viewAll: '查看全部 11 台打印机',
    participantNav: {
      items: ['概况', '提交', '我的订单', '我的'],
      user: '陈一帆',
      role: 'chenyifan',
    },
    consoleNav: {
      badge: '控制台',
      top: ['概况', '待办'],
      siteLabel: '现场',
      site: ['审核', '订单', '打印机', '取件'],
      opsLabel: '运营',
      ops: ['耗材目录', '申请表单', '公告', '用户'],
      sysLabel: '系统',
      sys: ['daemon', '审计日志', '系统设置'],
      user: '王工',
      role: '管理员',
    },
    consoleTop: {
      todoTitle: '待办 · 5',
      todoMore: '另有 2 项',
      todos: [
        { id: 'H2D-01', text: 'AMS A2 断料', time: '8 分钟', tone: 'alert' as const },
        { id: 'X2D-02', text: '待清板', time: '35 分钟', tone: 'wait' as const },
        { id: '#0027', text: '待取件超过 24 小时', time: '1 天', tone: 'idle' as const },
      ],
      reviewTitle: '待审核',
      reviewCount: '3 单',
      reviewSub: '最早一单已等 18 分钟',
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
          { kind: 'nozzle', val: '220', target: '/220°', color: 'var(--pr-heat)' },
          { kind: 'bed', val: '60', target: '/60°', color: 'var(--pr-heat)' },
          { kind: 'chamber', val: '38', target: '/40°', color: 'var(--pr-heat)' },
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
          { kind: 'nozzle', val: '200', target: '/220°', color: 'var(--pr-heat)' },
          { kind: 'bed', val: '55', target: '/55°', color: 'var(--pr-heat)' },
          { kind: 'chamber', val: '36', target: '/—', color: 'var(--pr-muted)' },
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
          { kind: 'nozzle', val: '27', target: '/—', color: 'var(--pr-muted)' },
          { kind: 'bed', val: '26', target: '/—', color: 'var(--pr-muted)' },
          { kind: 'chamber', val: '25', target: '/—', color: 'var(--pr-muted)' },
        ],
        ams: [{ slots: ['#F2F2F2', '#2B2B2B', '#E5484D', ''] }],
        hero: '可用',
        heroSmall: '',
        context: '0.4 喷嘴 · PLA / PETG',
      },
    ] satisfies PrinterCardData[],
    review: {
      title: '审核',
      sub: '3 单待审核',
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
      list: [
        {
          key: 'new' as ReviewKey,
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
          key: 'rev' as ReviewKey,
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
      ],
    },
    pickup: {
      title: '外壳卡扣',
      shelf: '存放于 A-2-3',
      expires: '9 分 42 秒后失效',
      copiedText: '已复制',
    },
  },
};

function PrinterGrid({ printers }: { printers: PrinterCardData[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
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
            className="flex flex-col overflow-hidden rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] text-left"
          >
            <div className="flex flex-1 flex-col gap-3 p-3.5">
              {/* Top row: id + model + status chip */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[13px] font-semibold text-[var(--pr-fg)]">
                  {p.id}
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] text-[var(--pr-muted)]">
                  {p.model}
                </span>
                <span
                  className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full px-2 text-[11px] font-semibold"
                  style={{ background: tone.s, color: tone.t }}
                >
                  <i
                    className="h-2 w-2 rounded-full"
                    style={{ background: tone.d }}
                  />
                  {p.label}
                </span>
              </div>

              {/* Middle row: camera + temps + AMS capsules */}
              <div className="grid grid-cols-[minmax(0,1fr)_82px_68px] items-center gap-2.5">
                <div
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-[10px]"
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
                  <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-1.5 font-mono text-[10px] leading-[16px] text-[#fafafa]">
                    {p.shot}
                  </span>
                </div>

                {/* Temps */}
                <dl
                  className="grid grid-cols-[auto_1fr] items-center gap-x-1 gap-y-1.5 text-[11px] leading-[14px]"
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
                <div className="flex flex-col justify-center gap-1">
                  {p.ams.map((unit, uIdx) => (
                    <div
                      key={`${p.id}-ams-${uIdx}`}
                      className="relative flex h-[22px] w-[46px] items-start justify-center gap-[2.5px] overflow-hidden rounded-[5px] bg-[var(--pr-sub)] pt-[4px]"
                      style={{
                        border: unit.err
                          ? '1.5px solid var(--pr-alert-d)'
                          : '1px solid var(--pr-line2)',
                      }}
                    >
                      <i className="absolute inset-x-0 bottom-0 h-[5px] bg-[var(--pr-line)]" />
                      {unit.slots.map((hex, sIdx) => (
                        <i
                          key={`${p.id}-s-${uIdx}-${sIdx}`}
                          className="relative block h-[12px] w-[5px] rounded-[2.5px]"
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
                      className="grid h-4 w-4 shrink-0 place-items-center rounded-full text-[9px] font-semibold text-white"
                      style={{ background: p.avBg }}
                    >
                      {p.avatar}
                    </span>
                    <span className="shrink-0 font-medium text-[var(--pr-fg)]">{p.owner}</span>
                    <span className="min-w-0 flex-1 truncate text-[var(--pr-muted)]">{p.file}</span>
                  </div>
                )}

                <div className="flex items-baseline gap-1.5">
                  <span
                    className="text-lg font-bold tracking-tight"
                    style={{ color: heroColor }}
                  >
                    {p.hero}
                  </span>
                  <span className="flex-1 truncate text-[11px] text-[var(--pr-muted)]">
                    {p.heroSmall}
                  </span>
                  {p.pct !== undefined && (
                    <span className="text-xs font-semibold text-[var(--pr-fg)]">{p.pct}%</span>
                  )}
                </div>

                {p.pct !== undefined && (
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--pr-track)]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${p.pct}%`, background: tone.d }}
                    />
                  </div>
                )}

                <span className="text-[11px] text-[var(--pr-muted)]">{p.context}</span>
              </div>
            </div>

            {p.alert && (
              <div
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold"
                style={{ background: 'var(--pr-alert-s)', color: 'var(--pr-alert-t)' }}
              >
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{p.alert}</span>
              </div>
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

  const t = SCREEN_DATA[lang];
  const activeReview = t.review.list.find((r) => r.key === reviewKey) ?? t.review.list[0];

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText('K7Q4-M9XR');
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <div className="mt-10 w-full">
      {/* Segmented Switcher above the real UI viewport */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-1.5">
        <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-[var(--pr-line)] bg-[var(--pr-sub)] p-1">
          {t.screens.map((s) => {
            const active = screen === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setScreen(s.id)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[var(--pr-ink)] text-[var(--pr-ink-fg)]'
                    : 'text-[var(--pr-muted)] hover:text-[var(--pr-fg)]'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Faithful PlateRelay Desktop Application Frame */}
      <div className="overflow-hidden rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-page)] text-left shadow-[0_12px_40px_-16px_rgba(0,0,0,0.12)]">
        {/* Minimal Window Bar */}
        <div className="flex items-center justify-between border-b border-[var(--pr-line)] bg-[var(--pr-card)] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--pr-line2)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--pr-line2)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--pr-line2)]" />
          </div>
          <span className="font-mono text-[11px] text-[var(--pr-muted)]">
            PlateRelay · {t.screens.find((s) => s.id === screen)?.label}
          </span>
          <span className="text-[11px] text-[var(--pr-faint)]">1440px UI</span>
        </div>

        {/* Screen 1: Participant Overview (DesktopMain) */}
        {screen === 'participant' && (
          <div className="grid lg:grid-cols-[200px_1fr]">
            {/* Left Sidebar */}
            <aside className="hidden flex-col justify-between border-r border-[var(--pr-line)] bg-[var(--pr-card)] p-3 lg:flex">
              <div className="flex flex-col gap-1">
                <div className="mb-3 flex items-center gap-2.5 px-2 py-1">
                  <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[var(--pr-ink)] text-[var(--pr-ink-fg)]">
                    <PrinterMark size={16} />
                  </span>
                  <span className="text-sm font-bold tracking-tight text-[var(--pr-fg)]">
                    PlateRelay
                  </span>
                </div>
                {[
                  { label: t.participantNav.items[0], icon: LayoutGrid, active: true },
                  { label: t.participantNav.items[1], icon: Upload, active: false },
                  { label: t.participantNav.items[2], icon: Package, active: false },
                  { label: t.participantNav.items[3], icon: User, active: false },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`flex h-9 items-center gap-2.5 rounded-[10px] px-3 text-[13px] ${
                        item.active
                          ? 'bg-[var(--pr-sub)] font-semibold text-[var(--pr-fg)]'
                          : 'font-medium text-[var(--pr-fg2)]'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2.5 rounded-xl p-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f43f5e] text-xs font-semibold text-white">
                  {t.participantNav.user.slice(0, 1)}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold text-[var(--pr-fg)]">
                    {t.participantNav.user}
                  </div>
                  <div className="truncate text-[11px] text-[var(--pr-muted)]">
                    {t.participantNav.role}
                  </div>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <div className="flex flex-col gap-4 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold tracking-tight text-[var(--pr-fg)]">
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
              <div className="flex items-start gap-3 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-3.5">
                <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--pr-fg)]" />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium leading-relaxed text-[var(--pr-fg)]">
                    {t.announcement}
                  </p>
                  <span className="mt-0.5 block text-[11px] text-[var(--pr-faint)]">
                    {t.announcementMeta}
                  </span>
                </div>
                <X className="h-4 w-4 shrink-0 text-[var(--pr-muted)]" />
              </div>

              {/* Top 3 Summary Cards */}
              <div className="grid gap-3 md:grid-cols-3">
                <div className="flex flex-col justify-between gap-2 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-3.5">
                  <div className="flex items-center justify-between text-sm font-semibold text-[var(--pr-fg)]">
                    <span>{t.myOrder.title}</span>
                    <ChevronRight className="h-4 w-4 text-[var(--pr-faint)]" />
                  </div>
                  <div>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: 'var(--pr-ok-t)' }}
                    >
                      <i
                        className="h-2 w-2 rounded-full"
                        style={{ background: 'var(--pr-ok-d)' }}
                      />
                      {t.myOrder.status}
                    </span>
                    <div className="mt-0.5 text-lg font-bold tracking-tight text-[var(--pr-fg)]">
                      {t.myOrder.no}
                    </div>
                    <div className="text-xs text-[var(--pr-fg2)]">{t.myOrder.name}</div>
                    <div className="text-xs text-[var(--pr-muted)]">{t.myOrder.detail}</div>
                  </div>
                  <div className="text-[11px] text-[var(--pr-faint)]">{t.myOrder.more}</div>
                </div>

                <div className="flex flex-col gap-2.5 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-3.5">
                  <div className="text-sm font-semibold text-[var(--pr-fg)]">{t.site.title}</div>
                  <div className="flex flex-col gap-2 text-[13px] font-medium text-[var(--pr-fg2)]">
                    <span className="flex items-center gap-2">
                      <PrinterMark size={15} />
                      {t.site.idle}
                    </span>
                    <span className="flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-[var(--pr-muted)]" />
                      {t.site.queued}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[var(--pr-muted)]" />
                      {t.site.wait}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-[var(--pr-faint)] p-4 text-center">
                  <Upload className="h-5 w-5 text-[var(--pr-muted)]" />
                  <span className="text-sm font-semibold text-[var(--pr-fg)]">
                    {t.submitCard.title}
                  </span>
                  <span className="text-xs text-[var(--pr-muted)]">{t.submitCard.sub}</span>
                </div>
              </div>

              {/* Printer Fleet Section */}
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between px-1">
                  <span className="text-sm font-semibold text-[var(--pr-muted)]">
                    {t.printersHeading}
                  </span>
                  <span className="text-xs text-[var(--pr-faint)]">{t.printersCount}</span>
                </div>
                <PrinterGrid printers={t.printers} />
              </div>
            </div>
          </div>
        )}

        {/* Screen 2: Operator Console Overview (ConsoleOverview) */}
        {screen === 'console' && (
          <div className="grid lg:grid-cols-[210px_1fr]">
            <aside className="hidden flex-col justify-between border-r border-[var(--pr-line)] bg-[var(--pr-card)] p-3 lg:flex">
              <div className="flex flex-col gap-0.5">
                <div className="mb-3 flex items-center gap-2 px-1.5 py-1">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[var(--pr-ink)] text-[var(--pr-ink-fg)]">
                    <PrinterMark size={16} />
                  </span>
                  <span className="text-sm font-bold tracking-tight text-[var(--pr-fg)]">
                    PlateRelay
                  </span>
                  <span className="ml-auto rounded-full bg-[var(--pr-sub)] px-2 py-0.5 text-[11px] font-semibold text-[var(--pr-muted)]">
                    {t.consoleNav.badge}
                  </span>
                </div>

                <div className="flex h-8 items-center gap-2.5 rounded-[10px] bg-[var(--pr-sub)] px-2.5 text-[13px] font-semibold text-[var(--pr-fg)]">
                  <LayoutGrid className="h-4 w-4" />
                  <span>{t.consoleNav.top[0]}</span>
                </div>
                <div className="flex h-8 items-center gap-2.5 rounded-[10px] px-2.5 text-[13px] font-medium text-[var(--pr-fg2)]">
                  <CheckSquare className="h-4 w-4" />
                  <span>{t.consoleNav.top[1]}</span>
                  <span
                    className="ml-auto rounded-full px-1.5 text-[11px] font-semibold text-white"
                    style={{ background: 'var(--pr-alert-d)' }}
                  >
                    5
                  </span>
                </div>

                <div className="px-2.5 pb-1 pt-2.5 text-[11px] font-semibold text-[var(--pr-faint)]">
                  {t.consoleNav.siteLabel}
                </div>
                {[
                  { label: t.consoleNav.site[0], icon: ClipboardCheck, count: '3' },
                  { label: t.consoleNav.site[1], icon: Package },
                  { label: t.consoleNav.site[2], icon: Boxes },
                  { label: t.consoleNav.site[3], icon: ScanLine },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex h-8 items-center gap-2.5 rounded-[10px] px-2.5 text-[13px] font-medium text-[var(--pr-fg2)]"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                      {item.count && (
                        <span
                          className="ml-auto rounded-full px-1.5 text-[11px] font-semibold text-white"
                          style={{ background: 'var(--pr-alert-d)' }}
                        >
                          {item.count}
                        </span>
                      )}
                    </div>
                  );
                })}

                <div className="px-2.5 pb-1 pt-2.5 text-[11px] font-semibold text-[var(--pr-faint)]">
                  {t.consoleNav.opsLabel}
                </div>
                {[
                  { label: t.consoleNav.ops[0], icon: Database },
                  { label: t.consoleNav.ops[1], icon: FileText },
                  { label: t.consoleNav.ops[2], icon: Megaphone },
                  { label: t.consoleNav.ops[3], icon: Users },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex h-8 items-center gap-2.5 rounded-[10px] px-2.5 text-[13px] font-medium text-[var(--pr-fg2)]"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}

                <div className="px-2.5 pb-1 pt-2.5 text-[11px] font-semibold text-[var(--pr-faint)]">
                  {t.consoleNav.sysLabel}
                </div>
                {[
                  { label: t.consoleNav.sys[0], icon: Server },
                  { label: t.consoleNav.sys[1], icon: History },
                  { label: t.consoleNav.sys[2], icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex h-8 items-center gap-2.5 rounded-[10px] px-2.5 text-[13px] font-medium text-[var(--pr-fg2)]"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center gap-2.5 rounded-xl p-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#14b8a6] text-xs font-semibold text-white">
                  {t.consoleNav.user.slice(0, 1)}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-semibold text-[var(--pr-fg)]">
                    {t.consoleNav.user}
                  </div>
                  <div className="truncate text-[11px] text-[var(--pr-muted)]">
                    {t.consoleNav.role}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex flex-col gap-4 p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold tracking-tight text-[var(--pr-fg)]">
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

              {/* Console Top Row: To-do (1.5fr) | Pending Review (1fr) | Site (1fr) */}
              <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr]">
                <div className="flex flex-col justify-between gap-2.5 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-3.5">
                  <div className="flex items-center justify-between text-sm font-semibold text-[var(--pr-fg)]">
                    <span>{t.consoleTop.todoTitle}</span>
                    <ChevronRight className="h-4 w-4 text-[var(--pr-muted)]" />
                  </div>
                  <ul className="flex flex-col gap-2">
                    {t.consoleTop.todos.map((td) => {
                      const dotColor =
                        td.tone === 'alert'
                          ? 'var(--pr-alert-d)'
                          : td.tone === 'wait'
                            ? 'var(--pr-wait-d)'
                            : 'var(--pr-idle-d)';
                      return (
                        <li key={td.id} className="flex items-center gap-2 text-xs">
                          <i
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: dotColor }}
                          />
                          <span className="shrink-0 font-mono font-semibold text-[var(--pr-fg)]">
                            {td.id}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[var(--pr-fg2)]">
                            {td.text}
                          </span>
                          <span className="shrink-0 text-[11px] text-[var(--pr-muted)]">
                            {td.time}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <span className="text-[11px] text-[var(--pr-faint)]">
                    {t.consoleTop.todoMore}
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-2 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-3.5">
                  <div className="flex items-center justify-between text-sm font-semibold text-[var(--pr-fg)]">
                    <span>{t.consoleTop.reviewTitle}</span>
                    <ChevronRight className="h-4 w-4 text-[var(--pr-muted)]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight text-[var(--pr-fg)]">
                      {t.consoleTop.reviewCount}
                    </div>
                    <div className="text-xs text-[var(--pr-muted)]">{t.consoleTop.reviewSub}</div>
                  </div>
                  <span className="text-[11px] text-[var(--pr-faint)]">
                    {t.consoleTop.reviewFoot}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)] p-3.5">
                  <div className="text-sm font-semibold text-[var(--pr-fg)]">{t.site.title}</div>
                  <div className="flex flex-col gap-2 text-[13px] font-medium text-[var(--pr-fg2)]">
                    <span className="flex items-center gap-2">
                      <PrinterMark size={15} />
                      {t.site.idle}
                    </span>
                    <span className="flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-[var(--pr-muted)]" />
                      {t.site.queued}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[var(--pr-muted)]" />
                      {t.site.wait}
                    </span>
                  </div>
                </div>
              </div>

              <PrinterGrid printers={t.printers} />
            </div>
          </div>
        )}

        {/* Screen 3: Interactive Review Queue (ConsoleReview) */}
        {screen === 'review' && (
          <div className="flex flex-col gap-4 p-4 sm:p-6">
            <div className="flex items-baseline gap-3">
              <h3 className="text-xl font-bold tracking-tight text-[var(--pr-fg)]">
                {t.review.title}
              </h3>
              <span className="text-xs text-[var(--pr-muted)]">{t.review.sub}</span>
            </div>

            <div className="grid gap-4 lg:grid-cols-[290px_1fr]">
              {/* Left Master List */}
              <div className="flex flex-col gap-2">
                {t.review.list.map((item) => {
                  const selected = item.key === activeReview.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setReviewKey(item.key)}
                      className={`flex cursor-pointer gap-3 rounded-[14px] p-3 text-left transition-all ${
                        selected ? 'bg-[var(--pr-card)]' : 'bg-transparent hover:bg-[var(--pr-card)]/60'
                      }`}
                      style={{
                        boxShadow: selected ? 'inset 0 0 0 1.5px var(--pr-fg)' : 'none',
                      }}
                    >
                      <div className="h-12 w-12 shrink-0 rounded-[10px] bg-[var(--pr-sub)]">
                        <IsometricPlateThumb c1={item.c1} c2={item.c2} c3={item.c3} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13px] font-semibold text-[var(--pr-fg)]">
                          {item.file}
                        </div>
                        <div className="text-xs text-[var(--pr-fg2)]">{item.meta}</div>
                        <div className="text-[11px] text-[var(--pr-muted)]">{item.ago}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Inspection Panel */}
              <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--pr-line)] bg-[var(--pr-card)]">
                <div className="flex flex-col gap-4 p-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h4 className="text-base font-bold text-[var(--pr-fg)]">
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
                      <span className="font-medium text-[var(--pr-fg)]">{activeReview.who}</span>
                      <span>
                        {activeReview.user} · {activeReview.at} ·{' '}
                        <span className="font-mono">{activeReview.no}</span>
                      </span>
                    </div>
                  </div>

                  {'warning' in activeReview && activeReview.warning && (
                    <div
                      className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-xs font-medium"
                      style={{ background: 'var(--pr-wait-s)', color: 'var(--pr-wait-t)' }}
                    >
                      <AlertTriangle className="h-4 w-4 shrink-0" />
                      <span>{activeReview.warning}</span>
                    </div>
                  )}

                  {'diff' in activeReview && activeReview.diff && (
                    <div className="flex flex-col gap-2">
                      <div className="text-xs font-semibold text-[var(--pr-muted)]">
                        {activeReview.diff.title}
                      </div>
                      <dl className="grid grid-cols-[88px_1fr] gap-x-4 gap-y-1.5 text-[13px]">
                        <dt className="text-[var(--pr-muted)]">{activeReview.diff.durLabel}</dt>
                        <dd className="text-[var(--pr-fg)]">
                          {activeReview.diff.durFrom} → <b>{activeReview.diff.durTo}</b>
                        </dd>
                        <dt className="text-[var(--pr-muted)]">{activeReview.diff.massLabel}</dt>
                        <dd className="text-[var(--pr-fg)]">{activeReview.diff.massVal}</dd>
                      </dl>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--pr-muted)]">
                        {t.review.fileSection}
                      </span>
                      <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-[var(--pr-sub)] px-3 text-xs font-medium text-[var(--pr-fg)]">
                        <Download className="h-3.5 w-3.5" />
                        {t.review.download}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3 rounded-[14px] border border-[var(--pr-line)] p-3.5 sm:flex-row">
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
                  <span className="inline-flex h-9 items-center rounded-full bg-[var(--pr-sub)] px-5 text-xs font-semibold text-[var(--pr-fg)]">
                    {t.review.reject}
                  </span>
                  <span className="inline-flex h-9 items-center rounded-full bg-[var(--pr-ink)] px-5 text-xs font-semibold text-[var(--pr-ink-fg)]">
                    {t.review.approve}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Screen 4: Pickup Code Modal (DesktopPickup) */}
        {screen === 'pickup' && (
          <div className="relative grid min-h-[420px] place-items-center bg-[var(--pr-page)] p-6 sm:p-10">
            {/* Subtle dimmed background orders context */}
            <div className="pointer-events-none absolute inset-0 bg-black/30" />

            <div className="relative z-10 flex w-full max-w-[360px] flex-col items-center gap-4 rounded-[20px] border border-[var(--pr-line)] bg-[var(--pr-card)] px-7 py-7 text-center shadow-[0_20px_50px_rgba(0,0,0,0.22)]">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5 text-base font-bold text-[var(--pr-fg)]">
                  <QrCode className="h-4 w-4 text-[var(--pr-muted)]" />
                  <span>{t.pickup.title}</span>
                </div>
                <span className="text-xs text-[var(--pr-muted)]">{t.pickup.shelf}</span>
              </div>

              {/* QR always on white surface for scannability */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-3.5">
                <PickupQrSvg />
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-[14px] bg-[var(--pr-sub)] px-4 text-[var(--pr-fg)] transition-opacity hover:opacity-85"
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

              <div className="flex items-center gap-1.5 text-xs text-[var(--pr-muted)]">
                <Clock className="h-3.5 w-3.5" />
                <span>{copied ? t.pickup.copiedText : t.pickup.expires}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
