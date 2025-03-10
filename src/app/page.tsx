import Section from "@/components/Section";
import db from "@/lib/supabase/db";
import appBanner from "../../public/appBanner.png";
import cal from "../../public/cal.png";
import Image from "next/image";
import { CLIENTS, PRICING_CARDS, PRICING_PLANS, USERS } from "@/lib/constants";
import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import CustomCard from "@/components/CustomCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Diamond from "../../public/diamond.svg";
import CheckIcon from "../../public/check.svg";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header/Header.server";
export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    console.log(user);
  }

  return (
    <>
      <Header />
      <div className="flex flex-col gap-10">
        <section className="overflow-hidden ">
          <Section
            title="All-in-One Collaboration and Productivity Platform"
            btn="Get Cypress Free"
            note="Your Workspace, Perfected"
          ></Section>
          <div className="md:mt-[-90px] sm:w-full w-[750px] flex items-center justify-center mt-[-40px] relative sm:ml-0 ml-[-50px] overflow-hidden">
            <Image
              src={appBanner}
              alt="app banner "
              className="lg:w-3/5 object-cover"
            />
            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-background to-background/0 z-10"></div>
          </div>
        </section>
        <section className="relative ">
          <div
            className="overflow-hidden
          flex
          after:content['']
          after:dark:from-brand-dark
          after:to-transparent
          after:from-background
          after:bg-gradient-to-l
          after:right-0
          after:bottom-0
          after:top-0
          after:w-20
          after:z-10
          after:absolute

          before:content['']
          before:dark:from-brand-dark
          before:to-transparent
          before:from-background
          before:bg-gradient-to-r
          before:left-0
          before:top-0
          before:bottom-0
          before:w-20
          before:z-10
          before:absolute
        "
          >
            {[...Array(2)].map((arr, i) => (
              <div
                key={i}
                className="flex
                flex-nowrap
                animate-slide
          "
              >
                {CLIENTS.map((client) => (
                  <div
                    key={client.alt}
                    className=" relative
                    w-[200px]
                    m-20
                    shrink-0
                    flex
                    items-center
                  "
                  >
                    <Image
                      src={client.logo}
                      alt={client.alt}
                      width={200}
                      className="object-contain max-w-none"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
        <section className="relative overflow-hidden flex flex-col gap-20">
          <div
            className="hidden dark:block w-full blur-[120px] rounded-full h-32
                        absolute
                        bg-purple-500/50
                        -z-10
                        top-0
                      "
          />
          <Section
            note="Features"
            title="Keep track of your meetings all in one place"
            description="Capture yuor Ideas thoughts notes and meetings in a structured and organized manner."
          ></Section>
          <div className="md:mt-[-90px] sm:w-full w-[750px] flex items-center justify-center mt-[-40px]  sm:ml-0 ml-[-50px] overflow-hidden relative ">
            <Image
              src={cal}
              alt="app banner "
              className="md:w-2/5 w-3/5   shadow-purple-500 shadow-2xl sha my-10 border rounded-2xl"
            />
            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-background to-background/0 z-10"></div>
          </div>
        </section>
        <section className="relative">
          <div
            className="w-full
          blur-[120px]
          rounded-full
          h-32
          absolute
          bg-brand-primaryPurple/50
          -z-100
          top-56
        "
          />
          <div
            className="mt-20
          px-4
          sm:px-6 
          flex
          flex-col
          overflow-x-hidden
          overflow-visible
        "
          >
            <Section
              title="Trusted by all"
              description="Join thousands of satisfied users who rely on our platform for their 
            personal and professional productivity needs."
              note="Testimonials"
            />
            {[...Array(2)].map((arr, index) => (
              <div
                key={index}
                className={twMerge(
                  clsx("mt-10 flex flex-nowrap gap-6 self-start", {
                    "flex-row-reverse": index === 1,
                    "animate-[slide_250s_linear_infinite]": true,
                    "animate-[slide_250s_linear_infinite_reverse]": index === 1,
                    "ml-[100vw]": index === 1,
                  }),
                  "hover:paused"
                )}
              >
                {USERS.map((testimonial, index) => (
                  <CustomCard
                    key={index}
                    className="w-[500px]
                  shrink-0s
                  rounded-xl
                  dark:bg-gradient-to-t
                  dark:from-border dark:to-background
                "
                    cardHeader={
                      <div
                        className="flex
                      items-center
                      gap-4
                  "
                      >
                        <Avatar>
                          <AvatarImage
                            loading="lazy"
                            src={`https://i.pravatar.cc/100?u=${index}`}
                          />
                          <AvatarFallback>AV</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-foreground">
                            {testimonial.name}
                          </CardTitle>
                          <CardDescription className="dark:text-purple-400">
                            {testimonial.name.toLocaleLowerCase()}
                          </CardDescription>
                        </div>
                      </div>
                    }
                    cardContent={
                      <p className="dark:text-purple-400">
                        {testimonial.message}
                      </p>
                    }
                  ></CustomCard>
                ))}
              </div>
            ))}
          </div>
        </section>
        <section
          className="mt-20
        px-4
        sm:px-6
      "
        >
          <Section
            title="The Perfect Plan For You"
            description="Experience all the benefits of our platform. Select a plan that suits your needs and take your productivity to new heights."
            note="Pricing"
          />
          <div
            className="flex 
        flex-col-reverse
        sm:flex-row
        gap-8
        justify-center
        sm:items-stretch
        items-center
        mt-10
        "
          >
            {PRICING_CARDS.map((card) => (
              <CustomCard
                key={card.planType}
                className={clsx(
                  "w-[300px] rounded-2xl dark:bg-black/80  relative",
                  {
                    "border-purple-500/40":
                      card.planType === PRICING_PLANS.proplan,
                  }
                )}
                cardHeader={
                  <CardTitle
                    className="text-2xl
                  font-semibold
              "
                  >
                    {card.planType === PRICING_PLANS.proplan && (
                      <>
                        <div
                          className="hidden dark:block w-full blur-[120px] rounded-full h-32
                        absolute
                        bg-purple-500/50
                        -z-10
                        top-0
                      "
                        />
                        <Image
                          src={Diamond}
                          alt="Pro Plan Icon"
                          className="absolute top-6 right-6"
                        />
                      </>
                    )}
                    {card.planType}
                  </CardTitle>
                }
                cardContent={
                  <CardContent className="p-0">
                    <span
                      className="font-normal 
                    text-2xl
                "
                    >
                      ${card.price}
                    </span>
                    {+card.price > 0 ? (
                      <span className="dark:text-washed-purple-800 ml-1">
                        /mo
                      </span>
                    ) : (
                      ""
                    )}
                    <p className="dark:text-washed-purple-800">
                      {card.description}
                    </p>
                    <Button
                      variant="default"
                      className="whitespace-nowrap w-full mt-4"
                    >
                      {card.planType === PRICING_PLANS.proplan
                        ? "Go Pro"
                        : "Get Started"}
                    </Button>
                  </CardContent>
                }
                cardFooter={
                  <ul
                    className="font-normal
                  flex
                  mb-2
                  flex-col
                  gap-4
                "
                  >
                    <small>{card.highlightFeature}</small>
                    {card.freatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex
                      items-center
                      gap-2
                    "
                      >
                        <Image src={CheckIcon} alt="Check Icon" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                }
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
