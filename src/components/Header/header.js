import logo from '../../assests/cinema.png'
import './Header.css'

const Header = (props) => {

  return (
    <nav className="navbar">
      <a className="navbar-brand" href="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Movies/TV-Shows
      </a>
    </nav>
  );
};
export default Header;
