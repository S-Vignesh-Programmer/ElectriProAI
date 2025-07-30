import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Lightbulb,
  Zap,
  Car,
  Sun,
  MessageCircle,
  Trash2,
  Copy,
  Check,
  Loader2,
  Sparkles,
} from "lucide-react";
import { askGemini } from "../api/gemini";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [trialCount, setTrialCount] = useState(0);
  const [isTrialExceeded, setIsTrialExceeded] = useState(false);
  const textareaRef = useRef(null);

  const TRIAL_LIMIT = 4;

  const suggestedQuestions = [
    {
      icon: Sun,
      text: "How do solar panels work?",
      query: "How do solar panels work and are they worth the investment?",
    },
    {
      icon: Zap,
      text: "Energy saving tips",
      query: "What are the best ways to save electricity at home?",
    },
    {
      icon: Car,
      text: "EV charging costs",
      query: "How much does it cost to charge an electric vehicle at home?",
    },
    {
      icon: Lightbulb,
      text: "Smart home devices",
      query: "Which smart home devices can help reduce energy consumption?",
    },
  ];

  const handleSend = async (customMessage = null) => {
    const messageToSend = customMessage || message.trim();
    if (!messageToSend || isLoading || trialCount >= TRIAL_LIMIT) return;

    setTrialCount((prev) => prev + 1);
    setIsLoading(true);

    try {
      const result = await askGemini(messageToSend);
      setResponse(result);

      // Check if this was the last trial
      if (trialCount + 1 >= TRIAL_LIMIT) {
        setIsTrialExceeded(true);
      }
    } catch (error) {
      setResponse(
        "Sorry, I'm having trouble connecting right now. Please try again later."
      );

      // Check if this was the last trial
      if (trialCount + 1 >= TRIAL_LIMIT) {
        setIsTrialExceeded(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessage("");
    setResponse("");
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <section
      id="chat"
      className="py-8 md:py-12 bg-gradient-to-br from-gray-50 to-blue-50 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-3 md:mb-4">
            <Bot className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
            Ask AI Assistant
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Get expert advice on energy efficiency, solar panels, EV charging &
            more
          </p>

          {/* Trial Counter */}
          <div className="mt-4">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border">
              <span className="text-sm font-medium text-gray-600">
                Trials: {trialCount}/{TRIAL_LIMIT}
              </span>
              <div className="ml-2 flex space-x-1">
                {[...Array(TRIAL_LIMIT)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index < trialCount ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trial Exceeded Message */}
        {isTrialExceeded && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-red-800 mb-2">
                Trial Limit Reached
              </h4>
              <p className="text-red-600 text-sm">
                You have used all {TRIAL_LIMIT} trials. Thank you for trying our
                AI assistant!
              </p>
            </div>
          </div>
        )}

        {/* Suggested Questions */}
        {!response && !isTrialExceeded && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">
              Popular Questions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {suggestedQuestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(item.query)}
                  className="flex items-center p-3 md:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-300 group text-left"
                  disabled={isLoading || trialCount >= TRIAL_LIMIT}
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="text-sm md:text-base font-medium text-gray-700 group-hover:text-blue-600">
                    {item.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          {response && (
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 text-blue-500 mr-2" />
                <span className="font-semibold text-gray-700">AI Response</span>
              </div>
              <button
                onClick={clearChat}
                className="flex items-center px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </button>
            </div>
          )}

          {/* Response Area */}
          <div className="min-h-[300px] p-4">
            {!response && !isLoading ? (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Bot className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-lg font-medium">
                    {isTrialExceeded
                      ? "Trial limit reached!"
                      : "Start a conversation!"}
                  </p>
                  <p className="text-sm">
                    {isTrialExceeded
                      ? "You have used all your available trials."
                      : "Ask me anything about energy and sustainability"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* User Message */}
                {message && !isLoading && (
                  <div className="flex justify-end">
                    <div className="flex items-start space-x-2 max-w-[80%] flex-row-reverse space-x-reverse">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="bg-blue-500 text-white p-3 md:p-4 rounded-2xl">
                        <div className="whitespace-pre-line text-sm md:text-base leading-relaxed">
                          {message}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Loading Message */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                          <span className="text-gray-600 text-sm">
                            AI is thinking...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Response - Enhanced Design */}
                {response && !isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3 max-w-[85%]">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <Sparkles className="w-2.5 h-2.5 text-white" />
                        </div>
                      </div>
                      <div className="relative group">
                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 border-2 border-blue-100 p-4 md:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                          {/* AI Badge */}
                          <div className="flex items-center mb-3 pb-2 border-b border-blue-200">
                            <div className="flex items-center bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI Assistant
                            </div>
                          </div>

                          {/* Response Content */}
                          <div className="text-gray-800 text-sm md:text-base leading-relaxed">
                            <div className="whitespace-pre-line font-medium">
                              {response}
                            </div>
                          </div>

                          {/* Response Footer */}
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-blue-200">
                            <div className="flex items-center text-xs text-gray-500">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                              Powered by AI
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date().toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Copy Button */}
                        <button
                          onClick={() => copyToClipboard(response)}
                          className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg rounded-full p-2 hover:scale-110 transform"
                          title="Copy response"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-white" />
                          ) : (
                            <Copy className="w-4 h-4 text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isTrialExceeded
                      ? "Trial limit reached. Thank you for using our service!"
                      : "Ask about energy efficiency, solar panels, EV charging, smart homes..."
                  }
                  className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm md:text-base"
                  style={{ minHeight: "48px", maxHeight: "120px" }}
                  disabled={isLoading || trialCount >= TRIAL_LIMIT}
                />
                <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                  {message.length}/1000
                </div>
              </div>
              <button
                onClick={() => handleSend()}
                disabled={
                  !message.trim() || isLoading || trialCount >= TRIAL_LIMIT
                }
                className="p-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:from-green-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center min-w-[48px]"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            {/* Quick Actions */}
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-4 text-xs md:text-sm text-gray-500">
          <p>
            💡 AI responses are informational. Consult professionals for
            specific advice.
          </p>
          {!isTrialExceeded && (
            <p className="mt-1">
              🔢 You have {TRIAL_LIMIT - trialCount} trials remaining.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
