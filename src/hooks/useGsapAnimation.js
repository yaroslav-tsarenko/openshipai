import { useEffect, useRef } from 'react';
import { getAnimation } from '../utils/animations';

const useGsapAnimation = (animationType, dependencies = []) => {
    const elementRef = useRef(null);

    useEffect(() => {
        if (elementRef.current) {
            const animation = getAnimation(animationType);
            animation(elementRef.current);
        }
    }, [animationType, ...dependencies]);

    return elementRef;
};

export default useGsapAnimation;