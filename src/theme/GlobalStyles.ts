import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');    
    
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
        background-color: #fff;
        box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    }

    html{
        width: 100vw;
        height: 100vh;
        padding: 3% 15% 3% 15%;
        background-color: #6c6c6c;

    }

`;
