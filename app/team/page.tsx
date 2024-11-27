"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import ceo from "@/public/team/ceo.jpeg";
import ann from "@/public/team/ann.jpeg";
import cto from "@/public/team/cto.jpeg";
import coo from "@/public/team/coo.jpeg";

const teamMembers = [
  {
    name: "Steve Down",
    role: "CEO and Founder",
    linkedin: "https://www.linkedin.com/in/therealstevedown/",
    image: ceo,
  },
  {
    name: "Anne Musau",
    role: "Co-Founder and Chief Project Executive",
    linkedin: "https://www.linkedin.com/in/anne-musau-7722a6293/",
    image: ann,
  },
  {
    name: "Erick Mungai",
    role: "CTO",
    linkedin: "https://www.linkedin.com/in/erick-mungai-827a03240/",
    image: cto,
  },
  {
    name: "Stephen Kakoa",
    role: "COO",
    linkedin: "https://www.linkedin.com/in/stephen-kakoa-jr-0b975419/",
    image: coo,
  },
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2196F3]/5 via-[#64B5F6]/10 to-[#1976D2]/15 py-24">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#1565C0] mb-4">
            Meet Our Team
          </h1>
          <p className="text-lg text-[#1565C0]/70 max-w-2xl mx-auto">
            The visionaries behind Cause Coin, working together to revolutionize
            the future of finance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-[#2196F3]/20 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <CardHeader className="p-0">
                  <div className="relative w-full pt-[100%]">
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        style={{
                          objectPosition: 'center center',
                          padding: '1rem',
                        }}
                        priority={index < 2}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-[#1565C0] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-[#1565C0]/70 mb-4">
                    {member.role}
                  </p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-[#2196F3] hover:text-[#1976D2] transition-colors duration-300"
                  >
                    <LinkedInLogoIcon className="w-5 h-5" />
                    <span className="text-sm font-medium">View Profile</span>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
