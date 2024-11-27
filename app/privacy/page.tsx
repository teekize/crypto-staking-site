"use client";

import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>

          <div className="space-y-8 text-[#1565C0]/80">
            <section>
              <p className="leading-relaxed">
                The most significant aspect of Causecoin is to preserve your
                belief and confidence in us by safeguarding your privacy. You
                will be provided with complete information about the process of
                your data being collected, stored/saved and utilized by us. We
                recommend you to kindly review our Privacy Policy thoroughly.
                You explicitly permit us to use and reveal your personal details
                as per the Privacy Policy, by visiting Causecoin&apos;s
                Website/Applications. You will forbid using or accessing
                Causecoin website or mobile applications, if you disagree to any
                term/terms of this policy. Causecoin has the authority to alter
                the terms of this policy without any prior communication. You
                are requested to keep yourself updated on any such alterations
                made by Causecoin by keeping a check regularly. The Privacy
                Policy must evenly pertain to Causecoin desktop website,
                Causecoin mobile/desktop applications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                General
              </h2>
              <p className="leading-relaxed">
                We don&apos;t sell or share your information...
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Personal Information
              </h2>
              <p className="leading-relaxed">
                The personal Information suggests and comprises of all the
                details which can be connected to a particular individual or/and
                to ascertain any individual, like name, date of birth, permanent
                address, email ID, telephone number, mailing address, credit
                card details like cardholder name, expiry date and any personal
                details which may have been freely given by the person/user for
                availing any service/services on Causecoin. When, as a user, you
                will browse through the Causecoin&apos;s site, we shall gather
                information connected with the domain and the host through which
                you access the internet, the IP address (or Internet Protocol
                address) of computer and/or the ISP (Internet Service Provider)
                you are utilizing, and also, the statistical data of the
                anonymous site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Use of Personal Information
              </h2>
              <p className="leading-relaxed">
                It&apos;s our commitment to protect your privacy...
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Cookies
              </h2>
              <p className="leading-relaxed">
                Cookies are a very small piece of information that gets stored
                by the web server running on the web browser and that
                information can later be referred back from that specific
                browser. Causecoin uses cookies & tracking technology based on
                the types of features offered. The cookies and other tracking
                technology will not collect any personal; but, if you earlier
                shared personally identifiable details, the cookies may get
                attached to such data. Combined cookie & tracking information
                may/may not be provided to third parties and more.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Links to other websites
              </h2>
              <p className="leading-relaxed">
                There are other websites showing links to Causecoin website.
                When the Causecoin site links appear on other websites, then
                such websites shall gather the said personal information
                associated with you for identification purpose. Causecoin will
                not be liable for any such privacy rules or matters of all those
                linked or connected websites.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Security
              </h2>
              <p className="leading-relaxed">
                As far as security measures are concerned, Causecoin&apos;s
                actions to safeguard the loss, the misuse and the alterations
                made to any information, are under sever charge. Causecoin
                provides a secured server system on every occasion where any
                changes are made by you by accessing your account details. All
                the information collected by Causecoin is under severe security
                strategies framed by Causecoin, guarding it against unauthorized
                access.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Consent
              </h2>
              <p className="leading-relaxed">
                Once you browse the Causecoin website or provide your details,
                you agree and consent for the information gathered &amp; use of
                such information that you have revealed to Causecoin, in
                agreement with the Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-[#2196F3] mb-4">
                Legal Entity Information
              </h2>
              <p className="leading-relaxed">
                To comply with regulatory requirements, we mention of our legal
                entity as listed below:
              </p>
              <div className="mt-4 bg-[#2196F3]/5 p-4 rounded-lg">
                <p className="font-medium text-[#1565C0]">
                  Legal Name: Cause Vision Limited
                </p>
                <p className="font-medium text-[#1565C0]">
                  Registration Number: PVT-RXU2YEZK
                </p>
              </div>
              <p className="mt-4 text-sm">
                For any questions or further information, please contact us
                through the channels provided on our website.
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

export default PrivacyPolicy;
