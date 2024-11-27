"use client";

import React from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2196F3]/5 via-[#64B5F6]/10 to-[#1976D2]/15 py-24">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#2196F3]/20 p-8 md:p-12 shadow-lg"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-[#1565C0] mb-8">
            Terms and Conditions
          </h1>

          <div className="space-y-8 text-[#1565C0]/80">
            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Information Published on the Website
              </h2>
              <p className="leading-relaxed">
                This website at www.cause.vision (hereinafter referred to as the
                &ldquo;Website&rdquo;) is published and maintained by Causecoin
                to provide information and material related to the Causecoin and
                associated Causecoin. You are not authorized to, nor should you,
                rely on the Website for legal advice, business advice,
                investment advice, technical advice, or advice of any kind
                whatsoever. You should not place any reliance on the information
                provided on the Website; you alone bear the full risk of any
                action taken or refrained from in reliance on the Website or its
                contents.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Forward-looking statements
              </h2>
              <p className="leading-relaxed">
                The information on the Website may contain forward-looking
                statements including, but not limited to, (i) the anticipated or
                supposed future performance of the Causecoin; (ii) the
                anticipated development of dApps or other functionality on the
                Causecoin; (iii) completion of projects that are currently
                underway, in development or otherwise under consideration for
                implementation on or in conjunction with the Causecoin.
              </p>
              <p className="leading-relaxed mt-4">
                Forward-looking statements are produced only for the purpose of
                promoting a decentralized, informed, and robust community and
                not to enable potential investors to gauge the future viability
                or profitability of building or investing in relation to the
                Causecoin.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Risks related to use of Causecoin
              </h2>
              <p className="leading-relaxed">
                Causecoin are private instruments, are not registered with any
                regulatory agency of any jurisdiction, and are not subject to
                the same regulatory requirements as exchange traded funds or
                mutual funds which would be registered with appropriate
                regulatory authorities.
              </p>
              <div className="mt-4 space-y-2">
                <p className="font-medium">
                  You should carefully note the following:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    To the extent any person would purchase or receive Causecoin
                    for investment purposes, such investment is purely
                    speculative investment and involves a high degree of risk.
                  </li>
                  <li>
                    Fees and expenses associated with transfer of Causecoin will
                    offset any trading profits.
                  </li>
                  <li>
                    Causecoin, its sponsors, directors, advisors, and agents may
                    have conflicts of interest.
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Investment Risks
              </h2>
              <p className="leading-relaxed">
                The price of Causecoin are highly volatile and you should expect
                prices to have widely ranging fluctuations. Any investment in
                Causecoin can lead to loss of money over short or long periods.
                &ldquo;Cryptocurrency&rdquo; trading is not appropriate for all
                users of the Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                No Investment Advice
              </h2>
              <p className="leading-relaxed">
                The entire body of information given on the Website does not
                consist of or include investment advice, trading advice,
                financial advice, technical advice, or any other kind of advice.
                Under no circumstance should you take any of the Website&apos;s
                content as advice. Causecoin never recommends that you buy, sell
                or hold any Causecoin. Nothing on the website should be
                considered as a proposal or recommendation that you buy, sell or
                hold any Causecoin. The closest things to advice we can offer
                you is to emphatically state that you should fully conduct your
                own due diligence and consult a qualified professional financial
                advisor before you take any investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                No warranties
              </h2>
              <p className="leading-relaxed">
                The Website is provided on an &apos;as is&apos; basis without
                any warranties of any kind regarding the Website or any content,
                data, material, information, or services provided on the
                Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Limitation of liability
              </h2>
              <p className="leading-relaxed">
                In no event shall the Causecoin, its Directors, or employees, or
                any community members be liable for any direct, indirect,
                special or consequential damages of any kind, including, but not
                limited to, loss of use, loss of profits, or loss of data
                arising out of or in any way connected with the use of the
                Website or Causecoin.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Accuracy of Information
              </h2>
              <p className="leading-relaxed">
                Given the rapidity with which blockchain is developing, the fact
                that change is the only constant in the cryptosphere, and the
                intentional efforts to allow and encourage participation by the
                community at large, Causecoin makes no general or specific
                assurances of accuracy with respect to the Website or any
                information on it. Causecoin holds no responsibility for any
                wrong, misleading, outdated, or missing information. By using
                the Website, you represent that you are utilizing any and all
                information present on the Website at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Modifications to the site
              </h2>
              <p className="leading-relaxed">
                Causecoin reserves the right to change or modify the terms and
                conditions contained in these terms, any policy or guideline of
                the Website, and the content of the Website at any time and in
                its sole discretion. The only notice of such changes will be by
                posting the revised terms, policy, guideline, or content to the
                Website. Any changes or modifications will be effective
                immediately upon posting the revisions to the Website and will
                apply to all subsequent use of the Website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Links to other sites
              </h2>
              <p className="leading-relaxed">
                The Website may contain links to other websites which are not
                managed by Causecoin. The features, content, and accessibility
                of those sites are not controlled by Causecoin. Any such links
                included do not imply approval or endorsement of the content
                included in the linked sites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Website Downtime & Maintenance
              </h2>
              <p className="leading-relaxed">
                At various and unpredictable times, the Website will be down for
                maintenance, updating, or for reasons not yet anticipated.
                Causecoin is not liable to you for damages, difficulties, or
                inconvenience caused by the unavailability of the Website
                regardless of the cause of the unavailability.
              </p>
            </section>

            <div className="text-sm text-[#1565C0]/60 pt-8 border-t border-[#2196F3]/20">
              Last Updated: {new Date().toLocaleDateString()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
