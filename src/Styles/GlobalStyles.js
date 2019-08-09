import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');
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
        color:${props => props.theme.blueColor};
        text-decoration:none;
    }
`;
