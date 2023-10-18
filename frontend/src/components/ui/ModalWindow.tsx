import {Dispatch, FC, ReactNode, SetStateAction} from "react";
import styled from "styled-components";
import {css} from "styled-components";

interface ModalContentProps {
    $active: string;
}

const ModalOverlay = styled.div<ModalContentProps>`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: 0.15s;
  visibility: hidden;

  ${({$active}) =>
          $active === 'true' &&
          css`
            visibility: visible;
            opacity: 1;
            pointer-events: auto;
          `}
`;


const ModalContent = styled.div<ModalContentProps>`
  transform: scale(0.5);
  transition: 0.15s all;
  min-width: 35%;
  background-color: white;
  border-radius: 15px;

  overflow-y: auto;
  max-height: 80vh;

  ${({$active}) =>
          $active === 'true' &&
          css`
            transform: scale(1);
          `}
`;

interface ModalWindowProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
    children?: ReactNode;
}

export const ModalWindow: FC<ModalWindowProps> = ({active, setActive, children}) => {
    return (
        <>
            <ModalOverlay $active={active.toString()} onClick={() => setActive(false)}>
                <ModalContent
                    className="m-4"
                    $active={active.toString()}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    {children}
                </ModalContent>
            </ModalOverlay>
        </>
    );
};
