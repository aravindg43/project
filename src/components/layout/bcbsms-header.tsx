"use client";
import ContentfulImage from "@/components/contentfulImage";
import GlobalServiceFactory from "@/app/serviceFactory/globalServiceFactory";
import { useState } from "react";

export function Header() {
  const myBlueProvider = "https://testblueland.bcbsms.com";
  const myBlueEmployer = "https://testblueland.bcbsms.com";
  const myBlueAgent = "https://testblueland.bcbsms.com";

  const beHealthyBlog = "https://test.behealthy.bcbsms.com";
  const healthierMississippi = "https://test.healthiermississippi.org";
  const getReadyToRun = "https://test.getreadytorunms.com";
  const blueHealthBaptist = "https://test.bluehealthbaptist.com";
  const indianolaWellness = "https://test.indianolawellness.bcbsms.com";

  const isMobile = false;
  const [isLoading, setIsLoading] = useState(false);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showServiceErrors, setShowServiceErrors] = useState(false);

  const [showFindCare, setShowFindCare] = useState(false);
  const [showFindWellness, setShowFindWellness] = useState(false);
  const [showFindCoverage, setShowFindCoverage] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  function toggleMenu(tabToOpen: number) {
    resetMenus();
    switch (tabToOpen) {
      case 1:
        setShowFindCare(!showFindCare);
        break;
      case 2:
        setShowFindWellness(!showFindWellness);
        break;
      case 3:
        setShowFindCoverage(!showFindCoverage);
        break;
      case 4:
        setShowLoginForm(!showLoginForm);
        break;
      default:
    }
  }

  function resetMenus() {
    setShowFindCare(false);
    setShowFindCoverage(false);
    setShowFindWellness(false);
    setShowLoginForm(false);
  }

  async function validate(validationType: string, value: string) {
    switch (validationType) {
      case "user":
        if (value.length < 1) {
          setUserNameError("Please enter a username.");
        }
        if (/^\s*.{1,32}\s*$/.test(value) === false) {
          setUserNameError("Please enter a valid username.");
        } else setUserNameError("");
        break;
      case "password":
        if (value.length < 1) {
          setPasswordError("Please enter a password.");
        }
        if (/^\s*.{1,32}\s*$/.test(value) === false) {
          setPasswordError("Please enter a valid password.");
        } else setPasswordError("");
        break;
    }
  }

  function login() {
    setIsLoading(true);
    const payload = {
      context: "MEMBER",
      ipAddress: "0.0.0.0",
      password: password,
      systemId: "DOTCOM",
      userAgent: navigator.userAgent,
      userName: userName,
    };

    if (
      (userNameError === "" || passwordError === "") &&
      (userName !== "" || password !== "")
    ) {
      GlobalServiceFactory.memberLogin(payload)?.then((data: any) => {
        console.log("data", data);
      });
      setIsLoading(false);
    } else {
      console.log("fail");
      setIsLoading(false);
    }
  }

  return (
    <>
      <header id="global-header" className="dotcom-header">
        <section className="flex-row logo-and-secondary" id="logo-and-secondary">
          <a className="bcbsms-logo" href="/">
            <ContentfulImage imageID="21C6umRDHAzgmHmgOUqrmj" altText="bcbsms-logo" />
          </a>

          <nav id="secondary-nav" className="secondary-nav flex-row">
            <a href="/about-us">About Us</a>
            <a href="/im-a-member/">I'm a Member</a>
            <a href="/im-a-provider/">I'm a Provider</a>
            <a href="/im-a-employer/">I'm an Employer</a>
          </nav>
        </section>

        <section id="nav-and-menus" className="position-relative">
          <nav id="primary-nav" className="primary-nav flex-row">
            <div id="nav-wrapper-1">
              <button
                id="nav-option-1"
                className={!showFindCare ? "background-white color-black" : "background-dark-blue color-white"}
                onClick={() => toggleMenu(1)}
              >
                Find Care
                {!showFindCare && <span className="nav-chevron nav-chevron-closed">«</span>}
                {showFindCare && <span className="nav-chevron nav-chevron-open">«</span>}
              </button>
              {showFindCare && (
                <menu id="primary-nav-menu-1" className="primary-nav-menu">
                  <div className="flex-row nav-headers">
                    <h3>Providers</h3>
                    <h3>Pharmacies</h3>
                    <h3>Know Your Benefits</h3>
                  </div>

                  <div className="flex-row nav-content">
                    <div className="flex-column">
                      <a href="/im-a-member/find-a-network-provider/">Find a Network Provider</a>
                      <a
                        href={beHealthyBlog + "/Health-and-Wellness/Accessing-Your-Virtual-ID-Card"}
                        target="_blank"
                      >
                        Accessing Your Virtual ID Card
                      </a>
                    </div>
                    <div className="flex-column">
                      <a href="/im-a-member/find-a-pharmacy/">Find a Pharmacy</a>
                      <a
                        href="https://testblueland.bcbsms.com/angular-apps/medical-drug-formulary-search/search.html#/"
                        target="_blank"
                      >
                        Drug Search
                      </a>
                    </div>
                    <div className="flex-column">
                      <a href="/im-a-member/healthy-you-wellness-benefit">
                        <span className="italic">Healthy You!</span> Wellness Benefit
                      </a>
                      <a href="/im-a-member/member-benefits-and-programs">Member Benefits & Programs</a>
                    </div>
                  </div>
                </menu>
              )}
            </div>
            <div id="nav-wrapper-2">
              <button
                id="nav-option-2"
                className={!showFindWellness ? "background-white color-black" : "background-dark-blue color-white"}
                onClick={() => toggleMenu(2)}
              >
                Find Wellness
                {!showFindWellness && <span className="nav-chevron nav-chevron-closed">«</span>}
                {showFindWellness && <span className="nav-chevron nav-chevron-open">«</span>}
              </button>
              {showFindWellness && (
                <menu id="primary-nav-menu-2" className="primary-nav-menu">
                  <div className="flex-row nav-headers">
                    <h3>Be Healthy</h3>
                    <h3>Experience Blue</h3>
                    <h3>Featured</h3>
                  </div>

                  <div className="flex-row nav-content">
                    <div className="flex-column">
                      <a target="_blank" href={beHealthyBlog + "/mississippi-matters/"}>
                        Mississippi Matters
                      </a>
                      <a target="_blank" href={beHealthyBlog + "/health-and-wellness/"}>
                        Health & Wellness
                      </a>
                      <a target="_blank" href={beHealthyBlog + "/food-and-recipes/"}>
                        Food & Recipes
                      </a>
                      <a target="_blank" href={beHealthyBlog + "/mental-health/"}>
                        Mental Health
                      </a>
                      <a target="_blank" href={beHealthyBlog}>
                        <span className="italic">View All Articles »</span>
                      </a>
                    </div>
                    <div className="flex-column">
                      <a target="_blank" href={healthierMississippi}>
                        Blue Cross & Blue Shield of Mississippi Foundation
                      </a>
                      <a target="_blank" href={getReadyToRun}>
                        Get Ready to Run!
                      </a>
                      <a target="_blank" href={blueHealthBaptist}>
                        BlueHealth Baptist
                      </a>
                      <a target="_blank" href={indianolaWellness}>
                        Indianola Community Wellness Center
                      </a>
                    </div>
                  </div>
                </menu>
              )}
            </div>
            <div id="nav-wrapper-3">
              <button
                id="nav-option-3"
                className={!showFindCoverage ? "background-white color-black" : "background-dark-blue color-white"}
                onClick={() => toggleMenu(3)}
              >
                Find Coverage
                {!showFindCoverage && <span className="nav-chevron nav-chevron-closed">«</span>}
                {showFindCoverage && <span className="nav-chevron nav-chevron-open">«</span>}
              </button>
              {showFindCoverage && (
                <menu id="primary-nav-menu-3" className="primary-nav-menu">
                  <div className="flex-row nav-headers">
                    <h3>Individuals & Families</h3>
                    <h3>For Employers</h3>
                    <h3>Seniors</h3>
                  </div>

                  <div className="flex-row nav-content">
                    <div className="flex-column">
                      <a href="/find-coverage/blue-care">Blue Care</a>
                      <a href="/find-coverage/special-enrollment">Special Enrollment</a>
                    </div>
                    <div className="flex-column">
                      <a href="/find-coverage/small-business">Small Business</a>
                      <a href="/find-coverage/large-business">Large Business</a>
                    </div>
                    <div className="flex-column">
                      <a href="/find-coverage/blue65">65+ Medicare</a>
                    </div>
                  </div>
                </menu>
              )}
            </div>
            <div id="nav-wrapper-login">
              <button
                id="nav-option-4"
                className={!showLoginForm ? "background-white color-black" : "background-dark-blue color-white"}
                onClick={() => toggleMenu(4)}
              >
                <div className="flex-row login-logo no-pointer-events">
                  <div className="myblue-text">
                    <span className="italic">my</span>
                    <span className="bold color-primary-blue">Blue</span>
                  </div>
                  <span className="bold login-text">Login</span>
                </div>
                {!showLoginForm && <span className="nav-chevron nav-chevron-closed">«</span>}
                {showLoginForm && <span className="nav-chevron nav-chevron-open">«</span>}
              </button>
              {showLoginForm && (
                <menu id="primary-nav-menu-4" className="primary-nav-menu login">
                  {isMobile && (
                    <button className="mobile-nav-back mobile-only" onClick={() => toggleMenu(4)}>
                      « Back
                    </button>
                  )}

                  <h2 className="no-margin text-center">Member Login</h2>

                  <p className="new-to-myblue text-center">
                    New to <span className="italic">my</span>Blue? <a href="$memberLandSignup">Register Now</a>
                  </p>

                  <div>
                    <input
                      id="username"
                      className="login"
                      placeholder="Username"
                      type="text"
                      maxLength={20}
                      onBlur={() => validate("user", userName)}
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                    />

                    <p id="username-errors" className="errors no-margin"></p>

                    {userNameError !== "" && (
                      <p id="username-errors" className="errors no-margin">
                        {userNameError}
                      </p>
                    )}

                    <input
                      id="password"
                      className="login"
                      placeholder="Password"
                      type="password"
                      maxLength={32}
                      onBlur={() => validate("password", password)}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />

                    {passwordError !== "" && (
                      <p id="password-errors" className="errors no-margin">
                        {passwordError}
                      </p>
                    )}

                    <p className="text-center">
                      Forgot <a className="color-white" href="$memberLandForgotUsername">Username</a> or
                      <a className="color-white" href="$memberLandForgotPassword">Password?</a>
                    </p>

                    <button
                      id="login-submit"
                      className="submit"
                      onClick={() => {
                        validate("user", userName), validate("password", password), login();
                      }}
                    >
                      Login
                    </button>
                  </div>

                  {showServiceErrors && (
                    <div id="login-error-wrapper" className="error-message">
                      <p id="login-error-message" className="no-margin">
                        Failed to login to myBlue Member. Please try again later.
                      </p>
                    </div>
                  )}

                  <div className="flex-column partner-logins">
                    <a href={myBlueProvider}>Provider Login</a>
                    <a href={myBlueEmployer}>Employer Login</a>
                    <a href={myBlueAgent}>Agent Login</a>
                  </div>
                </menu>
              )}
            </div>
          </nav>
        </section>
      </header>

      {isLoading && <div className="message-overlay" />}
      {isLoading && (
        <div className="loading-container">
          <div id="floatingCirclesG">
            <div className="f_circleG" id="frotateG_01"></div>
            <div className="f_circleG" id="frotateG_02"></div>
            <div className="f_circleG" id="frotateG_03"></div>
            <div className="f_circleG" id="frotateG_04"></div>
            <div className="f_circleG" id="frotateG_05"></div>
            <div className="f_circleG" id="frotateG_06"></div>
            <div className="f_circleG" id="frotateG_07"></div>
            <div className="f_circleG" id="frotateG_08"></div>
          </div>
          <p>Loading</p>
        </div>
      )}
    </>
  );
}