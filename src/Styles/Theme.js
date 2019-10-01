const BOX_BORDER = "1px solid #e6e6e6";
const BORDER_RADIUS = "4px";
const HEADER_HEIGHT = 65;
const SIDE_BOX_SIZE = 290;
const POST_BOX_SIZE = 600;
const FONTS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif";

export default {
  fontFamily: FONTS,
  titleColor: "#DD604A",
  headerHeightSize: `${HEADER_HEIGHT}`,
  headerHeight: `${HEADER_HEIGHT}px`,
  headerBorderBottomColor: "#D0D0D0",
  maxWidth: "935px",
  bgColor: "#F3F3F3",
  whiteColor: "#FFFFFF",
  yellowColor: "#F9DF33",
  blackColor: "#222222",
  borderGreyColor: "#DBDBDB",
  lightGreyColor: "#ADADAD",
  superLightGreyColor: "#EEE",
  darkGreyColor: "#7D7D7D",
  redColor: "#ED4956",
  blueColor: "#3897f0",
  darkBlueColor: "#003569",
  boxBorder: "1px solid #e6e6e6",
  borderRadius: "4px",
  whiteBox: `border:${BOX_BORDER};
             border-radius:${BORDER_RADIUS};
             background-color:white;
            `,
  postBox: `
  width:${POST_BOX_SIZE}px;
  border-radius:3px;
  margin:20px auto 25px;
  border-bottom:1px solid #DEDEDE;
  background-color:#FFF;
  box-shadow:0 1px 0 rgba(198,201,206,.2);
`,
  sideBoxSize: `${SIDE_BOX_SIZE}px`,
  postBoxSide: `
  width:${SIDE_BOX_SIZE}px;
  padding:10px;
  border-radius:3px;
  margin:20px auto 25px;
  border-bottom:1px solid #DEDEDE;
  background-color:#FFF;
  box-shadow:0 1px 0 rgba(198,201,206,.2);
`,
  redButton: `
  border:1px solid #f26a41;
  background-color:#f26a41;
  color:#FFF;
  &:focus {
    outline: none;
  }
  &:hover{
    background-color:#d95f3a;
  }
`,
  greenButton: `
  border:1px solid #30E6B5;
  background-color:#30E6B5;
  color:#FFF;
  &:focus {
    outline: none;
  }
  &:hover{
    background-color:#25B38D;
  }
`,
  avatar: {
    size: {
      sm: "28px",
      md: "36px",
      lg: "56px"
    }
  }
};
