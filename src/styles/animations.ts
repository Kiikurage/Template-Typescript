import { keyframes } from 'styled-components';

export const ANIMATION_SPIN = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;
