import React from "react";
import "../../styles/user/Privacy.css";
import HeaderPage from "../../components/user/HeaderPage";
import Footer from './Footer';

export default function Privacy() {
  return (
    <div>
      <HeaderPage />
      <div className="terms1">
        <div className="privacy">
          <div className="privacy-title">
            <h1>Privacy Policy</h1>
          </div>
          <div className="body-content">
            <div className="body-part">
              <ol>
                <li>
                  <a className="heading" href="#item1" >
                    PURPOSE
                  </a>
                </li>
                <li>
                  <a className="heading" href="#item2">
                    WHAT IS PERSONAL DATA?
                  </a>
                </li>
                <li>
                  <a className="heading" href="#item3">
                    PERSONAL DATA COLLECTED
                  </a>
                </li>
                <li>
                  <a className="heading" href="#item4">
                    ACCESSING YOUR PERSONAL DATA
                  </a>
                </li>
                <li>
                  <a className="heading" href="#item5">
                    COMPLAINTS
                  </a>
                </li>
                <li>
                  <a className="heading" href="#item6">
                    OWNER AND DATA CONTROLLER
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="data">
          <div className="purpose" id="item1">
            <h2 className="pur">Purpose</h2>
            <div className="purpose-data">
              <p>
                Little & Big is committed to protecting your privacy because we
                are committed to valuing people. Our Privacy Policy below sets
                out how your personal information is collected, used and
                protected. The Demo Country Privacy Principles also apply to us.
              </p>
              <p>
                This Privacy Policy describes our policies and procedures on the
                collection, holding, use and disclosure of your personal
                information and should be read together with our Terms and
                Conditions. By providing your personal information you consent
                to our collection, use and disclosure of that information in
                accordance with this Privacy Policy.
              </p>
            </div>
          </div>
          <div className="personal" id="item2">
            <h2 className="pur">What is Personal Data ?</h2>
            <div className="personal-data">
              <p>
                When used in this Policy, "personal information" has the meaning
                given in the Privacy Act. Generally, it means any information or
                an opinion that could be used to identify you.
              </p>
            </div>
          </div>
          <div className="collect" id="item3">
            <h2 className="pur">Personal Data Collected</h2>
            <div className="collect-data">
              <p>
                Personal Data collected for the following purposes and using the
                following services:
              </p>
              <ol>
                <li>Google Analytics: Cookies; Usage Data</li>
                <li>Contact form: email address; first name; phone number</li>
                <li>Mailing list or newsletter: email address; first name</li>
              </ol>
            </div>
          </div>
          <div className="access" id="item4">
            <h2 className="pur">Accessing your Personal Data</h2>
            <div className="access-data">
              <p>
                You may request access to your personal information collected by
                us, and ask that we correct that personal information. You can
                ask for access or correction by contacting us and we will
                usually respond within 30 days. If we refuse to give you access
                to, or correct, your personal information, we will notify you in
                writing setting out the reasons.
              </p>
            </div>
          </div>
          <div className="complaint" id="item5">
            <h2 className="pur">Complaints</h2>
            <div className="comlaint-data">
              <p>
                If you believe your privacy has been breached or you have a
                complaint about how we have handled your personal information,
                please contact us in writing. We will respond within a
                reasonable period (usually within 30 days).
              </p>
            </div>
          </div>
          <div className="owner" id="item6">
            <h2 className="pur">Owner and Data Controller</h2>
            <div className="owner-data">
              <p>The Commons</p>
              <p>20-40 demo St,</p>
              <p>Jon doe NSW 2008</p>
              <p>Country</p>
              <p>demo@demo.com</p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
