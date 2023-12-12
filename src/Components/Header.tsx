interface HeaderProps {
  }
  
  const Header: React.FC<HeaderProps> = () => {
    return (
      <div className=" bg-grayblue top-0 bg-indigo-500  w-full text-indigo-50 flex items-center justify-start pl-10 ">

    <header>
      <ul className="list-none font-roboto font-extrabold">
        <li className="text-center">BAROMETRO BIENESTAR</li>
      </ul>
    </header>
  </div>
    );
  };
  
  export default Header;