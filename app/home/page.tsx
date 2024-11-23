"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { QRCodeSVG } from "qrcode.react";
import { Link as ScrollLink, Element } from "react-scroll";

import Link from "next/link";
import { RiCoinLine, RiWalletLine, RiIdCardLine } from "react-icons/ri";

// Define types
type ButtonProps = {
  text: string;
  link: string;
};

type QRCodeProps = {
  platform: string;

  link: string;
};

type SocialLinkProps = {
  platform: string;
  link: string;
};

type SpendingCardProps = {
  amount: string;
  currency: string;
  description: string;
};

// Add this near the top with other components
const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Add scroll listener
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[#FFD700]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-3xl md:text-4xl font-bold">
              <span
                className={`${
                  isScrolled ? "text-[#B8860B]" : "text-white"
                } transition-colors duration-300`}
              >
                Cause
              </span>
              <span
                className={`text-sm md:text-base ${
                  isScrolled ? "text-[#8B4513]/70" : "text-white/70"
                } transition-colors duration-300`}
              >
                coin
              </span>
            </h1>
          </div>

          {/* Navigation Buttons */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/staking"
              className={`px-4 py-2 transition-colors duration-300 cursor-pointer ${
                isScrolled
                  ? "text-[#B8860B] hover:text-[#DAA520]"
                  : "text-white hover:text-white/80"
              }`}
            >
              Staking
            </Link>

            <a
              href="https://coinmarketcap.com/dexscan/bsc/0x76dee8fd5734d507504593dd7a88e82ceefdaded/"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? "bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white hover:from-[#DAA520] hover:to-[#B8860B]"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              Price
            </a>

            <a
              href="https://docs.google.com/document/d/1tQi3lG-PcbZlmp28XqIRkMWzudxW22fJqYg7-odeeac/edit"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? "border border-[#B8860B] text-[#B8860B] hover:bg-[#B8860B] hover:text-white"
                  : "border border-white text-white hover:bg-white/20"
              }`}
            >
              Whitepaper
            </a>

            <ScrollLink
              to="aboutCOZ"
              smooth={true}
              duration={500}
              className={`px-4 py-2 transition-colors duration-300 cursor-pointer ${
                isScrolled
                  ? "text-[#8B4513]/80 hover:text-[#B8860B]"
                  : "text-white hover:text-white/80"
              }`}
            >
              About
            </ScrollLink>

            <Link
              href="/team"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Team
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors duration-300 cursor-pointer ${
              isScrolled ? "text-[#B8860B]" : "text-white"
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden fixed inset-x-4 top-20 z-50`}
        >
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-[#FFD700]/20 overflow-hidden">
            <div className="p-4 flex flex-col items-center space-y-3">
              <a
                href="https://coinmarketcap.com/dexscan/bsc/0x76dee8fd5734d507504593dd7a88e82ceefdaded/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white rounded-full text-sm font-medium w-40 text-center hover:from-[#DAA520] hover:to-[#B8860B] transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Price
              </a>

              <a
                href="https://docs.google.com/document/d/1tQi3lG-PcbZlmp28XqIRkMWzudxW22fJqYg7-odeeac/edit"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 border border-[#B8860B] text-[#B8860B] rounded-full text-sm font-medium w-40 text-center hover:bg-[#B8860B]/10 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Whitepaper
              </a>

              <ScrollLink
                to="aboutCOZ"
                smooth={true}
                duration={500}
                className="px-6 py-2 text-[#8B4513]/80 hover:text-[#B8860B] text-sm font-medium w-40 text-center transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </ScrollLink>

              <Link
                href="/team"
                className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-medium w-40 text-center hover:bg-blue-700 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Team
              </Link>
            </div>

            <div className="border-t border-[#FFD700]/10 p-3">
              <p className="text-xs text-center text-[#8B4513]/60">
                Cause Coin - The Currency for Humanity
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const COZTokenLandingPage: React.FC = () => {
  // Create separate refs for each section
  const [aboutRef, aboutInView] = useInView();
  const [downloadRef, downloadInView] = useInView();
  const [spendingRef, spendingInView] = useInView();

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  };

  // Helper components
  const Button: React.FC<ButtonProps> = ({ text, link }) => (
    <ScrollLink
      to={link.replace("#", "")}
      smooth={true}
      duration={500}
      className="inline-block px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-auto text-center"
      tabIndex={0}
      role="button"
      aria-label={text}
    >
      {text}
    </ScrollLink>
  );

  const QRCode: React.FC<QRCodeProps> = ({ platform, link }) => (
    <div className="flex flex-col items-center">
      <QRCodeSVG value={link} size={128} />
      <p className="mt-2 text-lg font-semibold">{platform}</p>
    </div>
  );

  const SocialLink: React.FC<SocialLinkProps> = ({ platform, link }) => (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-gray-300 transition duration-300 ease-in-out"
      aria-label={`Follow us on ${platform}`}
    >
      {platform === "Twitter" ? (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </a>
  );

  const SpendingCard: React.FC<SpendingCardProps> = ({
    amount,
    currency,
    description,
  }) => (
    <motion.div
      className="w-full md:w-96 h-[180px] md:h-56 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-2xl p-4 md:p-8 relative overflow-hidden isolate"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full -translate-y-24 translate-x-24 z-0" />
      <div className="absolute bottom-0 left-0 w-48 md:w-64 h-48 md:h-64 bg-black/10 rounded-full translate-y-24 -translate-x-24 z-0" />

      <div className="relative z-10 h-full flex flex-col">
        {/* EMV Chip */}
        <div className="w-8 h-6 md:w-12 md:h-10 bg-yellow-400/90 rounded-md mb-2 md:mb-4 flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-50" />
          <div className="grid grid-cols-3 gap-1 p-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-yellow-600/60 h-1" />
            ))}
          </div>
        </div>

        {/* Card Content with better spacing */}
        <div className="flex-grow flex flex-col justify-between">
          <div>
            <p className="text-xs md:text-sm opacity-80 mb-1 text-white">
              Available Balance
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-3xl font-bold text-white">
                {amount}
              </span>
              <span className="text-xs md:text-sm bg-white/20 rounded-full px-2 py-1 text-white">
                {currency}
              </span>
            </div>
          </div>

          <div className="font-mono text-sm md:text-lg tracking-wider text-white">
            •••• •••• •••• 4242
          </div>

          <div className="flex justify-between items-end text-xs md:text-sm text-white">
            <div>
              <p className="opacity-70 text-xs mb-1">CARD HOLDER</p>
              <p className="truncate max-w-[120px]">{description}</p>
            </div>
            <div>
              <p className="opacity-70 text-xs mb-1">EXPIRES</p>
              <p>12/25</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <Element name="hero">
        <motion.section
          className="min-h-screen w-full flex items-center justify-center text-white relative py-16 px-4 pt-24"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/backgroundGold.png')",
              backgroundColor: "rgba(0, 0, 0, 0)",
              backgroundBlendMode: "overlay",
            }}
          />
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 px-4">
              Changing the way the world transacts money
            </h1>
            <p className="text-lg md:text-xl mb-8 px-4">
              You are just moments away from forever changing the way you
              transact money.
            </p>
            <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center px-4">
              <Button text="Download Wallet" link="#downloadWallet" />
              <Button text="Learn More" link="#aboutCOZ" />
            </div>
          </div>
        </motion.section>
      </Element>

      {/* About & Features Combined Section */}
      <Element name="aboutCOZ">
        <motion.section
          className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#FFD700]/10 to-white py-16 px-4"
          ref={aboutRef}
          initial="hidden"
          animate={aboutInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div className="text-center mb-12 md:mb-16">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-[#B8860B] px-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                The Currency for Humanity
              </motion.h2>
              <motion.div
                className="max-w-3xl mx-auto space-y-4 md:space-y-6 text-base md:text-lg text-gray-700 px-4"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <p>
                  Introducing a revolutionary financial ecosystem that
                  transforms how we think about money. CauseCoin isn&apos;t just
                  another cryptocurrency – it&apos;s a movement towards
                  compassionate capitalism, where every transaction contributes
                  to positive global change.
                </p>
              </motion.div>
            </motion.div>

            {/* Features Section */}
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 relative isolate">
              {[
                {
                  icon: RiCoinLine,
                  title: "Ethereum Powered",
                  desc:
                    "Secure blockchain technology for global accessibility.",
                  color: "text-[#B8860B]",
                },
                {
                  icon: RiWalletLine,
                  title: "CauseWallet",
                  desc:
                    "Your all-in-one digital wallet with instant transactions.",
                  color: "text-[#DAA520]",
                },
                {
                  icon: RiIdCardLine,
                  title: "CauseCard",
                  desc:
                    "Spend your crypto anywhere with global card acceptance.",
                  color: "text-[#CD853F]",
                  isCard: true,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {item.isCard ? (
                    <div className="relative h-48 bg-gradient-to-r from-[#B8860B] to-[#DAA520] rounded-xl p-6 shadow-lg overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-24 -translate-x-24" />

                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="w-12 h-8 bg-yellow-400/90 rounded-md">
                          <div className="grid grid-cols-3 gap-1 p-1">
                            {[...Array(6)].map((_, i) => (
                              <div key={i} className="bg-yellow-600/60 h-1" />
                            ))}
                          </div>
                        </div>

                        <div className="font-mono text-white/90 text-lg tracking-wider">
                          •••• •••• •••• 4242
                        </div>

                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-white/70 text-xs mb-1">
                              CARD HOLDER
                            </p>
                            <p className="text-white text-sm font-medium">
                              CAUSE CARD
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-white/70 text-xs">VALID THRU</p>
                            <p className="text-white text-sm">12/25</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <item.icon className={`text-3xl mb-2 ${item.color}`} />
                      <h3 className="font-semibold text-[#8B4513] text-base mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[#8B4513]/70 text-sm">{item.desc}</p>
                    </>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </Element>

      <Element name="spending">
        <motion.section
          className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 py-16 md:py-24"
          ref={spendingRef}
          initial="hidden"
          animate={spendingInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className="max-w-7xl mx-auto px-4 w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8 text-center text-white">
              One World. One Card.
            </h2>
            <p className="text-base md:text-xl mb-8 md:mb-12 text-center text-white px-4 max-w-3xl mx-auto">
              The vision of Causecard is to be the most utilized virtual card in
              the global marketplace.
            </p>

            {/* Cards Grid */}
            <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
              {[
                {
                  amount: "£3,126",
                  currency: "Main",
                  description: "Salary",

                  delay: 0,
                },
                {
                  amount: "2,540",
                  currency: "Causecoin",
                  description: "Cause Coin Stays",

                  delay: 0.1,
                },
                {
                  amount: "£4,500",
                  currency: "Joint account",
                  description: "Weekend getaway",

                  delay: 0.2,
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: card.delay,
                        ease: "easeOut",
                      },
                    },
                  }}
                  className="w-full flex justify-center"
                >
                  <SpendingCard {...card} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-sm text-white mb-4">T&Cs apply.</p>
              <Button text="Get started" link="#downloadWallet" />
            </div>
          </div>
        </motion.section>
      </Element>

      {/* Wallet Download Section */}
      <Element name="downloadWallet">
        <motion.section
          className="min-h-screen w-full py-12 md:py-16 bg-gradient-to-br from-[#FFD700]/5 via-[#DAA520]/10 to-[#B8860B]/15"
          ref={downloadRef}
          initial="hidden"
          animate={downloadInView ? "visible" : "hidden"}
          variants={zoomIn}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                className="space-y-6 md:space-y-8 text-center md:text-left"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                }}
              >
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-[#8B4513]">
                    Download the <span className="text-[#B8860B]">Cause</span>{" "}
                    Wallet
                  </h2>
                  <p className="text-lg md:text-xl text-[#8B4513]/80">
                    The Wallet in Every Pocket.
                  </p>
                  <p className="text-base md:text-xl text-[#8B4513]/70">
                    Get the app on your preferred platform and start managing
                    your Cause tokens today.
                  </p>
                </div>

                {/* Download buttons - Enhanced with gold theme */}
                <div className="flex flex-col gap-4 max-w-sm mx-auto md:mx-0">
                  <a
                    href="#"
                    className="flex items-center justify-center md:justify-start space-x-3 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white px-6 py-4 rounded-xl hover:from-[#DAA520] hover:to-[#B8860B] transition-all duration-300 w-full shadow-lg hover:shadow-xl hover:shadow-[#FFD700]/20"
                  >
                    <svg
                      className="w-8 h-8 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                    <div className="flex flex-col items-start">
                      <div className="text-xs">Download on the</div>
                      <div className="text-lg font-semibold">App Store</div>
                    </div>
                  </a>

                  <a
                    href="#"
                    className="flex items-center justify-center md:justify-start space-x-3 bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-white px-6 py-4 rounded-xl hover:from-[#DAA520] hover:to-[#B8860B] transition-all duration-300 w-full shadow-lg hover:shadow-xl hover:shadow-[#FFD700]/20"
                  >
                    <svg
                      className="w-8 h-8 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                    <div className="flex flex-col items-start">
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-lg font-semibold">Google Play</div>
                    </div>
                  </a>
                </div>

                {/* QR Codes - Only visible on desktop */}
                <div className="hidden md:flex gap-8 mt-8">
                  <QRCode platform="iOS" link="app_store_link" />
                  <QRCode platform="Android" link="play_store_link" />
                </div>
              </motion.div>

              {/* App Image with gold tint */}
              <motion.div
                className="relative h-[300px] md:h-[600px]"
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-transparent rounded-3xl" />
                <Image
                  src="/causeWalletDark.png"
                  alt="Cause Wallet App"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </Element>

      {/* Footer with gold theme */}
      <footer className="bg-gradient-to-b from-[#B8860B]/10 to-[#8B4513]/20 text-[#8B4513] py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4 text-[#B8860B]">
                Cause Coin
              </h3>
              <p className="text-[#8B4513]/80">
                Your gateway to decentralized finance
              </p>
            </div>
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <h4 className="text-lg font-semibold mb-4 text-[#B8860B]">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <ScrollLink
                    to="aboutCOZ"
                    smooth={true}
                    duration={800}
                    spy={true}
                    offset={0}
                    className="text-[#8B4513]/70 hover:text-[#B8860B] transition duration-300 ease-in-out cursor-pointer"
                  >
                    About Cause
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="downloadWallet"
                    smooth={true}
                    duration={800}
                    spy={true}
                    offset={0}
                    className="text-[#8B4513]/70 hover:text-[#B8860B] transition duration-300 ease-in-out cursor-pointer"
                  >
                    Download Wallet
                  </ScrollLink>
                </li>
                <li>
                  <ScrollLink
                    to="team"
                    smooth={true}
                    duration={800}
                    spy={true}
                    offset={0}
                    className="text-[#8B4513]/70 hover:text-[#B8860B] transition duration-300 ease-in-out cursor-pointer"
                  >
                    Team
                  </ScrollLink>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/3">
              <h4 className="text-lg font-semibold mb-4 text-[#B8860B]">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <SocialLink platform="Twitter" link="twitter_url" />
                <SocialLink platform="LinkedIn" link="linkedin_url" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#B8860B]/20 text-center text-[#8B4513]/60">
            <p>
              &copy; {new Date().getFullYear()} Cause Coin. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default COZTokenLandingPage;
