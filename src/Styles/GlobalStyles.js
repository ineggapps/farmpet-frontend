import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons');

    ${reset}
    *{
        box-sizing:border-box;
    }
    body{
        background-color:${props => props.theme.bgColor};
        color:${props => props.theme.blackColor};
        font-family:${props => props.theme.fontFamily};
    }
    a{
        color:inherit;
        /* color:${props => props.theme.blueColor}; */
        text-decoration:none;
    }
`;
