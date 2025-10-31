"use client";
import { useState } from "react";
import ThirdPartyModal from "@/components/thirdPartyModal";
import ContentfulImage from "@/components/contentfulImage";

export function Footer() {
  const isMobile = false;
  const imageIDs = {
    footerBar: "3hiwDAk6xe9lDPWQMZ6gd4",
    footerBarAltText: "footer-bar",
    facebookLogo: "1pSoEEweqivxL91gAlfWoC",
    facebookLogoAltText: "facebook",
    myBlueApp: "RHEIYN91X1DdtCbVXJo9E",
    myBlueAppAltText: "myblue",
  };
  const [showThirdPartyModal, setShowThirdPartyModal] = useState(false);
  const [externalLink, setExternalLink] = useState("");

  const bcbsms = "https://sandt.bcbsms.com";
  const beHealthyBlog = "https://test.behealthy.bcbsms.com";
  const healthierMississippi = "https://test.healthiermississippi.org";
  const getReadyToRun = "https://test.getreadytorunms.com";
  const blueHealthBaptist = "https://test.bluehealthbaptist.com";
  const indianolaWellness = "https://test.indianolawellness.bcbsms.com";

  const footerYear = new Date().getFullYear() + 1;

  function redirectToExternalUrl(externalLink: string) {
    setShowThirdPartyModal(true);
    setExternalLink(externalLink);
  }

  return (
    <>
      {showThirdPartyModal && (
        <ThirdPartyModal
          link={externalLink}
          cancel={() => setShowThirdPartyModal(false)}
        />
      )}
      <footer>
        <ContentfulImage imageID={imageIDs.footerBar} altText={imageIDs.footerBarAltText} />
        <div id="footer-content">
          <div id="footer-body" className="flex-row footer-body">
            <div id="footer-anchors" className="flex-row footer-lists">
              {isMobile && (
                <div id="footer-socials-mobile" className="footer-socials-mobile">
                  <button onClick={() => redirectToExternalUrl("https://www.facebook.com/BlueCrossBlueShieldofMississippi/")}> 
                    <ContentfulImage imageID={imageIDs.facebookLogo} altText={imageIDs.facebookLogoAltText} />
                  </button>
                  <button onClick={() => redirectToExternalUrl("https://qrs.ly/lcgheoy")}>
                    <ContentfulImage imageID={imageIDs.myBlueApp} altText={imageIDs.myBlueAppAltText} />
                  </button>
                </div>
              )}
              <div id="company">
                <h3 className="footer-header">Company</h3>
                <ul id="footer-company">
                  <li>
                    <a href={bcbsms + "/about-us"}>About Us</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/im-a-member"}>I'm a Member</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/im-an-employer"}>I'm an Employer</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/im-a-provider"}>I'm a Provider</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/about-us/contact-us"}>Contact Us</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/about-us/terms-of-use"}>Terms of Use</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/about-us/careers"}>Careers</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/about-us/media"}>Media</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/about-us/privacy-practices"}>Privacy Practices</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/about-us/site-map"}>Site Map</a>
                  </li>
                </ul>
              </div>
              <div id="footer-find-coverage">
                <h3 className="footer-header">Find Coverage</h3>
                <ul id="footer-lists">
                  <li>
                    <a href={bcbsms + "/find-coverage/blue-care"}>Blue Care</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/find-coverage/special-enrollment"}>Special Enrollment</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/find-coverage/small-business"}>Small Business</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/find-coverage/large-business"}>Large Business</a>
                  </li>
                  <li>
                    <a href={bcbsms + "/find-coverage/blue65"}>65+ Medicare</a>
                  </li>
                </ul>
              </div>
              <div id="footer-other-sites">
                <h3 className="footer-header">Other Sites</h3>
                <ul id="footer-lists">
                  <li>
                    <a href={healthierMississippi} target="_blank">
                      Blue Cross & Blue Shield of Mississippi Foundation
                    </a>
                  </li>
                  <li>
                    <a href={getReadyToRun} target="_blank">Get Ready to Run</a>
                  </li>
                  <li>
                    <a href={blueHealthBaptist} target="_blank">BlueHealth Baptist</a>
                  </li>
                  <li>
                    <a href={indianolaWellness} target="_blank">Indianola Community Wellness Center</a>
                  </li>
                  <li>
                    <a href={beHealthyBlog} target="_blank">Be Healthy</a>
                  </li>
                </ul>
              </div>
            </div>
            <div id="footer-socials" className="footer-socials">
              <button onClick={() => redirectToExternalUrl("https://www.facebook.com/BlueCrossBlueShieldofMississippi/")}>
                <ContentfulImage imageID={imageIDs.facebookLogo} altText={imageIDs.facebookLogoAltText} />
              </button>
              <button onClick={() => redirectToExternalUrl("https://qrs.ly/lcgheoy")}>
                <ContentfulImage imageID={imageIDs.myBlueApp} altText={imageIDs.myBlueAppAltText} />
              </button>
            </div>
          </div>

          <hr className="footer-hr" />

          <p className="copyright text-center">
            Copyright © 2025-{footerYear}, Blue Cross & Blue Shield of Mississippi, A Mutual Insurance Company. All Rights Reserved.
            <br />
            An independent licensee of the Blue Cross and Blue Shield Association.
          </p>
        </div>
      </footer>
    </>
  );
}