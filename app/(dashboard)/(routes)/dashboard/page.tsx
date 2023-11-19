"use client";

import React, { useRef } from "react";
import { useChat } from "ai/react"; // Assuming you have a `Message` type from your chat library
import va from "@vercel/analytics";
import clsx from "clsx";
import { Logo, Avatar, LoadingCircle, SendIcon } from "./icons";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Textarea from "react-textarea-autosize";
import { toast } from "sonner";
import seedrandom from "seedrandom";
// Define the type for business prompts
interface BusinessPrompt {
  question: string;
  category: string;
}

const business_prompts: BusinessPrompt[] = [
  {
    question: "How can I effectively launch my small business?",
    category: "Startup Launch",
  },
  {
    question: "What are the key components of a successful business plan?",
    category: "Business Plan",
  },
  {
    question: "How do I identify and target my ideal customers?",
    category: "Target Customers",
  },
  {
    question:
      "What digital marketing strategies work best for small businesses?",
    category: "Digital Marketing",
  },
  {
    question: "Can you provide tips for creating a compelling brand identity?",
    category: "Brand Identity",
  },
  {
    question:
      "What financing options are available for small and medium enterprises (SMEs)?",
    category: "Financing Options",
  },
  {
    question: "How do I manage cash flow effectively in my business?",
    category: "Cash Flow Management",
  },
  {
    question:
      "What are the essential legal considerations for starting a business?",
    category: "Legal Considerations",
  },
  {
    question: "What tools can help streamline my business operations?",
    category: "Tools for Operations",
  },
  {
    question: "How can I leverage social media for business growth?",
    category: "Social Media Growth",
  },
  {
    question: "What are effective pricing strategies for my products/services?",
    category: "Pricing Strategies",
  },
  {
    question: "How do I build and maintain strong customer relationships?",
    category: "Customer Relationships",
  },
  {
    question:
      "What are the best practices for hiring and managing a small team?",
    category: "Team Management",
  },
  {
    question: "Can you suggest ways to optimize my website for search engines?",
    category: "Website Optimization",
  },
  {
    question: "What are the common challenges in scaling a small business?",
    category: "Scaling Challenges",
  },
  {
    question: "How can I utilize technology to enhance productivity?",
    category: "Technology Productivity",
  },
  {
    question:
      "What financial metrics should I regularly monitor for business success?",
    category: "Financial Metrics",
  },
  {
    question: "How do I create a budget that aligns with my business goals?",
    category: "Budget Creation",
  },
  {
    question:
      "What are the key factors to consider when choosing a business location?",
    category: "Business Location",
  },
  {
    question: "How can I adapt my business to changing market trends?",
    category: "Market Trends Adaptation",
  },
  {
    question: "What are effective sales tactics for small businesses?",
    category: "Sales Tactics",
  },
  {
    question: "How do I negotiate deals and partnerships successfully?",
    category: "Deal Negotiation",
  },
  {
    question:
      "Can you provide guidance on creating effective advertising campaigns?",
    category: "Advertising Campaigns",
  },
  {
    question: "What are the best practices for managing inventory efficiently?",
    category: "Inventory Management",
  },
  {
    question:
      "How can I stay informed about industry regulations affecting my business?",
    category: "Industry Regulations",
  },
  {
    question: "What role does customer feedback play in business improvement?",
    category: "Customer Feedback",
  },
  {
    question:
      "How do I develop a unique selling proposition (USP) for my business?",
    category: "Unique Selling Proposition",
  },
  {
    question: "What insurance options should I consider for my small business?",
    category: "Insurance Options",
  },
  {
    question:
      "How do I handle customer complaints and resolve issues effectively?",
    category: "Complaint Resolution",
  },
  {
    question:
      "Can you share tips for creating engaging content for my business?",
    category: "Engaging Content Creation",
  },
  {
    question: "How do I stay competitive in a saturated market?",
    category: "Market Competitiveness",
  },
  {
    question: "What are the tax implications for small business owners?",
    category: "Tax Implications",
  },
  {
    question: "How do I build and nurture a network within my industry?",
    category: "Network Building",
  },
  {
    question:
      "What strategies can I use to boost employee morale and satisfaction?",
    category: "Employee Satisfaction",
  },
  {
    question: "How do I choose the right technology stack for my business?",
    category: "Technology Stack",
  },
  {
    question:
      "Can you provide guidance on creating effective email marketing campaigns?",
    category: "Email Marketing",
  },
  {
    question:
      "What are the steps to create a sustainable and eco-friendly business?",
    category: "Sustainable Business",
  },
  {
    question: "How do I adapt my business to changing consumer behavior?",
    category: "Consumer Behavior Adaptation",
  },
  {
    question:
      "What cybersecurity measures should I implement to protect my business?",
    category: "Cybersecurity Measures",
  },
  {
    question: "How do I set realistic and achievable business goals?",
    category: "Business Goals",
  },
  {
    question:
      "Can you share tips for effective time management as a business owner?",
    category: "Time Management",
  },
  {
    question:
      "What are the benefits of incorporating sustainability into my business model?",
    category: "Sustainability Benefits",
  },
  {
    question: "How do I navigate the challenges of global market expansion?",
    category: "Global Expansion Challenges",
  },
  {
    question:
      "What are the key components of a successful e-commerce strategy?",
    category: "E-commerce Strategy",
  },
  {
    question: "How do I build a strong personal brand as a business owner?",
    category: "Personal Branding",
  },
  {
    question:
      "Can you provide insights into effective networking strategies for SMEs?",
    category: "Networking Strategies",
  },
  {
    question:
      "What are the potential risks and rewards of diversifying my product/service offerings?",
    category: "Product Diversification",
  },
  {
    question:
      "How do I effectively use data analytics to make informed business decisions?",
    category: "Data Analytics Decision",
  },
  {
    question:
      "What are the best practices for maintaining work-life balance as an entrepreneur?",
    category: "Work-life Balance",
  },
  {
    question:
      "How can I create a positive company culture that attracts and retains talent?",
    category: "Positive Company Culture",
  },
];

// Define the type for the getRandomPrompts function
interface RandomPrompt {
  label: string;
  question: string;
}

const getRandomPrompts = (count: number, seed: string): RandomPrompt[] => {
  const rng = seedrandom(seed);
  const randomPrompts: RandomPrompt[] = [];

  const generateRandomPrompt = () => {
    const randomIndex = Math.floor(rng() * business_prompts.length);
    const randomPrompt: RandomPrompt = {
      label: business_prompts[randomIndex].category,
      question: business_prompts[randomIndex].question,
    };
    randomPrompts.push(randomPrompt);
  };

  while (randomPrompts.length < count) {
    generateRandomPrompt();
  }

  return randomPrompts;
};


// Set a fixed seed for consistency between server and client
const seed = "AI_Business";
const examples: RandomPrompt[] = getRandomPrompts(6, seed);

export default function Dashboard() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        toast.error("You have reached your request limit for the day.");
        va.track("Rate limited");
        return;
      } else {
        va.track("Chat initiated");
      }
    },
    onError: (error) => {
      va.track("Chat errored", {
        input,
        error: error.message,
      });
    },
  });

  const disabled = isLoading || input.length === 0;

  const handleExampleClick = async (example: RandomPrompt) => {
    // Set the input to the example question
    setInput(example.question);

    // Wait for a short delay to allow the state to update
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Submit the form programmatically
    formRef.current?.requestSubmit();
  };

  return (
    <main className="flex flex-col items-center justify-between pb-40">
      <div className="absolute top-5 flex w-full justify-between px-5">
        <a
          href="/"
          className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto"
        >
          <Logo />
        </a>
        <a className="rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto">
          <Avatar />
        </a>
      </div>
      {messages.length > 0 ? (
        messages.map((message, i) => (
          <div
            key={i}
            className={clsx(
              "flex w-full items-center justify-center border-b border-gray-200 py-8",
              message.role === "user" ? "bg-white" : "bg-gray-100",
            )}
          >
            <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
              <div
                className={clsx(
                  "p-1.5 text-white",
                  message.role === "assistant" ? "bg-green-500" : "bg-black",
                )}
              >
                {message.role === "user" ? (
                  <User width={20} />
                ) : (
                  <Bot width={20} />
                )}
              </div>
              <ReactMarkdown
                className="prose mt-1 w-full break-words prose-p:leading-relaxed"
                remarkPlugins={[remarkGfm]}
                components={{
                  // open links in new tab
                  a: (props) => (
                    <a {...props} target="_blank" rel="noopener noreferrer" />
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))
      ) : (
        <div className="mx-5 mt-20 max-w-screen-lg rounded-md  sm:w-full">
          <div className="flex flex-col space-y-4 p-7 sm:p-10">
            <h1 className="text-center text-lg font-semibold text-black">
              Welcome to Business AI!
            </h1>
            {/* <p className="text-gray-500">
              This is the number 1 Business AI assistant tool
              AI chatbot that uses
              State of the art technology 
              and
              advance data bank
              to interact with the
              to provide up to date ...
            </p> */}
          </div>

          <div className="grid grid-cols-1 gap-4 border-gray-200 p-7 sm:grid-cols-2 sm:p-10 md:grid-cols-3 lg:m-4 lg:grid-cols-3 xl:grid-cols-3">
            {examples.map((example, i) => (
              <button
                key={i}
                className="rounded-md border border-gray-200 bg-white px-5 py-3 text-left text-sm text-gray-500 transition-all duration-75 hover:border-black hover:text-gray-700 active:bg-gray-50"
                onClick={() => handleExampleClick(example)}
              >
                {example.question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 p-5 pb-3 sm:px-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative w-full max-w-screen-md rounded-xl border border-gray-200 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-10 focus:outline-none"
          />
          <button
            className={clsx(
              "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
              disabled
                ? "cursor-not-allowed bg-white"
                : "bg-green-500 hover:bg-green-600",
            )}
            disabled={disabled}
          >
            {isLoading ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  "h-4 w-4",
                  input.length === 0 ? "text-gray-300" : "text-white",
                )}
              />
            )}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400">
          copyright under construction .
        </p>
      </div>
    </main>
    
  );
  
}
