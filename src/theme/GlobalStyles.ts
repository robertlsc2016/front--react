import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
    
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Varela Round', sans-serif; 
        /* font-weight: 400; */
    }

    body{

        *{
            /* border: 1px solid black; */
        }

        font-family: 'Raleway', sans-serif;
        font-family: 'Varela Round', sans-serif;

        display: flex;
        justify-content: 'center';
        align-items: 'center';
        flex-direction: column;


        box-sizing: border-box;
        height: 100%;
        width: 100%;

        border-radius: 16px;
        padding: 8px;
        background-color: #f5ffff;
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    }

    html{
        width: 100vw;
        height: 100vh;
        padding: 3% 15% 3% 15%;
        background-color: #808080;

        /* @media screen and (max-width: 500px) {
            padding: 3% 5% 3% 5%;

        } */
    }



    #root{
        height: 100%;
        width: 100%;
    }

`;
