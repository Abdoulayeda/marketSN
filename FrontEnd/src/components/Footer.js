/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 22/04/2022 - 04:58:37
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 22/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
import React from 'react';

const Footer = ()=> {

    return (
        <div>
            <footer className="footer bg-dark pt-5">
    <div className="container">
      <div className="row pb-2">
        <div className="col-md-4 col-sm-6">
          <div className="widget widget-links widget-light pb-2 mb-4">
            <h3 className="widget-title text-light">SHOPSN</h3>
          </div>
        </div>
 
      </div>
    </div>
    <div className="pt-5 bg-darker">
      <div className="container">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="d-flex"><i className="ci-rocket text-primary" ></i>
              <div className="ps-3">
                <h6 className="fs-base text-light mb-1">Venez découvrir</h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="d-flex"><i className="ci-currency-exchange text-primary" ></i>
              <div className="ps-3">
                <h6 className="fs-base text-light mb-1">Faire un don</h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="d-flex"><i className="ci-support text-primary" ></i>
              <div className="ps-3">
                <h6 className="fs-base text-light mb-1"> Disponible 24/7 </h6>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="d-flex"><i className="ci-card text-primary" ></i>
              <div className="ps-3">
                <h6 className="fs-base text-light mb-1">Vos produits aux meilleurs prix</h6>
              </div>
            </div>
          </div>
        </div>
        <hr className="hr-light mb-5"/>
        <div className="pb-4 fs-xs text-light opacity-50 text-center text-md-start">© All rights reserved. Made by <a className="text-light" href="/" target="_blank" rel="noopener">BLOGSNTECH</a></div>
      </div>
    </div>
  </footer>
        </div>
    )
}

export default Footer