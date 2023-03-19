import { useRef, useMemo, useState, FC } from 'react'
import { Transition, TransitionGroup } from 'react-transition-group';

const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}
const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

export interface DiagonalCarouselProps {
  imageUrls: string[];
  // TODO: type this properly with CSS properties types
  heightInRem: number;
  // TODO: type this properly with CSS properties types
  widthInRem: number;
}

/*** TODO: Add js docs here*/
export const DiagonalCarousel: FC<DiagonalCarouselProps> = ({
  imageUrls = [],
  heightInRem = 'auto',
  widthInRem = 80
}) => {
  const [show, setShow] = useState<boolean>(true);
  
  const nodeRef = useRef(null);
  const miniViewWidth = useMemo(() => Math.floor(widthInRem / 3), [widthInRem]);

  return (
    <>
      <label>
        <input type="checkbox" id="show" onChange={(_) => setShow(show => !show) } />
        <span>Show</span>
      </label>
      <br />
      <Transition nodeRef={nodeRef} in={show} timeout={duration}>
        {state => (
          <div ref={nodeRef} style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            I'm a fade Transition!
          </div>
        )}
      </Transition>
    </>
  )
}
