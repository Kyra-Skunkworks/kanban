// import Header from "./Header";

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD",
  display: "flex",
};

const Layout = (props) => (
  <div style={layoutStyle}>
    {/* <div style={{ minWidth: 200, maxWidth: 200 }}>
      <Header />
    </div>
    {props.children} */}
    {props.children}
  </div>
);

export default Layout;
