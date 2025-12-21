const Header = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="logo">
          <div className="logo-icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 8 8" fill="#1f2937"><title xmlns="" fill="#1f2937">student</title><path fill="#1f2937" d="M0 3h1v4m1-1V4h4v2M0 3l4-2l4 2l-4 2" /></svg></div>
          <h1>Student Task Manager</h1>
        </div>
        <p className="tagline">Organize • Focus • Achieve</p>
      </div>
    </header>
  );
};

export default Header;