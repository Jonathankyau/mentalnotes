import "../footer/footer.css";
const Footer = () => {
  const year = new Date().getFullYear();

  return <footer>{`Copyright © jkfett ${year}`}</footer>;
};

export default Footer;