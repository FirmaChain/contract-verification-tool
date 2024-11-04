import { ReactNode, useMemo } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, elementId }: { children: ReactNode; elementId: string }) => {
    //! assumes the element "modal-root" is always exsist
    const rootElement: Element = useMemo(() => document.getElementById(elementId)!, [elementId]);

    return createPortal(children, rootElement);
};

export default Portal;
