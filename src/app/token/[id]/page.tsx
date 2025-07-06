"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { TokenDetails, AIAnalysis } from "@/lib/types";
import { fetchTokenDetails, generateAIAnalysis } from "@/lib/api";
import { useStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Loading } from "@/components/ui/Loading";
import {
  formatPrice,
  formatPercentage,
  formatMarketCap,
  getRiskColor,
  getRiskLabel,
} from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Heart,
  Share2,
  ExternalLink,
  Brain,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import toast from "react-hot-toast";

export default function TokenDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [token, setToken] = useState<TokenDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [priceData, setPriceData] = useState<any[]>([]);

  const {
    aiAnalysis,
    setAiAnalysis,
    isAnalyzing,
    setIsAnalyzing,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  } = useStore();

  const tokenId = params.id as string;

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  useEffect(() => {
    if (tokenId) {
      loadTokenDetails();
    }
  }, [tokenId]);

  const loadTokenDetails = async () => {
    try {
      setLoading(true);
      const tokenData = await fetchTokenDetails(tokenId);
      setToken(tokenData);

      // Generate mock price data
      const mockPriceData = Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        price:
          tokenData.market_data.current_price.usd *
          (1 + (Math.random() - 0.5) * 0.2),
        volume: Math.random() * 1000000000,
      }));
      setPriceData(mockPriceData);
    } catch (error) {
      toast.error("Failed to load token details");
      console.error("Error loading token details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!token) return;

    try {
      setIsAnalyzing(true);
      toast.loading("Analyzing token with AI...", { id: "analysis" });

      const analysis = await generateAIAnalysis(token.id, token);
      setAiAnalysis(analysis);
      setActiveTab("analysis");

      toast.success("Analysis complete!", { id: "analysis" });
    } catch (error) {
      toast.error("Analysis failed", { id: "analysis" });
      console.error("Analysis error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (!token) return;

    if (isFavorite(token.id)) {
      removeFromFavorites(token.id);
      toast.success("Removed from favorites");
    } else {
      addToFavorites(token.id);
      toast.success("Added to favorites");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Loading token details..." />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Token Not Found</h2>
          <p className="text-muted-foreground">
            The requested token could not be found.
          </p>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "analysis", label: "AI Analysis" },
    { id: "charts", label: "Charts" },
    { id: "about", label: "About" },
  ];

  const isPositive = token.market_data.price_change_percentage_24h > 0;
  const isTokenFavorite = isFavorite(token.id);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={(token.image as any)?.large || token.image}
                  alt={token.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h1 className="text-3xl font-bold">{token.name}</h1>
                  <p className="text-muted-foreground text-lg uppercase">
                    {token.symbol}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-3xl font-bold">
                    {formatPrice(token.market_data.current_price.usd)}
                  </p>
                  <div
                    className={`flex items-center justify-end space-x-1 ${
                      isPositive ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="font-medium">
                      {formatPercentage(
                        token.market_data.price_change_percentage_24h
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleFavoriteToggle}
                    className={isTokenFavorite ? "text-red-500" : ""}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isTokenFavorite ? "fill-current" : ""
                      }`}
                    />
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button onClick={handleAnalyze} loading={isAnalyzing}>
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze with AI
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-muted/20 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card className="p-6 mb-6">
                  <CardHeader>
                    <CardTitle>Price Chart (30 Days)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={priceData}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#7c3aed"
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="p-6">
                  <CardTitle className="mb-4">Market Statistics</CardTitle>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Cap</span>
                      <span className="font-medium">
                        {formatMarketCap(token.market_data.market_cap.usd)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">24h Volume</span>
                      <span className="font-medium">
                        {formatMarketCap(token.market_data.total_volume.usd)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Circulating Supply
                      </span>
                      <span className="font-medium">
                        {token.market_data.circulating_supply?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        All-Time High
                      </span>
                      <span className="font-medium">
                        {formatPrice(token.market_data.ath.usd)}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "analysis" && (
            <div>
              {aiAnalysis ? (
                <div className="space-y-6">
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Brain className="w-5 h-5" />
                        <span>AI Risk Analysis</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-medium">
                            Risk Score
                          </span>
                          <span
                            className={`text-2xl font-bold ${getRiskColor(
                              aiAnalysis.risk_score
                            )}`}
                          >
                            {aiAnalysis.risk_score}/100
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-red-500 h-2 rounded-full"
                            style={{ width: `${aiAnalysis.risk_score}%` }}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {getRiskLabel(aiAnalysis.risk_score)}
                        </p>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {aiAnalysis.summary}
                      </p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                            Strengths
                          </h4>
                          <ul className="space-y-1">
                            {aiAnalysis.strengths.map((strength, i) => (
                              <li
                                key={i}
                                className="text-sm text-muted-foreground"
                              >
                                • {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <XCircle className="w-4 h-4 mr-2 text-red-400" />
                            Risk Factors
                          </h4>
                          <ul className="space-y-1">
                            {aiAnalysis.risk_factors.map((factor, i) => (
                              <li
                                key={i}
                                className="text-sm text-muted-foreground"
                              >
                                • {factor}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {aiAnalysis.red_flags.length > 0 && (
                        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <h4 className="font-medium mb-2 flex items-center text-red-400">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Red Flags
                          </h4>
                          <ul className="space-y-1">
                            {aiAnalysis.red_flags.map((flag, i) => (
                              <li key={i} className="text-sm text-red-300">
                                • {flag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <Brain className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-medium mb-2">
                    No Analysis Available
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Click "Analyze with AI" to generate a comprehensive analysis
                    of this token.
                  </p>
                  <Button onClick={handleAnalyze} loading={isAnalyzing}>
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze with AI
                  </Button>
                </Card>
              )}
            </div>
          )}

          {activeTab === "charts" && (
            <Card className="p-6">
              <CardTitle className="mb-4">Advanced Charts</CardTitle>
              <div className="h-96 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  TradingView widget would go here
                </p>
              </div>
            </Card>
          )}

          {activeTab === "about" && (
            <Card className="p-6">
              <CardTitle className="mb-4">About {token.name}</CardTitle>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground">
                  {token.description?.en ||
                    "No description available for this token."}
                </p>
                {token.links && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Links</h4>
                    <div className="flex flex-wrap gap-2">
                      {token.links.homepage[0] && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => window.open(token.links.homepage[0], '_blank')}
                        >
                          Website <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                      {token.links.twitter_screen_name && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => window.open(`https://twitter.com/${token.links.twitter_screen_name}`, '_blank')}
                        >
                          Twitter <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
