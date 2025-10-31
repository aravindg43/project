"use client";
interface ThirdPartyModalProps {
  cancel: () => void;
  link: string;
}

export default function ThirdPartyModal({ link, cancel }: ThirdPartyModalProps) {
  function agreeHandler() {
    window.open(link, "_blank")!.focus();
  }

  return (
    <section id="third-party-modal" className="third-party-modal">
      <h3 className="no-margin">You are leaving our website.</h3>

      <p>
        You have selected a link to a website operated by a third party. Therefore, you are about to leave the Blue Cross & Blue Shield of Mississippi (BCBSMS) website and enter another website not operated by BCBSMS. BCBSMS does not control such third party websites and is not responsible for the content, advice, products or services offered therein. Links to third party websites are provided for informational purposes only and by providing these links to third party websites, BCBSMS does not endorse these websites or the content, advice, products or services offered therein.
      </p>

      <div className="flex-row third-party-buttons">
        <button onClick={cancel} className="cancel">Cancel</button>
        <button onClick={agreeHandler} className="agree">I agree</button>
      </div>
    </section>
  );
}