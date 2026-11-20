import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconGrid = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export const IconUsers = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M16 20v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 20v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const IconQA = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M9.5 9a2.5 2.5 0 1 1 3 2.45V13" />
    <path d="M12.5 16.01l.01-.011" />
  </svg>
);

export const IconReport = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M8 13h8M8 17h5" />
  </svg>
);

export const IconActivity = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

export const IconLogout = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </svg>
);

export const IconEye = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconEyeOff = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M17.94 17.94A10.05 10.05 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94" />
    <path d="M22.54 12.88A18.5 18.5 0 0 0 23 12s-4-8-11-8a10 10 0 0 0-3.7.7" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <path d="M1 1l22 22" />
  </svg>
);

export const IconSearch = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const IconChevronRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const IconArrowLeft = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

export const IconMenu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const IconClose = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const IconDot = (p: IconProps) => (
  <svg {...base} {...p} strokeWidth={0} fill="currentColor">
    <circle cx="12" cy="12" r="4" />
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

export const IconDownload = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);

export const IconArrowUp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 19V5" />
    <path d="M5 12l7-7 7 7" />
  </svg>
);

export const IconArrowDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14" />
    <path d="M19 12l-7 7-7-7" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const IconAlert = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);
