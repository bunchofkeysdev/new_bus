"use client";
import "../../app/globals.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import Script from "next/script";
import Image from "next/image";
import { Logo } from "./icons";
import React, { useState, useEffect } from "react";

interface LandingPageProps {
  // Add any props if needed
}
const LandingPage: React.FC<LandingPageProps> = () => {
  useEffect(() => {
    const menuButton = document.querySelector(".header-menu-toggle");
    const menu = document.querySelector<HTMLElement>(".nk-header-menu");

    if (menuButton && menu) {
      menuButton.addEventListener("click", function () {
        menu.classList.toggle("header-menu-active");
      });
    }

    const menuItems = document.querySelectorAll<HTMLElement>(".nk-menu-link");

    if (menuItems) {
      menuItems.forEach((item) => {
        item.addEventListener("click", function () {
          if (menu && menu.classList.contains("header-menu-active")) {
            menu.classList.remove("header-menu-active");
          }
        });
      });
    }
    // Cleanup event listeners when component unmounts
    return () => {
      if (menuButton) {
        menuButton.removeEventListener("click", function () {
          if (menu) {
            menu.classList.toggle("header-menu-active");
          }
        });
      }

      if (menuItems) {
        menuItems.forEach((item) => {
          item.removeEventListener("click", function () {
            if (menu && menu.classList.contains("header-menu-active")) {
              menu.classList.remove("header-menu-active");
            }
          });
        });
      }
    };
  }, []); // Empty dependency array ensures the effect runs once when component mounts

  const { isSignedIn } = useAuth();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="nk-body" data-menu-collapse="lg">
      <div className="nk-app-root bg-darker">
        <header className="nk-header bg-darker is-dark has-mask">
          <div className="nk-mask bg-pattern-dot-white-sm bg-blend-bottom"></div>
          <div className="nk-header-main nk-menu-main is-transparent will-shrink on-dark ignore-mask">
            <div className="container">
              <div className="nk-header-wrap">
                <div className="nk-header-logo">
                  <Link href="/" className="logo-link">
                    <div className="logo-wrap">
                      <Logo />
                    </div>
                  </Link>
                </div>
                <div className="nk-header-toggle">
                  <button className="dark-mode-toggle">
                    <em className="off icon ni ni-sun-fill"></em>
                    <em className="on icon ni ni-moon-fill"></em>
                  </button>
                  <button className="btn btn-light btn-icon header-menu-toggle">
                    <em className="icon ni ni-menu"></em>
                  </button>
                </div>
                <nav className="nk-header-menu nk-menu">
                  <ul className="nk-menu-list me-auto">
                    <li className="nk-menu-item">
                      <Link href="/#howto" className="nk-menu-link">
                        <span className="nk-menu-text">How To</span>
                      </Link>
                    </li>
                    <li className="nk-menu-item">
                      <Link href="/#usecase" className="nk-menu-link">
                        <span className="nk-menu-text">Use Cases</span>
                      </Link>
                    </li>
                    <li className="nk-menu-item">
                      <Link href="/#pricing" className="nk-menu-link">
                        <span className="nk-menu-text">Pricing</span>
                      </Link>
                    </li>
                    <li className="nk-menu-item">
                      <Link href="/#faq" className="nk-menu-link">
                        <span className="nk-menu-text">FAQ</span>
                      </Link>
                    </li>
                  </ul>
                  <div className="d-none d-lg-block mx-2">
                    <button className="dark-mode-toggle">
                      <em className="off icon ni ni-sun-fill"></em>
                      <em className="on icon ni ni-moon-fill"></em>
                    </button>
                  </div>
                  <ul className="nk-menu-buttons flex-lg-row-reverse">
                    <li>
                      <Link
                        href={isSignedIn ? "/dashboard" : "/sign-up"}
                        className="btn btn-outline-primary rounded-pill"
                      >
                        Get Started
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="link link-light"
                        href={isSignedIn ? "/dashboard" : "/sign-in"}
                      >
                        Sign in{" "}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className="nk-hero py-xl-5 has-shape overflow-hidden">
            <div className="nk-shape bg-shape-blur-b mt-n5 start-50 top-50 translate-middle"></div>
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-lg-11 col-xl-10 col-xxl-9">
                  <div className="nk-hero-content py-lg-6 py-5">
                    <h1 className="title mb-lg-4 display-6 mb-3">
                      Unleash Your Business
                      <div className="text-gradient-primary">
                        <span
                          className="type-init"
                          data-strings='"Blog Article", "Event Promotion", "Content Faster"'
                        ></span>
                      </div>
                    </h1>
                    <p className="lead px-md-8 px-lg-6 px-xxl-12 mb-lg-5 mb-4">
                      Let our AI-powered Business App simplify complexities,
                      empowering you with smart solutions for your business
                    </p>
                    <ul className="btn-list btn-list-inline">
                      <li>
                        <Link
                          href={isSignedIn ? "/dashboard" : "/sign-up"}
                          className="btn btn-primary btn-lg rounded-pill"
                        >
                          <span>Start started for free</span>
                        </Link>
                      </li>
                    </ul>
                    <p className="sub-text mt-2">No credit card required</p>
                  </div>
                  <div className="nk-hero-gfx position-relative">
                    <Image
                      className="w-100 rounded-4"
                      src="/static/images/gfx/banner/c.jpg"
                      alt=""
                      width={100}
                      height={100}
                    />
                    <div className="d-none d-md-block position-absolute end-100 me-lg-8 me-xl-12 mt-n3 top-0 me-5">
                      <div className="media media-2xl rounded-pill mx-auto">
                        <Image
                          src="/static/images/avatar/illustration/a.jpg"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="badge bg-dark fw-normal mt-2 p-2 text-white text-opacity-75">
                        Freelancer
                      </div>
                    </div>
                    <div className="d-none d-md-block position-absolute top-50 end-100 me-lg-4 mt-n5 me-3">
                      <div className="media media-2xl rounded-pill mx-auto">
                        <Image
                          src="/static/images/avatar/illustration/b.jpg"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="badge bg-dark fw-normal mt-2 p-2 text-white text-opacity-75">
                        Marketer
                      </div>
                    </div>
                    <div className="d-none d-md-block position-absolute start-100 ms-lg-7 ms-xl-10 mt-n7 top-0 ms-5">
                      <div className="media media-2xl rounded-pill mx-auto">
                        <Image
                          src="/static/images/avatar/illustration/c.jpg"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="badge bg-dark fw-normal mt-2 p-2 text-white text-opacity-75">
                        Business Person
                      </div>
                    </div>
                    <div className="d-none d-md-block position-absolute top-50 start-100 ms-lg-5 mt-n2 ms-4">
                      <div className="media media-2xl rounded-pill mx-auto">
                        <Image
                          src="/static/images/avatar/illustration/d.jpg"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="badge bg-dark fw-normal mt-2 p-2 text-white text-opacity-75">
                        Blogger
                      </div>
                    </div>
                  </div>
                  <div className="nk-hero-content py-6">
                    {/* <h6 className="lead-text">
                      Trusted by 60,000+ freelancers, marketing teams and
                      agencies.
                    </h6>
                    <ul className="d-flex justify-content-center has-gap gy-3 flex-wrap pt-4">
                      <li className="px-sm-5 px-3">
                        <Image
                          className="h-2rem"
                          src="/static/images/brands/72-b-white.png"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </li>
                      <li className="px-sm-5 px-3">
                        <Image
                          className="h-2rem"
                          src="/static/images/brands/72-c-white.png"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </li>
                      <li className="px-sm-5 px-3">
                        <Image
                          className="h-2rem"
                          src="/static/images/brands/72-d-white.png"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </li>
                      <li className="px-sm-5 px-3">
                        <Image
                          className="h-2rem"
                          src="/static/images/brands/72-e-white.png"
                          alt=""
                          width={100}
                          height={100}
                        />
                      </li>
                    </ul> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="nk-pages">
          <section className="section bg-darker is-dark section-top-0 has-shape">
            <div className="nk-shape bg-shape-blur-a start-50 top-50 translate-middle"></div>
            <div className="container">
              <div className="section-head">
                <div className="row justify-content-center text-center">
                  <div className="col-lg-9 col-xl-6 col-xxl-5">
                    <h2 className="title">AI for Business Success. </h2>
                    <p className="lead">
                      Elevate your business with effortless AI solutions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="section-content">
                <div className="row g-gs">
                  <div className="col-md-6 col-xl-4">
                    <div className="card rounded-4 h-100 border-0">
                      <div className="card-body">
                        <div className="feature">
                          <div className="feature-media">
                            <div className="media media-middle media-xl text-info bg-info rounded-3 bg-opacity-20">
                              <em className="icon ni ni-bulb"></em>
                            </div>
                          </div>
                          <div className="feature-text">
                            <h4 className="title">Data Mastery</h4>
                            <p>
                              Harness data insights to guide strategic
                              decisions, transforming raw information into
                              actionable business intelligence effortlessly.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-4">
                    <div className="card rounded-4 h-100 border-0">
                      <div className="card-body">
                        <div className="feature">
                          <div className="feature-media">
                            <div className="media media-middle media-xl text-primary bg-primary rounded-3 bg-opacity-20">
                              <em className="icon ni ni-cpu"></em>
                            </div>
                          </div>
                          <div className="feature-text">
                            <h4 className="title">Automation Edge</h4>
                            <p>
                              Elevate productivity with seamless workflow
                              automation, allowing users to focus on growth
                              while AI handles routine tasks efficiently.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-4">
                    <div className="card rounded-4 h-100 border-0">
                      <div className="card-body">
                        <div className="feature">
                          <div className="feature-media">
                            <div className="media media-middle media-xl text-indigo bg-indigo rounded-3 bg-opacity-20">
                              <em className="icon ni ni-spark"></em>
                            </div>
                          </div>
                          <div className="feature-text">
                            <h4 className="title">Customer Focus</h4>
                            <p>
                              Personalize customer interactions, fostering
                              loyalty and satisfaction by tailoring experiences
                              to individual needs and preferences.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-4">
                    <div className="card rounded-4 h-100 border-0">
                      <div className="card-body">
                        <div className="feature">
                          <div className="feature-media">
                            <div className="media media-middle media-xl text-success bg-success rounded-3 bg-opacity-20">
                              <em className="icon ni ni-swap-alt"></em>
                            </div>
                          </div>
                          <div className="feature-text">
                            <h4 className="title">Predictive Power</h4>
                            <p>
                              Anticipate market trends with predictive
                              analytics, enabling users to make informed
                              decisions ahead of the competition.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-4">
                    <div className="card rounded-4 h-100 border-0">
                      <div className="card-body">
                        <div className="feature">
                          <div className="feature-media">
                            <div className="media media-middle media-xl text-danger bg-danger rounded-3 bg-opacity-20">
                              <div className="d-flex align-items-end">
                                <em className="icon ni ni-text"></em>
                                <em className="icon half ms-n2 ni ni-text"></em>
                              </div>
                            </div>
                          </div>
                          <div className="feature-text">
                            <h4 className="title">Cost-Efficiency</h4>
                            <p>
                              Maximize resource utilization and identify
                              cost-saving opportunities, ensuring optimal
                              efficiency for sustainable business operations.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-4">
                    <div className="card rounded-4 h-100 border-0">
                      <div className="card-body">
                        <div className="feature">
                          <div className="feature-media">
                            <div className="media media-middle media-xl text-warning bg-warning rounded-3 bg-opacity-20">
                              <em className="icon ni ni-file-docs"></em>
                            </div>
                          </div>
                          <div className="feature-text">
                            <h4 className="title">Security Assurance</h4>
                            <p>
                              Protect business assets with advanced security
                              measures, providing users with a safe and
                              trustworthy environment for their operations.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="section section-bottom-0 rounded-top-6 bg-white"
            id="howto"
          >
            <div className="container">
              <div className="section-head">
                <div className="row justify-content-center text-center">
                  <div className="col-lg-9 col-xl-8 col-xxl-5">
                    <div className="badge text-bg-primary-soft-outline text-uppercase text-tracking-1 rounded-pill mb-3 px-3 py-2">
                      How To
                    </div>
                    <h2 className="title">Maximize Your Business with AI</h2>
                    <p className="lead">
                      Let our AI assist you in optimizing business processes,
                      making informed decisions, and achieving success.
                    </p>
                  </div>
                </div>
              </div>
              <div className="section-content">
                <div className="row gy-3 justify-content-center">
                  <div className="col-xxl-12">
                    <div className="bg-primary p-lg-6 rounded-4 bg-opacity-10 p-5">
                      <div className="row g-gs flex-lg-row-reverse justify-content-between align-items-center">
                        <div className="col-lg-6 col-xl-5">
                          <div className="rounded-4 bg-gradient-primary bg-opacity-50 p-5 pb-0">
                            <div className="block-gfx">
                              <Image
                                className="w-100 rounded-top-3 shadow-sm"
                                src="/static/images/gfx/process/a.jpg"
                                alt=""
                                width={100}
                                height={100}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xxl-5">
                          <div className="block-text pe-xl-5">
                            <Image
                              className="h-3rem mb-3"
                              src="/static/images/icon/text.svg"
                              alt=""
                              width={100}
                              height={100}
                            />
                            <h3 className="title">Data-Driven Insights</h3>
                            <p>
                              Leverage AI to analyze and interpret business
                              data, gaining valuable insights for strategic
                              decisions.
                            </p>
                            <ul className="list gy-3">
                              <li>
                                <em className="icon text-info fs-5 ni ni-check-circle-fill"></em>
                                <span>
                                  Access comprehensive data analytics tools.
                                </span>
                              </li>
                              <li>
                                <em className="icon text-info fs-5 ni ni-check-circle-fill"></em>
                                <span>
                                  Make data-driven decisions with confidence.
                                </span>
                              </li>
                              <li>
                                <em className="icon text-info fs-5 ni ni-check-circle-fill"></em>
                                <span>
                                  Visualize trends and patterns effortlessly.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-12">
                    <div className="bg-warning p-lg-6 rounded-4 bg-opacity-10 p-5">
                      <div className="row g-gs flex-lg-row-reverse justify-content-between align-items-center">
                        <div className="col-lg-6 col-xl-5">
                          <div className="rounded-4 bg-gradient-warning bg-opacity-50 p-5 pb-0">
                            <div className="block-gfx">
                              <Image
                                className="w-100 rounded-top-3 shadow-sm"
                                src="/static/images/gfx/process/b.jpg"
                                alt=""
                                width={100}
                                height={100}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xxl-5">
                          <div className="block-text pe-xl-5">
                            <Image
                              className="h-3rem mb-3"
                              src="/static/images/icon/edit.svg"
                              alt=""
                              width={100}
                              height={100}
                            />
                            <h3 className="title">Efficient Task Management</h3>
                            <p>
                              Enhance productivity by using AI to manage tasks,
                              streamline workflows, and prioritize activities.
                            </p>
                            <ul className="list gy-3">
                              <li>
                                <em className="icon text-info fs-5 ni ni-check-circle-fill"></em>
                                <span>
                                  Organize tasks and projects effortlessly.
                                </span>
                              </li>
                              <li>
                                <em className="icon text-info fs-5 ni ni-check-circle-fill"></em>
                                <span>
                                  Automate repetitive processes for efficiency.
                                </span>
                              </li>
                              <li>
                                <em className="icon text-info fs-5 ni ni-check-circle-fill"></em>
                                <span>
                                  Set priorities and deadlines with ease.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-12">
                    <div className="bg-info p-lg-6 rounded-4 bg-opacity-10 p-5">
                      <div className="row g-gs flex-lg-row-reverse justify-content-between align-items-center">
                        <div className="col-lg-6 col-xl-5">
                          <div className="rounded-4 bg-gradient-info bg-opacity-50 p-5 pb-0">
                            <div className="block-gfx">
                              <Image
                                className="w-100 rounded-top-3 shadow-sm"
                                src="/static/images/gfx/process/c.jpg"
                                alt=""
                                width={100}
                                height={100}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-xxl-5">
                          <div className="block-text pe-xl-5">
                            <Image
                              className="h-3rem mb-3"
                              src="/static/images/icon/paper.svg"
                              alt=""
                              width={100}
                              height={100}
                            />
                            <h3 className="title">Strategic Planning</h3>
                            <p>
                              Collaborate with AI for strategic planning, market
                              analysis, and business growth strategies.
                            </p>
                            <ul className="list gy-3">
                              <li>
                                <em className="icon text-info fs-5 ni ni-check-circle-fill"></em>
                                <span>
                                  Plan for business growth and expansion.
                                </span>
                              </li>
                              <li>
                                <em className="icon text-info fs-5 ni ni-check-circle-fill"></em>
                                <span>
                                  Receive personalized recommendations.
                                </span>
                              </li>
                              <li>
                                <em className="icon text-info fs-5 ni ni-check-circle-fill"></em>
                                <span>
                                  Optimize your business strategies effectively.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section has-mask bg-white" id="usecase">
            <div className="nk-mask bg-pattern-dot-sm bg-blend-around"></div>
            <div className="container">
              <div className="section-head">
                <div className="row justify-content-center text-center">
                  <div className="col-lg-9 col-xl-8 col-xxl-7">
                    <div className="badge text-bg-primary-soft-outline text-uppercase text-tracking-1 rounded-pill mb-3 px-3 py-2">
                      Use Cases
                    </div>
                    <h2 className="title h1">Generate in seconds using AI</h2>
                    <p className="lead px-xl-6">
                      Let our AI assist with most time consuming to write blog
                      articles, product descriptions and more.
                    </p>
                  </div>
                </div>
              </div>
              <div className="section-content">
                <div className="row justify-content-center">
                  <div className="col-xxl-11">
                    <div className="row gy-6 gx-5 text-center">
                      <div className="col-sm-6 col-lg-4">
                        <div className="h-100 px-xl-4 px-xxl-5">
                          <div className="feature">
                            <div className="feature-media">
                              <div className="media media-middle media-xl media-border text-bg-danger-soft-outline rounded-3">
                                <Image
                                  className="h-2rem"
                                  src="/static/images/icon/articles.svg"
                                  alt=""
                                  width={100}
                                  height={100}
                                />
                              </div>
                            </div>
                            <div className="feature-text">
                              <h3 className="title">Data Analysis</h3>
                              <p>
                                Leverage AI for in-depth data analysis and gain
                                valuable insights to drive informed business
                                decisions.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-4">
                        <div className="h-100 px-xl-4 px-xxl-5">
                          <div className="feature">
                            <div className="feature-media">
                              <div className="media media-middle media-xl media-border text-bg-success-soft-outline rounded-3">
                                <Image
                                  className="h-2rem"
                                  src="/static/images/icon/product-discription.svg"
                                  alt=""
                                  width={100}
                                  height={100}
                                />
                              </div>
                            </div>
                            <div className="feature-text">
                              <h3 className="title">Task Management</h3>
                              <p>
                                Optimize your workflow with AI-driven task
                                management, ensuring efficient allocation and
                                completion of tasks.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-4">
                        <div className="h-100 px-xl-4 px-xxl-5">
                          <div className="feature">
                            <div className="feature-media">
                              <div className="media media-middle media-xl media-border text-bg-purple-soft-outline rounded-3">
                                <Image
                                  className="h-2rem"
                                  src="/static/images/icon/hand-mic.svg"
                                  alt=""
                                  width={100}
                                  height={100}
                                />
                              </div>
                            </div>
                            <div className="feature-text">
                              <h3 className="title">Strategic Planning</h3>
                              <p>
                                Collaborate with AI for strategic planning,
                                market analysis, and business growth strategies.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-4">
                        <div className="h-100 px-xl-4 px-xxl-5">
                          <div className="feature">
                            <div className="feature-media">
                              <div className="media media-middle media-xl media-border text-bg-info-soft-outline rounded-3">
                                <Image
                                  className="h-2rem"
                                  src="/static/images/icon/praying-hand.svg"
                                  alt=""
                                  width={100}
                                  height={100}
                                />
                              </div>
                            </div>
                            <div className="feature-text">
                              <h3 className="title">Customer Engagement</h3>
                              <p>
                                Enhance customer interactions with AI-powered
                                engagement strategies, personalized
                                recommendations, and targeted campaigns.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-4">
                        <div className="h-100 px-xl-4 px-xxl-5">
                          <div className="feature">
                            <div className="feature-media">
                              <div className="media media-middle media-xl media-border text-bg-primary-soft-outline rounded-3">
                                <Image
                                  className="h-2rem"
                                  src="/static/images/icon/stock-up.svg"
                                  alt=""
                                  width={100}
                                  height={100}
                                />
                              </div>
                            </div>
                            <div className="feature-text">
                              <h3 className="title">Process Automation</h3>
                              <p>
                                Streamline business processes with AI
                                automation, reducing manual efforts and
                                increasing operational efficiency.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-4">
                        <div className="h-100 px-xl-4 px-xxl-5">
                          <div className="feature">
                            <div className="feature-media">
                              <div className="media media-middle media-xl media-border text-bg-indigo-soft-outline rounded-3">
                                <Image
                                  className="h-2rem"
                                  src="/static/images/icon/website.svg"
                                  alt=""
                                  width={100}
                                  height={100}
                                />
                              </div>
                            </div>
                            <div className="feature-text">
                              <h3 className="title">Financial Insights</h3>
                              <p>
                                Utilize AI for financial forecasting, expense
                                tracking, and real-time insights for sound
                                financial decision-making.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section section-bottom-0 bg-light" id="pricing">
            <div className="container">
              <div className="section-head">
                <div className="row justify-content-center text-center">
                  <div className="col-lg-9 col-xl-8 col-xxl-6">
                    <div className="badge text-bg-primary-soft-outline text-uppercase text-tracking-1 rounded-pill mb-3 px-3 py-2">
                      Pricing
                    </div>
                    <h2 className="title h1">
                      Plans that start free and fits with your needs
                    </h2>
                    <p className="lead">
                      With our simple plans, supercharge your content writing to
                      helps your business. Let’s make great content together.
                    </p>
                  </div>
                </div>
              </div>
              <div className="section-content">
                <div className="pricing-toggle-wrap mb-4">
                  <div className="h5 pricing-toggle-text monthly mb-0">
                    Monthly
                  </div>
                  <div className="mx-3">
                    <button
                      className="pricing-toggle"
                      data-parent="pricing-toggle-wrap"
                      data-target="pricing-toggle-content"
                    >
                      <span className="pricing-toggle-ball"></span>
                    </button>
                  </div>
                  <div className="h5 pricing-toggle-text yearly position-relative mb-0">
                    Yearly
                    <span className="badge text-bg-success-soft fw-normal text-uppercase smaller rounded-pill position-absolute ms-n5 mb-sm-0 ms-sm-3 translate-middle-sm-y start-100 bottom-100 bottom-sm-auto top-sm-50 mb-2">
                      Save 12%
                    </span>
                  </div>
                </div>
                <div className="row g-gs">
                  <div className="col-xxl-4 col-xl-4">
                    <div className="pricing h-100 pricing-featured bg-gradient-primary">
                      <div className="pricing-body h-100 p-md-0 pt-md-0 p-xl-5 pt-xl-3 d-md-flex d-xl-block p-5 pt-3">
                        <div className="p-md-5 p-xl-0 w-md-50 w-xl-100 text-center">
                          <div className="badge bg-gradient-primary gradient-angle-90 rounded-pill small text-primary text-tracking-1 mb-4 bg-opacity-20 px-3 py-2">
                            <div className="p-1">Most Popurlar</div>
                          </div>
                          <h3 className="mb-3">Pro</h3>
                          <div className="pricing-price-wrap pricing-toggle-content">
                            <div className="pricing-price monthly">
                              <h3 className="display-5 mb-3">
                                $19
                                <span className="caption-text text-muted">
                                  / month
                                </span>
                              </h3>
                            </div>
                            <div className="pricing-price yearly">
                              <h3 className="display-5 mb-3">
                                $190
                                <span className="caption-text text-muted">
                                  / yearly
                                </span>
                              </h3>
                            </div>
                          </div>
                          <p className="fw-bold text-primary">
                            For marketers, bloggers, freelancers &amp; startups
                          </p>
                          <div className="bg-light smaller rounded-1 mb-4 px-4 py-2">
                            Try out all features to determine what works best
                            for you
                          </div>
                          <div className="pricing-toggle-content px-4">
                            <div className="pricing-toggle-option monthly">
                              <Link
                                href="#"
                                className="btn btn-primary btn-block rounded-pill"
                              >
                                Get Started
                              </Link>
                            </div>
                            <div className="pricing-toggle-option yearly">
                              <Link
                                href="#"
                                className="btn btn-primary btn-block rounded-pill"
                              >
                                Get Committed
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="d-none d-md-block d-xl-none border-start h-100"></div>
                        <div className="p-md-5 p-xl-0 pt-xl-4 w-md-50 w-xl-100 pt-4">
                          <h5 className="fw-medium pb-1">
                            Everything in Free, plus
                          </h5>
                          <ul className="list gy-3">
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>
                                <strong>50,000</strong> Words Limit
                              </span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>
                                <strong>10+</strong> Templates
                              </span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>50+ Languages</span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>Advance Editor Tool</span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>Priority support</span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>Unlimited Logins</span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>Access New Features</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-md-6 order-xl-first">
                    <div className="h-100 pt-xl-6">
                      <div className="pricing h-100">
                        <div className="pricing-body h-100 p-5">
                          <div className="text-center">
                            <h3 className="mb-3">Free</h3>
                            <h3 className="display-5 mb-3">
                              $0
                              <span className="caption-text text-muted">
                                / month
                              </span>
                            </h3>
                            <p className="fw-bold">
                              Access to features to help you your business.
                            </p>
                            <div className="bg-light smaller rounded-1 mb-4 px-4 py-2">
                              Try out all features to determine what works best
                              for you
                            </div>
                            <div className="px-4">
                              <Link
                                href="#"
                                className="btn btn-outline-primary btn-block rounded-pill"
                              >
                                Start Writing for Free
                              </Link>
                            </div>
                          </div>
                          <h5 className="fw-medium pb-1 pt-4">
                            Give a try for free
                          </h5>
                          <ul className="list gy-3">
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>
                                <strong>4,500</strong> Words
                              </span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>
                                <strong>5+</strong> Templates
                              </span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>10+ Languages</span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>AI Article Writer</span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>Advance Editor Tool</span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>Regular support</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-4 col-xl-4 col-md-6">
                    <div className="h-100 pt-xl-6">
                      <div className="pricing h-100">
                        <div className="pricing-body h-100 p-5">
                          <div className="text-center">
                            <h3 className="mb-3">Custom</h3>
                            <div className="media media-middle media-2xl bg-light rounded-pill mb-4 mt-3">
                              <em className="icon ni ni-building"></em>
                            </div>
                            <p className="fw-bold">
                              Design your custom package for teams and business
                              needs
                            </p>
                            <div className="bg-light smaller rounded-1 mb-4 px-4 py-2">
                              Take your business to the another level with
                              custom package and support.
                            </div>
                            <div className="px-4">
                              <Link
                                href="#"
                                className="btn btn-outline-primary btn-block rounded-pill"
                              >
                                Request for Demo
                              </Link>
                            </div>
                          </div>
                          <h5 className="fw-medium pb-1 pt-4">
                            Everything in Pro, plus
                          </h5>
                          <ul className="list gy-3">
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>
                                <strong>Custom pricing</strong>
                              </span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>Custom number of users</span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>Custom number of words</span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>Manage team member</span>
                            </li>
                            <li>
                              <em className="icon fs-4 ni ni-check-circle-fill text-info"></em>
                              <span>Premium support</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section bg-light" id="faq">
            <div className="container">
              <div className="section-head">
                <div className="row justify-content-center text-center">
                  <div className="col-xl-8">
                    <h2 className="title">Frequently Asked Questions</h2>
                    <p className="lead">
                      If you have any questions not answered in the FAQ, please
                      do not hesitate to contac us.
                    </p>
                  </div>
                </div>
              </div>
              <div className="section-content">
                <div className="row g-gs justify-content-center">
                  <div className="col-xl-9 col-xxl-8">
                    <div
                      className="accordion accordion-separated accordion-plus-minus"
                      id="faq-business-ai"
                    >
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${
                              activeIndex === 0 ? "show !important" : ""
                            }`}
                            onClick={() => handleAccordionClick(0)}
                            data-bs-toggle="collapse"
                            data-bs-target="#faq-business-ai-1"
                          >
                            How can BusinessAI assist my business?
                          </button>
                        </h2>
                        <div
                          id="faq-business-ai-1"
                          className={`accordion-collapse ${
                            activeIndex === 0 ? "show !important" : "collapse"
                          }`}
                          data-bs-parent="#faq-business-ai"
                        >
                          <div className="accordion-body">
                            BusinessAI can help optimize your business
                            processes, analyze data, and provide insights for
                            better decision-making. Whether it&quot;s automating
                            tasks or predicting trends, BusinessAI enhances
                            efficiency and performance.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq-business-ai-2"
                          >
                            Can BusinessAI improve customer engagement?
                          </button>
                        </h2>
                        <div
                          id="faq-business-ai-2"
                          className="accordion-collapse collapse"
                          data-bs-parent="#faq-business-ai"
                        >
                          <div className="accordion-body">
                            Yes, BusinessAI can enhance customer engagement by
                            personalizing interactions, analyzing customer
                            behavior, and providing tailored recommendations. It
                            helps create a more personalized and satisfying
                            experience for your customers.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq-business-ai-3"
                          >
                            Is BusinessAI suitable for small businesses?
                          </button>
                        </h2>
                        <div
                          id="faq-business-ai-3"
                          className="accordion-collapse collapse"
                          data-bs-parent="#faq-business-ai"
                        >
                          <div className="accordion-body">
                            Absolutely! BusinessAI offers scalable solutions
                            that can be tailored to fit the needs of small
                            businesses. It assists in automating routine tasks,
                            managing data, and optimizing workflows, providing
                            valuable support for small business growth.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target="#faq-business-ai-4"
                          >
                            How can BusinessAI impact decision-making?
                          </button>
                        </h2>
                        <div
                          id="faq-business-ai-4"
                          className="accordion-collapse collapse"
                          data-bs-parent="#faq-business-ai"
                        >
                          <div className="accordion-body">
                            BusinessAI provides data-driven insights and
                            predictions, empowering informed decision-making. It
                            analyzes trends, identifies opportunities, and helps
                            businesses make strategic choices based on accurate
                            and timely information.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className="nk-footer">
          <section className="section bg-light section-0 has-mask">
            <div className="nk-mask bg-darker top-50"></div>
            <div className="container-xl container">
              <div className="section-wrap bg-dark is-dark rounded-4 has-shape overflow-hidden">
                <div className="nk-shape bg-shape-blur-b start-50 top-50 translate-middle"></div>
                <div className="section-content p-sm-5 p-xl-7 p-4">
                  <div className="row justify-content-between align-items-center g-5">
                    <div className="col-xl-5 col-lg-6">
                      <div className="block-text">
                        <h6 className="overline-title text-primary">
                          Boost Your Business Smarts with AI Assistance
                        </h6>
                        <h2 className="title">Business Wisdom, Simplified.</h2>
                        <p>
                          Let our AI-powered Business App simplify complexities,
                          empowering you with smart solutions for your business
                          success. Streamline your journey to growth
                          effortlessly.
                        </p>
                        <ul className="list list-row gx-3 gy-0">
                          <li>
                            <em className="icon fs-5 ni ni-check-circle-fill text-info"></em>
                            <span>No credit card required</span>
                          </li>
                          <li>
                            <em className="icon fs-5 ni ni-check-circle-fill text-info"></em>
                            <span>Cancel anytime</span>
                          </li>
                        </ul>
                        <ul className="btn-list btn-list-inline gy-0">
                          <li>
                            <Link
                              href={isSignedIn ? "/dashboard" : "/sign-up"}
                              className="btn btn-lg btn-primary rounded-pill"
                            >
                              <span>Get started for free</span>
                              <em className="icon ni ni-arrow-long-right"></em>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 align-self-end">
                      <div className="rounded-top-4 bg-white">
                        <div className="rounded-top-4 bg-gradient-primary mb-n4 mb-sm-n5 mb-xl-n7 bg-opacity-70 p-5 pb-0">
                          <div className="block-gfx">
                            <Image
                              className="w-100 rounded-top-3 shadow-sm"
                              src="/static/images/gfx/process/c.jpg"
                              alt=""
                              width={100}
                              height={100}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="bg-darker is-dark">
            <div className="container">
              <hr className="m-0 border-white border-opacity-25" />
              <div className="py-5">
                <div className="row">
                  <div className="col-md">
                    <p className="mb-md-0 mb-2">
                      &copy; 2023 Copyright.
                      <Link href="#" className="fw-bold text-white">
                        Business AI
                      </Link>
                      .
                    </p>
                  </div>
                  <div className="col-xl-4 col-lg-3 me-auto">
                    <div className="block-text">
                      <ul className="btn-list btn-list-inline g-1">
                        <li>
                          <Link className="link-base" href="#">
                            <em className="icon fs-3 ni ni-facebook-fill"></em>
                          </Link>
                        </li>
                        <li>
                          <Link className="link-base" href="#">
                            <em className="icon fs-3 ni ni-github-round"></em>
                          </Link>
                        </li>
                        <li>
                          <Link className="link-base" href="#">
                            <em className="icon fs-3 ni ni-linkedin-round"></em>
                          </Link>
                        </li>
                        <li>
                          <Link className="link-base" href="#">
                            <em className="icon fs-3 ni ni-youtube-round"></em>
                          </Link>
                        </li>
                        <li>
                          <Link className="link-base" href="#">
                            <em className="icon fs-3 ni ni-twitter-round"></em>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md">
                    <ul className="list list-row gx-4 justify-content-start justify-content-md-end">
                      <li>
                        <Link href="#" className="link-primary">
                          Terms
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="link-primary">
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <Script src="/static/js/customs.js" />
    </div>
  );
};
export default LandingPage;
