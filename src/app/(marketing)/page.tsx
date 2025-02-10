import BookCall from '@/app/(marketing)/_components/book-call';
import Faqs from '@/app/(marketing)/_components/faq';
import Marquee from '@/app/(marketing)/_components/marquee';
import ProjectCard from '@/app/(marketing)/_components/project-card';
import { Spotlight } from '@/app/(marketing)/_components/spotlight';
import { CursorContainer } from '@/components/animation/cursor-container';
import Heading from '@/components/heading';
import CalBtn from '@/components/ui/CalBtn';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { projects } from '@/constant/projects';
import { Lightning } from '@phosphor-icons/react/dist/ssr';
import { Check } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 10;

const HomePage = () => {
  return (
    <CursorContainer>
      <section className="relative -mt-5 flex flex-col pt-32">
        <Spotlight />
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--border)/50%)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/50%)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="layout relative z-10">
          <h1 className="h0 mt-2 mx-auto text-center text-4xl md:text-5xl font-bold leading-tight lg:text-6xl xl:text-7xl">
            I Build SaaS That Drives Revenue & Growth for Your Business
          </h1>
          <p className="mt-5 font-mono text-center max-w-2xl block mx-auto  uppercase">
            Turn your SaaS idea into a high-performing product with seamless UX,
            scalable architecture, and conversion-focused design.
          </p>
          <div className="md:grid grid-cols-2 items-center w-max gap-6 xl:grid-cols-4 mt-10 justify-center mx-auto hidden">
            {features.map((feature) => (
              <Tooltip key={feature.title}>
                <TooltipTrigger asChild>
                  <h3 className="text-xl w-max font-medium">
                    <Lightning className="inline-block w-6 h-6 mr-2" />
                    {feature.title}
                  </h3>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-background text-primary-foreground p-4 rounded-lg shadow-lg border text-center text-base border-primary shadow-primary/20">
                  <p>{feature.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <div className="flex gap-5 items-center justify-center mt-10">
            <div className="relative overflow-hidden rounded-full bg-background  shadow border border-border group p-0.5">
              <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite_reverse] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--foreground)),hsl(var(--background)/.07))]" />
              <CalBtn
                data-cal-namespace=""
                data-cal-link="chandra-prakash/15min"
                data-cal-config='{"layout":"month_view"}'
                className="rounded-full backdrop-blur-xl bg-primary h-14 text-xl font-bold"
                size="lg"
              >
                Get Your MVP Today
              </CalBtn>
            </div>
          </div>
        </div>
        <div className="mt-24 w-[100vw] bg-primary py-[1rem] text-primary-foreground">
          <Marquee />
        </div>
      </section>
      {/* Work */}
      <section id="sec-work" className="section relative flex flex-col pt-20">
        <div className="layout relative">
          <Heading>FEATURED / WORK</Heading>

          <div className="mt-4 grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard {...project} key={project.title} />
            ))}
          </div>
        </div>
      </section>
      {/* About */}
      <section id="how-it-works" className="relative section overflow-hidden ">
        <div className="mx-auto text-center">
          <h2 className="h0 mt-2 mx-auto text-center text-5xl sm:text-8xl md:text-8xl font-bold lg:text-[9rem] xl:text-[10rem] 2xl:text-[12rem] !leading-[1.2]">
            4 Steps Sprint
          </h2>
        </div>

        <div className="grid grid-cols-1 bg-black bg-opacity-50 border sm:grid-cols-2 lg:grid-cols-4 layout md:grid-cols-2 mx-auto mt-10 lg:-mt-20 xl:-mt-24 2xl:-mt-28">
          {[
            {
              step: 'Discovery & Planning',
              description:
                'We collaborate with you to understand your vision, goals, and target audience to create a customized roadmap for your SaaS.',
            },
            {
              step: 'Design & Prototyping',
              description:
                'We design data-driven wireframes and UI/UX prototypes that ensure a seamless user experience, ready for development.',
            },
            {
              step: 'Development & MVP Build',
              description:
                'We develop the core features, scalable architecture, and MVP, ensuring a fast launch and robust foundation for future growth.',
            },
            {
              step: 'Launch & Optimization',
              description:
                'After launch, we monitor key metrics, provide daily updates, and implement growth strategies to ensure continuous improvement and scaling.',
            },
          ].map(({ step, description }, i) => (
            <div
              className="w-full mx-auto p-2 border shadow-[2px_4px_20px_0px_hsl(var(--muted-foreground)/.1)_inset] bg-card/40 backdrop-blur group relative"
              key={step}
            >
              <div className="p-6 sm:px-8">
                <p className="text-5xl font-semibold text-muted-foreground">
                  {i + 1}
                </p>
                <p className="mt-12 text-xl font-normal text-foreground lg:mt-32 xl:mt-52">
                  {step}
                </p>
                <p className="mt-2 text-muted-foreground font-normal ">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="pricing" className="section">
        <p className="text-center uppercase font-mono max-w-2xl block mx-auto text-sm ">
          Choose the perfect plan for your project needs.
          <br /> Get started today and bring your vision to life.
        </p>
        <h2 className="h0 mt-2 mx-auto text-center text-7xl sm:text-8xl md:text-[9rem] font-bold lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] !leading-[1.2]">
          Our Pricing
        </h2>
        <div className="grid layout md:grid-cols-2 gap-6 mx-auto lg:gap-8 mt-10 md:-mt-20 lg:-mt-24 xl:-mt-28 2xl:-mt-32">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className="w-full mx-auto p-2 rounded-2xl border shadow-[2px_4px_20px_0px_hsl(var(--muted-foreground)/.1)_inset] bg-card/40 backdrop-blur group relative"
            >
              <CardHeader className="space-y-3 border-b block">
                <div className="text-4xl font-bold">{plan.price}</div>
                <CardTitle className="text-sm text-muted-foreground">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-base text-foreground">
                  {plan.description}
                </CardDescription>
                <div className="relative overflow-hidden rounded-full bg-background shadow border !mt-8 border-border group p-0.5">
                  <span className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite_reverse] bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--foreground)),hsl(var(--background)/.07))]" />
                  <CalBtn
                    data-cal-namespace=""
                    data-cal-link="chandra-prakash/15min"
                    data-cal-config='{"layout":"month_view"}'
                    className="rounded-full backdrop-blur-xl h-14 text-base sm:text-xl w-full"
                    size="lg"
                    variant={plan.button.variant}
                  >
                    {plan.button.text}
                  </CalBtn>
                </div>
              </CardHeader>
              <CardContent className="grid pt-6 gap-4">
                <ul className="grid gap-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-5">
                      <div className="bg-foreground/10 p-2 rounded-full border border-foreground/15 flex items-center justify-center ">
                        <Check className="w-4 h-4 text-foreground" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section id="faq" className="relative flex flex-col pt-32">
        <div className="layout relative z-10">
          <Heading>
            FAQs
            {/* FEATURED /<ArrowLink href='/work'>WORK</ArrowLink> */}
          </Heading>
          <div className="mt-4 flex w-full flex-wrap gap-6 *:rounded-[45px] *:border">
            <Faqs />
          </div>
        </div>
      </section>
      <BookCall />
    </CursorContainer>
  );
};

export default HomePage;

const features = [
  {
    title: 'MVP in 7 Days',
    description:
      'Launch your SaaS fast with a fully functional MVP—speed without compromising quality.',
  },
  {
    title: 'Senior Dev & Designer',
    description:
      'Expert-level development and design to create high-performing, conversion-driven products.',
  },
  {
    title: 'Updates Every 24 Hours',
    description:
      'Stay in control with daily progress updates and rapid iteration cycles.',
  },
  {
    title: 'Custom Solutions',
    description:
      'Tailor-made features and scalable architecture built specifically for your business needs.',
  },
];

const plans = [
  {
    name: 'Website Development Plan',
    description:
      'Ideal for businesses looking to create a professional, high-performing website that captures attention and drives conversions.',
    features: [
      'Responsive Design',
      'SEO Optimization',
      'Fast Load Speed',
      'Custom Layouts',
      'Analytics Integration',
      'CMS Setup',
      'Blog Section',
      'Timely Updates',
      'Bi-Weekly Check-Ins',
      'Project Management',
      'Async Communication',
    ],
    price: '$X,XXX',
    btn: "Let's Discuss Your Website",
    button: {
      text: "Let's Discuss Your Website",
      variant: 'outline' as const,
    },
  },
  {
    name: 'Full Software Development Plan',
    description:
      'Comprehensive software development for businesses looking to build robust, scalable solutions with custom features and ongoing support.',
    features: [
      'Custom Authentication',
      'Team Management',
      'Role-based Access',
      'Security Features',
      'Full Documentation',
      'End-to-End Service',
      'Focused Iterations',
      'Bi-Weekly Meetings',
      'Expert Project Management',
      'Consistent Updates',
      'Async Communication',
    ],
    price: '$X,XXX',
    btn: "Let's Discuss Your Software",
    button: {
      text: "Let's Discuss Your Software",
      variant: 'default' as const,
    },
  },
];
