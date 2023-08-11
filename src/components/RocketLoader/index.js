export const RocketLoader = ({title = "Cargando"}) => {
  return (
    <div className="overlay">
      <div className="centered">
        <div className="containerRocket">
          <div className="loader">
            <div className="rocket">
              <i className="fas fa-rocket"></i>
              <i className="fas fa-cloud" style={{ "--i": 0 }}></i>
              <i className="fas fa-cloud" style={{ "--i": 1 }}></i>
              <i className="fas fa-cloud" style={{ "--i": 2 }}></i>
              <i className="fas fa-cloud" style={{ "--i": 3 }}></i>
            </div>
            <span>
              <i></i>
              
            </span>
          </div>
        </div>
        <div className='title-loader'>

            {title}
        </div>
      </div>
    </div>
  );
};
