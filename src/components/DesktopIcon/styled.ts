import { darken, getLuminance, lighten } from 'polished';
import styled from 'styled-components';

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > svg {
    width: 3.8rem;
    height: 3.8rem;
    padding: 0.3rem;
  }

  > div {
    margin-top: 0.4rem;
    font-size: 1.2rem;
    padding: 0.3rem;
    border-radius: 0.3rem;
    max-width: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
  }

  &:focus {
    outline: none;

    > svg {
      border: 2px solid
        ${({ theme }) => {
          const luminance = getLuminance(theme.background);
          const colorTransformFn = luminance >= 0.5 ? darken : lighten;

          return colorTransformFn(0.3, theme.background);
        }};
      border-radius: 0.8rem;
    }

    > div {
      background: ${({ theme }) => theme.foreground};
      color: ${({ theme }) => theme.background};
    }
  }
`;
