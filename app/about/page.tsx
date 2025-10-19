import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Target, Award } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - NetNext Development Studio | Our Team & Mission",
  description:
    "NetNext - professional development studio since 2020. Team of 50+ developers, 200+ successful projects worldwide. Learn more about our company, mission, and values.",
  keywords: [
    "about NetNext",
    "development studio",
    "software development team",
    "IT company Belarus",
    "about us development",
    "NetNext team",
    "company mission",
  ],
  openGraph: {
    title: "About Us - NetNext Development Studio",
    description: "Team of 50+ developers, 200+ successful projects since 2020.",
    url: "https://www.netnext.site/about",
    type: "website",
  },
  alternates: {
    canonical: "https://www.netnext.site/about",
    languages: {
      ru: "https://www.netnext.site/ru/about",
      en: "https://www.netnext.site/en/about",
    },
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            About NetNext Studio
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            We are a team of professionals creating innovative digital solutions for businesses worldwide since 2020.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <Card className="p-6 text-center border-primary/20 hover:border-primary/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Developers</div>
          </Card>
          <Card className="p-6 text-center border-primary/20 hover:border-primary/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">200+</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </Card>
          <Card className="p-6 text-center border-primary/20 hover:border-primary/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">4+</div>
            <div className="text-sm text-muted-foreground">Years of experience</div>
          </Card>
          <Card className="p-6 text-center border-primary/20 hover:border-primary/40 transition-colors">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Satisfied clients</div>
          </Card>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-6 sm:p-8 border-primary/20">
            <Target className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              Creating innovative digital solutions that help businesses grow and develop. We strive to be a reliable
              technological partner for our clients.
            </p>
          </Card>

          <Card className="p-6 sm:p-8 border-primary/20">
            <Award className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Quality above all</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Transparency and honesty</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Innovation and development</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Client orientation</span>
              </li>
            </ul>
          </Card>
        </div>

        {/* What We Do */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">What We Do</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Web Development",
                description: "Modern web applications using React, Next.js, Node.js",
              },
              {
                title: "Mobile Development",
                description: "iOS and Android apps using React Native, Flutter",
              },
              {
                title: "Telegram Bots",
                description: "Automation of business processes through bots",
              },
              {
                title: "AI Solutions",
                description: "Integration of artificial intelligence into your business",
              },
              {
                title: "Desktop Applications",
                description: "Cross-platform solutions for Windows, Mac, Linux",
              },
              {
                title: "UI/UX Design",
                description: "Modern interface and user experience design",
              },
            ].map((service, index) => (
              <Card key={index} className="p-6 border-primary/20 hover:border-primary/40 transition-colors">
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to start a project?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us for a free consultation and discussion of your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base">
              <Link href="/contacts">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base bg-transparent">
              <Link href="/portfolio">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
