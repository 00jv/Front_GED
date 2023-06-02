import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/animations/95083-file-search.json';
import styled from "styled-components"

const ContainerAnimation = styled.div`
  width: 250px;
  margin: 0 auto;
`

function MeuComponente() {
    const lottieContainer = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: lottieContainer.current,
            animationData: animationData, // Importado anteriormente
            loop: true,
            autoplay: true,
        });
    }, []);

    return (
        <>
            <div>
                <ContainerAnimation style={{ width: "450px", margin: '0 auto' }} ref={lottieContainer}></ContainerAnimation>
                <h2 style={{ textAlign: 'center' }}>Por enquanto não há nada!!</h2>
            </div>
        </>
    );
}

export default MeuComponente;