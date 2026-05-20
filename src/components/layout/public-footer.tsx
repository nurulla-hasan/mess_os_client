import Link from "next/link";
import { BookOpen, Github, Linkedin, Mail, Phone, Utensils } from "lucide-react";

const footerLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "Manager Manual", href: "/docs/manager" },
  { label: "Member Manual", href: "/docs/user" },
];

const contactLinks = [
  {
    label: "Email",
    href: "mailto:nurullahasan.dev@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    href: "tel:+8801750974716",
    icon: Phone,
  },
  {
    label: "GitHub",
    href: "https://github.com/nurulla-hasan",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nurulla-hasan",
    icon: Linkedin,
  },
];

export function PublicFooter() {
  return (
    <footer className="border-t bg-linear-to-b from-primary/40 via-primary/10 to-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div className="space-y-3">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
              <Utensils className="size-4" />
            </span>
            <span className="text-lg font-bold tracking-tight">Mess OS</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A digital mess management system for meals, expenses, billing, schedules, notices, and member collaboration.
          </p>
          <p className="text-xs font-medium text-muted-foreground">
            Built by <span className="text-foreground">Nurulla Hasan</span>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-foreground">
            <BookOpen className="size-4 text-primary" />
            Resources
          </h3>
          <div className="flex flex-col gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
            Contact
          </h3>
          <div className="flex flex-col gap-2">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon className="size-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© 2026 Mess OS. All rights reserved.</span>
          <span>Made for smarter shared living.</span>
        </div>
      </div>
    </footer>
  );
}
