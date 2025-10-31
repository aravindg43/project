import React from "react";
import "./footer.css";

const Footer: React.FC = () => (
  <footer>
    <div id="footer-content" className="footer-body">
      <div id="footer-anchors" className="flex">
        {/* Company */}
        <div>
          <h4 className="footer-header">Company</h4>
          <hr className="footer-hr" />
          <ul className="footer-lists">
            <li><a href="https://test.bcbsms.com/about-us">About Us</a></li>
            <li><a href="https://test.bcbsms.com/im-a-member">I’m a Member</a></li>
            <li><a href="https://test.bcbsms.com/im-an-employer">I’m an Employer</a></li>
            <li><a href="https://test.bcbsms.com/im-a-provider">I’m a Provider</a></li>
            <li><a href="https://test.bcbsms.com/about-us/contact-us">Contact Us</a></li>
            <li><a href="https://test.bcbsms.com/about-us/terms-of-use">Terms of Use</a></li>
            <li><a href="https://test.bcbsms.com/about-us/careers">Careers</a></li>
            <li><a href="https://test.bcbsms.com/about-us/media">Media</a></li>
            <li><a href="https://test.bcbsms.com/about-us/privacy-practices">Privacy Practices</a></li>
            <li><a href="https://test.bcbsms.com/about-us/site-map">Site Map</a></li>
          </ul>
        </div>

        {/* Find Coverage */}
        <div>
          <h4 className="footer-header">Find Coverage</h4>
          <hr className="footer-hr" />
          <ul className="footer-lists">
            <li><a href="https://test.bcbsms.com/find-coverage/blue-care">Blue Care</a></li>
            <li><a href="https://test.bcbsms.com/find-coverage/special-enrollment">Special Enrollment</a></li>
            <li><a href="https://test.bcbsms.com/find-coverage/small-business">Small Business</a></li>
            <li><a href="https://test.bcbsms.com/find-coverage/large-business">Large Business</a></li>
            <li><a href="https://test.bcbsms.com/find-coverage/blue65">65+ Medicare</a></li>
          </ul>
        </div>

        {/* Other Sites */}
        <div>
          <h4 className="footer-header">Other Sites</h4>
          <hr className="footer-hr" />
          <ul className="footer-lists">
            <li>
              <a href="http://test.healthiermississippi.org/">
                Blue Cross &amp; Blue Shield of Mississippi Foundation
              </a>
            </li>
            <li><a href="https://test.getreadytorunms.com/">Get Ready to Run</a></li>
            <li><a href="https://test.bluehealthbaptist.com/">BlueHealth Baptist</a></li>
            <li><a href="https://test.indianolawellness.bcbsms.com/">Indianola Community Wellness Center</a></li>
            <li><a href="https://test.behealthy.bcbsms.com/">Be Healthy</a></li>
          </ul>
        </div>
      </div>

      {/* Socials (optional placeholders) */}
      <div className="footer-socials flex gap-2">
        <button aria-label="Facebook">
          <img alt="Facebook" src="/icons/facebook.svg" />
        </button>
        <button aria-label="myBlue Mobile">
          <img alt="myBlue Mobile" src="/icons/mobile.svg" />
        </button>
      </div>

      <div className="footer-socials-mobile">
        <button aria-label="Facebook">
          <img alt="Facebook" src="/icons/facebook.svg" />
        </button>
        <button aria-label="myBlue Mobile">
          <img alt="myBlue Mobile" src="/icons/mobile.svg" />
        </button>
      </div>

      <p className="mt-4 text-sm">
        &copy; {new Date().getFullYear()}, Blue Cross &amp; Blue Shield of Mississippi, A Mutual Insurance Company.
        All Rights Reserved.
        <br />
        An independent licensee of the Blue Cross and Blue Shield Association.
      </p>
    </div>
  </footer>
);

export default Footer;
