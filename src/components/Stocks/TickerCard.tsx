"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface TickerCardProps {
  ticker: string;
}

interface CompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  name: string;
  ticker: string;
  weburl: string;
  logo: string;
}

const TickerCard: React.FC<TickerCardProps> = ({ ticker }) => {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchSuccess, setFetchSuccess] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=${process.env.NEXT_PUBLIC_FINNHUB_KEY}`;
    axios.get(url)
      .then(response => {
        if (response.status === 200) {
          setCompanyProfile(response.data);
          setFetchSuccess(true);
        } else {
          setFetchSuccess(false);
        }
      })
      .catch(error => {
        console.error('Error fetching company profile:', error);
        setFetchSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [ticker]);

  if (!fetchSuccess) {
    return null;
  }

  return (
    <div className="max-w-screen-lg mx-auto mt-3 mb-20 cursor-pointer">
      {companyProfile && (
        <div className="border-md border dark:border-white rounded-lg overflow-hidden p-4 flex items-center space-x-4">
          <img 
            src={companyProfile.logo} 
            alt={`${companyProfile.name} logo`} 
            className="w-12 h-12" 
          />
          <div>
            <p className="text-sm">
              {companyProfile.ticker} -{" "}
              <a
                href={companyProfile.weburl}
                target="_blank"
                rel="noopener noreferrer"
                className=""
              >
                {companyProfile.name}
              </a>{" "}
              - {companyProfile.exchange}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TickerCard;
