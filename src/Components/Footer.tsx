import "../styles/footer.scss";

import { FaCode, FaGithub, FaHeart } from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer inline-row">
      <div>
        <p className="inline-row">
          Made with <FaHeart /> and <FaCode /> Alex Barnes '23
        </p>
      </div>
      <div className="inline-row">
        <Link to={"https://github.com/sixtysixcode/hedgehog-lab-test"}>
          <FaGithub />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
