import React from 'react';
import { styled } from '@mui/material/styles';

interface SeverityPillRootProps {
  ownerState: { color: string };
}

interface SeverityPillProps {
  color?: string;
  children: React.ReactNode;
}

const SeverityPillRoot: React.FC<SeverityPillRootProps> = styled('span')(
  ({ theme, ownerState }) => {
    const backgroundColor = theme.palette[ownerState.color].alpha12;
    const color =
      theme.palette.mode === 'dark'
        ? theme.palette[ownerState.color].main
        : theme.palette[ownerState.color].dark;

    return {
      alignItems: 'center',
      backgroundColor,
      borderRadius: 12,
      color,
      cursor: 'default',
      display: 'inline-flex',
      flexGrow: 0,
      flexShrink: 0,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 2,
      fontWeight: 600,
      justifyContent: 'center',
      letterSpacing: 0.5,
      minWidth: 20,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
    };
  }
);

const SeverityPill: React.FC<SeverityPillProps> = ({
  color = 'primary',
  children,
}) => {
  const ownerState = { color };

  return (
    <SeverityPillRoot ownerState={ownerState}>{children}</SeverityPillRoot>
  );
};

export default SeverityPill;
